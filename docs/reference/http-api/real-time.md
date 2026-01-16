# Real-Time

Endpoints for real-time notifications and subscriptions.

---

## `fluree/notify`

```
POST /fluree/notify
```

Notify the server of an external commit. This is used in distributed or federated scenarios where commits may be made to a ledger outside of the current server instance.

### Request Object

| Key       | Required | Value                                                   |
| --------- | -------- | ------------------------------------------------------- |
| `ledger`  | yes      | **string** &bull; the name of the ledger                |
| `commit`  | yes      | **string** &bull; the address of the commit to notify   |

### Example Request Object

```json
{
  "ledger": "cookbook/base",
  "commit": "fluree:file://cookbook/base/commit/abc123.json"
}
```

### Curl Example

```sh
curl --location 'http://localhost:58090/fluree/notify' \
  --header 'Content-Type: application/json' \
  --data '{
    "ledger": "cookbook/base",
    "commit": "fluree:file://cookbook/base/commit/abc123.json"
  }'
```

---

## `fluree/subscribe`

```
WebSocket /fluree/subscribe
```

Subscribe to real-time updates for a ledger via WebSocket. This enables applications to receive notifications when new commits are made.

### Connection

Connect to the WebSocket endpoint at `ws://localhost:58090/fluree/subscribe`.

### Subscribe Message

Send a JSON message to subscribe to a ledger:

```json
{
  "action": "subscribe",
  "ledger": "cookbook/base"
}
```

### Unsubscribe Message

```json
{
  "action": "unsubscribe",
  "ledger": "cookbook/base"
}
```

### Keep-Alive Message

```json
{
  "action": "ping"
}
```

### Incoming Messages

When a new commit is made to a subscribed ledger, you'll receive:

```json
{
  "action": "new-commit",
  "ledger": "cookbook/base",
  "data": {
    "commit": {
      "address": "fluree:file://cookbook/base/commit/abc123.json",
      "hash": "abc123"
    },
    "t": 6
  }
}
```

### JavaScript Example

```javascript
const ws = new WebSocket('ws://localhost:58090/fluree/subscribe');

ws.onopen = () => {
  // Subscribe to a ledger
  ws.send(JSON.stringify({
    action: 'subscribe',
    ledger: 'cookbook/base'
  }));
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);

  if (message.action === 'new-commit') {
    console.log('New commit:', message.data);
    // Handle the new commit (refresh UI, etc.)
  }
};

// Keep connection alive with periodic pings
setInterval(() => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ action: 'ping' }));
  }
}, 30000);
```

### Python Example

```python
import websocket
import json

def on_message(ws, message):
    data = json.loads(message)
    if data.get('action') == 'new-commit':
        print(f"New commit on {data['ledger']}: {data['data']}")

def on_open(ws):
    ws.send(json.dumps({
        'action': 'subscribe',
        'ledger': 'cookbook/base'
    }))

ws = websocket.WebSocketApp(
    'ws://localhost:58090/fluree/subscribe',
    on_open=on_open,
    on_message=on_message
)
ws.run_forever()
```
