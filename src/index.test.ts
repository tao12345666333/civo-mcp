// Mock environment variable
process.env.CIVO_API_KEY = 'test-api-key';

// Import tools to test their definitions
import { CREATE_INSTANCE_TOOL, LIST_INSTANCES_TOOL } from './tools/instances.js';
import { LIST_DISK_IMAGES_TOOL, GET_DISK_IMAGE_TOOL } from './tools/disk-images.js';
import { LIST_SIZES_TOOL } from './tools/sizes.js';
import { LIST_REGIONS_TOOL } from './tools/regions.js';
import { LIST_NETWORKS_TOOL, CREATE_NETWORK_TOOL } from './tools/networks.js';
import { LIST_KUBERNETES_CLUSTERS_TOOL, CREATE_KUBERNETES_CLUSTER_TOOL } from './tools/kubernetes.js';

describe('Server Configuration', () => {
  it('should have all required tool definitions', () => {
    // Test instance tools
    expect(CREATE_INSTANCE_TOOL.name).toBe('create_instance');
    expect(LIST_INSTANCES_TOOL.name).toBe('list_instances');
    
    // Test disk image tools
    expect(LIST_DISK_IMAGES_TOOL.name).toBe('list_disk_images');
    expect(GET_DISK_IMAGE_TOOL.name).toBe('get_disk_image');
    
    // Test size tools
    expect(LIST_SIZES_TOOL.name).toBe('list_sizes');
    
    // Test region tools
    expect(LIST_REGIONS_TOOL.name).toBe('list_regions');
    
    // Test network tools
    expect(LIST_NETWORKS_TOOL.name).toBe('list_networks');
    expect(CREATE_NETWORK_TOOL.name).toBe('create_network');
    
    // Test kubernetes tools
    expect(LIST_KUBERNETES_CLUSTERS_TOOL.name).toBe('list_kubernetes_clusters');
    expect(CREATE_KUBERNETES_CLUSTER_TOOL.name).toBe('create_kubernetes_cluster');
  });
  
  it('should verify tool schema structures', () => {
    // Verify required fields exist
    expect(CREATE_INSTANCE_TOOL.inputSchema.required).toContain('hostname');
    expect(CREATE_INSTANCE_TOOL.inputSchema.required).toContain('size');
    expect(CREATE_INSTANCE_TOOL.inputSchema.required).toContain('template_id');
    
    expect(GET_DISK_IMAGE_TOOL.inputSchema.required).toContain('id');
  });
});
