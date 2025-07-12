import { createInstance, listInstances } from './api/instances.js';
import { listDiskImages } from './api/disk-images.js';

// Mock fetch
global.fetch = jest.fn();

// Mock the civo module
jest.mock('./api/civo', () => ({
  ...jest.requireActual('./api/civo'),
  checkRateLimit: jest.fn(),
  CIVO_API_KEY: 'mock-api-key',
  CIVO_API_URL: 'https://api.civo.com/v2'
}));

describe('Error Handling', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('API Error Responses', () => {
    it('should handle HTTP error responses in createInstance', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request'
      });

      await expect(createInstance({
        hostname: 'test',
        size: 'g2.small',
        template_id: '123'
      })).rejects.toThrow('Civo API error: 400 Bad Request');
    });

    it('should handle HTTP error responses in listInstances', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized'
      });

      await expect(listInstances({})).rejects.toThrow('Civo API error: 401 Unauthorized');
    });

    it('should handle HTTP error responses in listDiskImages', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      await expect(listDiskImages({})).rejects.toThrow('Civo API error: 500 Internal Server Error');
    });
  });

  describe('Network Errors', () => {
    it('should handle fetch rejection', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(createInstance({
        hostname: 'test',
        size: 'g2.small',
        template_id: '123'
      })).rejects.toThrow('Network error');
    });

    it('should handle timeout errors', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Request timeout'));

      await expect(listInstances({})).rejects.toThrow('Request timeout');
    });
  });

  describe('Invalid JSON Responses', () => {
    it('should handle invalid JSON in response', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON'))
      });

      await expect(createInstance({
        hostname: 'test',
        size: 'g2.small',
        template_id: '123'
      })).rejects.toThrow('Invalid JSON');
    });
  });

  describe('Parameter Validation', () => {
    it('should handle missing required parameters', async () => {
      // This would typically be caught by TypeScript, but testing runtime behavior
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({})
      });

      // Test with empty object - this should still work at runtime
      // but might not return expected results
      const result = await createInstance({
        hostname: '',
        size: '',
        template_id: ''
      });

      expect(fetch).toHaveBeenCalled();
    });
  });
});
