---
sidebar_position: 6
---

# Metadata

When a new block is added, that block may have many transactions. Each block has automatically generated metadata, as does each transaction. You can also add [custom metadata](overview/transact/basics.md#adding-custom-metadata).

## _block {#_block}

Key | Description
---|---
`number` | Block number for this block.
`hash` | Hash for current block. Not included in block hash (can't include itself!).
`prevHash` | Previous block's hash
`transactions` | Reference to transactions included in this block (`_tx`).
`ledgers` | Reference to transactor auth identities that signed this block. Not included in block hash.
`instant` | Instant this block was created, per the transactor.
`sigs` | List of transactor signatures that signed this block (signature of _block/hash). Not included in block hash.

## _tx {#_tx}

Key | Description
---|---
`tempids` | Tempid JSON map for this transaction.
`sig` | Signature of original JSON transaction command.
`tx` | Original JSON transaction command.
`doc` | Optional docstring for the transaction.
`altId` | Alternative Unique ID for the transaction that the user can supply. Transaction will throw if not unique.
`nonce` | A nonce that helps ensure identical transactions have unique txids, and also can be used for logic within smart functions (not yet implemented). Note this nonce does not enforce uniqueness, use _tx/altId if uniqueness must be enforced.
`authority` | If this transaction utilized an authority, reference to it.
`auth` | Reference to the auth id for this transaction.
