import { listClusters, createCluster, deleteCluster, listAvailableVersions } from './kubernetes.js';
import { CIVO_API_URL } from './civo.js';

jest.mock('./civo', () => ({
  ...jest.requireActual('./civo'),
  checkRateLimit: jest.fn(),
}));

global.fetch = jest.fn();

describe('Kubernetes API', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should list clusters', async () => {
    const mockData = { items: [{ id: '1', name: 'test-cluster' }] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await listClusters({});
    expect(fetch).toHaveBeenCalledWith(`${CIVO_API_URL}/kubernetes/clusters`, expect.any(Object));
    expect(result).toEqual(mockData);
  });

  it('should create a cluster', async () => {
    const mockData = { id: '1', name: 'test-cluster' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const params = { name: 'test-cluster', region: 'lon1', network_id: '123', nodes: 1, node_size: 'g2.small', kubernetes_version: '1.23.5' };
    const result = await createCluster(params);

    expect(fetch).toHaveBeenCalledWith(`${CIVO_API_URL}/kubernetes/clusters`, expect.any(Object));
    expect(result).toEqual(mockData);
  });

  it('should delete a cluster', async () => {
    const mockResponse = { result: 'success' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const params = { id: '1', region: 'lon1' };
    const result = await deleteCluster(params);

    const expectedUrl = new URL(`${CIVO_API_URL}/kubernetes/clusters/1`);
    expectedUrl.searchParams.set('region', 'lon1');

    expect(fetch).toHaveBeenCalledWith(expectedUrl.toString(), expect.objectContaining({ method: 'DELETE' }));
    expect(result).toEqual(mockResponse);
  });

  it('should list available versions', async () => {
    const mockData = [{ version: '1.23.5', label: '1.23.5', type: 'stable' }];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await listAvailableVersions();
    expect(fetch).toHaveBeenCalledWith(`${CIVO_API_URL}/kubernetes/versions`, expect.any(Object));
    expect(result).toEqual(mockData);
  });
});