"""
Text chunking + embedding.

Splits extracted page text into overlapping chunks (so a sentence that
spans a chunk boundary still has full context in at least one chunk),
then embeds those chunks with a Hugging Face sentence-transformers model.
"""

from sentence_transformers import SentenceTransformer

from config.settings import CHUNK_OVERLAP, CHUNK_SIZE


def chunk_text(text, chunk_size=CHUNK_SIZE, overlap=CHUNK_OVERLAP):
    """
    Split text into chunks of roughly chunk_size characters, breaking on
    whitespace so words aren't cut in half. Consecutive chunks share
    `overlap` characters' worth of trailing words, carried into the start
    of the next chunk.
    """
    words = text.split()
    if not words:
        return []

    chunks = []
    current_words = []
    current_len = 0

    for word in words:
        current_words.append(word)
        current_len += len(word) + 1  # +1 for the joining space
        if current_len >= chunk_size:
            chunks.append(" ".join(current_words))
            current_words, current_len = _take_overlap(current_words, overlap)

    if current_words and (not chunks or " ".join(current_words) != chunks[-1]):
        chunks.append(" ".join(current_words))

    return chunks


def _take_overlap(words, overlap):
    """Return the trailing words of `words` whose combined length >= overlap."""
    if overlap <= 0:
        return [], 0
    kept = []
    kept_len = 0
    for word in reversed(words):
        kept.insert(0, word)
        kept_len += len(word) + 1
        if kept_len >= overlap:
            break
    return kept, kept_len


class Embeddings:
    def __init__(self, model_name):
        self.model = SentenceTransformer(model_name)

    def encode(self, texts):
        return self.model.encode(texts, show_progress_bar=False)

    @property
    def dimension(self):
        # Renamed in newer sentence-transformers; fall back for older versions.
        if hasattr(self.model, "get_embedding_dimension"):
            return self.model.get_embedding_dimension()
        return self.model.get_sentence_embedding_dimension()
