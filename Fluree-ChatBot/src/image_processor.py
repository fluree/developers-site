"""
Screenshot/image extraction from PDFs.

Pulls every embedded raster image out of each PDF page via PyMuPDF, saves
it to data/images/, and tags it with enough metadata for downstream OCR
and retrieval to trace it back to its source page. No filtering here on
whether an image is "useful" — that judgment belongs to src/ocr.py, once
it can actually look at what's in the image.

Run directly to extract images from every PDF in data/pdfs/:

    python -m src.image_processor
"""

import sys
import pymupdf
from pathlib import Path

from config.settings import IMAGE_DIR, PDF_DIR


def extract_images_from_pdf(pdf_path, out_dir=IMAGE_DIR):
    """
    Extract every embedded image from a PDF and save it to out_dir.

    Returns a list of metadata dicts: {doc_name, page_number, image_id, path}.
    Filenames follow "<doc_stem>_p<page>_img<id>.<ext>" so a file's origin
    is readable from its name alone, without needing a side index.

    Note: if the same image (e.g. a logo) is reused across many pages,
    PyMuPDF reports it once per page it appears on, with the same xref.
    We save a copy per occurrence rather than deduping, since it's the
    per-page tagging that OCR/retrieval will key off of.
    """
    pdf_path = Path(pdf_path)
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    doc_name = pdf_path.stem
    records = []

    doc = pymupdf.open(str(pdf_path))
    try:
        for page_index in range(len(doc)):
            page_number = page_index + 1
            for image_id, img in enumerate(doc.get_page_images(page_index), start=1):
                xref = img[0]
                base_image = doc.extract_image(xref)
                ext = base_image["ext"]
                image_bytes = base_image["image"]

                filename = f"{doc_name}_p{page_number}_img{image_id}.{ext}"
                out_path = out_dir / filename
                out_path.write_bytes(image_bytes)

                records.append(
                    {
                        "doc_name": doc_name,
                        "page_number": page_number,
                        "image_id": image_id,
                        "path": str(out_path),
                        "width": base_image.get("width"),
                        "height": base_image.get("height"),
                    }
                )
    finally:
        doc.close()

    return records


def _extract_all():
    pdf_files = sorted(Path(PDF_DIR).glob("*.pdf"))
    if not pdf_files:
        print(f"No PDFs found in {PDF_DIR}")
        return []

    all_records = []
    for pdf_path in pdf_files:
        records = extract_images_from_pdf(pdf_path, IMAGE_DIR)
        all_records.extend(records)
        print(f"{pdf_path.name}: extracted {len(records)} image(s)")
    print(f"\nTotal: {len(all_records)} image(s) saved to {IMAGE_DIR}")
    return all_records


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    _extract_all()
