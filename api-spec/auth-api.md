
API Access
==========

This is the entire API for the Civo cloud platform. All resources may not be available to your API key, though if you believe this to be an error, please contact [info@civo.com](mailto:info@civo.com).

* * *

Authentication
--------------

After signing up for a Civo account, your API key will be shown on this page. This should be sent with every request in an `Authorization` header. For example, if your API key was "12345" you should send an `Authorization` header using the `bearer` type like this

```markdown
Authorization: bearer 12345
```

* * *

Parameters and responses
------------------------

If you are sending information to the API such as the details of an instance to create, these should be sent as normal form encoded variables. JSON request bodies aren't accepted.

The response of an API will be a JSON-encoded object for all 2xx statuses. 4xx/5xx status may not be JSON, unless it's obvious that the response should be parsed for a specific reason. So, for example, 404 Not Found pages are a standard page of text but 403 Unauthorized requests may have a `reason` attribute available in the JSON object.

Below are some code samples showing a simple request in each of Curl, Javascript and Ruby - all using 123456 as the API key.

### Example of creating an instance

*   [Curl](https://www.civo.com/api#cs1_1)
*   [Node.js](https://www.civo.com/api#cs1_2)
*   [Ruby](https://www.civo.com/api#cs1_3)

```bash
curl -H "Authorization: bearer 12345" https://api.civo.com/v2/instances -d hostname=test.example.com
```

```js
// At a shell prompt run:
// npm init -y
// npm i --save request

var request = require('request');

request.post(
  'https://api.civo.com/v2/instances',
  {
    form: {
      hostname: 'test.example.com'
    }
  },
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

resp, data = http.post('/v2/instances', 'hostname=test.example.com', headers)
```