module.exports = {
    rootDir: './',
    unmockedModulePathPatterns: [
        '<rootDir>/node_modules',
    ],
    testMatch: [
        '**/**/*.verify.js?(x)',
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/lib/',
        '/dist/',
    ],
    moduleNameMapper: {
        '^.+\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
        '^.+\\.mdx$': '<rootDir>/__mocks__/mdxMock.js',
    },
    modulePathIgnorePatterns: [
        '/lib/',
        '/build/',
        '/dist/',
    ],
    setupFiles: [
    //     '<rootDir>/src/util/polyfills.js',
        '<rootDir>/src/devUtil/enzymeSetup.js',
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
        '.story.js',
    ],
};
