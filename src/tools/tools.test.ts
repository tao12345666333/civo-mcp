import { CREATE_INSTANCE_TOOL, LIST_INSTANCES_TOOL, REBOOT_INSTANCE_TOOL, SHUTDOWN_INSTANCE_TOOL, START_INSTANCE_TOOL, RESIZE_INSTANCE_TOOL, DELETE_INSTANCE_TOOL } from './instances.js';
import { GET_DISK_IMAGE_TOOL, LIST_DISK_IMAGES_TOOL } from './disk-images.js';
import { LIST_SIZES_TOOL } from './sizes.js';
import { LIST_REGIONS_TOOL } from './regions.js';
import { LIST_NETWORKS_TOOL, CREATE_NETWORK_TOOL, RENAME_NETWORK_TOOL, DELETE_NETWORK_TOOL } from './networks.js';
import { LIST_KUBERNETES_CLUSTERS_TOOL, CREATE_KUBERNETES_CLUSTER_TOOL, DELETE_KUBERNETES_CLUSTER_TOOL, LIST_KUBERNETES_VERSIONS_TOOL } from './kubernetes.js';

describe('Tool Definitions', () => {
  describe('Instance Tools', () => {
    it('should have correct CREATE_INSTANCE_TOOL definition', () => {
      expect(CREATE_INSTANCE_TOOL.name).toBe('create_instance');
      expect(CREATE_INSTANCE_TOOL.description).toBe('Create a new cloud instance on Civo');
      expect(CREATE_INSTANCE_TOOL.inputSchema.type).toBe('object');
      expect(CREATE_INSTANCE_TOOL.inputSchema.properties).toHaveProperty('hostname');
      expect(CREATE_INSTANCE_TOOL.inputSchema.properties).toHaveProperty('size');
      expect(CREATE_INSTANCE_TOOL.inputSchema.properties).toHaveProperty('template_id');
      expect(CREATE_INSTANCE_TOOL.inputSchema.required).toEqual(['hostname', 'size', 'template_id']);
    });

    it('should have correct LIST_INSTANCES_TOOL definition', () => {
      expect(LIST_INSTANCES_TOOL.name).toBe('list_instances');
      expect(LIST_INSTANCES_TOOL.description).toBe('List all instances on Civo');
      expect(LIST_INSTANCES_TOOL.inputSchema.type).toBe('object');
      expect(LIST_INSTANCES_TOOL.inputSchema.properties).toHaveProperty('region');
      expect(LIST_INSTANCES_TOOL.inputSchema.properties).toHaveProperty('page');
      expect(LIST_INSTANCES_TOOL.inputSchema.properties).toHaveProperty('per_page');
    });

    it('should have correct REBOOT_INSTANCE_TOOL definition', () => {
      expect(REBOOT_INSTANCE_TOOL.name).toBe('reboot_instance');
      expect(REBOOT_INSTANCE_TOOL.description).toBe('Reboot a cloud instance on Civo');
      expect(REBOOT_INSTANCE_TOOL.inputSchema.required).toEqual(['id', 'region']);
    });

    it('should have correct SHUTDOWN_INSTANCE_TOOL definition', () => {
      expect(SHUTDOWN_INSTANCE_TOOL.name).toBe('shutdown_instance');
      expect(SHUTDOWN_INSTANCE_TOOL.description).toBe('Shutdown a cloud instance on Civo');
      expect(SHUTDOWN_INSTANCE_TOOL.inputSchema.required).toEqual(['id', 'region']);
    });

    it('should have correct START_INSTANCE_TOOL definition', () => {
      expect(START_INSTANCE_TOOL.name).toBe('start_instance');
      expect(START_INSTANCE_TOOL.description).toBe('Start a cloud instance on Civo');
      expect(START_INSTANCE_TOOL.inputSchema.required).toEqual(['id', 'region']);
    });

    it('should have correct RESIZE_INSTANCE_TOOL definition', () => {
      expect(RESIZE_INSTANCE_TOOL.name).toBe('resize_instance');
      expect(RESIZE_INSTANCE_TOOL.description).toBe('Resize a cloud instance on Civo');
      expect(RESIZE_INSTANCE_TOOL.inputSchema.required).toEqual(['id', 'size', 'region']);
    });

    it('should have correct DELETE_INSTANCE_TOOL definition', () => {
      expect(DELETE_INSTANCE_TOOL.name).toBe('delete_instance');
      expect(DELETE_INSTANCE_TOOL.description).toBe('Delete a cloud instance on Civo');
      expect(DELETE_INSTANCE_TOOL.inputSchema.required).toEqual(['id', 'region']);
    });
  });

  describe('Disk Image Tools', () => {
    it('should have correct LIST_DISK_IMAGES_TOOL definition', () => {
      expect(LIST_DISK_IMAGES_TOOL.name).toBe('list_disk_images');
      expect(LIST_DISK_IMAGES_TOOL.description).toBe('List available disk images on Civo');
      expect(LIST_DISK_IMAGES_TOOL.inputSchema.type).toBe('object');
    });

    it('should have correct GET_DISK_IMAGE_TOOL definition', () => {
      expect(GET_DISK_IMAGE_TOOL.name).toBe('get_disk_image');
      expect(GET_DISK_IMAGE_TOOL.description).toBe('Get details of a specific disk image');
      expect(GET_DISK_IMAGE_TOOL.inputSchema.required).toEqual(['id']);
    });
  });

  describe('Size Tools', () => {
    it('should have correct LIST_SIZES_TOOL definition', () => {
      expect(LIST_SIZES_TOOL.name).toBe('list_sizes');
      expect(LIST_SIZES_TOOL.description).toBe('List available instance sizes on Civo');
      expect(LIST_SIZES_TOOL.inputSchema.type).toBe('object');
    });
  });

  describe('Region Tools', () => {
    it('should have correct LIST_REGIONS_TOOL definition', () => {
      expect(LIST_REGIONS_TOOL.name).toBe('list_regions');
      expect(LIST_REGIONS_TOOL.description).toBe('List available regions on Civo');
      expect(LIST_REGIONS_TOOL.inputSchema.type).toBe('object');
    });
  });

  describe('Network Tools', () => {
    it('should have correct LIST_NETWORKS_TOOL definition', () => {
      expect(LIST_NETWORKS_TOOL.name).toBe('list_networks');
      expect(LIST_NETWORKS_TOOL.description).toBe('List available networks on Civo');
      expect(LIST_NETWORKS_TOOL.inputSchema.type).toBe('object');
    });

    it('should have correct CREATE_NETWORK_TOOL definition', () => {
      expect(CREATE_NETWORK_TOOL.name).toBe('create_network');
      expect(CREATE_NETWORK_TOOL.description).toBe('Create a new network on Civo');
      expect(CREATE_NETWORK_TOOL.inputSchema.required).toEqual(['label']);
    });

    it('should have correct RENAME_NETWORK_TOOL definition', () => {
      expect(RENAME_NETWORK_TOOL.name).toBe('rename_network');
      expect(RENAME_NETWORK_TOOL.description).toBe('Rename a network on Civo');
      expect(RENAME_NETWORK_TOOL.inputSchema.required).toEqual(['id', 'label']);
    });

    it('should have correct DELETE_NETWORK_TOOL definition', () => {
      expect(DELETE_NETWORK_TOOL.name).toBe('delete_network');
      expect(DELETE_NETWORK_TOOL.description).toBe('Delete a network on Civo');
      expect(DELETE_NETWORK_TOOL.inputSchema.required).toEqual(['id']);
    });
  });

  describe('Kubernetes Tools', () => {
    it('should have correct LIST_KUBERNETES_CLUSTERS_TOOL definition', () => {
      expect(LIST_KUBERNETES_CLUSTERS_TOOL.name).toBe('list_kubernetes_clusters');
      expect(LIST_KUBERNETES_CLUSTERS_TOOL.description).toBe('List all Kubernetes clusters on Civo');
      expect(LIST_KUBERNETES_CLUSTERS_TOOL.inputSchema.type).toBe('object');
    });

    it('should have correct CREATE_KUBERNETES_CLUSTER_TOOL definition', () => {
      expect(CREATE_KUBERNETES_CLUSTER_TOOL.name).toBe('create_kubernetes_cluster');
      expect(CREATE_KUBERNETES_CLUSTER_TOOL.description).toBe('Create a new Kubernetes cluster on Civo');
      expect(CREATE_KUBERNETES_CLUSTER_TOOL.inputSchema.required).toEqual(['name', 'region', 'network_id', 'nodes', 'node_size', 'kubernetes_version']);
    });

    it('should have correct DELETE_KUBERNETES_CLUSTER_TOOL definition', () => {
      expect(DELETE_KUBERNETES_CLUSTER_TOOL.name).toBe('delete_kubernetes_cluster');
      expect(DELETE_KUBERNETES_CLUSTER_TOOL.description).toBe('Delete a Kubernetes cluster on Civo');
      expect(DELETE_KUBERNETES_CLUSTER_TOOL.inputSchema.required).toEqual(['id', 'region']);
    });

    it('should have correct LIST_KUBERNETES_VERSIONS_TOOL definition', () => {
      expect(LIST_KUBERNETES_VERSIONS_TOOL.name).toBe('list_kubernetes_versions');
      expect(LIST_KUBERNETES_VERSIONS_TOOL.description).toBe('List available Kubernetes versions on Civo');
      expect(LIST_KUBERNETES_VERSIONS_TOOL.inputSchema.type).toBe('object');
    });
  });
});
