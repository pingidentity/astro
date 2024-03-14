module.exports = {
  rootDir: './',
  resolver: require.resolve('jest-pnp-resolver'),
  testMatch: [
    '**/**/*.test.(js|ts)?(x)',
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
    '<rootDir>/src/utils/testUtils/setupTests.ts',
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
    '<rootDir>/src/index.ts',
    '<rootDir>/src/hooks/index.ts',
    '<rootDir>/src/context/*',
    'index.ts',
    '<rootDir>/.storybook/',
    '.(story|stories).(js|jsx|mdx|ts|tsx)',
    '<rootDir>/src/styles/',
    '.styles.js',
    '/styles/',
    '/utils/',
    // FIXME: upgrade RTL to v14 (UIP-6248), then fix test in useOverlappingMenuHoverState.test.js,
    // then remove this once test is fixed
    '/hooks/useOverlappingMenuHoverState/useOverlappingMenuHoverState.ts',
    '/components/AstroProvider/AstroProvider.js',
  ],
  transform: {
    '\\.jsx?$': ['babel-jest', { rootMode: 'upward' }],
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
