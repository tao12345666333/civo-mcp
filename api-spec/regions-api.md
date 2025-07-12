# Regions API

Regions are the datacenters where instances are hosted.

## List regions

Any user can list the available regions.

Regions are retrieved by sending a `GET` request to `https://api.civo.com/v2/regions`.

### Request

```shell
curl "https://api.civo.com/v2/regions" \
  -H "Authorization: bearer $TOKEN"
```

### Response

```json
[
  {
    "code": "lon1",
    "name": "London",
    "default": true,
    "country": "GB",
    "type": "instance"
  }
]
```

