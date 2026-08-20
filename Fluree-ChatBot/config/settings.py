import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parents[1]

# Every module imports config.settings before touching os.getenv(), so
# loading .env here (rather than in app.py/rag.py individually) guarantees
# it's in the process environment regardless of entry point.
load_dotenv(BASE_DIR / ".env")

DATA_DIR = BASE_DIR / "data"
PDF_DIR = DATA_DIR / "pdfs"
IMAGE_DIR = DATA_DIR / "images"
INDEX_DIR = DATA_DIR / "index"

# This repo lives nested inside the Docusaurus docs site's own directory
# (developers-site/Fluree-ChatBot), so the docs are a sibling of THIS repo's
# own parent, not "developers-site/docs" under it — that doubled path
# (developers-site/developers-site/docs) never exists, which silently wiped
# the index on every rebuild (see src/vector_store.py build_index()).
# Overridable via .env since that layout is specific to this machine.
DOCS_SOURCE_DIR = Path(os.getenv("DOCS_SOURCE_DIR", BASE_DIR.parent / "docs"))

# Single source of truth for branding — every page/favicon references this
# one file, so swapping the logo means changing it in one place.
LOGO_PATH = BASE_DIR / "fluree_pbc_logo.jpg"

# Assistant's chat-bubble avatar — deliberately separate from LOGO_PATH
# (the Fluree company logo used for the sidebar/page icon): this is just
# the little icon shown next to the bot's own messages.
BOT_AVATAR_PATH = BASE_DIR / "assets" / "bot_avatar.png"

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

# Azure DevOps (work items via Microsoft's official MCP server, @azure-devops/mcp).
# Blank until set in .env — the integration no-ops gracefully until then.
AZURE_DEVOPS_ORG = os.getenv("AZURE_DEVOPS_ORG", "")
AZURE_DEVOPS_PROJECT = os.getenv("AZURE_DEVOPS_PROJECT", "")  # optional — scopes WIQL queries to one project
AZURE_DEVOPS_EMAIL = os.getenv("AZURE_DEVOPS_EMAIL", "")
AZURE_DEVOPS_PAT = os.getenv("AZURE_DEVOPS_PAT", "")

# Retrieval + RAG
# Widened from 5: an "end-to-end how-to" answer often spans several linked
# docs (e.g. login -> create dataset -> dataset overview), not just one —
# a narrower top_k was pulling in only the single closest file and reading
# like an incomplete summary. Combined with RAG._expand_to_full_docs()
# (which then pulls in every chunk of each matched file, not just the
# ones that individually ranked), this gives the model enough breadth for
# a genuinely complete answer.
TOP_K = 10
LLM_MODEL = "gpt-4o-mini"
# IndexFlatL2 squared-distance cutoff below which a retrieved chunk counts
# as "relevant" rather than noise. Calibrated empirically on the real index:
# on-topic queries land ~0.7-0.9, off-topic queries land ~1.6-1.8. Chosen
# roughly halfway so genuine off-topic questions get a "not found" answer
# instead of a hallucinated one stitched from irrelevant context.
MAX_RELEVANT_DISTANCE = 1.2
