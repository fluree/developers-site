from src import embeddings, vector_store, retriever


def test_retriever_components_exist():
    assert hasattr(embeddings, 'Embeddings')
    assert hasattr(vector_store, 'VectorStore')
    assert hasattr(retriever, 'Retriever')
