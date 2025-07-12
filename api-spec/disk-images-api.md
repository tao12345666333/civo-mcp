Title: Disk Images - Cloud API Documentation - Civo.com

URL Source: https://www.civo.com/api/disk-images

Markdown Content:
Disk Images - Cloud API Documentation - Civo.com
===============

* * *

Disk Images
===========

Disk Images contains the contents and structure of a disk volume or of an entire data storage device on the Civo cloud platform.

**Note**  
Every region will have similar set of disk images. But the disk image IDs are different.

* * *

List disk images
----------------

A list of disk images accessible from an account is available by sending a `GET` request to `https://api.civo.com/v2/disk_images`.

### Request

This request accepts an optional `region` parameter (query string) containing the name of the [region](https://www.civo.com/api/regions) where the disk image is located. A random one will be picked by the system if not specified.

### Response

The response is a JSON array of objects that describes summary details for each disk image.

```json
[
    {
        "id": "d927ad2f-5073-4ed6-b2eb-b8e61aef29a8",
        "name": "ubuntu-focal",
        "version": "20.04",
        "state": "available",
        "distribution": "ubuntu",
        "description": null,
        "label": null
    }
]
```

### Example of listing instances

*   [Curl](https://www.civo.com/api/disk-images#cs2_1)
*   [Node.js](https://www.civo.com/api/disk-images#cs2_2)
*   [Ruby](https://www.civo.com/api/disk-images#cs2_3)

```bash
curl -H "Authorization: bearer 12345" https://api.civo.com/v2/disk_images
```

```js
// At a shell prompt run:
// npm init -y
// npm i --save request

var request = require('request');

request.get(
  'https://api.civo.com/v2/disk_images',
  {},
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  }
).auth(null, null, true, '12345');
```

```ruby
require 'net/http'

http = Net::HTTP.new('api.civo.com', 443)
http.use_ssl = true

headers = {
  'Authorization' => 'bearer 12345',
  'Content-Type' => 'application/x-www-form-urlencoded'
}

resp, data = http.get('/v2/disk_images', headers)
```

* * *

Retrieving a disk image
-----------------------

A single disk image's details are available by sending a `GET` request to `https://api.civo.com/v2/disk_images/:id`.

### Request

This request requires the ID parameter in the URL (query string) as well as a `region` parameter containing the name of the [region](https://www.civo.com/api/regions) where the disk image is located.

### Response

The response is a JSON object that describes the details for the disk image.

```json
{
    "id": "d927ad2f-5073-4ed6-b2eb-b8e61aef29a8",
    "name": "ubuntu-focal",
    "version": "20.04",
    "state": "available",
    "distribution": "ubuntu",
    "description": null,
    "label": null
}
```

### Example of retrieving a disk image

*   [Curl](https://www.civo.com/api/disk-images#cs2_1)
*   [Node.js](https://www.civo.com/api/disk-images#cs2_2)
*   [Ruby](https://www.civo.com/api/disk-images#cs2_3)

```bash
curl -H "Authorization: bearer 12345" https://api.civo.com/v2/disk_images/12345?region=LON1
    
```

```js
// At a shell prompt run:
// npm init -y
// npm i --save request

var request = require('request');

request.get(
  'https://api.civo.com/v2/disk_images/12345',
  {},
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  }
).auth(null, null, true, '12345');
```

```ruby
require 'net/http'

http = Net::HTTP.new('api.civo.com', 443)
http.use_ssl = true

headers = {
  'Authorization' => 'bearer 12345',
  'Content-Type' => 'application/x-www-form-urlencoded'
}

resp, data = http.get('/v2/disk_images/12345', headers)
```

