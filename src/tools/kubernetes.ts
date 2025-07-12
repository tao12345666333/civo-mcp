import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const LIST_KUBERNETES_CLUSTERS_TOOL: Tool = {
  name: 'list_kubernetes_clusters',
  description: 'List all Kubernetes clusters on Civo',
  inputSchema: {
    type: 'object',
    properties: {
      region: {
        type: 'string',
        description: 'Region identifier',
      },
    },
  },
};

export const CREATE_KUBERNETES_CLUSTER_TOOL: Tool = {
  name: 'create_kubernetes_cluster',
  description: 'Create a new Kubernetes cluster on Civo',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Cluster name',
      },
      region: {
        type: 'string',
        description: 'Region identifier',
      },
      network_id: {
        type: 'string',
        description: 'Network ID',
      },
      nodes: {
        type: 'number',
        description: 'Number of nodes',
      },
      node_size: {
        type: 'string',
        description: 'Node size',
      },
      kubernetes_version: {
        type: 'string',
        description: 'Kubernetes version',
      },
    },
    required: [
      'name',
      'region',
      'network_id',
      'nodes',
      'node_size',
      'kubernetes_version',
    ],
  },
};

export const DELETE_KUBERNETES_CLUSTER_TOOL: Tool = {
  name: 'delete_kubernetes_cluster',
  description: 'Delete a Kubernetes cluster on Civo',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Cluster ID',
      },
      region: {
        type: 'string',
        description: 'Region identifier',
      },
    },
    required: ['id', 'region'],
  },
};

export const LIST_KUBERNETES_VERSIONS_TOOL: Tool = {
  name: 'list_kubernetes_versions',
  description: 'List available Kubernetes versions on Civo',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};
