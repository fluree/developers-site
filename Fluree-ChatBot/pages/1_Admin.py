"""
Admin page: manage the docs source that backs the chatbot.

No login gate here, deliberately — same rationale as app.py: this
embedded chatbot is only ever reached from within FlureeSense, which has
already authenticated (and authorized) the user before they click
through, so a second account system on top of it was redundant. Account
management, if any, belongs to FlureeSense itself.

The docs/ source (DOCS_SOURCE_DIR — a sibling Docusaurus project, see
config/settings.py) is a git-managed folder, not something uploaded
through this UI — so "managing" it here means showing what's currently
indexed and offering a manual rebuild (e.g. after a `git pull` on that
repo), via src/document_manager.py.
"""

from pathlib import Path
import sys

# Allow `from config...` / `from src...` when Streamlit runs this page directly.
sys.path.append(str(Path(__file__).resolve().parents[1]))

import streamlit as st

from config.settings import DOCS_SOURCE_DIR, INDEX_DIR, LOGO_PATH
from src.document_manager import reindex, reindex_if_stale
from src.ui import hide_page_nav

st.set_page_config(page_title="Admin · PDF Chatbot", page_icon=str(LOGO_PATH), layout="centered")

# Same calls as app.py — each page in a multipage app makes them itself for
# a consistent sidebar (logo shown, Streamlit's own page-switcher hidden).
st.logo(str(LOGO_PATH))
hide_page_nav()

INDEX_DIR.mkdir(parents=True, exist_ok=True)

with st.sidebar:
    st.title("⚙️ Admin")

docs_tab, ado_tab = st.tabs(["📚 Docs", "🔵 Azure DevOps"])

with docs_tab:
    st.title("📚 Documentation Source")
    st.caption(f"Indexed from `{DOCS_SOURCE_DIR}` — a git-managed folder, not uploaded here.")

    if "docs_flash" in st.session_state:
        st.success(st.session_state.pop("docs_flash"))

    # Auto-check on every page load: cheap (file count + mtime, not a full
    # content scan), so this only costs real time on the one load that
    # actually notices the docs repo changed since the last build.
    with st.spinner("Checking for docs changes..."):
        auto_reindexed, auto_chunk_count = reindex_if_stale()
    if auto_reindexed:
        st.cache_resource.clear()
        st.info(f"🔄 Docs had changed — auto-reindexed ({auto_chunk_count} chunks).")

    from src.docs_processor import iter_docs

    docs_found = list(iter_docs())
    by_section = {}
    for _path, _title, section, _text in docs_found:
        by_section[section] = by_section.get(section, 0) + 1

    indexed_chunks = 0
    if (INDEX_DIR / "faiss.index").exists():
        from src.vector_store import VectorStore

        store = VectorStore(dim=384)  # placeholder — load() overwrites dim from the saved index
        store.load(INDEX_DIR)
        indexed_chunks = len(store)

    col1, col2 = st.columns(2)
    col1.metric("Files on disk", len(docs_found))
    col2.metric("Chunks currently indexed", indexed_chunks)

    st.markdown("### 📂 By section")
    for section, count in sorted(by_section.items()):
        st.write(f"**{section}**: {count} file(s)")

    st.markdown("### 🔄 Rebuild")
    st.caption(
        "Auto-reindexing already runs above on every page load (and on "
        "the chat page) whenever it detects the docs folder changed. Use "
        "this to force a full rebuild on demand regardless of that check."
    )
    if st.button("Rebuild index", type="primary"):
        with st.spinner("Reindexing..."):
            chunk_count = reindex()
        st.cache_resource.clear()  # so app.py's cached RAG reloads the new index next time it's used
        st.session_state.docs_flash = f"Reindexed — {chunk_count} chunk(s) from {len(docs_found)} file(s)."
        st.rerun()

with ado_tab:
    st.title("🔵 Azure DevOps")

    from config.settings import AZURE_DEVOPS_ORG, AZURE_DEVOPS_PROJECT
    from src.azure_devops import is_configured as ado_is_configured

    if not ado_is_configured():
        st.warning(
            "Not configured. Set `AZURE_DEVOPS_ORG`, `AZURE_DEVOPS_EMAIL`, and "
            "`AZURE_DEVOPS_PAT` in `.env` (`AZURE_DEVOPS_PROJECT` is required too — "
            "the server prompts for one interactively otherwise, which this app "
            "can't answer)."
        )
    else:
        st.success(f"Configured — org **{AZURE_DEVOPS_ORG}**, project **{AZURE_DEVOPS_PROJECT or '(none set)'}**")
        st.caption(
            "Every chat question checks Azure DevOps for relevant work items "
            "alongside the docs — not just ones that look work-item-related."
        )

        if st.button("Test connection"):
            with st.spinner("Connecting to Azure DevOps..."):
                try:
                    from src.azure_devops import list_tools

                    tools = list_tools()
                    st.success(f"Connected — {len(tools.tools)} tool(s) available.")
                    for tool in tools.tools:
                        st.caption(f"🔧 **{tool.name}**")
                except Exception as e:
                    st.error(f"Connection failed: {e}")
