# Networks API

Networks are private networks that can be used to connect instances.

## List networks

Any user can list their available networks.

Networks are retrieved by sending a `GET` request to `https://api.civo.com/v2/networks`.

### Request

```shell
curl "https://api.civo.com/v2/networks" \
  -H "Authorization: bearer $TOKEN"
```

### Response

```json
[
  {
    "id": "12345",
    "name": "my-network",
    "default": true,
    "cider": "10.0.0.0/24",
    "label": "My Network"
  }
]
```

## Create a network

Any user can create a new network.

Networks are created by sending a `POST` request to `https://api.civo.com/v2/networks`.

### Request

```shell
curl "https://api.civo.com/v2/networks" \
  -H "Authorization: bearer $TOKEN" \
  -d '{"label": "My New Network"}'
```

### Response

```json
{
  "id": "67890",
  "name": "my-new-network",
  "label": "My New Network",
  "result": "success"
}
```

## Rename a network

Any user can rename a network.

Networks are renamed by sending a `PUT` request to `https://api.civo.com/v2/networks/:id`.

### Request

```shell
curl "https://api.civo.com/v2/networks/67890" \
  -X PUT \
  -H "Authorization: bearer $TOKEN" \
  -d '{"label": "My Renamed Network"}'
```

### Response

```json
{
  "id": "67890",
  "name": "my-renamed-network",
  "label": "My Renamed Network",
  "result": "success"
}
```

## Delete a network

Any user can delete a network.

Networks are deleted by sending a `DELETE` request to `https://api.civo.com/v2/networks/:id`.

### Request

```shell
curl "https://api.civo.com/v2/networks/67890" \
  -X DELETE \
  -H "Authorization: bearer $TOKEN"
```

### Response

```json
{
  "result": "success"
}
```