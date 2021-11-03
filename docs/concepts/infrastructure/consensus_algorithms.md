---
sidebar_position: 6
---

# Consensus Algorithms

Consensus algorithms decide how new blocks are committed to a chain, as well as
who can commit those blocks. Consensus algorithms have to balance the need for speed
with the need for security. The choice of consensus algorithm depends on your use
case, and whether your network is more or less trusted.

Currently, Fluree supports the Raft consensus algorithm. At this time we no longer support the PBFT (Practical Byzantine Fault Tolerance) algorithm. The consensus algorithm you use is specified in the fdb-consensus-type config setting (look at[config settings](/reference/fluree_config.md) for more information).

## Raft {#raft}

[Raft](https://raft.github.io/raft.pdf) is a consensus algorithm that is designed
to be easy to understand. Raft is well-suited for networks that are more trusted,
and it is faster than PBFT.

- Fault tolerance: `2n + 1` servers required, where `n` is a faulty server
- In Raft, a leader is elected, and that leader commits blocks until they become unresponsive for a period of time.  

> These [Github Pages](https://raft.github.io/) are a really great resource about the raft consensus algorithm. There are some excellent visualizations and a list of links to other resources to learn more.
