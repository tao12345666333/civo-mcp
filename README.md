# Civo MCP Server

An MCP server implementation that integrates with the Civo cloud platform API, providing cloud instance management capabilities.

## Features

- **Instance Management**: Create and manage cloud instances
- **Flexible Configuration**: Set instance size, region, and other parameters
- **Rate Limiting**: Built-in rate limiting to prevent API abuse

## Tools

- **create_instance**
  - Create new cloud instances on Civo
  - Inputs:
    - `hostname` (string): Fully qualified domain name
    - `size` (string): Instance size (e.g. 'g2.small')
    - `template_id` (string): Disk image ID
    - `count` (number, optional): Number of instances to create (default: 1)
    - `region` (string, optional): Region identifier (default: 'LON1')

- **list_instances**
  - List all instances on Civo
  - Inputs:
    - `region` (string, optional): Filter by region
    - `page` (number, optional): Pagination page (default: 1)
    - `per_page` (number, optional): Results per page (default: 20)

- **list_disk_images**
  - List available disk images on Civo
  - Inputs:
    - `region` (string, optional): Region identifier

- **get_disk_image**
  - Get details of a specific disk image
  - Inputs:
    - `id` (string): Disk image ID
    - `region` (string, optional): Region identifier

## Configuration

### Getting an API Key
1. Sign up for a [Civo account](https://dashboard.civo.com/signup) if you don't have one.
2. Generate your API key from the [API settings page](https://dashboard.civo.com/security)
3. Set the `CIVO_API_KEY` environment variable

### Usage with Claude Desktop
Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "civo": {
      "command": "node",
      "args": ["/path/to/civo-mcp/dist/index.js"],
      "env": {
        "CIVO_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

## Build

```bash
npm run build
```

## License

This MCP server is licensed under the MIT License. See the LICENSE file for details.
