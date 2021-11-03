export default { 
    "1": [  "((̲̅ ̲̅(̲̅C̲̅r̲̅a̲̅y̲̅o̲̅l̲̲̅̅a̲̅( ̲̅((>", "No challenge here!",
    "Click Next to keep going!", "You rock!"],
    "2": [
        {
         "_id": "_collection",
         "name": "vote"
        },
        {
         "_id": "_collection",
         "name": "change"
        },
        {
         "_id": "_predicate",
         "name": "vote/name",
         "type": "string",
         "unique": true
        },
         {
         "_id": "_predicate",
         "name": "vote/noVotes",
         "type": "ref",
         "multi": true,
         "restrictCollection": "_auth"
        },
        {
         "_id": "_predicate",
         "name": "vote/yesVotes",
         "type": "ref",
         "multi": true,
         "restrictCollection": "_auth"
        },
        {
         "_id": "_predicate",
         "name": "change/name",
         "type": "string",
         "index": true,
         "unique": true
        },
        {
         "_id": "_predicate",
         "name": "change/subject",
         "type": "ref",
         "index": true,
         "doc": "A reference to the subject for the proposed change"
        },
        {
         "_id": "_predicate",
         "name": "change/predicate",
         "type": "ref",
         "index": true,
         "restrictCollection": "_predicate",
         "doc": "A reference to the predicate where the change is being proposed"
        },
        {
         "_id": "_predicate",
         "name": "change/doc",
         "doc": "Description of the proposed change",
         "type": "string"
        },
        {
         "_id": "_predicate",
         "name": "change/vote",
         "type": "ref",
         "unique": true
        },
        {
         "_id": "_predicate",
         "name": "change/object",
         "doc": "The proposed new object for the change. Can only be a string",
         "type": "string",
         "index": true
        }
       ],
    "3": [{
        "_id": "_user$1",
        "username": "losDelRio",
        "auth": ["_auth$1"]
    },
    {
        "_id": "_user$2",
        "username": "softCell",
        "auth": ["_auth$2"]
    },
    {
        "_id": "_user$3",
        "username": "dexysMidnightRunners",
        "auth": ["_auth$3"]
    },
    {
        "_id": "_user$4",
        "username": "rightSaidFred",
        "auth": ["_auth$4"]
    },
    {
        "_id": "_user$5",
        "username": "toniBasil",
        "auth": ["_auth$5"]
    },
    {
        "_id": "_auth$1",
        "id": "auth1",
        "doc": "Basic auth records",
        "roles": ["_role$voter"]
    },
    {
        "_id": "_auth$2",
        "id": "auth2",
        "doc": "Basic auth records",
        "roles": ["_role$voter"]
    },
    {
        "_id": "_auth$3",
        "id": "auth3",
        "doc": "Basic auth records",
        "roles": ["_role$voter"]
    },
    {
        "_id": "_auth$4",
        "id": "auth4",
        "doc": "Basic auth records",
        "roles": ["_role$voter"]
    },
    {
        "_id": "_auth$5",
        "id": "auth5",
        "doc": "Basic auth record",
        "roles": ["_role$voter"]
    },
    {
        "_id": "_role$voter",
        "id": "voter",
        "doc": "A voter can view and edit changes, votes, and users. They cannot edit, auth records."
    }],
    "4": [{
        "_id": "_rule$editVotes",
        "fns": [["_fn/name", "true"]],
        "id": "editVotes",
        "collection": "vote",
        "collectionDefault": true,
        "ops": ["transact", "query"]
    },
    {
        "_id": "_rule$editChanges",
        "fns": [["_fn/name", "true"]],
        "id": "editChanges",
        "collection": "vote",
        "collectionDefault": true,
        "ops": ["transact", "query"]
    },
    {
        "_id": "_rule$viewUsers",
        "fns": [["_fn/name", "true"]],
        "id": "viewUsers",
        "collection": "_user",
        "collectionDefault": true,
        "ops": ["query"]
    },
    {
        "_id": "_rule$viewAuth",
        "fns": [["_fn/name", "true"]],
        "id": "viewAuth",
        "collection": "_auth",
        "collectionDefault": true,
        "ops": ["query"]
    }],
    "5": [[{
        "_id": "_rule$editOwnUser",
        "fns": ["_fn$editOwnUser"],
        "id": "editOwnUser",
        "collection": "_user",
        "collectionDefault": true,
        "ops": ["transact"]
    },
    {
        "_id": "_fn$editOwnUser",
        "name": "editOwnUser",
        "code": "(contains? (get-all (query (str \"{\\\"select\\\": [{\\\"_user/_auth\\\": [\\\"_id\\\"]}], \\\"from\\\": \" (?auth_id) \"}\")) [\"_user/_auth\" \"_id\"]) (?sid))"
    }], "If users can create new auth records, then they can artificially inflate votes"],
    "6": ["We need to make sure that users can only add their own auth records to the vote. There are other smart functions you might want to add, but this one is the most critical."],
    "7": "(== (?o) (?auth_id))",
    "8": "There's nothing stopping Soft Cell from changing their username without a vote!",
    "9": "(str \"[[\\\"?change\\\", \\\"change/subject\\\", \" (?sid) \"],[\\\"?change\\\", \\\"change/predicate\\\", \" (?pid) \"],[\\\"?change\\\", \\\"change/object\\\", \\\"\" (?o) \"\\\"], [\\\"?change\\\", \\\"change/vote\\\", \\\"?vote\\\"]]\")",
    "10": "(query (str \"{\\\"select\\\": {\\\"?vote\\\": [\\\"*\\\"] }, \\\"where\\\":\" (voteWhere) \"}\"))",
    "11": [{
        "_id": "_fn",
        "name": "yesVotes",
        "code": "(get-all (nth (vote) 0) [\"vote/yesVotes\" \"_id\"] )"
    }],
    "12": ["Some solutions", "(addAndDivide 100 20 4)", "(addAndDivide 28 2 1)"],
    "13": [{
        "_id": "_fn",
        "name": "minWinPercentage",
        "params": [ "percentage" ],
        "code": "(> (/ (count (yesVotes)) (+ (count (yesVotes)) (count (noVotes)))) percentage)"
    },{
        "_id": "_fn", 
        "name": "minVotes",
        "params": ["n"],
        "code": "(> (+ (count (yesVotes))  (count (noVotes))))"
    }],
    "14": "(and (minVotes 2) (minWinPercentage 0.5))",
    "15": ["٩(̾●̮̮̃̾•̃̾)۶", "You're all done!", "Celebrate!"]
}

                    