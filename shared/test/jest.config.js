module.exports = {
  rootDir: './',
  unmockedModulePathPatterns: [
      '<rootDir>/node_modules',
  ],
  testMatch: [
      '**/**/*.test.js?(x)',
  ],
  testPathIgnorePatterns: [
      '/node_modules/',
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
      '<rootDir>/../../shared/test/enzymeSetup.js',
  ],
  setupFilesAfterEnv: [
      '<rootDir>/../../shared/test/setupTests.js',
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
  ],
  transform: {
      '\\.jsx?$': ['babel-jest', { rootMode: 'upward' }],
  },
};
