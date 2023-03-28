module.exports = {
  rootDir: './',
  resolver: require.resolve('jest-pnp-resolver'),
  testMatch: [
    '**/**/*.test.js?(x)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.yarn/',
    '/lib/',
    '/dist/',
  ],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.mdx$': '<rootDir>/__mocks__/mdxMock.js',
    '\\.svg': '<rootDir>/__mocks__/svgrMock.js',
  },
  modulePathIgnorePatterns: [
    '/lib/',
    '/build/',
    '/dist/',
  ],
  setupFiles: [
    'jest-canvas-mock',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/utils/testUtils/setupTests.js',
  ],
  coverageThreshold: {
    global: {
      lines: 92,
      functions: 92,
      branches: 80,
    },
    './src/**/*.*': {
      lines: 92,
      functions: 92,
      branches: 80,
    },
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/.storybook/',
    '.(story|stories).(js|jsx|mdx)',
    '<rootDir>/src/styles/',
    '.styles.js',
    '/styles/',
    '/utils/',
  ],
  transform: {
    '\\.jsx?$': ['babel-jest', { rootMode: 'upward' }],
  },
};
