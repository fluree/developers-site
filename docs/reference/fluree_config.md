# Startup Config {#config-options}

The `fluree_sample.properties` contains all configurable properties, as well as short descriptions of the properties themselves. To change properties, you can edit the properties file, supply environment variables, or pass in Java property flags on start up.

Enviroment variables follow a standard format; the variable name is capitalized with `_` as separators:

```bash
FDB_API_PORT=8091
```

Java Property flags are passed in via the -D flag:

```bash
./fluree_start.sh -Dfdb-api-port=8091
```

Environment variables take precedence over both configuration options and Java property flags, in turn, take precedence over config options listed in the `fluree_sample.properties` file.

We have more in-depth documentation about a few configurations in the following explanatory pages:

- Running a [Transactor Group](/concepts/infrastructure/transactor_group.md)
- Running Fluree [In-Memory](/concepts/infrastructure/in_memory.md)
- [Consensus Algorithms](/concepts/infrastructure/consensus_algorithms.md)
- [Password Management](/concepts/identity/password_management.md)

## Base Settings {#base-settings}

Property | Options | Description
-- | -- | --
`fdb-mode` | `dev` `query` `ledger` | Dev runs a standalone version of Fluree, with a query engine and ledger running together. Currently only `dev` is supported. `query` and `ledger` are for running Fluree as a query engine or ledger, respectively.
`fdb-license-key` | `key` | (Optional) Required for enterprise version
`fdb-encryption-secret` | `key` | (Optional) Required for enterprise version
`fdb-json-bigdec-string` | `boolean` | BigDecimals are not currently handled out-of-the-box by JavaScript applications.  This setting determines whether or not to encode java.Math.BigDecimal values as strings for query results, etc.  The default is `true`.
`logback.configurationFile` | `file path` | Path to a `logback.xml` file. If it is in the current file, you need to specify `./logback.xml`. A sample `logback.xml` file is below. You can set the level of logging that you want to see (`INFO`, `DEBUG`, `TRACE`), as well as how frequently you want the your logback file scanned for updates. For more information, you can visit [the logback manual](https://logback.qos.ch/manual/index.html).

```xml
<configuration scan="true" scanPeriod="10 seconds">

    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%highlight(%-5level) %white(%logger{24}) - %msg%n</pattern>
        </encoder>
    </appender>

    <root level="DEBUG">
        <appender-ref ref="STDOUT"/>
    </root>

</configuration>
```

## Transactor Group Options {#transactor-group-options}

Property | Options | Description
-- | -- | --
`fdb-consensus-type` | `raft` or `in-memory` | Currently `raft` is the only option consensus type supported for transactor groups. See the [in-memory](/concepts/infrastructure/in_memory.md) guide on how to run Fluree in memory.
`fdb-join?` | `boolean` | (Optional) Set this to true if a server is attempting to dynamically join a network. Defaults to false. See the [transactor-group](/concepts/infrastructure/transactor_group.md) guide on how to run Fluree as a transactor group and dynamically change the network configuration.
`fdb-group-catch-up-rounds` | `int` | By default, set to 10. The number of rounds the tx group leader will wait for a new server to get caught up to the network, when dynamically joining a network. See the [transactor-group](/concepts/infrastructure/transactor_group.md) guide on how to run Fluree as a transactor group and dynamically change the network configuration.
`fdb-group-private-key` | `key` | (Optional) Main private key for ledger group. Will auto-generate if none provided. Must be a [valid private key](/concepts/identity/auth_records.md#generating_keys). This takes precedence over `fdb-group-private-key-file`.
`fdb-group-private-key-file` | `file path` | If fdb-group-private-key is not provided, we'll look for it in this file. If not found in this file, we'll generate a default one and place it in this file.
`fdb-group-servers` | `server-id@host:port, server-id@host:port` | List all servers participating in ledger-group with format of server-id@host:port. All tx-group servers should have this same config.
`fdb-group-this-server` | `server-id` | Specify which of the above listed server-ids is _this_ server. Note this must be unique for every server in the tx-group, and is likely easiest to supply this setting via environment variable.
`fdb-group-port`| `int` | (Optional) Only needed, if fdb-this-server is not set or or does not point to one of the group-servers. External port to listen on for ledger communication i.e. fdb-group-port=9795.
`fdb-group-timeout` | `int` | Tx group's internal communication timeout threshold. Will initiate a leader election between this value and 2x this value if the leader hasn't been heard from. Specify as number of milliseconds, or can use units as well such as 1000ms or 1s. Assuming your tx-group network is local, 1000-3000 ms is a good range. Adjust as needed to avoid unintended leader elections.
`fdb-group-heartbeat` | `int` | Tx group leader will send out a heartbeat at this interval. By default, will be 1/2 of fdb-group-timeout. This can never be more than fdb-group-timeout, and ideally should be 1/3 to 1/2 of that value. A number in milliseconds can be provided, or can be used with units such as 1000ms or 1s.
`fdb-group-log-directory` | `file path` | Where to store tx-group raft log files. These logs have fairly frequent disk access. This is always a local filesystem path and must start with either `/` or `./`. Defaults to ./data/group
`fdb-group-snapshot-threshold` | `int` | A snapshot of the current group state will be taken after this many new commits. Larger values mean larger log files, small values mean lots of snapshots which can be time consuming for large networks. Ideally somewhere in the range of 100 to 1000.
`fdb-group-log-history` | `int` | Number of historic tx-group raft logs to keep around. Can be as low as 1. Historic logs take up disk space but can be useful for debugging if something goes wrong. High transactional volume servers may want to retain extra logs as there will be more frequent rotation.
`fdb-storage-type` | `file`, `memory`, `s3` | Where to store index/block segments and raft snapshots. <br />_File_ - Replicated on-disk of every machine. <br />_Memory_ - stored in memory (useful for testing). Currently only supported for a single, centralized server. fdb-consensus-type must be set to 'in-memory' <br /> _s3_ - stored in an AWS S3 bucket; some things are still stored locally for fast access
`fdb-storage-file-directory` | `file path` | DEPRECATED: For file storage, specify directory to place ledger (blockchain) and db indexes. Use `fdb-storage-file-root` now instead.
`fdb-storage-file-root` | `file path` | For file storage-type only: The root directory to put relative storage paths in. Can be a relative path starting with "." or an absolute path starting with "/". Defaults to ./data.
`fdb-storage-s3-bucket` | `s3 bucket name` | For s3 storage-type only: Specify the AWS S3 bucket to store ledger (blockchain), db indexes, and raft snapshots. Make sure to specify the name of an S3 bucket you control, and that the database process has access to your credentials. See [AWS docs](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html).
`fdb-memory-cache` | `size` | Total memory cache of index segments across all ledgers. This setting can be changed per-ledger.
`fdb-memory-reindex` and `fdb-memory-reindex-max` | `size` | These settings apply per-ledger, make sure all ledgers and query peers have at least this much memory * number of ledgers you expect to be active on those servers. This setting must be consistent across the entire ledger group.
`fdb-stats-report-frequency` | `time` | How frequently to report out stats as a log entry in milliseconds, or can use shorthand like 2m for two minutes, 45s for 45 seconds.

## HTTP API Settings {#http-api-settings}

Property | Options | Description
-- | -- | --
`fdb-api-port` | `int` | Port in which the query peers will respond to API calls from clients
`fdb-open-api` | `boolean` | If fdb-open-api is true, will allow full access on above port for any request and will utilize default auth identity to regulate query/read permissions. If false, every request must be signed, and the auth id associated with the signature will determine query/read permissions.

## Decentralized Ledger Settings {#decentralized-ledger-settings}

Property | Options | Description
-- | -- | --
`fdb-ledger-private-keys` | `key@network/dbname,` `key@network/dbname` | List each auth identity private key at each network and/or ledger you are participating in. Format is private-key1@network/db,private-key2@network/db2 where the db is optional and multiple dbs or networks are separated by commas. If only a network is specified, the private key will be used as a default for all ledgers on that network and it is assumed this server is participating with every ledger, i.e. `fdb-ledger-private-keys=5...3@networka/dbname`
`fdb-ledger-servers` | `networka@some-domain.com:9795,` `networka@10.1.1.2:9795,` `networkb/db@ext.dot.com:9795` | List of seed servers to contact for each network/db. Like fdb-ledger-identities, the db is optional. Every network/db + server address combination should be separated by a comma, i.e. `fdb-ledger-servers=` `networka@domain.com:9795,` `networka@10.1.1.2:9795,networkb/` `db@ext.dot.com:9795`

## Password and JWT Token Settings {#password-and-jwt-token-settings}

Property | Options | Description
-- | -- | --
`fdb-pw-auth-enable` | `boolean` |This defaults to true, but will only work if there is a signing key for transactions.
`fdb-pw-auth-secret` | `string` | This secret is used to generate a HMAC signature that is used by scrypt to generate a valid private key from a password. Every auth record uses a unique salt ensuring different private keys for identical passwords. A server must have permission to access to the salt (stored in the _auth record) to successfully regenerate a private key - along with the normalized password and the following secret. Without all 3 elements, the private key cannot be regenerated.
`fdb-pw-auth-jwt-secret` | `string` | JWT tokens issued are secured with this secret. If empty, will default to use fdb-pw-auth-secret
`fdb-pw-auth-signing-key` | `string` | A valid Fluree private key with proper permissions must be used to sign any new transaction where new password auth records are created. If a default root key still exists and has proper permission, that will be used by default.
`fdb-pw-auth-jwt-max-exp` | `time in milliseconds, i.e. 86400000` |  Maximum allowed expiration time per JWT token in milliseconds. Blank means any amount of time is valid. (86400000 ms in 24 hours, 31536000000 in 1 year)
`fdb-pw-auth-jwt-max-renewal` | `time, i.e. 1y or 2d` | If renewal JWT tokens are allowed (blank if not allowed), maximum time from initial issuance a token can be renewed for in ms. To make this 'forever', use the maximum long value (9223372036854775807). For example, if you had a JWT token that expires after 120 seconds, but want to allow an active user to not be challenged for a password for up to 1 day, enter "1d" here and an unexpired token can be renewed as many times as desired (swapped for an 'fresh' token) so long as the original token issued from the password was less then this time period ago.
