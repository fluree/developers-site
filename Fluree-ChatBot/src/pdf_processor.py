"""
PyMuPDF text/page extraction.

This is the foundation everything else (chunking, embeddings, retrieval)
builds on, so it's kept intentionally dumb: open a PDF, yield each page's
raw text. No cleaning, chunking, or OCR fallback yet — that comes later,
once this is proven correct.

Run directly to sanity-check extraction against every PDF in data/pdfs/:

    python -m src.pdf_processor
"""

import sys
import pymupdf
from pathlib import Path

from config.settings import PDF_DIR


def extract_text_pages(pdf_path):
    """Yield (page_number, text) for each page in the PDF. Pages are 1-indexed."""
    doc = pymupdf.open(str(pdf_path))
    try:
        for i, page in enumerate(doc, start=1):
            yield i, page.get_text()
    finally:
        doc.close()


def _preview(text, limit=200):
    """Collapse whitespace and truncate, for a readable one-line preview."""
    collapsed = " ".join(text.split())
    if len(collapsed) > limit:
        return collapsed[:limit] + "…"
    return collapsed


def _inspect_all_pdfs():
    pdf_files = sorted(Path(PDF_DIR).glob("*.pdf"))
    if not pdf_files:
        print(f"No PDFs found in {PDF_DIR}")
        return

    for pdf_path in pdf_files:
        print(f"\n{'=' * 80}\n{pdf_path.name}\n{'=' * 80}")
        page_count = 0
        empty_pages = []
        for page_num, text in extract_text_pages(pdf_path):
            page_count += 1
            char_count = len(text)
            print(f"\n--- Page {page_num} ({char_count} chars) ---")
            if char_count == 0:
                empty_pages.append(page_num)
                print("[no extractable text — likely a scanned/image page; OCR will need to handle this]")
            else:
                print(_preview(text))
        print(f"\n{pdf_path.name}: {page_count} page(s), {len(empty_pages)} with no extractable text"
              f"{f' (pages {empty_pages})' if empty_pages else ''}")


if __name__ == "__main__":
    # Windows consoles default to cp1252, which can't encode every character
    # PyMuPDF extracts (emoji, smart quotes, etc.). Force UTF-8 so the
    # preview print doesn't crash on real-world PDFs.
    sys.stdout.reconfigure(encoding="utf-8")
    _inspect_all_pdfs()
