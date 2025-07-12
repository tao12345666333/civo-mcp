import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const CREATE_INSTANCE_TOOL: Tool = {
  name: 'create_instance',
  description: 'Create a new cloud instance on Civo',
  inputSchema: {
    type: 'object',
    properties: {
      hostname: {
        type: 'string',
        description: 'Fully qualified domain name',
      },
      size: {
        type: 'string',
        description: 'Instance size (e.g. g2.small)',
      },
      template_id: {
        type: 'string',
        description: 'Disk image ID',
      },
      count: {
        type: 'number',
        description: 'Number of instances to create',
        default: 1,
      },
      region: {
        type: 'string',
        description: 'Region identifier',
        default: 'LON1',
      },
    },
    required: ['hostname', 'size', 'template_id'],
  },
};

export const LIST_INSTANCES_TOOL: Tool = {
  name: 'list_instances',
  description: 'List all instances on Civo',
  inputSchema: {
    type: 'object',
    properties: {
      region: {
        type: 'string',
        description: 'Filter by region',
      },
      page: {
        type: 'number',
        description: 'Pagination page',
        default: 1,
      },
      per_page: {
        type: 'number',
        description: 'Results per page',
        default: 20,
      },
    },
  },
};

export const REBOOT_INSTANCE_TOOL: Tool = {
  name: 'reboot_instance',
  description: 'Reboot a cloud instance on Civo',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Instance ID',
      },
      region: {
        type: 'string',
        description: 'Region identifier',
      },
    },
    required: ['id', 'region'],
  },
};

export const SHUTDOWN_INSTANCE_TOOL: Tool = {
  name: 'shutdown_instance',
  description: 'Shutdown a cloud instance on Civo',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Instance ID',
      },
      region: {
        type: 'string',
        description: 'Region identifier',
      },
    },
    required: ['id', 'region'],
  },
};

export const START_INSTANCE_TOOL: Tool = {
  name: 'start_instance',
  description: 'Start a cloud instance on Civo',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Instance ID',
      },
      region: {
        type: 'string',
        description: 'Region identifier',
      },
    },
    required: ['id', 'region'],
  },
};

export const RESIZE_INSTANCE_TOOL: Tool = {
  name: 'resize_instance',
  description: 'Resize a cloud instance on Civo',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Instance ID',
      },
      size: {
        type: 'string',
        description: 'New instance size',
      },
      region: {
        type: 'string',
        description: 'Region identifier',
      },
    },
    required: ['id', 'size', 'region'],
  },
};

export const DELETE_INSTANCE_TOOL: Tool = {
  name: 'delete_instance',
  description: 'Delete a cloud instance on Civo',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Instance ID',
      },
      region: {
        type: 'string',
        description: 'Region identifier',
      },
    },
    required: ['id', 'region'],
  },
};
