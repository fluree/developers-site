"""
Azure DevOps work items via Microsoft's official MCP server
(microsoft/azure-devops-mcp, npm package @azure-devops/mcp).

This backend acts as an MCP *client*: each call spawns the server as a
stdio subprocess (`npx -y @azure-devops/mcp <org> --authentication pat
-d work-items`), authenticates with a Personal Access Token, calls one
tool, and tears the process down. That's a simpler, more robust bridge
from Streamlit's synchronous rerun model into MCP's async one than
keeping a persistent session alive across reruns — at the cost of
~1-3s of subprocess/handshake overhead per call. Given every chat
question checks Azure DevOps (not just ones that look work-item-related),
that overhead applies to every question.

Tool names and parameters (wit_work_item / wit_query, both dispatched via
an "action" parameter) were confirmed against a live connection's
input_schema, not just the docs — the docs alone got the wiql parameter
name wrong (it's "wiql", not "query"). Both tools also require an
explicit "project" argument: without one, the server tries to interactively
elicit a project selection, which a plain ClientSession can't respond to
and just fails with "Client does not support form elicitation." Set
AZURE_DEVOPS_PROJECT in .env to avoid that.

Never raises out to callers — every public function catches its own
errors and returns an empty result, so a misconfigured or unreachable
Azure DevOps never breaks the docs-only chat experience.
"""

import asyncio
import base64
import re
import sys

from config.settings import AZURE_DEVOPS_EMAIL, AZURE_DEVOPS_ORG, AZURE_DEVOPS_PAT, AZURE_DEVOPS_PROJECT

# A specific ID reference, as opposed to a free-text search — e.g. "#1234",
# "bug 1234", "ticket status 20315", "19809 status". The trigger word and
# the number don't have to be adjacent ("ticket status 20315" has "status"
# between them) — first version required adjacency and silently missed
# that phrasing, falling through to a free-text WIQL search that
# (correctly) found nothing. So: any trigger word anywhere in the
# question, plus any standalone 2-6 digit number anywhere, is treated as
# an ID reference; "#1234" alone is also enough without a trigger word.
#
# "status" (and similar generic inquiry words) are trigger words too —
# confirmed live: "19809 status" has no "ticket"/"bug"/etc., so it fell
# through to a free-text search requiring the literal string "19809" to
# appear IN a title/description, which a work item's own ID essentially
# never does — that search was always going to find nothing, regardless
# of whether 19809 was a real ID.
_TRIGGER_WORD_RE = re.compile(
    r"\b(?:ticket|issue|bug|task|story|work[ -]?item|wi|id|status|details?|update)\b",
    re.IGNORECASE,
)
_STANDALONE_NUMBER_RE = re.compile(r"\b(\d{2,6})\b")
_HASH_ID_RE = re.compile(r"#(\d{2,6})")


def is_configured():
    return bool(AZURE_DEVOPS_ORG and AZURE_DEVOPS_EMAIL and AZURE_DEVOPS_PAT)


def _encoded_pat():
    return base64.b64encode(f"{AZURE_DEVOPS_EMAIL}:{AZURE_DEVOPS_PAT}".encode()).decode()


def _server_params():
    from mcp import StdioServerParameters

    return StdioServerParameters(
        command="npx",
        args=["-y", "@azure-devops/mcp", AZURE_DEVOPS_ORG, "--authentication", "pat", "-d", "work-items"],
        env={"PERSONAL_ACCESS_TOKEN": _encoded_pat()},
    )


async def _with_session(fn):
    """Open a stdio connection to the MCP server, run `fn(session)`, then tear it down."""
    from mcp import ClientSession
    from mcp.client.stdio import stdio_client

    async with stdio_client(_server_params()) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            return await fn(session)


def list_tools():
    """Sync wrapper — for debugging/verifying the server connects and enumerating its real tool names."""
    return asyncio.run(_with_session(lambda session: session.list_tools()))


def _escape_wiql_string(text):
    return text.replace("'", "''")


# A whole chat question ("How to create Dataset give me detailed
# explanation and related bugs") used verbatim as a single CONTAINS phrase
# is both unlikely to literally match any real title/description AND
# apparently expensive enough to time out server-side (confirmed live:
# "VS402335: The timeout period (30 seconds) elapsed"). Filtering down to
# the handful of meaningful words is cheaper and actually matches things.
#
# Also drop "bug"/"issue"/"ticket"/etc. themselves as keywords — those are
# ASK-INTENT words ("tell me about related bugs"), not content to search
# for, and including them as an OR term let anything vaguely bug-tracker-ish
# match. Confirmed live: a query for "create dataset ... bugs" returned a
# Keycloak-groups bug and a business-rule bug that have nothing to do with
# dataset creation — they just happened to contain "create" or "bug"
# somewhere. Real fix below is requiring ALL keywords to match (AND across
# keywords, each keyword OR'd between title/description) instead of ANY.
_STOPWORDS = frozenset(
    """a an the is are was were be been being how to do does did i me my
    you your what when where why which who whom this that give get tell
    show explain detailed detail explanation and or of for with about on
    in related please can could would should will bug bugs issue issues
    ticket tickets item items work""".split()
)


def _extract_keywords(text, max_keywords=6):
    words = re.findall(r"[A-Za-z0-9]+", text.lower())
    seen = set()
    keywords = []
    for w in words:
        if len(w) > 2 and w not in _STOPWORDS and w not in seen:
            seen.add(w)
            keywords.append(w)
    return keywords[:max_keywords]


def _keyword_clause(keyword):
    return f"([System.Title] CONTAINS '{_escape_wiql_string(keyword)}' OR [System.Description] CONTAINS '{_escape_wiql_string(keyword)}')"


def _build_wiql(query_text):
    from itertools import combinations

    keywords = _extract_keywords(query_text) or [query_text.strip()]
    # Requiring every keyword (pure AND) is too strict — one typo or
    # unusually specific word (confirmed live: "explation", a typo for
    # "explanation") kills the whole query to zero results even though
    # "create"+"dataset" alone would've matched real bugs. Requiring any
    # one keyword (pure OR) is too loose — confirmed live, that's what let
    # a Keycloak bug through for a dataset-creation question just because
    # it also contained "create" somewhere. Middle ground: match if at
    # least 2 of the keywords are both present (tolerates one noisy word).
    if len(keywords) <= 2:
        keyword_where = " AND ".join(_keyword_clause(k) for k in keywords)
    else:
        pairs = combinations(keywords, 2)
        keyword_where = " OR ".join(f"({_keyword_clause(a)} AND {_keyword_clause(b)})" for a, b in pairs)

    clauses = [f"({keyword_where})"]
    if AZURE_DEVOPS_PROJECT:
        clauses.insert(0, f"[System.TeamProject] = '{_escape_wiql_string(AZURE_DEVOPS_PROJECT)}'")
    where = " AND ".join(clauses)
    return (
        "SELECT [System.Id], [System.Title], [System.State], [System.WorkItemType] "
        f"FROM WorkItems WHERE {where} ORDER BY [System.ChangedDate] DESC"
    )


def _extract_work_item_id(query_text):
    hash_match = _HASH_ID_RE.search(query_text)
    if hash_match:
        return int(hash_match.group(1))
    if _TRIGGER_WORD_RE.search(query_text):
        number_match = _STANDALONE_NUMBER_RE.search(query_text)
        if number_match:
            return int(number_match.group(1))
    return None


def _parse_tool_result(result):
    """
    MCP tool results carry their payload as a list of content blocks, and
    a separate is_error flag for tool-level failures (e.g. a WIQL query
    timing out server-side) that AREN'T raised Python exceptions — they
    still come back as a normal-looking result with real text in it, just
    with is_error=True. Skipping that check once meant a literal Azure
    DevOps error message ("Error executing WIQL query: VS402335: The
    timeout period...") got treated as real content and handed to the
    LLM, which then reported the error text back to the user as if it
    were a genuine "known issue."
    """
    if getattr(result, "is_error", False):
        texts = [getattr(b, "text", "") for b in getattr(result, "content", []) or []]
        print(f"[azure_devops] tool call returned an error: {' '.join(t for t in texts if t)}")
        return ""
    texts = []
    for block in getattr(result, "content", []) or []:
        text = getattr(block, "text", None)
        if text:
            texts.append(text)
    return "\n".join(texts)


def _with_project(**kwargs):
    """Include "project" only when configured — an empty/missing value still triggers the server's interactive elicitation prompt, which this client can't answer."""
    if AZURE_DEVOPS_PROJECT:
        kwargs["project"] = AZURE_DEVOPS_PROJECT
    return kwargs


# The WIQL "wiql" action only returns bare {id, url} pairs, not the actual
# field values — Azure DevOps' query API has always worked that way (get
# matching IDs, then a separate batch fetch for details). Wrapped by the
# server in an untrusted-content marker (real prompt-injection defense,
# since work item text is user-generated): "<<hash>> [UNTRUSTED ...] <<hash>>
# ... json ... <</hash>>". Strip that to parse the JSON underneath.
_OPEN_MARKER_RE = re.compile(r"\A<<[0-9a-f]+>>\s*\[UNTRUSTED[^\]]*\]\s*<<[0-9a-f]+>>\s*", re.IGNORECASE)
_CLOSE_MARKER_RE = re.compile(r"\s*<</[0-9a-f]+>>\s*\Z")


def _strip_untrusted_wrapper(text):
    return _CLOSE_MARKER_RE.sub("", _OPEN_MARKER_RE.sub("", text, count=1), count=1).strip()


def _extract_ids_from_wiql_result(raw_text):
    import json

    try:
        data = json.loads(_strip_untrusted_wrapper(raw_text))
    except (ValueError, TypeError):
        return []
    return [item["id"] for item in data.get("workItems", []) if "id" in item]


def _get_work_items_batch(ids):
    """Fetch title/state/type for a list of work item IDs (e.g. the bare IDs a WIQL query returns)."""
    args = _with_project(action="get_batch", ids=ids, fields=["System.Id", "System.Title", "System.State", "System.WorkItemType"])
    result = asyncio.run(_with_session(lambda session: session.call_tool("wit_work_item", args)))
    return _parse_tool_result(result)


def get_work_item(work_item_id):
    """Fetch a single work item by ID. Returns a plain-text summary, or "" on any failure."""
    if not is_configured():
        return ""
    try:
        args = _with_project(action="get", id=work_item_id)
        result = asyncio.run(_with_session(lambda session: session.call_tool("wit_work_item", args)))
        return _parse_tool_result(result)
    except Exception as e:
        print(f"[azure_devops] get_work_item({work_item_id}) failed: {e}")
        return ""


def search_work_items(query_text, top=5):
    """
    Free-text search over work items via an ad-hoc WIQL query, enriched
    with a follow-up batch fetch so the result actually has titles/states
    in it (see _get_work_items_batch). Returns a plain-text summary, or
    "" on any failure or zero matches.
    """
    if not is_configured():
        return ""
    try:
        wiql = _build_wiql(query_text)
        args = _with_project(action="wiql", wiql=wiql, top=top)
        result = asyncio.run(_with_session(lambda session: session.call_tool("wit_query", args)))
        raw = _parse_tool_result(result)
        if not raw:
            return ""
        ids = _extract_ids_from_wiql_result(raw)
        if not ids:
            return ""
        return _get_work_items_batch(ids[:top])
    except Exception as e:
        print(f"[azure_devops] search_work_items({query_text!r}) failed: {e}")
        return ""


def lookup_for_query(user_query, top=5):
    """
    Entry point for src/rag.py: given a chat question, return whatever
    Azure DevOps context is relevant — a specific work item if the
    question references one by ID, otherwise a free-text search. Always
    safe to call even when unconfigured (returns "").
    """
    if not is_configured():
        return ""
    work_item_id = _extract_work_item_id(user_query)
    if work_item_id:
        return get_work_item(work_item_id)
    return search_work_items(user_query, top=top)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    if not is_configured():
        print(
            "Not configured — set AZURE_DEVOPS_ORG, AZURE_DEVOPS_EMAIL, and "
            "AZURE_DEVOPS_PAT in .env first (AZURE_DEVOPS_PROJECT is optional)."
        )
        sys.exit(1)

    print(f"Connecting to Azure DevOps org '{AZURE_DEVOPS_ORG}'...\n")
    tools = list_tools()
    print("Tools exposed by the server:")
    for tool in tools.tools:
        print(f"  {tool.name}: {tool.description}")

    print(f"\n{'=' * 80}\nTest search: 'login bug'\n{'=' * 80}")
    print(search_work_items("login bug") or "(no results / call failed — see error above)")
