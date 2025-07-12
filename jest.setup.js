// Set NODE_ENV to test for all tests
process.env.NODE_ENV = 'test';

// Set a default CIVO_API_KEY for tests if not already set
if (!process.env.CIVO_API_KEY) {
  process.env.CIVO_API_KEY = 'test-api-key-for-jest';
}
