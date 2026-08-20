from src import pdf_processor


def test_extract_text_pages_exists():
    assert hasattr(pdf_processor, 'extract_text_pages')
