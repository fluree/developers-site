---
sidebar_position: 1
---

# Overview

Using the FlureeWorker library, a browser [service worker](https://developers.google.com/web/fundamentals/primers/service-workers) can create a local query peer within the browser, making trusted data readily available.

Messages are used communicate between the FlureeWorker and the originating application. Message _data_ to/from the FlureeWorker are expected in the following format:

| Name     | Description                                 |
| -------- | ------------------------------------------- |
| `action` | the action to be performed (e.g., `login`)  |
| `conn`   | the connection ID                           |
| `ref`    | the reference ID to include in the response |
| `params` | parameters for the action                   |

&nbsp;

## Messages to FlureeWorker {#messages-to-flureeworker}

The following messages, or events, are recognized by FlureeWorker.

| Message                | Action            | Explanation                                        |
| ---------------------- | ----------------- | -------------------------------------------------- |
| Connect                | `connect`         | Initiate a connection with a Fluree instance       |
| Close Connection       | `close`           | Close a connection to a Fluree instance            |
| Log into Fluree Ledger | `login`           | Authenticate with ledger via username and password |
| Reqister Query         | `registerQuery`   | Register a FlureeQL with a connection              |
| Reset Connection       | `reset`           | Reset a connection to a Fluree instance            |
| Unregister Query       | `unregisterQuery` | De-register/remove a FlureeQL from a connection    |

&nbsp;

## Messages from FlureeWorker {#messages-from-flureeworker}

The following messages, or events, may be received from the FlureeWorker.

| Message            | Action       | Explanation                                                                                   |
| ------------------ | ------------ | --------------------------------------------------------------------------------------------- |
| Worker Initialized | `connInit`   | Worker ready. FlureeWorker service worker is initialized and available for connections        |
| Connection Closed  | `connClosed` | Result of `close` request                                                                     |
| Connection Status  | `connStatus` | Result of `connect` request                                                                   |
| Login              | `login`      | Result of `login` request                                                                     |
| Set State          | `setState`   | State has changed for a reference, generally triggered by one or more `registerQuery` actions |
| Connection Reset   | `connReset`  | Result of `reset` request                                                                     |
