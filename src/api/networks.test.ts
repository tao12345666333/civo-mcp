import {
  listNetworks,
  createNetwork,
  renameNetwork,
  deleteNetwork,
} from './networks.js';
import { CIVO_API_URL } from './civo.js';

jest.mock('./civo', () => ({
  ...jest.requireActual('./civo'),
  checkRateLimit: jest.fn(),
}));

global.fetch = jest.fn();

describe('Networks API', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should list networks', async () => {
    const mockData = [{ id: '1', name: 'test-network' }];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await listNetworks();
    expect(fetch).toHaveBeenCalledWith(
      `${CIVO_API_URL}/networks`,
      expect.any(Object)
    );
    expect(result).toEqual(mockData);
  });

  it('should create a network', async () => {
    const mockData = { id: '1', name: 'test-network' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const params = { label: 'test-network' };
    const result = await createNetwork(params);

    expect(fetch).toHaveBeenCalledWith(
      `${CIVO_API_URL}/networks`,
      expect.any(Object)
    );
    expect(result).toEqual(mockData);
  });

  it('should rename a network', async () => {
    const mockResponse = { result: 'success' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const params = { id: '1', label: 'new-name', region: 'lon1' };
    const result = await renameNetwork(params);

    expect(fetch).toHaveBeenCalledWith(
      `${CIVO_API_URL}/networks/1`,
      expect.objectContaining({
        method: 'PUT',
        body: expect.any(String),
      })
    );
    expect(result).toEqual(mockResponse);
  });

  it('should delete a network', async () => {
    const mockResponse = { result: 'success' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const params = { id: '1', region: 'lon1' };
    const result = await deleteNetwork(params);

    const expectedUrl = new URL(`${CIVO_API_URL}/networks/1`);
    expectedUrl.searchParams.set('region', 'lon1');

    expect(fetch).toHaveBeenCalledWith(
      expectedUrl.toString(),
      expect.objectContaining({ method: 'DELETE' })
    );
    expect(result).toEqual(mockResponse);
  });
});
