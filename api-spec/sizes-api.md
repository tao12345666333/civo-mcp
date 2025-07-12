# Sizes API

Sizes are the available specifications for instances on the Civo cloud platform.

## List sizes

Any user can list the available sizes.

Sizes are retrieved by sending a `GET` request to `https://api.civo.com/v2/sizes`.

### Request

```shell
curl "https://api.civo.com/v2/sizes" \
  -H "Authorization: bearer $TOKEN"
```

### Response

```json
[
  {
    "name": "g3.xsmall",
    "description": "1 CPU, 1GB RAM, 25GB SSD",
    "cpu_cores": 1,
    "ram_mb": 1024,
    "disk_gb": 25,
    "selectable": true,
    "type": "instance"
  }
]
```
