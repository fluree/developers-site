"""
Tesseract OCR on extracted images.

Runs OCR over images produced by src/image_processor.py and keeps only
the ones with enough recognizable text to be worth indexing — most
embedded images in real-world PDFs are logos/icons/decorative graphics,
not screenshots with real content.

Run directly to extract + OCR every PDF in data/pdfs/ end to end:

    python -m src.ocr
"""

import shutil
import sys
from pathlib import Path

import pytesseract
from PIL import Image

MIN_USEFUL_CHARS = 20  # below this, treat OCR output as noise, not real content

# pytesseract only wraps the Tesseract binary — it's a separate install and
# isn't always on PATH (e.g. a per-user Windows install). Try PATH first,
# then fall back to the common install locations.
_CANDIDATE_PATHS = [
    r"C:\Program Files\Tesseract-OCR\tesseract.exe",
    str(Path.home() / "AppData" / "Local" / "Programs" / "Tesseract-OCR" / "tesseract.exe"),
]


def _locate_tesseract():
    found = shutil.which("tesseract")
    if found:
        return found
    for candidate in _CANDIDATE_PATHS:
        if Path(candidate).exists():
            return candidate
    return None


_tesseract_path = _locate_tesseract()
if _tesseract_path:
    pytesseract.pytesseract.tesseract_cmd = _tesseract_path


def tesseract_available():
    try:
        pytesseract.get_tesseract_version()
        return True
    except Exception:
        return False


def ocr_image(image_path):
    """Return the raw OCR text for a single image (may be empty/junk)."""
    img = Image.open(image_path)
    return pytesseract.image_to_string(img)


def has_useful_text(text, min_chars=MIN_USEFUL_CHARS):
    """True if OCR output looks like real content rather than noise."""
    return len(text.strip()) >= min_chars


def ocr_images(image_records, min_chars=MIN_USEFUL_CHARS):
    """
    Run OCR over image metadata dicts (as produced by
    image_processor.extract_images_from_pdf) and return only the ones
    whose OCR text clears the usefulness bar, each with an added
    "ocr_text" field.
    """
    useful = []
    for record in image_records:
        text = ocr_image(record["path"])
        if has_useful_text(text, min_chars):
            useful.append({**record, "ocr_text": text.strip()})
    return useful


def _run_all():
    from src.image_processor import _extract_all

    if not tesseract_available():
        print(
            "Tesseract binary not found. Install it "
            "(https://github.com/UB-Mannheim/tesseract/wiki) or point "
            "pytesseract.pytesseract.tesseract_cmd at it, then re-run.\n"
            "Image extraction still works without it — OCR just can't run yet."
        )
        return []

    records = _extract_all()
    print(f"\nRunning OCR over {len(records)} image(s)...")
    useful = ocr_images(records)
    print(f"{len(useful)}/{len(records)} image(s) had useful OCR text (>= {MIN_USEFUL_CHARS} chars)\n")
    for r in useful:
        print(f"--- {r['doc_name']} p{r['page_number']} img{r['image_id']} ---")
        print(r["ocr_text"][:300])
        print()
    return useful


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    _run_all()
