import { listSizes } from './sizes.js';
import { CIVO_API_URL } from './civo.js';

jest.mock('./civo', () => ({
  ...jest.requireActual('./civo'),
  checkRateLimit: jest.fn(),
}));

global.fetch = jest.fn();

describe('Sizes API', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should list sizes', async () => {
    const mockData = [{ id: '1', name: 'test-size' }];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await listSizes();
    expect(fetch).toHaveBeenCalledWith(
      `${CIVO_API_URL}/sizes`,
      expect.any(Object)
    );
    expect(result).toEqual(mockData);
  });
});
