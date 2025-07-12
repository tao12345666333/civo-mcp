import { listRegions } from './regions.js';
import { CIVO_API_URL } from './civo.js';

jest.mock('./civo', () => ({
  ...jest.requireActual('./civo'),
  checkRateLimit: jest.fn(),
}));

global.fetch = jest.fn();

describe('Regions API', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should list regions', async () => {
    const mockData = [{ id: '1', name: 'test-region' }];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await listRegions();
    expect(fetch).toHaveBeenCalledWith(
      `${CIVO_API_URL}/regions`,
      expect.any(Object)
    );
    expect(result).toEqual(mockData);
  });
});
