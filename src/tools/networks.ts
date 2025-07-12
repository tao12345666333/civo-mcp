import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const LIST_NETWORKS_TOOL: Tool = {
  name: 'list_networks',
  description: 'List available networks on Civo',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const CREATE_NETWORK_TOOL: Tool = {
  name: 'create_network',
  description: 'Create a new network on Civo',
  inputSchema: {
    type: 'object',
    properties: {
      label: {
        type: 'string',
        description: 'Network label',
      },
      region: {
        type: 'string',
        description: 'Region identifier',
      },
    },
    required: ['label'],
  },
};

export const RENAME_NETWORK_TOOL: Tool = {
  name: 'rename_network',
  description: 'Rename a network on Civo',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Network ID',
      },
      label: {
        type: 'string',
        description: 'New network label',
      },
      region: {
        type: 'string',
        description: 'Region identifier',
      },
    },
    required: ['id', 'label'],
  },
};

export const DELETE_NETWORK_TOOL: Tool = {
  name: 'delete_network',
  description: 'Delete a network on Civo',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Network ID',
      },
      region: {
        type: 'string',
        description: 'Region identifier',
      },
    },
    required: ['id'],
  },
};
