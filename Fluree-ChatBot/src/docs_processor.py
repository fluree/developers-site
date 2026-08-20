"""
Markdown/MDX documentation ingestion.

Walks the Docusaurus-style docs/ tree (DOCS_SOURCE_DIR) and yields clean,
readable text per file — the markdown equivalent of src/pdf_processor.py's
per-page text extraction.

Not a real MDX parser — regex-based, "good enough" extraction: strip YAML
frontmatter, JSX import lines, and HTML/JSX tags, but keep descriptive
alt=/caption= attribute text (often the only text describing a screenshot)
and keep headings/prose as-is. This is the same pragmatic approach most
doc-search crawlers use rather than a full AST parse.

Run directly to sanity-check extraction against every file in DOCS_SOURCE_DIR:

    python -m src.docs_processor
"""

import re
import sys
from pathlib import Path

from config.settings import DOCS_SOURCE_DIR

DOC_EXTENSIONS = (".md", ".mdx")

_FRONTMATTER_RE = re.compile(r"\A---\n.*?\n---\n?", re.DOTALL)
_IMPORT_RE = re.compile(r"^import\s[\s\S]*?;\s*$", re.MULTILINE)  # spans multi-line destructured imports too
_IMG_MD_RE = re.compile(r"!\[[^\]]*\]\([^)]*\)")
# Pull out descriptive text from common JSX attributes before the tags
# themselves get stripped — this is often the only text describing a
# screenshot, so it's worth keeping as searchable content.
_ATTR_TEXT_RE = re.compile(r'\b(?:alt|caption)="([^"]*)"')
_TAG_RE = re.compile(r"<[^>]+>")
_BLANK_LINES_RE = re.compile(r"\n{3,}")


def clean_markdown(raw_text):
    """Strip frontmatter/imports/tags down to readable prose, keeping descriptive attribute text."""
    text = _FRONTMATTER_RE.sub("", raw_text, count=1)
    text = _IMPORT_RE.sub("", text)
    text = _IMG_MD_RE.sub("", text)
    attr_texts = [t for t in _ATTR_TEXT_RE.findall(text) if t.strip()]
    text = _TAG_RE.sub(" ", text)
    if attr_texts:
        text += "\n\n" + "\n".join(attr_texts)
    text = _BLANK_LINES_RE.sub("\n\n", text)
    return text.strip()


def _extract_frontmatter_title(raw_text):
    fm_match = re.match(r"\A---\n(.*?)\n---", raw_text, re.DOTALL)
    if not fm_match:
        return None
    title_match = re.search(r'^title:\s*["\']?(.+?)["\']?\s*$', fm_match.group(1), re.MULTILINE)
    return title_match.group(1) if title_match else None


def _fallback_title(path):
    # Docusaurus convention: "Some Topic/index.md" — the folder name is the
    # real title; "index" itself is meaningless.
    stem = path.parent.name if path.stem.lower() == "index" else path.stem
    return stem.replace("-", " ").replace("_", " ").strip()


def extract_doc(md_path):
    """Return (title, section, text) for a single markdown/mdx file."""
    raw = Path(md_path).read_text(encoding="utf-8")
    title = _extract_frontmatter_title(raw)
    if not title:
        h1_match = re.search(r"^#\s+(.+)$", raw, re.MULTILINE)
        title = h1_match.group(1).strip() if h1_match else _fallback_title(Path(md_path))
    section = Path(md_path).relative_to(DOCS_SOURCE_DIR).parts[0]
    return title, section, clean_markdown(raw)


def iter_docs():
    """Yield (path, title, section, text) for every .md/.mdx file under DOCS_SOURCE_DIR, skipping unreadable ones."""
    for path in sorted(Path(DOCS_SOURCE_DIR).rglob("*")):
        if path.suffix.lower() not in DOC_EXTENSIONS:
            continue
        try:
            title, section, text = extract_doc(path)
        except (UnicodeDecodeError, OSError) as e:
            print(f"Skipping {path}: {e}")
            continue
        if text:
            yield path, title, section, text


def _preview(text, limit=200):
    collapsed = " ".join(text.split())
    return collapsed[:limit] + ("…" if len(collapsed) > limit else "")


def _inspect_all():
    if not Path(DOCS_SOURCE_DIR).exists():
        print(f"No docs folder found at {DOCS_SOURCE_DIR}")
        return

    by_section = {}
    empty = 0
    total = 0
    for path, title, section, text in iter_docs():
        total += 1
        by_section.setdefault(section, 0)
        by_section[section] += 1
        if not text.strip():
            empty += 1

    print(f"Found {total} file(s) under {DOCS_SOURCE_DIR}\n")
    for section, count in sorted(by_section.items()):
        print(f"  {section}: {count} file(s)")
    print(f"\n{empty} file(s) with no extractable text")

    print(f"\n{'=' * 80}\nSample previews\n{'=' * 80}")
    for path, title, section, text in list(iter_docs())[:5]:
        print(f"\n--- {path.relative_to(DOCS_SOURCE_DIR)} ---")
        print(f"title={title!r} section={section!r} chars={len(text)}")
        print(_preview(text))


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    _inspect_all()
