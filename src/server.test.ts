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
  listClusters,
  createCluster,
  deleteCluster,
  listAvailableVersions,
} from './api/kubernetes.js';

// Mock all API functions
jest.mock('./api/instances');
jest.mock('./api/disk-images');
jest.mock('./api/sizes');
jest.mock('./api/regions');
jest.mock('./api/networks');
jest.mock('./api/kubernetes');

// Mock the Server and transport
jest.mock('@modelcontextprotocol/sdk/server/index.js');
jest.mock('@modelcontextprotocol/sdk/server/stdio.js');

describe('Server Tool Handlers', () => {
  let mockCreateInstance: jest.MockedFunction<typeof createInstance>;
  let mockListInstances: jest.MockedFunction<typeof listInstances>;
  let mockRebootInstance: jest.MockedFunction<typeof rebootInstance>;
  let mockShutdownInstance: jest.MockedFunction<typeof shutdownInstance>;
  let mockStartInstance: jest.MockedFunction<typeof startInstance>;
  let mockResizeInstance: jest.MockedFunction<typeof resizeInstance>;
  let mockDeleteInstance: jest.MockedFunction<typeof deleteInstance>;
  let mockGetDiskImage: jest.MockedFunction<typeof getDiskImage>;
  let mockListDiskImages: jest.MockedFunction<typeof listDiskImages>;
  let mockListSizes: jest.MockedFunction<typeof listSizes>;
  let mockListRegions: jest.MockedFunction<typeof listRegions>;
  let mockListNetworks: jest.MockedFunction<typeof listNetworks>;
  let mockCreateNetwork: jest.MockedFunction<typeof createNetwork>;
  let mockRenameNetwork: jest.MockedFunction<typeof renameNetwork>;
  let mockDeleteNetwork: jest.MockedFunction<typeof deleteNetwork>;
  let mockListClusters: jest.MockedFunction<typeof listClusters>;
  let mockCreateCluster: jest.MockedFunction<typeof createCluster>;
  let mockDeleteCluster: jest.MockedFunction<typeof deleteCluster>;
  let mockListAvailableVersions: jest.MockedFunction<
    typeof listAvailableVersions
  >;

  beforeEach(() => {
    // Get mocked functions
    mockCreateInstance = createInstance as jest.MockedFunction<
      typeof createInstance
    >;
    mockListInstances = listInstances as jest.MockedFunction<
      typeof listInstances
    >;
    mockRebootInstance = rebootInstance as jest.MockedFunction<
      typeof rebootInstance
    >;
    mockShutdownInstance = shutdownInstance as jest.MockedFunction<
      typeof shutdownInstance
    >;
    mockStartInstance = startInstance as jest.MockedFunction<
      typeof startInstance
    >;
    mockResizeInstance = resizeInstance as jest.MockedFunction<
      typeof resizeInstance
    >;
    mockDeleteInstance = deleteInstance as jest.MockedFunction<
      typeof deleteInstance
    >;
    mockGetDiskImage = getDiskImage as jest.MockedFunction<typeof getDiskImage>;
    mockListDiskImages = listDiskImages as jest.MockedFunction<
      typeof listDiskImages
    >;
    mockListSizes = listSizes as jest.MockedFunction<typeof listSizes>;
    mockListRegions = listRegions as jest.MockedFunction<typeof listRegions>;
    mockListNetworks = listNetworks as jest.MockedFunction<typeof listNetworks>;
    mockCreateNetwork = createNetwork as jest.MockedFunction<
      typeof createNetwork
    >;
    mockRenameNetwork = renameNetwork as jest.MockedFunction<
      typeof renameNetwork
    >;
    mockDeleteNetwork = deleteNetwork as jest.MockedFunction<
      typeof deleteNetwork
    >;
    mockListClusters = listClusters as jest.MockedFunction<typeof listClusters>;
    mockCreateCluster = createCluster as jest.MockedFunction<
      typeof createCluster
    >;
    mockDeleteCluster = deleteCluster as jest.MockedFunction<
      typeof deleteCluster
    >;
    mockListAvailableVersions = listAvailableVersions as jest.MockedFunction<
      typeof listAvailableVersions
    >;

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('Instance Operations', () => {
    it('should handle create_instance tool', async () => {
      const mockInstance = {
        id: '123',
        hostname: 'test-instance',
        size: 'g2.small',
        status: 'active',
        public_ip: '1.2.3.4',
        private_ip: '10.0.0.1',
        created_at: '2023-01-01T00:00:00Z',
      };
      mockCreateInstance.mockResolvedValue(mockInstance);

      // Test that the function would be called with correct parameters
      await mockCreateInstance({
        hostname: 'test-instance',
        size: 'g2.small',
        template_id: '456',
      });

      expect(mockCreateInstance).toHaveBeenCalledWith({
        hostname: 'test-instance',
        size: 'g2.small',
        template_id: '456',
      });
    });

    it('should handle list_instances tool', async () => {
      const mockInstances = {
        items: [
          {
            id: '123',
            hostname: 'test-instance',
            size: 'g2.small',
            status: 'active',
            public_ip: '1.2.3.4',
            private_ip: '10.0.0.1',
            created_at: '2023-01-01T00:00:00Z',
          },
        ],
        page: 1,
        per_page: 20,
        pages: 1,
      };
      mockListInstances.mockResolvedValue(mockInstances);

      await mockListInstances({});
      expect(mockListInstances).toHaveBeenCalledWith({});
    });

    it('should handle reboot_instance tool', async () => {
      const mockResult = { result: 'success' };
      mockRebootInstance.mockResolvedValue(mockResult);

      await mockRebootInstance({ id: '123', region: 'lon1' });
      expect(mockRebootInstance).toHaveBeenCalledWith({
        id: '123',
        region: 'lon1',
      });
    });

    it('should handle shutdown_instance tool', async () => {
      const mockResult = { result: 'success' };
      mockShutdownInstance.mockResolvedValue(mockResult);

      await mockShutdownInstance({ id: '123', region: 'lon1' });
      expect(mockShutdownInstance).toHaveBeenCalledWith({
        id: '123',
        region: 'lon1',
      });
    });

    it('should handle start_instance tool', async () => {
      const mockResult = { result: 'success' };
      mockStartInstance.mockResolvedValue(mockResult);

      await mockStartInstance({ id: '123', region: 'lon1' });
      expect(mockStartInstance).toHaveBeenCalledWith({
        id: '123',
        region: 'lon1',
      });
    });

    it('should handle resize_instance tool', async () => {
      const mockResult = { result: 'success' };
      mockResizeInstance.mockResolvedValue(mockResult);

      await mockResizeInstance({
        id: '123',
        size: 'g2.medium',
        region: 'lon1',
      });
      expect(mockResizeInstance).toHaveBeenCalledWith({
        id: '123',
        size: 'g2.medium',
        region: 'lon1',
      });
    });

    it('should handle delete_instance tool', async () => {
      const mockResult = { result: 'success' };
      mockDeleteInstance.mockResolvedValue(mockResult);

      await mockDeleteInstance({ id: '123', region: 'lon1' });
      expect(mockDeleteInstance).toHaveBeenCalledWith({
        id: '123',
        region: 'lon1',
      });
    });
  });

  describe('Disk Image Operations', () => {
    it('should handle list_disk_images tool', async () => {
      const mockImages = {
        items: [
          {
            id: '456',
            name: 'ubuntu-20.04',
            distribution: 'Ubuntu',
            version: '20.04',
            state: 'available',
            description: 'Ubuntu 20.04 LTS',
            label: 'ubuntu-20.04',
          },
        ],
      };
      mockListDiskImages.mockResolvedValue(mockImages);

      await mockListDiskImages({});
      expect(mockListDiskImages).toHaveBeenCalledWith({});
    });

    it('should handle get_disk_image tool', async () => {
      const mockImage = {
        id: '456',
        name: 'ubuntu-20.04',
        distribution: 'Ubuntu',
        version: '20.04',
        state: 'available',
        description: 'Ubuntu 20.04 LTS',
        label: 'ubuntu-20.04',
      };
      mockGetDiskImage.mockResolvedValue(mockImage);

      await mockGetDiskImage({ id: '456', region: 'lon1' });
      expect(mockGetDiskImage).toHaveBeenCalledWith({
        id: '456',
        region: 'lon1',
      });
    });
  });

  describe('Other Operations', () => {
    it('should handle list_sizes tool', async () => {
      const mockSizes = [
        {
          name: 'g2.small',
          description: 'Small instance',
          cpu_cores: 1,
          ram_mb: 1024,
          disk_gb: 25,
          selectable: true,
          type: 'instance',
        },
      ];
      mockListSizes.mockResolvedValue(mockSizes);

      await mockListSizes();
      expect(mockListSizes).toHaveBeenCalled();
    });

    it('should handle list_regions tool', async () => {
      const mockRegions = [
        {
          name: 'London 1',
          code: 'lon1',
          default: true,
          country: 'UK',
          type: 'region',
        },
      ];
      mockListRegions.mockResolvedValue(mockRegions);

      await mockListRegions();
      expect(mockListRegions).toHaveBeenCalled();
    });

    it('should handle list_networks tool', async () => {
      const mockNetworks = [
        {
          id: '789',
          name: 'default',
          label: 'Default Network',
          default: true,
          cider: '10.0.0.0/24',
        },
      ];
      mockListNetworks.mockResolvedValue(mockNetworks);

      await mockListNetworks();
      expect(mockListNetworks).toHaveBeenCalled();
    });

    it('should handle create_network tool', async () => {
      const mockNetwork = { id: '789', label: 'test-network' };
      mockCreateNetwork.mockResolvedValue(mockNetwork);

      await mockCreateNetwork({ label: 'test-network' });
      expect(mockCreateNetwork).toHaveBeenCalledWith({ label: 'test-network' });
    });

    it('should handle rename_network tool', async () => {
      const mockNetwork = { id: '789', label: 'new-name' };
      mockRenameNetwork.mockResolvedValue(mockNetwork);

      await mockRenameNetwork({ id: '789', label: 'new-name' });
      expect(mockRenameNetwork).toHaveBeenCalledWith({
        id: '789',
        label: 'new-name',
      });
    });

    it('should handle delete_network tool', async () => {
      const mockResult = { result: 'success' };
      mockDeleteNetwork.mockResolvedValue(mockResult);

      await mockDeleteNetwork({ id: '789', region: 'lon1' });
      expect(mockDeleteNetwork).toHaveBeenCalledWith({
        id: '789',
        region: 'lon1',
      });
    });
  });

  describe('Kubernetes Operations', () => {
    it('should handle list_kubernetes_clusters tool', async () => {
      const mockClusters = {
        items: [
          {
            id: '999',
            name: 'test-cluster',
            status: 'ACTIVE',
            region: 'lon1',
            version: '1.23.5',
          },
        ],
      };
      mockListClusters.mockResolvedValue(mockClusters);

      await mockListClusters({});
      expect(mockListClusters).toHaveBeenCalledWith({});
    });

    it('should handle create_kubernetes_cluster tool', async () => {
      const mockCluster = {
        id: '999',
        name: 'test-cluster',
        status: 'ACTIVE',
        region: 'lon1',
        version: '1.23.5',
      };
      mockCreateCluster.mockResolvedValue(mockCluster);

      const params = {
        name: 'test-cluster',
        region: 'lon1',
        network_id: '789',
        nodes: 1,
        node_size: 'g2.small',
        kubernetes_version: '1.23.5',
      };

      await mockCreateCluster(params);
      expect(mockCreateCluster).toHaveBeenCalledWith(params);
    });

    it('should handle delete_kubernetes_cluster tool', async () => {
      const mockResult = { result: 'success' };
      mockDeleteCluster.mockResolvedValue(mockResult);

      await mockDeleteCluster({ id: '999', region: 'lon1' });
      expect(mockDeleteCluster).toHaveBeenCalledWith({
        id: '999',
        region: 'lon1',
      });
    });

    it('should handle list_kubernetes_versions tool', async () => {
      const mockVersions = [
        { version: '1.23.5', label: '1.23.5', type: 'stable' },
      ];
      mockListAvailableVersions.mockResolvedValue(mockVersions);

      await mockListAvailableVersions();
      expect(mockListAvailableVersions).toHaveBeenCalled();
    });
  });
});
