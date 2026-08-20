"""
Similarity search over the FAISS index built by src/vector_store.py.
"""

import numpy as np


class Retriever:
    def __init__(self, vector_store, embeddings):
        self.vs = vector_store
        self.emb = embeddings

    def retrieve(self, query, top_k=5):
        """
        Return the top_k closest chunks to `query`, each as the stored
        metadata dict ({doc_name, section, path, chunk_index, text}) plus a
        "distance" field (squared L2 — lower is more similar), so callers
        can threshold on relevance instead of blindly trusting top-k.
        """
        q_vec = self.emb.encode([query])
        D, I = self.vs.search(np.array(q_vec), k=top_k)
        results = []
        for dist, idx in zip(D[0], I[0]):
            if idx == -1:  # FAISS pads with -1 when the index has < top_k vectors
                continue
            results.append({**self.vs.metadata[idx], "distance": float(dist)})
        return results


def load_retriever():
    """
    Build a Retriever from the persisted index + configured embedding
    model, so callers (rag.py, app.py) don't each have to know how those
    pieces fit together.
    """
    from config.settings import EMBEDDING_MODEL, INDEX_DIR
    from src.embeddings import Embeddings
    from src.vector_store import VectorStore

    embedder = Embeddings(EMBEDDING_MODEL)
    store = VectorStore(dim=embedder.dimension)
    store.load(INDEX_DIR)
    return Retriever(store, embedder)
