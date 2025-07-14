#!/usr/bin/env node

import 'dotenv/config';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import {
  CREATE_INSTANCE_TOOL,
  LIST_INSTANCES_TOOL,
  REBOOT_INSTANCE_TOOL,
  SHUTDOWN_INSTANCE_TOOL,
  START_INSTANCE_TOOL,
  RESIZE_INSTANCE_TOOL,
  DELETE_INSTANCE_TOOL,
} from './tools/instances.js';
import {
  GET_DISK_IMAGE_TOOL,
  LIST_DISK_IMAGES_TOOL,
} from './tools/disk-images.js';
import { LIST_SIZES_TOOL } from './tools/sizes.js';
import { LIST_REGIONS_TOOL } from './tools/regions.js';
import {
  LIST_NETWORKS_TOOL,
  CREATE_NETWORK_TOOL,
  RENAME_NETWORK_TOOL,
  DELETE_NETWORK_TOOL,
} from './tools/networks.js';
import {
  createInstance,
  listInstances,
  rebootInstance,
  shutdownInstance,
  startInstance,
  resizeInstance,
  deleteInstance,
} from './api/instances.js';
import { getDiskImage, listDiskImages } from './api/disk-images.js';
import { listSizes } from './api/sizes.js';
import { listRegions } from './api/regions.js';
import {
  listNetworks,
  createNetwork,
  renameNetwork,
  deleteNetwork,
} from './api/networks.js';
import {
  LIST_KUBERNETES_CLUSTERS_TOOL,
  CREATE_KUBERNETES_CLUSTER_TOOL,
  DELETE_KUBERNETES_CLUSTER_TOOL,
  LIST_KUBERNETES_VERSIONS_TOOL,
} from './tools/kubernetes.js';
import {
  listClusters,
  createCluster,
  deleteCluster,
  listAvailableVersions,
} from './api/kubernetes.js';

// Server implementation
const server = new Server(
  {
    name: 'example-servers/civo',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {
        [CREATE_INSTANCE_TOOL.name]: CREATE_INSTANCE_TOOL,
        [LIST_INSTANCES_TOOL.name]: LIST_INSTANCES_TOOL,
        [REBOOT_INSTANCE_TOOL.name]: REBOOT_INSTANCE_TOOL,
        [SHUTDOWN_INSTANCE_TOOL.name]: SHUTDOWN_INSTANCE_TOOL,
        [START_INSTANCE_TOOL.name]: START_INSTANCE_TOOL,
        [RESIZE_INSTANCE_TOOL.name]: RESIZE_INSTANCE_TOOL,
        [DELETE_INSTANCE_TOOL.name]: DELETE_INSTANCE_TOOL,
        [LIST_DISK_IMAGES_TOOL.name]: LIST_DISK_IMAGES_TOOL,
        [GET_DISK_IMAGE_TOOL.name]: GET_DISK_IMAGE_TOOL,
        [LIST_SIZES_TOOL.name]: LIST_SIZES_TOOL,
        [LIST_REGIONS_TOOL.name]: LIST_REGIONS_TOOL,
        [LIST_NETWORKS_TOOL.name]: LIST_NETWORKS_TOOL,
        [CREATE_NETWORK_TOOL.name]: CREATE_NETWORK_TOOL,
        [RENAME_NETWORK_TOOL.name]: RENAME_NETWORK_TOOL,
        [DELETE_NETWORK_TOOL.name]: DELETE_NETWORK_TOOL,
        [LIST_KUBERNETES_CLUSTERS_TOOL.name]: LIST_KUBERNETES_CLUSTERS_TOOL,
        [CREATE_KUBERNETES_CLUSTER_TOOL.name]: CREATE_KUBERNETES_CLUSTER_TOOL,
        [DELETE_KUBERNETES_CLUSTER_TOOL.name]: DELETE_KUBERNETES_CLUSTER_TOOL,
        [LIST_KUBERNETES_VERSIONS_TOOL.name]: LIST_KUBERNETES_VERSIONS_TOOL,
      },
    },
  }
);

// Tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    CREATE_INSTANCE_TOOL,
    LIST_INSTANCES_TOOL,
    REBOOT_INSTANCE_TOOL,
    SHUTDOWN_INSTANCE_TOOL,
    START_INSTANCE_TOOL,
    RESIZE_INSTANCE_TOOL,
    DELETE_INSTANCE_TOOL,
    LIST_DISK_IMAGES_TOOL,
    GET_DISK_IMAGE_TOOL,
    LIST_SIZES_TOOL,
    LIST_REGIONS_TOOL,
    LIST_NETWORKS_TOOL,
    CREATE_NETWORK_TOOL,
    RENAME_NETWORK_TOOL,
    DELETE_NETWORK_TOOL,
    LIST_KUBERNETES_CLUSTERS_TOOL,
    CREATE_KUBERNETES_CLUSTER_TOOL,
    DELETE_KUBERNETES_CLUSTER_TOOL,
    LIST_KUBERNETES_VERSIONS_TOOL,
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async request => {
  try {
    const { name, arguments: args } = request.params;

    if (!args) {
      throw new Error('No arguments provided');
    }

    switch (name) {
      case 'create_instance': {
        if (
          typeof args !== 'object' ||
          args === null ||
          typeof args.hostname !== 'string' ||
          typeof args.size !== 'string' ||
          typeof args.template_id !== 'string'
        ) {
          throw new Error('Invalid arguments for create_instance');
        }

        const instance = await createInstance({
          hostname: args.hostname as string,
          size: args.size as string,
          template_id: args.template_id as string,
          count: args.count as number | undefined,
          region: args.region as string | undefined,
        });
        return {
          content: [
            {
              type: 'text',
              text: `Created instance ${instance.hostname} (ID: ${instance.id})`,
            },
          ],
          isError: false,
        };
      }

      case 'list_instances': {
        const instances = await listInstances(args);
        const instanceList = instances.items
          .map(
            i =>
              `${i.hostname} (${i.id}) - ${i.status} - Public IP: ${i.public_ip || 'None'}`
          )
          .join('\n');

        return {
          content: [
            {
              type: 'text',
              text: `Instances:\n${instanceList}`,
            },
          ],
          isError: false,
        };
      }

      case 'list_disk_images': {
        const images = await listDiskImages(args);
        const imageList = images.items
          .map(
            i =>
              `${i.name} (${i.id}) - ${i.distribution} ${i.version} - ${i.state}`
          )
          .join('\n');

        return {
          content: [
            {
              type: 'text',
              text: `Disk Images:\n${imageList}`,
            },
          ],
          isError: false,
        };
      }

      case 'get_disk_image': {
        if (
          typeof args !== 'object' ||
          args === null ||
          typeof args.id !== 'string'
        ) {
          throw new Error('Invalid arguments for get_disk_image');
        }

        const image = await getDiskImage({
          id: args.id as string,
          region: args.region as string,
        });

        return {
          content: [
            {
              type: 'text',
              text:
                'Disk Image Details:\n' +
                `ID: ${image.id}\n` +
                `Name: ${image.name}\n` +
                `Version: ${image.version}\n` +
                `State: ${image.state}\n` +
                `Distribution: ${image.distribution}\n` +
                `Description: ${image.description || 'None'}\n` +
                `Label: ${image.label || 'None'}`,
            },
          ],
          isError: false,
        };
      }

      case 'reboot_instance': {
        if (
          typeof args !== 'object' ||
          args === null ||
          typeof args.id !== 'string' ||
          typeof args.region !== 'string'
        ) {
          throw new Error('Invalid arguments for reboot_instance');
        }

        const result = await rebootInstance(
          args as { id: string; region: string }
        );
        return {
          content: [
            {
              type: 'text',
              text: `Instance ${args.id} rebooted: ${result.result}`,
            },
          ],
          isError: false,
        };
      }

      case 'shutdown_instance': {
        if (
          typeof args !== 'object' ||
          args === null ||
          typeof args.id !== 'string' ||
          typeof args.region !== 'string'
        ) {
          throw new Error('Invalid arguments for shutdown_instance');
        }

        const result = await shutdownInstance(
          args as { id: string; region: string }
        );
        return {
          content: [
            {
              type: 'text',
              text: `Instance ${args.id} shutdown: ${result.result}`,
            },
          ],
          isError: false,
        };
      }

      case 'start_instance': {
        if (
          typeof args !== 'object' ||
          args === null ||
          typeof args.id !== 'string' ||
          typeof args.region !== 'string'
        ) {
          throw new Error('Invalid arguments for start_instance');
        }

        const result = await startInstance(
          args as { id: string; region: string }
        );
        return {
          content: [
            {
              type: 'text',
              text: `Instance ${args.id} started: ${result.result}`,
            },
          ],
          isError: false,
        };
      }

      case 'resize_instance': {
        if (
          typeof args !== 'object' ||
          args === null ||
          typeof args.id !== 'string' ||
          typeof args.size !== 'string' ||
          typeof args.region !== 'string'
        ) {
          throw new Error('Invalid arguments for resize_instance');
        }

        const result = await resizeInstance(
          args as { id: string; size: string; region: string }
        );
        return {
          content: [
            {
              type: 'text',
              text: `Instance ${args.id} resized: ${result.result}`,
            },
          ],
          isError: false,
        };
      }

      case 'list_sizes': {
        const sizes = await listSizes();
        const sizeList = sizes
          .map((s: any) => `${s.name} - ${s.description}`)
          .join('\n');

        return {
          content: [
            {
              type: 'text',
              text: `Available Sizes:\n${sizeList}`,
            },
          ],
          isError: false,
        };
      }

      case 'list_regions': {
        const regions = await listRegions();
        const regionList = regions
          .map((r: any) => `${r.name} (${r.code})`)
          .join('\n');

        return {
          content: [
            {
              type: 'text',
              text: `Available Regions:\n${regionList}`,
            },
          ],
          isError: false,
        };
      }

      case 'list_networks': {
        const networks = await listNetworks();
        const networkList = networks
          .map((n: any) => `${n.name} (${n.id}) - ${n.label}`)
          .join('\n');

        return {
          content: [
            {
              type: 'text',
              text: `Available Networks:\n${networkList}`,
            },
          ],
          isError: false,
        };
      }

      case 'create_network': {
        if (
          typeof args !== 'object' ||
          args === null ||
          typeof args.label !== 'string'
        ) {
          throw new Error('Invalid arguments for create_network');
        }

        const network = await createNetwork(
          args as { label: string; region?: string }
        );
        return {
          content: [
            {
              type: 'text',
              text: `Created network ${network.label} (ID: ${network.id})`,
            },
          ],
          isError: false,
        };
      }

      case 'rename_network': {
        if (
          typeof args !== 'object' ||
          args === null ||
          typeof args.id !== 'string' ||
          typeof args.label !== 'string'
        ) {
          throw new Error('Invalid arguments for rename_network');
        }

        const network = await renameNetwork(
          args as { id: string; label: string; region?: string }
        );
        return {
          content: [
            {
              type: 'text',
              text: `Renamed network ${network.id} to ${network.label}`,
            },
          ],
          isError: false,
        };
      }

      case 'delete_network': {
        if (
          typeof args !== 'object' ||
          args === null ||
          typeof args.id !== 'string'
        ) {
          throw new Error('Invalid arguments for delete_network');
        }

        const result = await deleteNetwork(
          args as { id: string; region: string }
        );
        return {
          content: [
            {
              type: 'text',
              text: `Deleted network ${args.id}: ${result.result}`,
            },
          ],
          isError: false,
        };
      }

      case 'delete_instance': {
        if (
          typeof args !== 'object' ||
          args === null ||
          typeof args.id !== 'string' ||
          typeof args.region !== 'string'
        ) {
          throw new Error('Invalid arguments for delete_instance');
        }

        const result = await deleteInstance(
          args as { id: string; region: string }
        );
        return {
          content: [
            {
              type: 'text',
              text: `Instance ${args.id} deleted: ${result.result}`,
            },
          ],
          isError: false,
        };
      }

      case 'list_kubernetes_clusters': {
        const clusters = await listClusters(args);
        const clusterList = clusters.items
          .map((c: any) => `${c.name} (${c.id}) - ${c.status}`)
          .join('\n');

        return {
          content: [
            {
              type: 'text',
              text: `Kubernetes Clusters:\n${clusterList}`,
            },
          ],
          isError: false,
        };
      }

      case 'create_kubernetes_cluster': {
        if (
          typeof args !== 'object' ||
          args === null ||
          typeof args.name !== 'string' ||
          typeof args.region !== 'string' ||
          typeof args.network_id !== 'string' ||
          typeof args.nodes !== 'number' ||
          typeof args.node_size !== 'string' ||
          typeof args.kubernetes_version !== 'string'
        ) {
          throw new Error('Invalid arguments for create_kubernetes_cluster');
        }

        const cluster = await createCluster(
          args as {
            name: string;
            region: string;
            network_id: string;
            nodes: number;
            node_size: string;
            kubernetes_version: string;
          }
        );
        return {
          content: [
            {
              type: 'text',
              text: `Created Kubernetes cluster ${cluster.name} (ID: ${cluster.id})`,
            },
          ],
          isError: false,
        };
      }

      case 'delete_kubernetes_cluster': {
        if (
          typeof args !== 'object' ||
          args === null ||
          typeof args.id !== 'string' ||
          typeof args.region !== 'string'
        ) {
          throw new Error('Invalid arguments for delete_kubernetes_cluster');
        }

        const result = await deleteCluster(
          args as { id: string; region: string }
        );
        return {
          content: [
            {
              type: 'text',
              text: `Deleted Kubernetes cluster ${args.id}: ${result.result}`,
            },
          ],
          isError: false,
        };
      }

      case 'list_kubernetes_versions': {
        const versions = await listAvailableVersions();
        const versionList = versions
          .map((v: any) => `${v.Version} - ${v.Label} (${v.Type}) [${v.ClusterType}]${v.Default ? ' *DEFAULT*' : ''}`)
          .join('\n');

        return {
          content: [
            {
              type: 'text',
              text: `Available Kubernetes Versions:\n${versionList}`,
            },
          ],
          isError: false,
        };
      }

      default:
        return {
          content: [{ type: 'text', text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Civo MCP Server running on stdio');
}

runServer().catch(error => {
  console.error('Fatal error running server:', error);
  process.exit(1);
});
