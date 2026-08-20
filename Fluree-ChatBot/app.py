"""
Main Streamlit entry point for the PDF Chatbot.

Wired to the real pipeline: src/retriever.py + src/rag.py answer every
question by searching the FAISS index built by src/vector_store.py, and
by checking Azure DevOps (src/azure_devops.py) for relevant work items.
"""

import time
import streamlit as st

from config.settings import BOT_AVATAR_PATH, INDEX_DIR, LOGO_PATH
from src.azure_devops import is_configured as ado_is_configured
from src.rag import RAG, parse_answer_segments
from src.ui import hide_page_nav

st.set_page_config(
    page_title="PDF Chatbot",
    page_icon=str(LOGO_PATH),
    layout="centered",
)

# Pins the logo to the top of the sidebar — call this on every page so it
# stays consistent across the whole app, not just this one.
st.logo(str(LOGO_PATH))
hide_page_nav()

ASSISTANT_AVATAR = str(BOT_AVATAR_PATH)


@st.cache_resource(show_spinner="Loading index...")
def get_rag():
    """
    Load the retriever + RAG pipeline once per server process, not per
    rerun — spinning up the embedding model and FAISS index on every
    keystroke would make the chat unusably slow.

    Note: get_rag_autoreindexed() below calls st.cache_resource.clear()
    whenever it detects the docs source changed (or the Admin page does
    so after a manual rebuild), so the next call here rebuilds against
    the fresh index instead of serving a stale cached one.
    """
    from src.retriever import load_retriever

    if not (INDEX_DIR / "faiss.index").exists():
        return None, "No index found yet — build one with `python -m src.vector_store`."
    try:
        return RAG(retriever=load_retriever()), None
    except Exception as e:
        return None, f"Failed to load index: {e}"


def get_rag_autoreindexed():
    """
    Checks whether the docs source has changed since the last index
    build (a cheap file-count + mtime comparison, not a full re-scan —
    see src/document_manager.reindex_if_stale) and reindexes first if so,
    before loading the cached RAG. Runs this check on every page load;
    the check itself is cheap, so this only costs real time on the one
    load that actually notices a change.
    """
    from src.document_manager import reindex_if_stale

    reindexed, chunk_count = reindex_if_stale()
    if reindexed:
        st.cache_resource.clear()
        st.toast(f"📚 Docs changed — reindexed automatically ({chunk_count} chunks).", icon="🔄")
    return get_rag()


rag, rag_error = get_rag_autoreindexed()

# ---------------------------------------------------------------------------
# Sidebar
# ---------------------------------------------------------------------------
# No login gate here — this app is only ever reached from within FlureeSense,
# which has already authenticated the user before they click through to it.
# (pages/1_Admin.py keeps its own separate is_admin gate — that's a distinct
# concern, config access for whoever manages the chatbot, not end-user identity.)
with st.sidebar:
    st.title("Fluree ChatBot")

    if rag_error:
        st.warning(rag_error)

    st.markdown("### 🔗 Sources")
    st.caption("📚 Fluree documentation")
    st.caption("🔵 Azure DevOps work items" if ado_is_configured() else "⚪ Azure DevOps *(not configured)*")

    st.markdown("### ⚙️ Session")
    if st.button("🗑️ Clear conversation", use_container_width=True):
        st.session_state.messages = []
        st.rerun()

# ---------------------------------------------------------------------------
# Chat state
# ---------------------------------------------------------------------------
if "messages" not in st.session_state:
    st.session_state.messages = [
        {
            "role": "assistant",
            "content": (
                "👋 Hi! I'm your Fluree assistant. Ask me anything about the "
                "Fluree documentation"
                + (" or an Azure DevOps work item." if ado_is_configured() else ".")
            ),
        }
    ]

st.title("Chat with Fluree Assistant")


def render_message(content, images):
    """
    Render an answer's {{IMG:n}} markers and its images list as an
    interleaved sequence — the image for a step appears right after that
    step's text, not dumped in a block at the end. `animate=False` path
    (chat history) just renders each segment directly; the live-typing
    effect happens only for a freshly-generated answer, in the chat_input
    block below.
    """
    for kind, value in parse_answer_segments(content):
        if kind == "text":
            st.markdown(value)
        elif 0 <= value < len(images):
            st.image(images[value])


def stream_message(content, images):
    """Same interleaving as render_message, but with a word-by-word typing effect on each text segment."""
    for kind, value in parse_answer_segments(content):
        if kind == "text":
            placeholder = st.empty()
            streamed = ""
            for word in value.split(" "):
                streamed += word + " "
                placeholder.markdown(streamed + "▌")
                time.sleep(0.02)
            placeholder.markdown(streamed)
        elif 0 <= value < len(images):
            st.image(images[value])


# Render chat history
for message in st.session_state.messages:
    avatar = ASSISTANT_AVATAR if message["role"] == "assistant" else None
    with st.chat_message(message["role"], avatar=avatar):
        render_message(message["content"], message.get("images", []))


# Chat input
chat_placeholder = (
    "Ask about the Fluree docs or an Azure DevOps work item..."
    if ado_is_configured()
    else "Ask a question about the Fluree docs..."
)
if prompt := st.chat_input(chat_placeholder, disabled=rag is None):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant", avatar=ASSISTANT_AVATAR):
        images = []
        if rag is None:
            answer = f"⚠️ {rag_error}"
            st.markdown(answer)
        else:
            result = rag.answer(prompt)
            answer = result["answer"]
            images = result["images"]
            stream_message(answer, images)

    st.session_state.messages.append({"role": "assistant", "content": answer, "images": images})
