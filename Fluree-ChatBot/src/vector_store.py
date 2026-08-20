"""
FAISS index build/load/update.

Runs the full pipeline — extract text from the Docusaurus docs source
(src/docs_processor.py), chunk it with overlap, embed with a
sentence-transformers model (src/embeddings.py) — and stores the
resulting vectors + per-chunk metadata ({doc_name, section, path,
chunk_index, text}) in a FAISS index under data/index/.

The original PDF-based ingestion (src/pdf_processor.py) has been replaced
by this, per a scope change: the docs/ source is richer and kept current,
so it's now the sole source of truth instead of the 3 compiled PDFs.

Run directly to (re)build the index from every doc in DOCS_SOURCE_DIR:

    python -m src.vector_store
"""

import pickle
import sys
from pathlib import Path

import faiss
import numpy as np

from config.settings import DOCS_SOURCE_DIR, EMBEDDING_MODEL, INDEX_DIR


class VectorStore:
    def __init__(self, dim, index_path=None):
        self.dim = dim
        self.index = faiss.IndexFlatL2(dim)
        self.index_path = Path(index_path) if index_path else None
        self.metadata = []

    def add(self, vectors, metadatas):
        arr = np.array(vectors).astype("float32")
        self.index.add(arr)
        self.metadata.extend(metadatas)

    def save(self, path):
        path = Path(path)
        path.mkdir(parents=True, exist_ok=True)
        faiss.write_index(self.index, str(path / "faiss.index"))
        with open(path / "meta.pkl", "wb") as f:
            pickle.dump(self.metadata, f)

    def load(self, path):
        path = Path(path)
        self.index = faiss.read_index(str(path / "faiss.index"))
        self.dim = self.index.d
        with open(path / "meta.pkl", "rb") as f:
            self.metadata = pickle.load(f)

    def search(self, vector, k=5):
        vector = np.asarray(vector, dtype="float32")
        if vector.ndim == 1:
            vector = vector.reshape(1, -1)
        D, I = self.index.search(vector, k)
        return D, I

    def __len__(self):
        return self.index.ntotal


def _build_chunk_records():
    """
    Walk every markdown/mdx file under DOCS_SOURCE_DIR and chunk it.
    Returns a list of {doc_name, section, path, chunk_index, text} dicts —
    one per chunk, ready to embed.
    """
    from src.docs_processor import iter_docs
    from src.embeddings import chunk_text

    records = []
    for doc_path, title, section, text in iter_docs():
        rel_path = str(doc_path.relative_to(DOCS_SOURCE_DIR))
        doc_chunks = 0
        for chunk_index, chunk in enumerate(chunk_text(text)):
            records.append(
                {
                    "doc_name": title,
                    "section": section,
                    "path": rel_path,
                    "chunk_index": chunk_index,
                    "text": chunk,
                }
            )
            doc_chunks += 1
        print(f"{rel_path}: {doc_chunks} chunk(s)")
    return records


def _clear_index_files():
    """Remove any existing index files so a stale index can't linger once every PDF has been removed."""
    index_dir = Path(INDEX_DIR)
    for name in ("faiss.index", "meta.pkl"):
        f = index_dir / name
        if f.exists():
            f.unlink()


def build_index():
    from src.embeddings import Embeddings

    records = _build_chunk_records()
    if not records:
        print(f"No text chunks found — check {DOCS_SOURCE_DIR} has markdown/mdx files.")
        _clear_index_files()
        return None

    print(f"\nEmbedding {len(records)} chunk(s) with {EMBEDDING_MODEL}...")
    embedder = Embeddings(EMBEDDING_MODEL)
    vectors = embedder.encode([r["text"] for r in records])

    store = VectorStore(dim=embedder.dimension)
    store.add(vectors, records)
    store.save(INDEX_DIR)

    print(f"\nSaved {len(store)} vector(s) (dim={store.dim}) to {INDEX_DIR}")
    return store


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    build_index()
