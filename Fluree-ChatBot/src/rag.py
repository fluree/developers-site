"""
Retrieval + LLM prompt + grounding.

Retrieves relevant chunks for a query, filters out anything too dissimilar
to be trustworthy context (src/retriever.py returns a distance per chunk;
see MAX_RELEVANT_DISTANCE in config/settings.py), and asks an LLM to
answer using ONLY that context. The answer text itself stays free of
internal doc names/paths — callers that want provenance use the separate
"sources" field on the result instead.

Every question also checks Azure DevOps for relevant work items
(src/azure_devops.py, via Microsoft's official MCP server) and folds
whatever it finds into the same context — not just questions that look
work-item-related. That's a deliberate latency-for-simplicity tradeoff:
it's always safe to call (no-ops to "" when unconfigured or unreachable)
but adds the MCP subprocess/handshake overhead to every question.

Inline screenshots ({{IMG:n}} markers, parse_answer_segments()) were
originally built for the PDF pipeline (one extracted image per page).
_images_for_sources() now resolves real docs images instead
(src/docs_images.py) — file-level granularity, not per-chunk: a matched
source's whole file worth of images are candidates, since markdown
images aren't tied to a specific chunk the way PDF screenshots were tied
to a specific page.

Falls back to showing the retrieved context directly (no LLM call) when
no OPENAI_API_KEY is configured, so the retrieval half of the pipeline
stays inspectable/testable without an API key.

Run directly for a quick manual check against a few sample questions:

    python -m src.rag
"""

import os
import re
import sys
from pathlib import Path

from config.settings import LLM_MODEL, MAX_RELEVANT_DISTANCE, TOP_K

MAX_IMAGES_PER_ANSWER = 15
# TOP_K=10 + full-doc expansion (see answer()) is deliberately broad for
# text thoroughness, but pulling images from every one of those files
# floods the model with mostly-irrelevant candidates. Confirmed live:
# with 3 source files, the 2nd/3rd-ranked ones were topically-adjacent
# but not actually about the question (e.g. "Chat with Documents" showed
# up for a "create a dataset" question — both about datasets, but that
# doc's 5 screenshots are about a completely different UI flow), and
# faced with that noise the model placed zero {{IMG:n}} markers at all,
# even for the one genuinely relevant image. With only the single
# closest-matching file's images offered, it reliably placed the marker.
MAX_IMAGE_SOURCE_FILES = 1

SHOW_IMAGES = True

_IMAGE_MARKER_RE = re.compile(r"\{\{IMG:(\d+)\}\}")
# Defensive cleanup: the model occasionally emits a stray bare digit on its
# own line near a marker (an artifact, not part of {{IMG:n}} syntax). A
# real numbered-list item is always "N. <content>" — a line that's ONLY a
# digit is never legitimate, so it's safe to drop.
_STRAY_DIGIT_LINE_RE = re.compile(r"^\s*\d+\s*$", re.MULTILINE)

SYSTEM_PROMPT = (
    "You are a helpful assistant that answers questions using ONLY the "
    "provided context, which was retrieved from Fluree's documentation "
    "and, when relevant, from Azure DevOps work items. If the context "
    "doesn't contain the answer, say so plainly instead of guessing or "
    "using outside knowledge. When answering a \"how do I / how to\" "
    "question, be thorough and complete — walk through every step and "
    "sub-step present in the context, in order, rather than a short "
    "summary; the user needs actionable end-to-end guidance, not an "
    "overview. Answer in plain prose — do not mention documentation file "
    "names or paths; that provenance is tracked separately, not shown to "
    "the user inline.\n\n"
    "Azure DevOps work item IDs and titles are different from doc "
    "provenance — they're useful, actionable references the user can "
    "look up themselves, so mention them directly when a real one "
    "appears in the Azure DevOps context above (e.g. its actual ID and "
    "title). NEVER invent, guess, or reuse an example ID — only cite a "
    "work item ID that is literally present in the Azure DevOps context "
    "provided to you for this question.\n\n"
    "The Azure DevOps search that produced that context is a broad "
    "keyword match, not a relevance judgment — it can and does return "
    "work items that share a word with the question but are actually "
    "about something unrelated. YOU must filter it: only mention a work "
    "item whose title is clearly, specifically about what the user is "
    "asking, not just one that happens to share a keyword. Silently "
    "drop any work item in the context that doesn't clearly match — "
    "it's normal and expected to mention zero work items, or fewer than "
    "were provided, when only some (or none) are truly relevant. Never "
    "list a work item just because it was present in the context.\n\n"
    "Some questions come with a numbered list of available screenshots or "
    "diagrams. This applies to ANY answer, not just step-by-step "
    "instructions — a conceptual or comparison question (e.g. \"what's "
    "the difference between X and Y\") should also embed a matching image "
    "right where X or Y is first explained, exactly like a how-to answer "
    "embeds one at the step it illustrates. Whenever a sentence you're "
    "writing describes something a listed image depicts, insert "
    "{{IMG:n}} immediately after that sentence, using its number from the "
    "list. Every image in the list whose caption matches something you "
    "discuss should get a marker — don't skip one just because you "
    "already placed another. Never invent a number that wasn't given to "
    "you, and never write a bare screenshot number anywhere except "
    "inside a {{IMG:n}} marker."
)


_LEADING_PUNCTUATION_LINE_RE = re.compile(r"^[ \t]*[.,;:!?]+[ \t]*\n+")


def _drop_dangling_punctuation(text):
    """
    The model sometimes writes the marker mid-sentence, e.g. "...the form:
    {{IMG:1}}.\n\nBy following...", so the text right after a marker starts
    with the sentence's trailing punctuation on its own line. Rendered as
    its own markdown block (see app.py), that's a stray "." floating above
    the next paragraph — drop it since the sentence already read fine
    before the image broke it up.
    """
    return _LEADING_PUNCTUATION_LINE_RE.sub("", text, count=1)


def parse_answer_segments(text):
    """
    Split answer text on {{IMG:n}} markers into an ordered list of
    ("text", str) / ("image", index) tuples — index is 0-based, into the
    "images" list from the same result — so a UI can render text and
    images interleaved in the order the model placed them.
    """
    segments = []
    pos = 0
    for match in _IMAGE_MARKER_RE.finditer(text):
        before = text[pos : match.start()]
        if pos > 0:  # text right after a previous marker, not the answer's opening line
            before = _drop_dangling_punctuation(before)
        if before.strip():
            segments.append(("text", before))
        segments.append(("image", int(match.group(1)) - 1))
        pos = match.end()
    remainder = text[pos:]
    if pos > 0:
        remainder = _drop_dangling_punctuation(remainder)
    if remainder.strip() or not segments:
        segments.append(("text", remainder))
    return segments


def _images_for_sources(sources):
    """
    Resolve real images referenced in each matched source file (markdown
    image syntax, JSX <img>/<Image> src, or an image-extension `import`
    statement — see src/docs_images.py), in source order, capped at
    MAX_IMAGES_PER_ANSWER. Returns {"path", "doc_name", "caption"} dicts —
    "caption" (real alt text, or a filename-derived fallback) is what
    lets the model tell multiple images from the same file apart; without
    it they'd all carry an identical "N. <doc title>" label and the model
    had no way to confidently pick one.
    """
    from src.docs_images import images_for_doc_path

    seen = set()
    images = []
    for s in sources:
        candidates = images_for_doc_path(s["path"])
        # A file with several images but only some carrying real alt text
        # recreates the exact ambiguity that made the model place zero
        # {{IMG:n}} markers in the first place (e.g. architecture-overview.mdx:
        # 2 captioned "Picture of a Database"/"Picture of a Ledger" plus 4
        # generic filename-derived "Architecture Overview3/4/5/6" — indistinct
        # noise the model can't confidently map to a sentence). If at least
        # one image in the file has real alt text, drop the uncaptioned ones
        # rather than diluting the manifest with guesses.
        if any(img["has_alt"] for img in candidates):
            candidates = [img for img in candidates if img["has_alt"]]
        for img in candidates:
            if img["path"] in seen:
                continue
            seen.add(img["path"])
            images.append({"path": str(img["path"]), "doc_name": s["doc_name"], "caption": img["caption"]})
            if len(images) >= MAX_IMAGES_PER_ANSWER:
                return images
    return images


class RAG:
    def __init__(self, retriever=None, model=LLM_MODEL, max_distance=MAX_RELEVANT_DISTANCE):
        self.retriever = retriever
        self.model = model
        self.max_distance = max_distance
        self.api_key = os.getenv("OPENAI_API_KEY")
        self._client = None

    @property
    def client(self):
        if self._client is None and self.api_key:
            from openai import OpenAI

            self._client = OpenAI(api_key=self.api_key)
        return self._client

    def answer(self, query, top_k=TOP_K):
        """
        Returns {"answer": str, "sources": [...], "images": [...], "context_used": bool}.
        "answer" may contain {{IMG:n}} markers indexing into "images" —
        see parse_answer_segments().
        """
        relevant = []
        sources = []
        if self.retriever:
            candidates = self.retriever.retrieve(query, top_k=top_k)
            relevant = [d for d in candidates if d.get("distance", 0) <= self.max_distance]
            # Dedupe into "sources" BEFORE expanding — relevant is still in
            # relevance order here (closest match first). _expand_to_full_docs
            # re-sorts by path/chunk_index afterward so a doc's full text
            # reads in file order, which destroys that ranking. Images use
            # "sources" (still ranked) capped to a few files; text context
            # uses the expanded, path-sorted version for thoroughness.
            # Confirmed live: without this, a broad TOP_K=10 + full-doc
            # expansion pulled in images from ~5 tangentially-matched files
            # (e.g. notebooks.mdx for a "create a dataset" question), and
            # facing 15 mostly-irrelevant candidates, the model placed zero
            # markers at all rather than picking out the one real match.
            sources = self._dedupe_sources(relevant)
            relevant = self._expand_to_full_docs(relevant)

        ado_context = self._ado_context(query)

        if not relevant and not ado_context:
            return self._result(
                "I couldn't find anything relevant to that in the indexed "
                "documentation or Azure DevOps.",
                [],
                [],
                False,
            )

        context = self._build_context(relevant)
        if ado_context:
            context = f"{context}\n\n{ado_context}" if context else ado_context
        images = _images_for_sources(sources[:MAX_IMAGE_SOURCE_FILES]) if SHOW_IMAGES else []

        if not self.client:
            fallback = self._build_fallback_text(relevant, images)
            if ado_context:
                fallback = f"{fallback}\n\n{ado_context}" if fallback else ado_context
            return self._result(
                "*(No OPENAI_API_KEY configured — showing retrieved context "
                "instead of an LLM-generated answer.)*\n\n" + fallback,
                sources,
                images,
                True,
            )

        try:
            answer = self._call_llm(query, context, images)
        except Exception as e:
            return self._result(f"LLM call failed: {e}", sources, images, True)

        answer = self._strip_stray_digit_lines(answer)
        return self._result(answer, sources, images, True)

    def _expand_to_full_docs(self, relevant):
        """
        A multi-step procedure ("create a dataset") is often split across
        several chunks of one source file, but similarity search may only
        rank a couple of them into the top-k — the rest of the same file
        didn't individually score as close to the query, even though
        they're part of the same answer. Pull in every chunk from each
        matched file so the model sees the whole procedure, not a few
        disconnected fragments of it.
        """
        if not relevant:
            return relevant
        matched_paths = {d["path"] for d in relevant}
        all_metadata = self.retriever.vs.metadata
        seen = {(d["path"], d["chunk_index"]) for d in relevant}
        expanded = list(relevant)
        for m in all_metadata:
            key = (m["path"], m["chunk_index"])
            if m["path"] in matched_paths and key not in seen:
                seen.add(key)
                expanded.append(m)
        expanded.sort(key=lambda d: (d["path"], d["chunk_index"]))
        return expanded

    @staticmethod
    def _ado_context(query):
        """Always-on Azure DevOps work item lookup — see module docstring for the latency tradeoff. Never raises; "" when unconfigured/unreachable/empty."""
        try:
            from src.azure_devops import lookup_for_query

            result = lookup_for_query(query)
        except Exception as e:
            print(f"[rag] Azure DevOps lookup failed: {e}")
            result = ""
        return f"[Azure DevOps work items]\n{result}" if result else ""

    @staticmethod
    def _strip_stray_digit_lines(text):
        return _STRAY_DIGIT_LINE_RE.sub("", text)

    @staticmethod
    def _result(answer, sources, images, context_used):
        return {
            "answer": answer,
            "sources": sources,
            "images": [img["path"] for img in images],
            "context_used": context_used,
        }

    @staticmethod
    def _build_context(docs):
        parts = []
        for d in docs:
            parts.append(f"[{d['doc_name']}]\n{d['text']}")
        return "\n\n".join(parts)

    @staticmethod
    def _build_fallback_text(docs, images):
        """Raw retrieved context blocks, for the no-LLM path. images is currently always [] — see _images_for_sources — so there's nothing to interleave yet."""
        return "\n\n".join(f"[{d['doc_name']}]\n{d['text']}" for d in docs)

    @staticmethod
    def _dedupe_sources(docs):
        seen = set()
        sources = []
        for d in docs:
            key = d["path"]
            if key not in seen:
                seen.add(key)
                sources.append({"doc_name": d["doc_name"], "section": d["section"], "path": d["path"]})
        return sources

    @staticmethod
    def _image_manifest(images):
        if not images:
            return "No screenshots are available for this question."
        lines = [f"{i + 1}. {img['caption']} (from: {img['doc_name']})" for i, img in enumerate(images)]
        return "Available screenshots (number. what it shows):\n" + "\n".join(lines)

    def _call_llm(self, query, context, images):
        user_content = f"Context:\n{context}\n\n{self._image_manifest(images)}\n\nQuestion: {query}"
        response = self.client.chat.completions.create(
            model=self.model,
            temperature=0,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_content},
            ],
        )
        return response.choices[0].message.content


def _demo():
    from src.retriever import load_retriever

    rag = RAG(retriever=load_retriever())
    if not rag.api_key:
        print("(No OPENAI_API_KEY set — responses below are retrieval-only, no LLM call.)\n")

    questions = [
        "How do I create a new catalog?",
        "What is the difference between a database and a ledger in Fluree?",
        "What is the capital of France?",
    ]
    for q in questions:
        print(f"{'=' * 80}\nQ: {q}\n{'=' * 80}")
        result = rag.answer(q)
        print(result["answer"])
        if result["images"]:
            print("\nImages:", ", ".join(Path(p).name for p in result["images"]))
        segments = parse_answer_segments(result["answer"])
        print("Segments:", [(kind, val if kind == "image" else len(val)) for kind, val in segments])
        print()


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    _demo()
