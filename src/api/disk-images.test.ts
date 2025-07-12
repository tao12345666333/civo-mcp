import { listDiskImages, getDiskImage } from './disk-images';
import { CIVO_API_URL } from './civo';

jest.mock('./civo', () => ({
  ...jest.requireActual('./civo'),
  checkRateLimit: jest.fn(),
}));

global.fetch = jest.fn();

describe('Disk Images API', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should list disk images', async () => {
    const mockData = { items: [{ id: '1', name: 'test-image' }] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await listDiskImages({});
    expect(fetch).toHaveBeenCalledWith(`${CIVO_API_URL}/disk_images`, expect.any(Object));
    expect(result).toEqual({ items: mockData });
  });

  it('should get a disk image', async () => {
    const mockData = { id: '1', name: 'test-image' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const params = { id: '1', region: 'lon1' };
    const result = await getDiskImage(params);

    const expectedUrl = new URL(`${CIVO_API_URL}/disk_images/1`);
    expectedUrl.searchParams.set('region', 'lon1');

    expect(fetch).toHaveBeenCalledWith(expectedUrl.toString(), expect.any(Object));
    expect(result).toEqual(mockData);
  });
});