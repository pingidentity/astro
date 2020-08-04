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
};
