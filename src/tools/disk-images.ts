import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const LIST_DISK_IMAGES_TOOL: Tool = {
  name: 'list_disk_images',
  description: 'List available disk images on Civo',
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

export const GET_DISK_IMAGE_TOOL: Tool = {
  name: 'get_disk_image',
  description: 'Get details of a specific disk image',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Disk image ID',
      },
      region: {
        type: 'string',
        description: 'Region identifier',
      },
    },
    required: ['id'],
  },
};
