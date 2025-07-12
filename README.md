# Civo MCP Server

![CI](https://github.com/tao12345666333/civo-mcp/workflows/CI/badge.svg)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

An MCP server implementation that integrates with the Civo cloud platform API, providing capabilities to manage cloud instances, networks, and Kubernetes clusters.

## Installation

### Quick Start with npx (Recommended)
```bash
# Run directly without installation
npx civo-mcp

# Or use the command name
npx mcp-server-civo
```

### Global Installation
```bash
npm install -g civo-mcp
mcp-server-civo
```

### Local Installation
```bash
npm install civo-mcp
npx mcp-server-civo
```

### From Source
```bash
git clone https://github.com/tao12345666333/civo-mcp.git
cd civo-mcp
npm install
npm run build
node dist/index.js
```

### Using Docker
```bash
docker pull ghcr.io/tao12345666333/civo-mcp-standalone:latest
docker run -e CIVO_API_KEY="your_api_key_here" ghcr.io/tao12345666333/civo-mcp-standalone:latest
```

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
2. Generate your API key from the [API settings page](https://dashboard.civo.com/security)

### Usage as a Standalone Server
Install dependencies and run the server:
```bash
npm install
npm run build
CIVO_API_KEY="your_api_key_here" node dist/index.js
```

### Usage with Docker
Run the server using Docker:
```bash
docker run -e CIVO_API_KEY="your_api_key_here" ghcr.io/tao12345666333/civo-mcp-standalone:latest
```

### Usage with Claude Desktop
Add this to your `claude_desktop_config.json`:

#### Using npx (Recommended)
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

#### Using global installation
```json
{
  "mcpServers": {
    "civo": {
      "command": "mcp-server-civo",
      "env": {
        "CIVO_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

#### Using local build
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

## Testing

Run the following command to execute the test suite:
```bash
npm run test:ci
```

Generate test coverage reports:
```bash
npm run test:coverage
```

## Build

Build the project using TypeScript:
```bash
npm run build
```

## Examples

### Creating an Instance
```bash
# First, list available regions and sizes
curl -s "https://api.civo.com/v2/regions" -H "Authorization: Bearer $CIVO_API_KEY"
curl -s "https://api.civo.com/v2/sizes" -H "Authorization: Bearer $CIVO_API_KEY"

# Then create an instance using the MCP server
# This would be done through Claude Desktop or another MCP client
```

### Managing Kubernetes Clusters
```bash
# List available Kubernetes versions
# Use the list_kubernetes_versions tool

# Create a cluster
# Use the create_kubernetes_cluster tool with required parameters
```

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
