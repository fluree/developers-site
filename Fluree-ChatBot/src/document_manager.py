"""
Keeps the FAISS index in sync with the docs source.

reindex() rebuilds the whole index from every markdown/mdx file under
DOCS_SOURCE_DIR via src/vector_store.py — simple and always correct; at
this project's scale (~250 files, ~1300 chunks) it costs seconds, so
there's no real case yet for incremental updates.

Auto-reindexing: DOCS_SOURCE_DIR is a separate git repo the app doesn't
control (someone else's `git pull`), so there's no natural in-app action
to hook a trigger onto the way there was for admin-driven PDF add/remove.
Instead, is_stale()/reindex_if_stale() compare a cheap fingerprint (file
count + latest mtime — NOT file contents, so this is fast even across
hundreds of files) against what was indexed last time, and reindex only
when it's actually changed. Callers (app.py, pages/1_Admin.py) run this
check on every page load; it's cheap when nothing changed, and does the
real work only the first time it detects a change.
"""

import json
from pathlib import Path

from config.settings import DOCS_SOURCE_DIR, INDEX_DIR

FINGERPRINT_PATH = INDEX_DIR / "docs_fingerprint.json"


def compute_docs_fingerprint():
    """Cheap signature of the docs folder's current state: file count + latest mtime. Doesn't read file contents."""
    files = [p for p in Path(DOCS_SOURCE_DIR).rglob("*") if p.suffix.lower() in (".md", ".mdx")]
    if not files:
        return {"count": 0, "latest_mtime": 0}
    return {"count": len(files), "latest_mtime": max(p.stat().st_mtime for p in files)}


def _read_stored_fingerprint():
    if not FINGERPRINT_PATH.exists():
        return None
    try:
        return json.loads(FINGERPRINT_PATH.read_text(encoding="utf-8"))
    except (ValueError, OSError):
        return None


def _write_fingerprint(fingerprint):
    FINGERPRINT_PATH.parent.mkdir(parents=True, exist_ok=True)
    FINGERPRINT_PATH.write_text(json.dumps(fingerprint), encoding="utf-8")


def is_stale():
    """True if the docs folder has changed since the last successful reindex (or it's never been fingerprinted)."""
    return compute_docs_fingerprint() != _read_stored_fingerprint()


def reindex():
    """
    Rebuild the FAISS index from DOCS_SOURCE_DIR. Returns the resulting chunk
    count (0 if none).

    Deliberately skips writing the fingerprint when build_index() finds no
    docs at all (DOCS_SOURCE_DIR misconfigured, moved, or transiently
    empty) — recording success for a run that wiped the index would make
    is_stale() report "up to date" forever after, masking the failure
    instead of retrying on the next page load.
    """
    from src.vector_store import build_index

    store = build_index()
    if store is None:
        return 0
    _write_fingerprint(compute_docs_fingerprint())
    return len(store)


def reindex_if_stale():
    """
    Auto-reindex entry point: only rebuilds when the docs folder has
    actually changed since the last build. Cheap to call on every page
    load — the fingerprint check alone is fast; the expensive rebuild
    only runs when it's actually needed.

    Returns (reindexed: bool, chunk_count: int | None) — chunk_count is
    None when nothing needed reindexing.
    """
    if not is_stale():
        return False, None
    return True, reindex()
