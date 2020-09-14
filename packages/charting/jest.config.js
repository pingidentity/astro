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
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    },
};
