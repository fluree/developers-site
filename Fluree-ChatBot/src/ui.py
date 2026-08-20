"""
Small shared Streamlit UI helpers used by more than one page.
"""

import streamlit as st

# Streamlit auto-generates a page-switcher list in the sidebar from the
# pages/ folder (the "app" / "Admin" links). That's meant for end users to
# browse a multipage app themselves, but this embedded chatbot is reached
# entirely through links FlureeSense already controls — showing Streamlit's
# own page-switcher on top of that is confusing chrome, not navigation
# anyone here needs.
#
# This hides it via its stable data-testid rather than migrating to
# st.navigation(position="hidden"): that API requires every page to give up
# its own st.set_page_config()/st.logo() calls in favor of one central
# router, which isn't worth the churn just to hide a sidebar list. Direct
# URLs to a page (e.g. .../Admin) keep working either way — this only hides
# the visual list, not the routing.
_HIDE_PAGE_NAV_CSS = """
<style>
[data-testid="stSidebarNav"] { display: none; }
</style>
"""


def hide_page_nav():
    """Call once per page, after st.logo(), to hide Streamlit's built-in page-switcher list from the sidebar."""
    st.markdown(_HIDE_PAGE_NAV_CSS, unsafe_allow_html=True)
