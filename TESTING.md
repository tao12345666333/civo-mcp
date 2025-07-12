# Testing Guide for Civo MCP Server

This document outlines the testing strategy and setup for the Civo MCP (Model Context Protocol) server.

## Overview

The project includes comprehensive tests covering:

- ✅ **API Functions**: All Civo API integration functions
- ✅ **Tool Definitions**: MCP tool schema validation 
- ✅ **Error Handling**: Network errors, API errors, and edge cases
- ✅ **Type Safety**: TypeScript interface compliance
- ✅ **Rate Limiting**: API rate limit enforcement

## Test Structure

```
src/
├── api/
│   ├── *.test.ts          # API function tests
│   ├── civo.test.ts       # Core utilities tests
│   └── ...
├── tools/
│   └── tools.test.ts      # Tool definition tests
├── error-handling.test.ts # Error scenario tests
├── server.test.ts         # Integration tests
└── index.test.ts          # Configuration tests
```

## Test Coverage

Current test coverage:
- **Statements**: 86.33%
- **Branches**: 61.66%
- **Functions**: 100%
- **Lines**: 88.76%

## Running Tests

### Basic Tests
```bash
npm test
```

### Tests with Coverage
```bash
npm run test:coverage
```

### Watch Mode (for development)
```bash
npm run test:watch
```

### CI Mode
```bash
npm run test:ci
```

### Using the Test Script
```bash
./scripts/run-tests.sh
```

## Test Categories

### 1. API Function Tests
Each API module has corresponding tests that mock HTTP requests and validate:
- Correct API endpoints are called
- Request parameters are properly formatted
- Response handling works correctly
- Error scenarios are handled appropriately

**Example:**
```typescript
it('should create an instance', async () => {
  const mockData = { id: '1', hostname: 'test-instance' };
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(mockData),
  });

  const result = await createInstance(params);
  expect(fetch).toHaveBeenCalledWith(expectedUrl, expectedOptions);
  expect(result).toEqual(mockData);
});
```

### 2. Tool Definition Tests
Validates that all MCP tool definitions have:
- Correct names and descriptions
- Proper input schema structures
- Required fields specification
- Type definitions

### 3. Error Handling Tests
Tests various failure scenarios:
- HTTP error responses (4xx, 5xx)
- Network failures
- Invalid JSON responses
- Rate limit exceeded
- Missing parameters

### 4. Integration Tests
Tests the interaction between different components:
- Tool handler functions
- API function calls
- Response formatting

## Test Setup

### Environment Variables
Tests require a mock API key:
```bash
export CIVO_API_KEY="test-api-key"
```

### Mocking Strategy
- **fetch**: Global fetch function is mocked for HTTP requests
- **API modules**: Individual API functions are mocked for integration tests
- **Rate limiting**: Isolated module state for consistent testing

## Best Practices

### Writing New Tests
1. **Follow AAA Pattern**: Arrange, Act, Assert
2. **Mock external dependencies**: Use Jest mocks for HTTP calls
3. **Test edge cases**: Include error scenarios and boundary conditions
4. **Clear test names**: Describe what is being tested
5. **Isolated tests**: Each test should be independent

### Example Test Template
```typescript
describe('Feature Name', () => {
  beforeEach(() => {
    // Setup mocks
    jest.clearAllMocks();
  });

  it('should handle normal operation', async () => {
    // Arrange
    const mockData = { /* test data */ };
    setupMock(mockData);

    // Act
    const result = await functionUnderTest(params);

    // Assert
    expect(result).toEqual(expectedResult);
    expect(mockFunction).toHaveBeenCalledWith(expectedParams);
  });

  it('should handle error cases', async () => {
    // Test error scenarios
    setupErrorMock();
    await expect(functionUnderTest(params)).rejects.toThrow('Expected error');
  });
});
```

## Continuous Integration

The test suite is designed to run in CI environments:
- No external dependencies required
- All network calls are mocked
- Deterministic test results
- Fast execution (< 10 seconds)

## Troubleshooting

### Common Issues

1. **Module resolution errors**: Ensure all imports use correct file extensions
2. **Mock not working**: Check that mocks are properly cleared between tests
3. **Type errors**: Verify mock objects match interface definitions
4. **Rate limit tests**: These tests may be affected by global state

### Debug Tips
- Use `npm run test:watch` for rapid feedback during development
- Add `console.log` statements to debug mock calls
- Check test output for specific error messages
- Verify environment variables are set correctly

## Future Improvements

- [ ] Add performance benchmarks
- [ ] Integration tests with real API (optional)
- [ ] Visual regression tests for CLI output
- [ ] Load testing for concurrent requests
- [ ] Contract testing for API compatibility

## Contributing

When adding new features:
1. Write tests first (TDD approach)
2. Ensure > 80% code coverage
3. Include both happy path and error cases
4. Update this documentation if needed
5. Run the full test suite before committing

---

For questions or issues with testing, please refer to the main project documentation or open an issue.
