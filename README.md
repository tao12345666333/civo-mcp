# Civo MCP Server

[![Civo](https://www.civo.com/brand-assets/logo/full-colour/civo-logo-fullcolour.png)](https://www.civo.com)

![CI](https://github.com/tao12345666333/civo-mcp/workflows/CI/badge.svg)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

An MCP server implementation that integrates with the [Civo cloud platform](https://www.civo.com) API, providing capabilities to manage cloud instances, networks, and Kubernetes clusters.

## Demo

![Civo MCP Demo](https://github.com/user-attachments/assets/ebf5f20a-3b60-4721-ae39-9a83765cd3b8)

Or you can also view the details of each step through [this public Amp thread](https://ampcode.com/threads/T-cb46a20f-7faf-4cc6-a929-9b248a92c3b5).

## Getting Started

### Requirements
- Node.js 20 or newer
- Claude Desktop, VS Code, Cursor, or any other MCP client
- A Civo account with API key

### Installation

First, install the Civo MCP server with your client. A typical configuration looks like this:

```json
{
  "mcpServers": {
    "civo": {
      "command": "npx",
      "args": ["civo-mcp"],
      "env": {
        "CIVO_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

<details>
<summary><b>Install in VS Code</b></summary>

You can install the Civo MCP server using the VS Code CLI:

```bash
# For VS Code
code --add-mcp '{"name":"civo","command":"npx","args":["civo-mcp"],"env":{"CIVO_API_KEY":"YOUR_API_KEY_HERE"}}'
```

After installation, the Civo MCP server will be available for use with your GitHub Copilot agent in VS Code.
</details>

<details>
<summary><b>Install in Ampcode</b></summary>

Follow Amp MCP [documentation](https://ampcode.com/manual#mcp). Use following configuration:

```json
"amp.mcpServers": {
  "civo": {
      "command": "npx",
      "args": ["civo-mcp"],
      "env": {
        "CIVO_API_KEY": "YOUR_API_KEY_HERE"
      }
  }
}
```
</details>

<details>
<summary><b>Install in Claude Code</b></summary>

Use the Claude Code CLI to add the Civo MCP server:

```bash
claude mcp add civo npx civo-mcp
```

Then set your API key as an environment variable:
```bash
export CIVO_API_KEY="your_api_key_here"
```
</details>

<details>
<summary><b>Install in Gemini CLI</b></summary>

Follow the MCP install [guide](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md#configure-the-mcp-server-in-settingsjson), use following configuration:

```json
{
  "mcpServers": {
    "civo": {
      "command": "npx",
      "args": ["civo-mcp"],
      "env": {
        "CIVO_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```
</details>

<details>
<summary><b>Install in Cursor</b></summary>

Go to `Cursor Settings` → `MCP` → `Add new MCP Server`. Name to your liking, use `command` type with the command `npx civo-mcp`. You can also verify config or add command like arguments via clicking `Edit`.

```json
{
  "mcpServers": {
    "civo": {
      "command": "npx",
      "args": ["civo-mcp"],
      "env": {
        "CIVO_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```
</details>

<details>
<summary><b>Install in Windsurf</b></summary>

Follow Windsurf MCP [documentation](https://docs.windsurf.com/windsurf/cascade/mcp). Use following configuration:

```json
{
  "mcpServers": {
    "civo": {
      "command": "npx",
      "args": ["civo-mcp"],
      "env": {
        "CIVO_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```
</details>

<details>
<summary><b>Install in Claude Desktop</b></summary>

Follow the MCP install [guide](https://modelcontextprotocol.io/quickstart/user), use following configuration:

```json
{
  "mcpServers": {
    "civo": {
      "command": "npx",
      "args": ["civo-mcp"],
      "env": {
        "CIVO_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```
</details>

## Features

- **Instance Management**: Create, manage, resize, start, stop, reboot, and delete cloud instances.
- **Disk Image Operations**: List and get details of available disk images.
- **Network Management**: Create, rename, and delete networks.
- **Kubernetes Support**: Create, list, and delete Kubernetes clusters and list available versions.
- **Flexible Configuration**: Set instance size, region, and other parameters.
- **Rate Limiting**: Built-in rate limiting to prevent API abuse.

## Tools

### Instance Management
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

- **reboot_instance**
  - Reboot an existing instance
  - Inputs:
    - `id` (string): Instance ID
    - `region` (string): Region identifier

- **shutdown_instance**
  - Shutdown an existing instance
  - Inputs:
    - `id` (string): Instance ID
    - `region` (string): Region identifier

- **start_instance**
  - Start a stopped instance
  - Inputs:
    - `id` (string): Instance ID
    - `region` (string): Region identifier

- **resize_instance**
  - Resize an existing instance
  - Inputs:
    - `id` (string): Instance ID
    - `size` (string): New instance size
    - `region` (string): Region identifier

- **delete_instance**
  - Delete an existing instance
  - Inputs:
    - `id` (string): Instance ID
    - `region` (string): Region identifier

### Disk Images
- **list_disk_images**
  - List available disk images on Civo
  - Inputs:
    - `region` (string, optional): Region identifier

- **get_disk_image**
  - Get details of a specific disk image
  - Inputs:
    - `id` (string): Disk image ID
    - `region` (string, optional): Region identifier

### Network Management
- **list_networks**
  - List all available networks
  - Inputs: None

- **create_network**
  - Create a new network
  - Inputs:
    - `label` (string): Network label
    - `region` (string, optional): Region identifier

- **rename_network**
  - Rename an existing network
  - Inputs:
    - `id` (string): Network ID
    - `label` (string): New network label
    - `region` (string, optional): Region identifier

- **delete_network**
  - Delete an existing network
  - Inputs:
    - `id` (string): Network ID
    - `region` (string): Region identifier

### Kubernetes Management
- **list_kubernetes_clusters**
  - List all Kubernetes clusters
  - Inputs:
    - `region` (string, optional): Filter by region
    - `page` (number, optional): Pagination page
    - `per_page` (number, optional): Results per page

- **create_kubernetes_cluster**
  - Create a new Kubernetes cluster
  - Inputs:
    - `name` (string): Cluster name
    - `region` (string): Region identifier
    - `network_id` (string): Network ID for the cluster
    - `nodes` (number): Number of worker nodes
    - `node_size` (string): Size of each node
    - `kubernetes_version` (string): Kubernetes version

- **delete_kubernetes_cluster**
  - Delete a Kubernetes cluster
  - Inputs:
    - `id` (string): Cluster ID
    - `region` (string): Region identifier

- **list_kubernetes_versions**
  - List available Kubernetes versions
  - Inputs: None

### Resource Information
- **list_sizes**
  - List all available instance sizes
  - Inputs: None

- **list_regions**
  - List all available regions
  - Inputs: None

## Configuration

### Environment Variables
- `CIVO_API_KEY`: Your Civo API Key (required)
- `NODE_ENV`: Set to `production` to disable debug logging (optional)

### Getting an API Key
1. Sign up for a [Civo account](https://dashboard.civo.com/signup) if you don't have one.
2. Generate your API key following the [API keys documentation](https://www.civo.com/docs/account/api-keys)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run the test suite: `npm run test:ci`
5. Submit a pull request

### Development Setup
```bash
git clone https://github.com/tao12345666333/civo-mcp.git
cd civo-mcp
npm install
npm run build
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## License

This MCP server is licensed under the MIT License. See the LICENSE file for details.
