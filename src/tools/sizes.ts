import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const LIST_SIZES_TOOL: Tool = {
  name: "list_sizes",
  description: "List available instance sizes on Civo",
  inputSchema: {
    type: "object",
    properties: {},
  },
};
