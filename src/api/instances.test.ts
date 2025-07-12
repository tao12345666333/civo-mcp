import { createInstance, listInstances, rebootInstance, shutdownInstance, startInstance, resizeInstance, deleteInstance } from './instances';
import { CIVO_API_URL } from './civo';

jest.mock('./civo', () => ({
  ...jest.requireActual('./civo'),
  checkRateLimit: jest.fn(),
}));

global.fetch = jest.fn();

describe('Instances API', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should create an instance', async () => {
    const mockData = { id: '1', hostname: 'test-instance' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const params = { hostname: 'test-instance', size: 'g2.small', template_id: '123' };
    const result = await createInstance(params);

    expect(fetch).toHaveBeenCalledWith(`${CIVO_API_URL}/instances`, expect.any(Object));
    expect(result).toEqual(mockData);
  });

  it('should list instances', async () => {
    const mockData = { items: [{ id: '1', hostname: 'test-instance' }] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await listInstances({});
    expect(fetch).toHaveBeenCalledWith(`${CIVO_API_URL}/instances`, expect.any(Object));
    expect(result).toEqual(mockData);
  });

  it('should reboot an instance', async () => {
    const mockResponse = { result: 'success' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const params = { id: '1', region: 'lon1' };
    const result = await rebootInstance(params);

    expect(fetch).toHaveBeenCalledWith(`${CIVO_API_URL}/instances/1/reboots`, expect.objectContaining({ 
      method: 'POST',
      body: expect.any(URLSearchParams)
    }));
    expect(result).toEqual(mockResponse);
  });

  it('should shutdown an instance', async () => {
    const mockResponse = { result: 'success' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const params = { id: '1', region: 'lon1' };
    const result = await shutdownInstance(params);

    expect(fetch).toHaveBeenCalledWith(`${CIVO_API_URL}/instances/1/stop`, expect.objectContaining({ 
      method: 'PUT',
      body: expect.any(URLSearchParams)
    }));
    expect(result).toEqual(mockResponse);
  });

  it('should start an instance', async () => {
    const mockResponse = { result: 'success' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const params = { id: '1', region: 'lon1' };
    const result = await startInstance(params);

    expect(fetch).toHaveBeenCalledWith(`${CIVO_API_URL}/instances/1/start`, expect.objectContaining({ 
      method: 'PUT',
      body: expect.any(URLSearchParams)
    }));
    expect(result).toEqual(mockResponse);
  });

  it('should resize an instance', async () => {
    const mockResponse = { result: 'success' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const params = { id: '1', size: 'g2.medium', region: 'lon1' };
    const result = await resizeInstance(params);

    const expectedUrl = new URL(`${CIVO_API_URL}/instances/1/resize`);
    expectedUrl.searchParams.set('region', 'lon1');

    expect(fetch).toHaveBeenCalledWith(expectedUrl.toString(), expect.objectContaining({ method: 'PUT' }));
    expect(result).toEqual(mockResponse);
  });

  it('should delete an instance', async () => {
    const mockResponse = { result: 'success' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const params = { id: '1', region: 'lon1' };
    const result = await deleteInstance(params);

    const expectedUrl = new URL(`${CIVO_API_URL}/instances/1`);
    expectedUrl.searchParams.set('region', 'lon1');

    expect(fetch).toHaveBeenCalledWith(expectedUrl.toString(), expect.objectContaining({ method: 'DELETE' }));
    expect(result).toEqual(mockResponse);
  });
});