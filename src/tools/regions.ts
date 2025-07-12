import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const LIST_REGIONS_TOOL: Tool = {
  name: 'list_regions',
  description: 'List available regions on Civo',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};
