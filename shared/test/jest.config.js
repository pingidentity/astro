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
  ],
  transform: {
      '\\.jsx?$': ['babel-jest', { rootMode: 'upward' }],
  },
};
