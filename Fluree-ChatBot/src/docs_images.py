"""
Resolves images referenced inside a Docusaurus markdown/mdx file to real
files on disk, along with a caption for each — critical for letting the
LLM tell multiple images from the same file apart. An early version only
returned {path, doc_name}, so 3 images from the same file all carried the
identical label; faced with that ambiguity the model placed zero {{IMG:n}}
markers at all rather than guess. Real per-image alt text (or, failing
that, a filename-derived caption) fixes that.

Unlike the old PDF pipeline (src/image_processor.py — one extracted image
per page, tied to a page number), docs images aren't extracted at all:
they already sit on disk as plain files, referenced from the markdown in
three different ways depending on the doc's age/style:

1. Plain markdown:      ![alt text](images/screenshot.png)     — relative
                         to the .md file's own directory; alt text (if
                         any) becomes the caption directly.
2. Docusaurus static:   ![alt](/img/screenshot.png)            — relative
                         to developers-site/static/. Also matches
                         <img src="/img/screenshot.png" alt="..." />.
3. Webpack-imported:    import shot from "@site/src/assets/x.png";
                        (or a relative import path instead of @site/)
                        then <Image img={shot} alt="..." .../> — the
                        variable reference is resolved back to the import
                        path, and alt="" on that same tag becomes the
                        caption.

Run directly for a quick manual check against real docs:

    python -m src.docs_images "cloud/getting-started/create-new-dataset.mdx"
"""

import re
import sys
from pathlib import Path

from config.settings import DOCS_SOURCE_DIR

IMAGE_EXTENSIONS = (".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp")
# Below this size a match is almost always a repeated icon/logo rather
# than a genuine screenshot (same reasoning as the PDF pipeline's
# MIN_IMAGE_BYTES, calibrated there against a real extraction survey).
MIN_IMAGE_BYTES = 8_000

_ext_pattern = "|".join(ext.lstrip(".") for ext in IMAGE_EXTENSIONS)
_MD_IMG_RE = re.compile(r"!\[([^\]]*)\]\(([^)\s]+)")
_IMPORT_RE = re.compile(r'^import\s+(\w+)\s+from\s+["\']([^"\']+)["\']', re.MULTILINE)
_JSX_TAG_RE = re.compile(r"<(?:img|Image)\b(.*?)/?>", re.IGNORECASE | re.DOTALL)
_ALT_ATTR_RE = re.compile(r'\balt=(["\'])(.*?)\1', re.DOTALL)
_IMG_VAR_ATTR_RE = re.compile(r"\bimg=\{(\w+)\}")
_SRC_LITERAL_ATTR_RE = re.compile(rf'\bsrc=(["\'])([^"\']+\.(?:{_ext_pattern}))\1', re.IGNORECASE)


def _resolve_image_path(raw_ref, md_path):
    """Turn a raw reference string from the markdown into an absolute filesystem path, or None if it can't be resolved locally (e.g. an external http(s) URL)."""
    ref = raw_ref.strip()
    if ref.startswith(("http://", "https://")):
        return None
    site_root = DOCS_SOURCE_DIR.parent
    if ref.startswith("@site/"):
        return (site_root / ref[len("@site/") :]).resolve()
    if ref.startswith("/"):
        return (site_root / "static" / ref.lstrip("/")).resolve()
    return (Path(md_path).parent / ref).resolve()


def _filename_caption(path):
    """Fallback when there's no alt text: turn "47_create_catalog_0.png" into "47 Create Catalog 0"."""
    words = re.split(r"[-_]+", path.stem)
    return " ".join(w.capitalize() for w in words if w) or path.stem


def _build_import_map(raw_text):
    """import X from "path/to/file.png"; -> {"X": "path/to/file.png"}, image imports only."""
    return {name: path for name, path in _IMPORT_RE.findall(raw_text) if path.lower().endswith(IMAGE_EXTENSIONS)}


def _extract_refs(raw_text):
    """Yield (raw_path, alt_text_or_None) for every image reference found in the raw markdown/mdx text."""
    for alt, path in _MD_IMG_RE.findall(raw_text):
        yield path, (alt.strip() or None)

    import_map = _build_import_map(raw_text)
    seen_paths = set()
    for tag_body in _JSX_TAG_RE.findall(raw_text):
        alt_match = _ALT_ATTR_RE.search(tag_body)
        caption = alt_match.group(2).strip() or None if alt_match else None

        var_match = _IMG_VAR_ATTR_RE.search(tag_body)
        if var_match and var_match.group(1) in import_map:
            path = import_map[var_match.group(1)]
            seen_paths.add(path)
            yield path, caption
            continue

        src_match = _SRC_LITERAL_ATTR_RE.search(tag_body)
        if src_match:
            path = src_match.group(2)
            seen_paths.add(path)
            yield path, caption

    # An imported image that's never referenced in a JSX tag this module
    # recognizes (e.g. used only inside a component this regex doesn't
    # parse) still likely renders somewhere in the file — better to
    # surface it with a filename-derived caption than drop it entirely.
    for name, path in import_map.items():
        if path not in seen_paths:
            yield path, None


def extract_image_paths(raw_text, md_path):
    """
    Find every image in a markdown/mdx file's raw text (before
    frontmatter/JSX stripping — that cleanup runs in docs_processor.py
    for the text-embedding path, but would remove exactly the syntax
    this needs to see). Returns a list of {"path": Path, "caption": str}
    dicts, resolved/deduplicated/size-filtered to real files on disk.
    """
    seen = set()
    images = []
    for raw_ref, alt in _extract_refs(raw_text):
        path = _resolve_image_path(raw_ref, md_path)
        if path is None or path in seen:
            continue
        seen.add(path)
        if not path.exists() or path.stat().st_size < MIN_IMAGE_BYTES:
            continue
        images.append({"path": path, "caption": alt or _filename_caption(path), "has_alt": bool(alt)})
    return images


def images_for_doc_path(rel_path):
    """rel_path is relative to DOCS_SOURCE_DIR, matching the "path" field already stored in chunk metadata (see src/vector_store.py)."""
    md_path = DOCS_SOURCE_DIR / rel_path
    if not md_path.exists():
        return []
    try:
        raw_text = md_path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        return []
    return extract_image_paths(raw_text, md_path)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    if len(sys.argv) > 1:
        rel = sys.argv[1]
        images = images_for_doc_path(rel)
        print(f"{rel}: {len(images)} image(s)")
        for img in images:
            print(f"  {img['path']} ({img['path'].stat().st_size:,} bytes) — {img['caption']!r}")
    else:
        print("Usage: python -m src.docs_images <path relative to DOCS_SOURCE_DIR>")
