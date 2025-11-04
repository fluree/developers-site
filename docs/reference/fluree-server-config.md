---
title: Configure Fluree Server
---

# Fluree Server Configuration File Format


<div class="overview">
  This document describes the JSON-LD configuration file format for Fluree Server.
</div>

---

## Overview

Fluree Server uses JSON-LD configuration files that define system components and their relationships. The configuration supports multiple deployment scenarios including standalone servers, Raft clusters, and different storage backends.

The configuration file must be provided to Fluree at start up.
Here's an example `docker run` command that assumes your configuration file, named `config.jsonld`, is in a folder named `resources` which is in your current working directory.
```
docker run -p 58090:8090 -v `pwd`/data:/opt/fluree-server/data -v `pwd`/resources:/opt/fluree-server/resources fluree/server:latest --profile="docker" --config="./resources/config.jsonld"
```
Here are the relevant pieces:
 - <code>-v \`pwd\`/resources:/opt/fluree-server/resources</code>  
  This mounts the `resources` folder in your working directory that contains your config file into the docker container.
 - <code>--config="./resources/config.jsonld"</code>  
  This argument tells Fluree Server to use this config file as the configuration for start up. It takes the path name for the configuration file, in this case it's the mounted folder inside the docker container.

## JSON-LD Structure

### `@context`

Configuration files can include a `@context` object that defines:

- `@base`: Base URI for the configuration (e.g., `https://ns.flur.ee/config/main/`) - optional but recommended for proper JSON-LD formatting
- `@vocab`: Vocabulary URI (typically `https://ns.flur.ee/system#`) - optional but recommended for proper JSON-LD formatting
- `profiles`: Container definition for configuration profiles (future functionality)

### Root Properties

- `@id`: Identifier for the configuration (e.g., `"standaloneServer"`, `"raftClusterConfig"`)
- `@graph`: Array containing the main configuration components
- `profiles`: Object containing named configuration overrides (**Note**: This is future functionality and not currently implemented)

## Component Types

### Storage

Defines storage backends for the system.  
See [Storage Backend Options](#storage-backend-options) for further configuration options.

**Type**: `"Storage"`

**Properties**:
- `filePath` (optional): File system path for disk-based storage
- For memory storage, no additional properties are required

**Examples**:
```json
{
  "@id": "localDiskStorage",
  "@type": "Storage",
  "filePath": "/opt/fluree-server/data"
}
```

```json
{
  "@id": "memoryStorage",
  "@type": "Storage"
}
```

### Connection

Defines database connection configuration and storage methods.

**Type**: `"Connection"`

**Properties**:
- `parallelism` (optional): Number of parallel operations (positive integer)
- `cacheMaxMb` (optional): Maximum cache size in megabytes (positive integer)
- `commitStorage`: Reference to a Storage component
- `indexStorage`: Reference to a Storage component
- `primaryPublisher`: Publisher configuration object
- `secondaryPublishers` (optional): Array of additional Publisher configurations
- `ledgerDefaults` (optional): Ledger-specific default settings

**Publisher Object**:
- `@type`: `"Publisher"`
- `storage` (optional): Reference to a Storage component - not required if IPNS keys are provided
- `ipnsServer` (optional): IPNS server address
- `ipnsProfile` (optional): IPNS profile name

**Ledger Defaults Object**:
- `indexOptions`: Index configuration
  - `reindexMinBytes`: Minimum bytes to trigger reindex
  - `reindexMaxBytes`: Maximum bytes for reindex
  - `maxOldIndexes`: Maximum number of old indexes to retain

### Consensus

Defines consensus mechanism configuration.

**Type**: `"Consensus"`

**Properties**:
- `consensusProtocol`: Protocol type (`"standalone"` or `"raft"`)
- `connection`: Reference to a Connection component
- `maxPendingTxns` (optional): Maximum pending transactions (for standalone)
- `storage` (optional): Reference to a Storage component (for raft)

**Raft-specific Properties**:
- `raftLogHistory`: Number of log entries to retain (positive integer)
- `raftEntriesMax`: Maximum entries per batch (positive integer)  
- `raftCatchUpRounds`: Number of catch-up rounds (positive integer)
- `raftServers`: Array of server addresses in multiaddr format
- `raftThisServer`: This server's address in multiaddr format

### API

Defines HTTP API configuration.

**Type**: `"API"`

**Properties**:
- `httpPort`: HTTP port number (positive integer)
- `maxTxnWaitMs` (optional): Maximum transaction wait time in milliseconds (positive integer)

<!-- ## Profiles (Future Functionality)

**Note**: Profiles are planned for future releases and are not currently functional.

Profiles will allow you to override specific configuration values for different environments. They will be defined in the `profiles` object using named keys.

**Planned Structure**:
```json
"profiles": {
  "profileName": [
    {
      "@id": "componentId",
      "property": "overrideValue"
    }
  ]
}
``` -->

## Storage Backend Options

Fluree supports several storage backend types:

### File Storage
- Uses local file system
- Requires `filePath` property
- Suitable for production deployments

### Memory Storage
- Stores data in memory only
- No persistence across restarts
- Ideal for testing and development

### IPFS Storage
- Uses IPFS for distributed storage
- Requires `ipfsServer` configuration

### Remote Storage
- Connects to remote Fluree instances
- Requires `remoteServers` array

### S3 Storage
- Uses Amazon S3 or S3-compatible storage
- Requires `s3Endpoint`, `s3Bucket`, and `s3Prefix`

## Best Practices

1. **Component References**: Always use `{"@id": "componentId"}` to reference other components
2. **JSON-LD Context**: Include `@context` with `@base` and `@vocab` for proper JSON-LD formatting
3. **Storage Backends**: Choose appropriate storage based on your deployment needs (memory for testing, disk for production)
4. **Resource Limits**: Set appropriate values for `cacheMaxMb`, `parallelism`, and `maxPendingTxns` based on your system resources
5. **Raft Addresses**: Use proper multiaddr format for Raft server addresses (`/ip4/host/tcp/port`)
6. **Publisher Configuration**: For IPNS publishers, you can omit the storage reference and rely on IPNS keys alone
7. **Secondary Publishers**: Configure multiple publishers for redundancy and distribution
8. **Index Configuration**: Tune reindex thresholds in `ledgerDefaults.indexOptions` based on your data volume and performance requirements
## Complete Configuration Examples

### Standalone Server with Disk Storage

```json
{
  "@context": {
    "@base": "https://ns.flur.ee/config/main/",
    "@vocab": "https://ns.flur.ee/system#"
  },
  "@id": "standaloneServer",
  "@graph": [
    {
      "@id": "localDiskStorage",
      "@type": "Storage",
      "filePath": "/opt/fluree-server/data"
    },
    {
      "@id": "connection",
      "@type": "Connection",
      "parallelism": 4,
      "cacheMaxMb": 1000,
      "commitStorage": {"@id": "localDiskStorage"},
      "indexStorage": {"@id": "localDiskStorage"},
      "primaryPublisher": {
        "@type": "Publisher",
        "storage": {"@id": "localDiskStorage"}
      },
      "ledgerDefaults": {
        "indexOptions": {
          "reindexMinBytes": 1000000,
          "reindexMaxBytes": 1000000000
        }
      }
    },
    {
      "@id": "consensus",
      "@type": "Consensus",
      "consensusProtocol": "standalone",
      "maxPendingTxns": 512,
      "connection": {"@id": "connection"}
    },
    {
      "@id": "http",
      "@type": "API",
      "httpPort": 8090,
      "maxTxnWaitMs": 120000
    }
  ]
}
```

### Memory-Based Configuration

```json
{
  "@context": {
    "@base": "https://ns.flur.ee/config/memory/",
    "@vocab": "https://ns.flur.ee/system#"
  },
  "@id": "standaloneServer",
  "@graph": [
    {
      "@id": "memoryStorage",
      "@type": "Storage"
    },
    {
      "@id": "connection",
      "@type": "Connection",
      "parallelism": 4,
      "cacheMaxMb": 1000,
      "commitStorage": {"@id": "memoryStorage"},
      "indexStorage": {"@id": "memoryStorage"},
      "primaryPublisher": {
        "@type": "Publisher",
        "storage": {"@id": "memoryStorage"}
      },
      "ledgerDefaults": {
        "indexOptions": {
          "reindexMinBytes": 1000000,
          "reindexMaxBytes": 1000000000
        }
      }
    },
    {
      "@id": "consensus",
      "@type": "Consensus",
      "consensusProtocol": "standalone",
      "maxPendingTxns": 512,
      "connection": {"@id": "connection"}
    },
    {
      "@id": "http",
      "@type": "API",
      "httpPort": 8090,
      "maxTxnWaitMs": 120000
    }
  ]
}
```

### Raft Cluster Configuration

```json
{
  "@context": {
    "@base": "https://ns.flur.ee/dev/config/raft/",
    "@vocab": "https://ns.flur.ee/system#"
  },
  "@id": "raftClusterConfig",
  "@graph": [
    {
      "@id": "localDiskStorage",
      "@type": "Storage",
      "filePath": "/opt/fluree-server/data"
    },
    {
      "@id": "connection",
      "@type": "Connection",
      "parallelism": 4,
      "cacheMaxMb": 200,
      "commitStorage": {"@id": "localDiskStorage"},
      "indexStorage": {"@id": "localDiskStorage"},
      "primaryPublisher": {
        "@type": "Publisher",
        "storage": {"@id": "localDiskStorage"}
      },
      "secondaryPublishers": [
        {
          "@type": "Publisher",
          "ipnsServer": "localhost",
          "ipnsProfile": "my-profile"
        },
        {
          "@type": "Publisher",
          "storage": {"@id": "awsS3Storage"}
        }
      ],
      "ledgerDefaults": {
        "indexOptions": {
          "reindexMinBytes": 100000,
          "reindexMaxBytes": 10000000,
          "maxOldIndexes": 3
        }
      }
    },
    {
      "@id": "consensus",
      "@type": "Consensus",
      "consensusProtocol": "raft",
      "raftLogHistory": 10,
      "raftEntriesMax": 200,
      "raftCatchUpRounds": 10,
      "raftServers": [
        "/ip4/127.0.0.1/tcp/62071",
        "/ip4/127.0.0.1/tcp/62072",
        "/ip4/127.0.0.1/tcp/62073"
      ],
      "raftThisServer": "/ip4/127.0.0.1/tcp/62071",
      "storage": {"@id": "localDiskStorage"}
    },
    {
      "@id": "http",
      "@type": "API",
      "httpPort": 8090,
      "maxTxnWaitMs": 120000
    }
  ]
}
```

### Configuration with IPNS Publishers

```json
{
  "@context": {
    "@base": "https://ns.flur.ee/config/ipns/",
    "@vocab": "https://ns.flur.ee/system#"
  },
  "@id": "ipnsServer",
  "@graph": [
    {
      "@id": "localDiskStorage",
      "@type": "Storage",
      "filePath": "/opt/fluree-server/data"
    },
    {
      "@id": "connection",
      "@type": "Connection",
      "parallelism": 4,
      "cacheMaxMb": 1000,
      "commitStorage": {"@id": "localDiskStorage"},
      "indexStorage": {"@id": "localDiskStorage"},
      "primaryPublisher": {
        "@type": "Publisher",
        "ipnsServer": "localhost",
        "ipnsProfile": "primary-profile"
      },
      "secondaryPublishers": [
        {
          "@type": "Publisher",
          "ipnsServer": "backup-server",
          "ipnsProfile": "backup-profile"
        }
      ]
    },
    {
      "@id": "consensus",
      "@type": "Consensus",
      "consensusProtocol": "standalone",
      "maxPendingTxns": 512,
      "connection": {"@id": "connection"}
    },
    {
      "@id": "http",
      "@type": "API",
      "httpPort": 8090
    }
  ]
}
```