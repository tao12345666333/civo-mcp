Title: Instances - Cloud API Documentation - Civo.com

URL Source: https://www.civo.com/api/instances

Markdown Content:
Instances
---------

Instances are running virtual servers on the Civo cloud platform. They can be of variable size.

Create an instance
------------------

Any user can create an instance, providing it's within their [quota](https://www.civo.com/api/quota). The size of the instance is from a [list of sizes](https://www.civo.com/api/sizes), as is the [region](https://www.civo.com/api/regions) to host the instance. Instances in a single region for a given account will all share an internal network, and can (optionally, but by default) have one public IP address assigned to them.

Instances are built from a [disk image](https://www.civo.com/api/disk-images), which may be just a base operating system such as ubuntu-14.04, or it may be a ready configured application or control panel hosting system.

Instances are created by sending a `POST` request to `https://api.civo.com/v2/instances`.

### Request

The following parameter(s) should be sent along with the request:

| Name | Description |
| --- | --- |
| hostname | (required) a fully qualified domain name that should be set as the instance's hostname |
| size | (required) the name of the size, from the current [size](https://www.civo.com/api/sizes) list, e.g. "g2.small" |
| network\_id | (required) this must be the ID of the network from the [network](https://www.civo.com/api/networks) list |
| template\_id | (required) the ID for the disk image to use to build the instance, from the current [disk image](https://www.civo.com/api/disk-images) list |
| count | (optional) the number of instances to create (default is `1`) |
| firewall\_id | (optional) the ID for firewall from [firewall](https://www.civo.com/api/firewall) list. The firewall must exists in the network (see `network_id`). If left blank and `network_id` is default network, the default firewall will be used (open to all). |
| reverse\_dns | (optional) a fully qualified domain name that should be used as the instance's IP's reverse DNS (uses the hostname if unspecified) |
| region | (optional) the identifier for the region, from the current [region](https://www.civo.com/api/regions) list (a random one will be picked by the system if not specified) |
| public\_ip | (optional) this should be either `none` or `create`. If `create` is specified, it will automatically allocate an initial public IP address, rather than having to add the first one later. Default is `create`) |
| initial\_user | (optional) the name of the initial user created on the server (optional; this will default to the template's `default_username` and fallback to "civo") |
| ssh\_key\_id | (optional) the ID of an already [uploaded SSH public key](https://www.civo.com/api/sshkeys) to use for login to the default user (optional; if one isn't provided a random password will be set and returned in the `initial_password` field) |
| script | (optional) the contents of a script that will be uploaded to `/usr/local/bin/civo-user-init-script` on your instance, read/write/executable only by `root and then will be executed at the end of the cloud initialization` |
| tags | (optional) a space separated list of tags, to be used freely as required |

### Response

The response is a JSON object that describes the initial setup of the instance, these details may not be returned in future calls to list instances. The `script` element only appears if one was sent at creation time.

```
{
    "id": "779d651a-8e10-4019-9cc0-448451d16157",
    "name": "test-b775c2ea",
    "hostname": "test",
    "account_id": "73993076-f1dc-4b53-88d8-158d97d7be92",
    "size": "g3.small",
    "firewall_id": "e9bcefa3-f942-43a3-98f5-354608f0d55e",
    "source_type": "diskimage",
    "source_id": "ubuntu-focal",
    "network_id": "950c8a1c-79d5-4e57-925a-6e941ebec8a3",
    "initial_user": "root",
    "initial_password": "foobar",
    "ssh_key": "ssh-rsa ...",
    "ssh_key_id": "21aa424f-13be-44db-a908-6d4625c7e4f4",
    "tags": [
        "first",
        "second"
    ],
    "user_script": "SGVsbG8gd29ybGQh",
    "status": "BUILDING",
    "civostatsd_token": "12fa5f73-9cca-4d9f-aca8-b7733a422a6b",
    "public_ip": null,
    "private_ip": null,
    "ipv6": null,
    "namespace_id": null,
    "notes": "",
    "reverse_dns": "",
    "cpu_cores": 1,
    "ram_mb": 2048,
    "disk_gb": 25
}
```

### Example of creating an instance

*   [Curl](https://www.civo.com/api/instances#cs1_1)
*   [Node.js](https://www.civo.com/api/instances#cs1_2)
*   [Ruby](https://www.civo.com/api/instances#cs1_3)

```
curl -H "Authorization: bearer 12345" https://api.civo.com/v2/instances \
  -d "hostname=server1.prod.example.com&size=g2.xsmall&region=lon1&public_ip=true&template_id=b67d6fed-8ab6-45b9-be2d-2f3337c933c6&initial_user=example"
```

```
// At a shell prompt run:
// npm init -y
// npm i --save request

var request = require('request');

request.post(
  'https://api.civo.com/v2/instances',
  {
    form: {
      hostname: "server1.prod.example.com",
      size: "g2.xsmall",
      region: "lon1",
      public_ip: "true",
      template_id: "b67d6fed-8ab6-45b9-be2d-2f3337c933c6",
      initial_user: "example"
    }
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  }
).auth(null, null, true, '12345');
```

```
require 'net/http'

http = Net::HTTP.new('api.civo.com', 443)
http.use_ssl = true

headers = {
  'Authorization' => 'bearer 12345',
  'Content-Type' => 'application/x-www-form-urlencoded'
}

resp, data = http.post('/v2/instances', 'hostname=server1.prod.example.com&size=g2.xsmall&region=lon1&public_ip=true&template_id=b67d6fed-8ab6-45b9-be2d-2f3337c933c6&initial_user=example"', headers)
```

List instances
--------------

A list of instances accessible from an account is available by sending a `GET` request to `https://api.civo.com/v2/instances`.

### Request

You can optionally filter the list of instances by passing in:

| Name | Description |
| --- | --- |
| tags | (optional) a space separated list of tags |
| page | (optional) which page of results to return (defaults to 1) |
| per\_page | (optional) how many instances to return per page (defaults to 20) |
| region | (optional) the identifier for the region, from the current [region](https://www.civo.com/api/regions) list (a random one will be picked by the system if not specified) |

### Response

The response is a paginated JSON array of objects that describes summary details for each instance (the `civostatsd_stats` currently is just a string containing CPU %, Memory %, Storage %).

```
{
    "page": 1,
    "per_page": null,
    "pages": 1,
    "items": [
        {
            "id": "779d651a-8e10-4019-9cc0-448451d16157",
            "name": "test-b775c2ea",
            "hostname": "test",
            "account_id": "73993076-f1dc-4b53-88d8-158d97d7be92",
            "size": "g3.small",
            "firewall_id": "e9bcefa3-f942-43a3-98f5-354608f0d55e",
            "source_type": "diskimage",
            "source_id": "ubuntu-focal",
            "network_id": "950c8a1c-79d5-4e57-925a-6e941ebec8a3",
            "initial_user": "root",
            "initial_password": "foobar",
            "ssh_key": "ssh-rsa ...",
            "ssh_key_id": "21aa424f-13be-44db-a908-6d4625c7e4f4",
            "tags": [
                "first",
                "second"
            ],
            "user_script": "SGVsbG8gd29ybGQh",
            "status": "ACTIVE",
            "civostatsd_token": "12fa5f73-9cca-4d9f-aca8-b7733a422a6b",
            "public_ip": "212.2.247.88",
            "private_ip": "192.168.1.2",
            "ipv6": null,
            "namespace_id": null,
            "notes": "",
            "reverse_dns": "",
            "cpu_cores": 1,
            "ram_mb": 2048,
            "disk_gb": 25
        }
    ]
}
```

### Example of listing instances

*   [Curl](https://www.civo.com/api/instances#cs2_1)
*   [Node.js](https://www.civo.com/api/instances#cs2_2)
*   [Ruby](https://www.civo.com/api/instances#cs2_3)

```
curl -H "Authorization: bearer 12345" https://api.civo.com/v2/instances?region=LON1
```

```
// At a shell prompt run:
// npm init -y
// npm i --save request

var request = require('request');

request.get(
  'https://api.civo.com/v2/instances',
  {},
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  }
).auth(null, null, true, '12345');
```

```
require 'net/http'

http = Net::HTTP.new('api.civo.com', 443)
http.use_ssl = true

headers = {
  'Authorization' => 'bearer 12345',
  'Content-Type' => 'application/x-www-form-urlencoded'
}

resp, data = http.get('/v2/instances', headers)
```

Retrieving an instance
----------------------

A single instance's details are available by sending a `GET` request to `https://api.civo.com/v2/instances/:id`.

### Request

This request requires the ID parameter in the URL (query string) as well as a `region` parameter containing the name of the [region](https://www.civo.com/api/regions) where the instance is running.

### Response

The response is a JSON object that describes the details for the instance (the `civostatsd_stats` currently is just a string containing CPU %, Memory %, Storage %).

```
{
    "id": "779d651a-8e10-4019-9cc0-448451d16157",
    "name": "test-b775c2ea",
    "hostname": "test",
    "account_id": "73993076-f1dc-4b53-88d8-158d97d7be92",
    "size": "g3.small",
    "firewall_id": "e9bcefa3-f942-43a3-98f5-354608f0d55e",
    "source_type": "diskimage",
    "source_id": "ubuntu-focal",
    "network_id": "950c8a1c-79d5-4e57-925a-6e941ebec8a3",
    "initial_user": "root",
    "initial_password": "foobar",
    "ssh_key": "ssh-rsa ...",
    "ssh_key_id": "21aa424f-13be-44db-a908-6d4625c7e4f4",
    "tags": [
        "first",
        "second"
    ],
    "user_script": "SGVsbG8gd29ybGQh",
    "status": "ACTIVE",
    "civostatsd_token": "12fa5f73-9cca-4d9f-aca8-b7733a422a6b",
    "public_ip": "212.2.247.88",
    "private_ip": "192.168.1.2",
    "ipv6": null,
    "namespace_id": null,
    "notes": "",
    "reverse_dns": "",
    "cpu_cores": 1,
    "ram_mb": 2048,
    "disk_gb": 25
}
```

### Example of retrieving an instance

*   [Curl](https://www.civo.com/api/instances#cs4_1)
*   [Node.js](https://www.civo.com/api/instances#cs4_2)
*   [Ruby](https://www.civo.com/api/instances#cs4_3)

```
curl -H "Authorization: bearer 12345" https://api.civo.com/v2/instances/12345?region=NYC1
    
```

```
// At a shell prompt run:
// npm init -y
// npm i --save request

var request = require('request');

request.get(
  'https://api.civo.com/v2/instances/12345?region=NYC1',
  {},
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  }
).auth(null, null, true, '12345');
```

```
require 'net/http'

http = Net::HTTP.new('api.civo.com', 443)
http.use_ssl = true

headers = {
  'Authorization' => 'bearer 12345',
  'Content-Type' => 'application/x-www-form-urlencoded'
}

resp, data = http.get('/v2/instances/12345?region=NYC1', headers)
```

Retagging an instance
---------------------

A user can retag an instance at any time, as they require.

Instances are retagged by sending a `PUT` request to `https://api.civo.com/v2/instances/:id/tags`.

### Request

This operation doesn't require any additional parameters. If you don't pass a `tags` parameter, it will remove all the existing tags.

| Name | Description |
| --- | --- |
| tags | (required) a space separated list of tags |
| region | (required) the identifier for the region, from the current [region](https://www.civo.com/api/regions) list |

### Response

The response is a JSON object that simply acknowledges the request.

```
{
  "result": "success"
}
```

### Example of retagging an instance

*   [Curl](https://www.civo.com/api/instances#cs3_1)
*   [Node.js](https://www.civo.com/api/instances#cs3_2)
*   [Ruby](https://www.civo.com/api/instances#cs3_3)

```
curl -H "Authorization: bearer 12345" \
  -X PUT https://api.civo.com/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/tags -d tags=linux
```

```
// At a shell prompt run:
// npm init -y
// npm i --save request

var request = require('request');

request.put(
  'https://api.civo.com/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/tags',
  {
    "tags": "linux"
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  }
).auth(null, null, true, '12345');
```

```
require 'net/http'

http = Net::HTTP.new('api.civo.com', 443)
http.use_ssl = true

headers = {
  'Authorization' => 'bearer 12345',
  'Content-Type' => 'application/x-www-form-urlencoded'
}

resp, data = http.put('/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/tags', {tags: "linux"}, headers)
```

Rebooting an instance
---------------------

A user can reboot an instance at any time, for example to fix a crashed piece of software.

Instances are hard rebooted by sending a `POST` request to `https://api.civo.com/v2/instances/:id/reboots` (or `https://api.civo.com/v2/instances/:id/hard_reboots`).

If you prefer a soft reboot, you can make the same request to `https://api.civo.com/v2/instances/:id/soft_reboots`.

### Request

This request requires the ID parameter in the URL (query string) as well as a `region` parameter containing the name of the [region](https://www.civo.com/api/regions) where the instance is running.

### Response

The response is a JSON object that simply acknowledges the request.

```
{
  "result": "success"
}
```

### Example of rebooting an instance

*   [Curl](https://www.civo.com/api/instances#cs5_1)
*   [Node.js](https://www.civo.com/api/instances#cs5_2)
*   [Ruby](https://www.civo.com/api/instances#cs5_3)

```
curl -H "Authorization: bearer 12345" \
  -x POST https://api.civo.com/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/reboots?region=NYC1
```

```
// At a shell prompt run:
// npm init -y
// npm i --save request

var request = require('request');

request.post(
  'https://api.civo.com/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/reboots?region=NYC1',
  {},
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  }
).auth(null, null, true, '12345');
```

```
require 'net/http'

http = Net::HTTP.new('api.civo.com', 443)
http.use_ssl = true

headers = {
  'Authorization' => 'bearer 12345',
  'Content-Type' => 'application/x-www-form-urlencoded'
}

resp, data = http.post('/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/reboots?region=NYC1', {}, headers)
```

Shutting down an instance
-------------------------

A user can shut down an instance at any time, for example to stop it from being attacked further.

Instances are shut down by sending a `PUT` request to `https://api.civo.com/v2/instances/:id/stop`.

### Request

This request requires the ID parameter in the URL (query string) as well as a `region` parameter containing the name of the [region](https://www.civo.com/api/regions) where the instance is running.

### Response

The response is a JSON object that simply acknowledges the request.

```
{
  "result": "success"
}
```

### Example of shutting down an instance

*   [Curl](https://www.civo.com/api/instances#cs6_1)
*   [Node.js](https://www.civo.com/api/instances#cs6_2)
*   [Ruby](https://www.civo.com/api/instances#cs6_3)

```
curl -H "Authorization: bearer 12345" \
  -X PUT https://api.civo.com/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/stop?region=NYC1
```

```
// At a shell prompt run:
// npm init -y
// npm i --save request

var request = require('request');

request.put(
  'https://api.civo.com/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/stop?region=NYC1',
  {},
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  }
).auth(null, null, true, '12345');
```

```
require 'net/http'

http = Net::HTTP.new('api.civo.com', 443)
http.use_ssl = true

headers = {
  'Authorization' => 'bearer 12345',
  'Content-Type' => 'application/x-www-form-urlencoded'
}

resp, data = http.put('/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/stop?region=NYC1', {}, headers)
```

Starting an instance after being shut down
------------------------------------------

A user can re-start an instance after it's been shut down. Instances are started by sending a `PUT` request to `https://api.civo.com/v2/instances/:id/start`.

### Request

This request requires the ID parameter in the URL (query string) as well as a `region` parameter containing the name of the [region](https://www.civo.com/api/regions) where the instance is running.

### Response

The response is a JSON object that simply acknowledges the request.

```
{
  "result": "success"
}
```

### Example of restarting a stopped instance

*   [Curl](https://www.civo.com/api/instances#cs7_1)
*   [Node.js](https://www.civo.com/api/instances#cs7_2)
*   [Ruby](https://www.civo.com/api/instances#cs7_3)

```
curl -H "Authorization: bearer 12345" \
  -X PUT https://api.civo.com/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/start?region=NYC1
```

```
// At a shell prompt run:
// npm init -y
// npm i --save request

var request = require('request');

request.put(
  'https://api.civo.com/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/start?region=NYC1',
  {},
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  }
).auth(null, null, true, '12345');
```

```
require 'net/http'

http = Net::HTTP.new('api.civo.com', 443)
http.use_ssl = true

headers = {
  'Authorization' => 'bearer 12345',
  'Content-Type' => 'application/x-www-form-urlencoded'
}

resp, data = http.put('/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/start?region=NYC1', {}, headers)
```

Upgrading (resizing) an instance
--------------------------------

A user can resize an instance upwards, providing it's within their [quota](https://www.civo.com/api/quota). The size of the instance is from a [list of sizes](https://www.civo.com/api/sizes).

Instances are resized by sending a `PUT` request to `https://api.civo.com/v2/instances/:id/resize`.

### Request

The following parameter(s) should be sent along with the request:

| Name | Description |
| --- | --- |
| size | (required) the identifier for the size, from the current [list](https://www.civo.com/api/sizes) |
| region | (required) the identifier for the region, from the [list of regions](https://www.civo.com/api/regions), where the instance is running |

### Response

The response is a JSON object that describes the initial setup of the instance, these details may not be returned in future calls to list instances.

```
{
    "result": "success"
}
```

### Example of resizing an instance

*   [Curl](https://www.civo.com/api/instances#cs8_1)
*   [Node.js](https://www.civo.com/api/instances#cs8_2)
*   [Ruby](https://www.civo.com/api/instances#cs8_3)

```
curl -H "Authorization: bearer 12345" \
  -X PUT https://api.civo.com/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/resize -d size=g3.small -d region=NYC1
```

```
// At a shell prompt run:
// npm init -y
// npm i --save request

var request = require('request');

request.put(
  'https://api.civo.com/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/resize',
  {
    "size": "g3.small",
    "region": "NYC1"
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  }
).auth(null, null, true, '12345');
```

```
require 'net/http'

http = Net::HTTP.new('api.civo.com', 443)
http.use_ssl = true

headers = {
  'Authorization' => 'bearer 12345',
  'Content-Type' => 'application/x-www-form-urlencoded'
}

resp, data = http.put('/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/resize', {size: "g1.small", region: "NYC1"}, headers)
```

Setting the firewall for an instance
------------------------------------

A user can set the firewall to use for an instance by sending a `PUT` request to `https://api.civo.com/v2/instances/:id/firewall`.

### Request

The following parameter(s) should be sent along with the request:

| Name | Description |
| --- | --- |
| firewall\_id | (required) the ID of the firewall to use, from the current [list](https://www.civo.com/api/firewall). The firewall must exists in the network (see instance's `network_id`). If left blank and `network_id` is default network, the default firewall will be used (open to all). |
| region | (required) the identifier for the region, from the [list of regions](https://www.civo.com/api/regions), where the instance is running |

### Response

The response is a JSON object that simply acknowledges the request.

```
{
    "id": "779d651a-8e10-4019-9cc0-448451d16157",
    "name": "test-b775c2ea",
    "hostname": "test",
    "account_id": "73993076-f1dc-4b53-88d8-158d97d7be92",
    "size": "g3.large",
    "firewall_id": "b6dfca68-059e-48c8-85a7-bac37996fde1",
    "source_type": "diskimage",
    "source_id": "ubuntu-focal",
    "network_id": "950c8a1c-79d5-4e57-925a-6e941ebec8a3",
    "initial_user": "root",
    "initial_password": "foobar",
    "ssh_key": "ssh-rsa ...",
    "ssh_key_id": "21aa424f-13be-44db-a908-6d4625c7e4f4",
    "tags": [
        "first",
        "second"
    ],
    "user_script": "SGVsbG8gd29ybGQh",
    "status": "ACTIVE",
    "civostatsd_token": "12fa5f73-9cca-4d9f-aca8-b7733a422a6b",
    "public_ip": "212.2.247.88",
    "private_ip": "192.168.1.2",
    "ipv6": null,
    "namespace_id": null,
    "notes": "",
    "reverse_dns": "",
    "cpu_cores": 4,
    "ram_mb": 8192,
    "disk_gb": 100
}
```

### Example of setting the firewall for an instance

*   [Curl](https://www.civo.com/api/instances#cs10_1)
*   [Node.js](https://www.civo.com/api/instances#cs10_2)
*   [Ruby](https://www.civo.com/api/instances#cs10_3)

```
curl -H "Authorization: bearer 12345" \
  -X PUT https://api.civo.com/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/firewall -d name=restrictive-firewall
```

```
// At a shell prompt run:
// npm init -y
// npm i --save request

var request = require('request');

request.put(
    'https://api.civo.com/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/firewall',
    {
      "name": "restrictive-firewall"
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
).auth(null, null, true, '12345');
```

```
require 'net/http'

http = Net::HTTP.new('api.civo.com', 443)
http.use_ssl = true

headers = {
  'Authorization' => 'bearer 12345',
  'Content-Type' => 'application/x-www-form-urlencoded'
}

resp, data = http.put('/v2/instances/4a07ac84-70f8-11e5-8fe9-5cf9389be614/firewall', {name: "restrictive-firewall"}, headers)
```

Deleting an instance
--------------------

An account holder can remove an instance by sending a `DELETE` request to `https://api.civo.com/v2/instances/:id`.

### Request

This request requires the ID parameter in the URL (query string) as well as a `region` parameter containing the name of the [region](https://www.civo.com/api/regions) where the instance is running. No confirmation step is required; this step will remove the instance immediately.

### Response

The response from the server will be a JSON block. The response will include a `result` field and the HTTP status will be `200 OK`.

```
{
    "result": "success"
}
```

### Example of deleting an instance

*   [Curl](https://www.civo.com/api/instances#cs12_1)
*   [Node.js](https://www.civo.com/api/instances#cs12_2)
*   [Ruby](https://www.civo.com/api/instances#cs12_3)

```
curl -H "Authorization: bearer 12345" \
  -X DELETE https://api.civo.com/v2/instances/b177ae0e-60fa-11e5-be02-5cf9389be614?region=NYC1
```

```
// At a shell prompt run:
// npm init -y
// npm i --save request

var request = require('request');

request.del(
  'https://api.civo.com/v2/instances/b177ae0e-60fa-11e5-be02-5cf9389be614',
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  }
).auth(null, null, true, '12345');
```

```
require 'net/http'

http = Net::HTTP.new('api.civo.com', 443)
http.use_ssl = true

headers = {
  'Authorization' => 'bearer 12345',
  'Content-Type' => 'application/x-www-form-urlencoded'
}

resp, data = http.delete('/v2/instances/b177ae0e-60fa-11e5-be02-5cf9389be614', headers)
```