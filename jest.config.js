module.exports = {
  testPathIgnorePatterns: [
    '/dist/'
  ],
  coveragePathIgnorePatterns: [
    '/dist/'
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  }
};