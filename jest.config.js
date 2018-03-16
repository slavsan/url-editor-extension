module.exports = {
  transform: {
    "^.+\\.jsx?$": 'babel-jest',
  },
  collectCoverage: false,
  coverageReporters: ['lcov', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 2.12,
      functions: 2.05,
      lines: 2.4,
      statements: 1.87
    }
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!**/coverage/**",
    "!**/test/**",
    "!**/build/**",
    "!**/node_modules/**"
  ]
}
