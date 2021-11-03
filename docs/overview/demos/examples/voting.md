# Voting

This example outlines how users can vote on proposed changes to the ledger. At the
end of the example, user will be able to propose changes, vote on those changes,
and create various voting threshholds (minimum votes and minimum win percentage)
for different predicates. There are various ways to enable a rule governance scheme,
but this is one simple way.

In our hypothetical example, let's say we've had a network that has been humming
along quite smoothly, except that a few rogue users have adopted offensive usernames.
Rather than relying on central authority to interpret and enforce community standards,
we can create a voting mechanism for whenever a user wants to change their username.
In practice, you might want to add rules that prevent users from using certain words
in their usernames in the first-place, or initiate a voting process only after a
complaint. As previously stated, this is a example is a backbone that can be built
upon for real-life applications.

Currently, all the code is written in FlureeQL exclusively.

## Schema {#schema}

We will need two additional collections, `vote` and `change` for our example.

The `vote` collection will have a `vote/name`, `vote/yesVotes`, and `vote/noVotes`.
The yes and no votes predicates are multi, ref-type predicates that will hold all
of the auth records that voted yes or no, respectively, on the proposed change.

FlureeQL:

```json
[
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
 }
]
```

The `change` collection holds the actual details for the proposed change. It has
the following predicates, `change/name`, `change/subject`, `change/predicate`,
`change/doc`, `change/vote`, and `change/object`.

`change/subject` is a reference to subject on which we are proposing a change. For
example, if we had a collection, group, we could propose a change on a particular
`group` subject. If we wanted to vote on the leader of that group, `change/predicate`
would reference the `group/leader` predicate, and `change/object` would be the proposed
value, for instance, `John Doe`.

FlureeQL

```json
[{
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
]
```

Subjects in the `change` collection contains all the details about the change that
is proposed, as well as a reference to the relevant vote. You'll notice that the
object of the proposed change can only be a string. This is to simplify this example,
but in a real application, you might want to be able to vote on changes with other
types of objects as well.

### Adding Sample Data {#adding-sample-data}

First, we'll create a new predicate, `_auth/descId` (short for descriptive id),
which will help us easily identify auth records.

```json
[{
  "_id": "_predicate",
  "name": "_auth/descId",
  "type": "string",
  "unique": true
}]
```

Before doing any additional work on schema, such as adding smart functions and rules,
we should add in sample data. We are going to create 5 users, connect those records
to 5 new auth records, and connect those auth records to a role, `voter` (which doesn't
have any rules connected to it yet!).

We've generated 5 public-private key and `_auth/id` pairs for each of the users.
You can use the ones that we've generated or
[generate your own](concepts/identity/auth_records.md#auth-role-rule-structure).
Note that, in production, you will definitely want to generate your own.

Public/Private Key and Account Id (`_auth/id`) for `_auth$losDelRio`.

```all
Private: 327d945d99d2e942adfa531f10e672bdb7659751afdb40de2c9f34bf78b1e9
Public: 0228f38b3bc765abb4359b225b77de08c7a2ac3d2c5c4188fdb92b5068f79173e1
Account id: TfFSDSb61p6oqJkKPXk9XPaQS7PdH7xvHup
```

Public/Private Key and Account Id (`_auth/id`) for `_auth$softCell`.

```all
Private: 4b288665f5e5f9b1078d3c54f916a86433557fbc16ffcb8de827104739c84ed4
Public: 03aa3595daa834eefc3b0f8c121c94a7b5a3cb01e8568a8652d7c73ed73710d1c1
Account id: TfHzKHsTdXVhbjskqesPTi6ZqwXHghFb1yK
```

Public/Private Key and Account Id (`_auth/id`) for `_auth$dexysMidnightRunners`.

```all
Private: 46e37823bfe73ac2b5e440238cb2b65a1cb4115721f23202e543c454faab8449
Public: 02218aaeac6df98dfde22b84335d362e2c6b858cbdf3176b12de16f5400f0cfa01
Account id: TfFoQ4yB3vFn3th7Vce36Cb45fDau255GdH
```

Public/Private Key and Account Id (`_auth/id`) for `_auth$rightSaidFred`.

```all
Private: afa6b042a342845c3bf4ea5fd2690d8548d5169fd18d18081ac8ac9093c2e43c
Public: 035d50a5921d905769258e069315e54896cf30b44dbb4be37708a1be9a84c199c0
Account id: TfBvBxdxcXNrDQY8aNcYmoUuA2TC1CTiWAK
```

Public/Private Key and Account Id (`_auth/id`) for `_auth$toniBasil`.

```all
Private: 8df78c97264ce67261143b57faec1528b0941dd4f26f8712491312913e7521c0
Public: 03198c829bc66e98bd7fdd9533766c2ac1053e36181025453a55d69520be10c28b
Account id: Tf31KGiwsqnw1TWTWPspxi3AoHTCA1wJNaE
```

FlureeQL:

```json
[{
    "_id": "_user$losDelRio",
    "username": "losDelRio",
    "auth": ["_auth$losDelRio"]
},
{
    "_id": "_user$softCell",
    "username": "softCell",
    "auth": ["_auth$softCell"]
},
{
    "_id": "_user$dexysMidnightRunners",
    "username": "dexysMidnightRunners",
    "auth": ["_auth$dexysMidnightRunners"]
},
{
    "_id": "_user$rightSaidFred",
    "username": "rightSaidFred",
    "auth": ["_auth$rightSaidFred"]
},
{
    "_id": "_user$toniBasil",
    "username": "toniBasil",
    "auth": ["_auth$toniBasil"]
},
{
    "_id": "_auth$losDelRio",
    "id": "TfFSDSb61p6oqJkKPXk9XPaQS7PdH7xvHup",
    "descId": "losDelRioAuth",
    "doc": "losDelRio's auth record",
    "roles": ["_role$voter"]
},
{
    "_id": "_auth$softCell",
    "id": "TfHzKHsTdXVhbjskqesPTi6ZqwXHghFb1yK",
    "descId": "softCellAuth",
    "doc": "softCell's auth record",
    "roles": ["_role$voter"]
},
{
    "_id": "_auth$dexysMidnightRunners",
    "id": "TfFoQ4yB3vFn3th7Vce36Cb45fDau255GdH",
    "descId": "dexysMidnightRunnersAuth",
    "doc": "dexysMidnightRunners' auth record",
    "roles": ["_role$voter"]
},
{
    "_id": "_auth$rightSaidFred",
    "id": "TfBvBxdxcXNrDQY8aNcYmoUuA2TC1CTiWAK",
    "descId": "rightSaidFredAuth",
    "doc": "rightSaidFred's auth record",
    "roles": ["_role$voter"]
},
{
    "_id": "_auth$toniBasil",
    "id": "Tf31KGiwsqnw1TWTWPspxi3AoHTCA1wJNaE",
    "descId": "toniBasilAuth",
    "doc": "toniBasil auth record",
    "roles": ["_role$voter"]
},
{
    "_id": "_role$voter",
    "id": "voter",
    "doc": "A voter can view and edit changes, votes, and users. 
        They cannot edit auth records."
}]
```

### Adding Permissions {#adding-permissions}

Before building out our smart functions (`_fn`), we will add permissions to our
network. For example, we want to ensure that users can't freely add new auth records,
otherwise they'd be able add new auth records and artificially inflate a vote. We
do want to make sure that users have access to the `vote` and `change` collections.

All of the permissions transactions can be added at once, but we break them up here
for clarity.

First, we add four rules that will allow users to transact and view votes and changes.
The rules only allow users to view, but not edit, auth records and users.

FlureeQL:

```json
[{
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
    "collection": "change",
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
}]
```

FlureeQL:

```json
[{
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
    "code": "(contains? (get-all (query (str \"{\\\"select\\\": [{\\\"_user/_auth\\\":
    [\\\"_id\\\"]}], \\\"from\\\": \" (?auth_id) \"}\")) [\"_user/_auth\" \"_id\"])
    (?sid))"
}]
```

We've now added all of the rules we need, so we can add those rules to the `voter`
role that we created previously:

FlureeQL:

```json
[{
    "_id": ["_role/id", "voter"],
    "rules": [["_rule/id", "editChanges"], ["_rule/id", "editVotes"], ["_rule/id",
    "editOwnUser"],
    ["_rule/id", "viewUsers"],["_rule/id", "viewAuth"]]
}]
```

### Preventing Voter Fraud {#preventing-voter-fraud}

The `vote/yesVotes` and `vote/noVotes` predicates hold all of the auth records that
voted for or against a proposed change. We can add a spec to both of these predicates,
which ensures that users only cast votes with their own auth records.

The rule, `(== (?o) (?auth_id))` checks whether the object being added to the vote,
`?o`, belongs to the auth record of the user placing the vote.

FlureeQL:

```json
[
    {
        "_id": "_fn$ownAuth",
        "_fn/name": "ownAuth?",
        "_fn/code": "(== (?o) (?auth_id))"
    },
    {
        "_id": ["_predicate/name", "vote/yesVotes"],
        "spec": ["_fn$ownAuth"]
    },
    {
        "_id": ["_predicate/name", "vote/noVotes"],
        "spec": ["_fn$ownAuth"]
    }
]
```

When working this into a real-life application, you may also add a rule that a user
can't change their vote after a certain time (by adding a `vote/expiration` predicate),
or can only vote yes OR no. For simplicity's sake, we won't be doing this here.

### Proposing a Change {#proposing-a-change}

Now that we've done our part to prevent voter fraud, we can propose a change.
`["_user/username", "softCell"]` wants to change their username to "hardCell", so
they propose a change, and create a vote.

When we submit a transaction without a signature, it is signed with the default auth
record. However, in order to use `softCell`'s auth, we need to sign our transactions
with their auth record. We do this by submitting a request to the [`/command` endpoint](/reference/http/examples.md).

We can also use a tool in the user interface to sign transactions as a particular
private key. To access this tool, we need to go to `/flureeql`, select "Transact",
and then select "Own Private Key" from the dropdown.

If using the user interface, you need to include the private key in the form. If
you're not using the user interface, you will need to sign the following transaction
with the private key. You will also need to specify softCell's auth in either the
form or the [signed transaction](/concepts/identity/signatures.md#signed-transactions).

A request to `/command` will return a `_tx/id`. The `_tx/id` is the unique
SHA2-256 of the 'cmd' submitted to the `/command` endpoint. In order to see if the
transaction went through successfully, you will need to query:

```json
{
  "select": ["*"],
  "from": ["_tx/id", TRANSACTION ID HERE ]
}
```

If there is an error in the transaction, that will appear in `_tx/error`. If the
transaction was submitted successfully, there will not be a `_tx/error`.

If you are using the user interface, the "Results" editor will automatically show
you the results of issuing the above query after submitting a command (unless the
auth record you are using cannot view subjects in the `_tx` collection).

Soft Cell also adds their auth record to the `vote/yesVotes` predicate.

FlureeQL:

```all
Private Key: 4b288665f5e5f9b1078d3c54f916a86433557fbc16ffcb8de827104739c84ed4
Auth id: TfHzKHsTdXVhbjskqesPTi6ZqwXHghFb1yK
```

```json
[{
    "_id": "change",
    "name": "softCellNameChange",
    "doc": "It's time for a change!",
    "subject": ["_user/username", "softCell"],
    "predicate": ["_predicate/name", "_user/username"],
    "object": "hardCell",
    "vote": "vote$softCell"
},
{
    "_id": "vote$softCell",
    "name": "softCellNameVote",
    "yesVotes": [["_auth/id", "TfHzKHsTdXVhbjskqesPTi6ZqwXHghFb1yK"]]
}]
```

### Building Our Smart Functions {#building-our-smart-functions}

Currently, there is nothing stopping Soft Cell from issuing a transaction to change
their `_user/username` from `softCell` to `hardCell`. In order to prevent users
from editing their usernames without a vote, we need to create a set of smart
functions ([ledger functions](#ledger-functions-1)) that we can add to the `_user/username`
predicate specification.

We can see all the votes related to that subject with a single query.

FlureeQL:

```json
{
    "select": {"?change": ["*", {"change/vote": ["*"]}]},
    "where": [["?change", "change/subject", "?subject"],
    ["?subject", "_user/username", "softCell"]]
}
```

The above query returns _every_ change that might have been proposed for
`["change/name", "softCellNameChange"]`, including changes to other predicates,
such as Soft Cell's `_user/auth` or their `_user/roles`. It also might return other
changes proposed for their `_user/username` other than `hardCell`.

We want to make sure that we are only looking at votes for a given subject that
also pertain to the proper predicate and the relevant object. In order to do this,
we need add that `change/predicate` is `["_predicate/name", "_user/username"]` and
`change/object` is `hardCell`.

FlureeQL:

```json
{
    "select": {"?vote": ["*"]},
    "where": [["?change", "change/subject", "?subject"],
    ["?subject", "_user/username", "softCell"],
    ["?change", "change/predicate", "?predicate"],
    ["?predicate", "_predicate/name", "_user/username"],
    ["?change", "change/object", "hardCell"],
    ["?change", "change/vote", "?vote"]]
}
```

Sample result in FlureeQL:

```json
[
  {
    "vote/name": "softCellNameVote",
    "vote/yesVotes": [
      {
        "_id": 105553116267497
      }
    ],
    "_id": 351843720888321
  }
]
```

The first two functions we will create build and issue the above query. We will
then use these functions to count votes, and eventually decide whether or not changes
should be approved.

If, at this point, you cannot understand how these functions fit into the larger
applications, do not worry, we will see the entire voting mechanism working in short
order. At this point, the most important part is to try and understand the syntax
of the individual smart functions.

The function, `voteWhere` constructs the where clause using the `str` function,
which concatenates all strings in a given array (all available ledger or smart functions
are detailed in [ledger functions](#ledger-functions-1)).

When we are editing a given subject's predicate in a transaction, we have access
to the value we are attempting to input `(?o)`, the id of the subject we are editing
`(?sid)`, and the id of the predicate we are editing `(?pid)`, which is all of the
information we need in order to compose our where clause.

Without escaped quotation marks, our where clause will be:

```json
[
    ["?change", "change/subject", (?sid)],
    ["?change", "change/predicate", (?pid)],
    ["?change", "change/object", (?o)],
    ["?change", "change/vote", "?vote"]
]
```

FlureeQL:

```json
[{
    "_id": "_fn",
    "name": "voteWhere",
    "code": "(str \"[[\\\"?change\\\", \\\"change/subject\\\", \" (?sid) \"],
    [\\\"?change\\\", \\\"change/predicate\\\", \" (?pid) \"],[\\\"?change\\\", 
    \\\"change/object\\\", \\\"\" (?o) \"\\\"], [\\\"?change\\\", \\\"change/vote\\\",
     \\\"?vote\\\"]]\")"
}]
```

One of the most useful features of smart functions is that we can put them together.
The second function we create issues a query using the `query` smart function. The
`query` function takes a string of the query.

The query in our smart function resolves to:

```json
{
    "select": {"?vote": ["*"]},
    "where": [["?change", "change/subject", (?sid)],
    ["?change", "change/predicate", (?pid)],
    ["?change", "change/object", (?o)],
    ["?change", "change/vote", "?vote"]]
}
```

FlureeQL:

```json
[{
        "_id": "_fn",
        "name": "vote",
        "code": "(query (str \"{\\\"select\\\": {\\\"?vote\\\": [\\\"*\\\"] }, 
        \\\"where\\\":\" (voteWhere) \"}\"))"
}]
```

Using the `(vote)` function, we can access the `vote/yesVotes` and `vote/noVotes`.
We first need to use `(nth (vote) 0)` to get the first result in the array.

Then, we can use the `get-all` function, and we specify path that we want to follow
in order to get the `vote/noVotes` and `vote/yesVotes` (`["vote/noVotes" \"_id\"]`
and `["vote/yesVotes" \"_id\"]`, respectively)`.

FlureeQL:

```json
[{
    "_id": "_fn",
    "name": "noVotes",
    "code": "(get-all (nth (vote) 0) [\"vote/noVotes\" \"_id\"] )"
},
{
    "_id": "_fn",
    "name": "yesVotes",
    "code": "(get-all (nth (vote) 0) [\"vote/yesVotes\" \"_id\"] )"
}]
```

We want to be able to set both a minimum win percentage, as well as a minimum number
of votes for each of our votes. For example, we might want to make every vote have
at least 10 yes and no vote, combined. In addition, in order for a vote to pass,
we could set a minimum threshhold of 50% or 60%.

First, we create a function, `minWinPercentage` that calculates whether the ratio
of yes votes to total votes is above a given percentage. Rather than hard-coding
a percentage, we use a `_fn/param`.

FlureeQL:

```json
[{
    "_id": "_fn",
    "name": "minWinPercentage",
    "params": [ "percentage" ],
    "code": "(> (/ (count (yesVotes)) (+ (count (yesVotes)) (count (noVotes)))) percentage)"
}]
```

Then, we create a function, `minVotes`, which checks whether the total number of
votes is above a given parameter, `n`.

FlureeQL:

```json
[{
    "_id": "_fn",
    "name": "minVotes",
    "params": ["n"],
    "code": "(> (+ (count (yesVotes))  (count (noVotes))) n)"
}]
```

Finally, we can create a function which checks whether a vote on a given subject,
on a given predicate, with the given value passes a certain threshhold of minimum
votes and a certain minimum win percentage. In this case, we create a 2 vote minimum
with a 0.50 minimum win percentage (note that in our `minWinPercentage` function,
we used the `>` sign, which indicates strictly greater than. Therefore, if there
are only two votes, one for no and one for yes, this particular vote won't pass.
Additionally, the percentage needs to be in decimal form with a leading 0).

FlureeQL:

```json
[{
    "_id": "_fn",
    "name": "2VotesMajority",
    "code": "(and (minVotes 2) (minWinPercentage 0.5))"
}]
```

### Adding the Username Spec {#adding-the-username-spec}

At this point we can add the function, `2VotesMajority` to the `_predicate/spec`
for `_user/username`. Now, every time a transaction contains a `_user/username`,
the `2VotesMajority` will run.

FlureeQL:

```json
[{
    "_id": ["_predicate/name", "_user/username"],
    "spec": [["_fn/name", "2VotesMajority"]]
}]
```

### Testing {#testing}

The only vote that we have so far is `softCell` voting for their own name change.
That means that if we attempt to change Soft Cell's username, it should fail. We
should sign this transaction as Soft Cell.

FlureeQL:

```all
Private Key: 4b288665f5e5f9b1078d3c54f916a86433557fbc16ffcb8de827104739c84ed4
Auth id: TfHzKHsTdXVhbjskqesPTi6ZqwXHghFb1yK
```

```json
[{
    "_id": ["_user/username", "softCell"],
    "username": "hardCell"
}]
```

Response:

```json
{
  "_tx/id": "6b9f5fe96564289e267bc5d1611c61021053e8de4e95f0777247239a8b9ca1cd",
  "_tx/auth": {
    "_id": 105553116267497
  },
  "_tx/nonce": 5,
  "_tx/error": "400 db/invalid-tx  Object hardCell does not conform to spec:
    (and (minVotes 2) (minWinPercentage 0.5))",
  "_id": -55
}
```

We would need at least two more yes votes in order to successfully make this change.
We can add two more votes for this name change.

FlureeQL:

```all
Private Key: 46e37823bfe73ac2b5e440238cb2b65a1cb4115721f23202e543c454faab8449
Auth id: TfFoQ4yB3vFn3th7Vce36Cb45fDau255GdH
```

```json
[{
    "_id": ["vote/name", "softCellNameVote"],
    "yesVotes": [["_auth/id", "TfFoQ4yB3vFn3th7Vce36Cb45fDau255GdH"]]
}]
```

The second transaction should be signed as a different auth record.

FlureeQL:

```all
Private Key: afa6b042a342845c3bf4ea5fd2690d8548d5169fd18d18081ac8ac9093c2e43c
Auth id: TfBvBxdxcXNrDQY8aNcYmoUuA2TC1CTiWAK
```

```json
[{
    "_id": ["vote/name", "softCellNameVote"],
    "yesVotes": [["_auth/id", "TfBvBxdxcXNrDQY8aNcYmoUuA2TC1CTiWAK"]]
}]
```

After adding more votes, the following transaction will pass. We should sign this
transaction as Soft Cell's auth record.

```all
Private Key: 4b288665f5e5f9b1078d3c54f916a86433557fbc16ffcb8de827104739c84ed4
Auth id: TfHzKHsTdXVhbjskqesPTi6ZqwXHghFb1yK
```

```json
[{
    "_id": ["_user/username", "softCell"],
    "username": "hardCell"
}]
```

We now have a fully operational voting system. If we want to add a voting requirement
to any other predicates, we would simply have to issue a transaction specifying a
new function (or re-using `2VotesMajority`), and adding that function to any `_predicate`.
For example, the below transaction would require at least 10 votes with more than
75% voting yes in order to change smart function code.

```json
[{
    "_id": "_fn$voteReqs",
    "name": "10Votes75%",
    "code": "(and (minVotes 10) (minWinPercentage 0.75))"
},
{
    "_id": ["_predicate/name", "_fn/code"],
    "spec": ["_fn$voteReqs"]
}]
```
