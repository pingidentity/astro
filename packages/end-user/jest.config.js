const config = require('../../shared/test/jest.config.js');

module.exports = {
    ...config,
    unmockedModulePathPatterns: [
        ...config.unmockedModulePathPatterns,
        "<rootDir>/src/util",
        "<rootDir>/src/testutil"
    ],
    testPathIgnorePatterns: [
        ...config.testPathIgnorePatterns,
        "/node/",
        "/tests/coverage/",
        "/build/",
        "commonTests.js?(x)"
    ],
    modulePathIgnorePatterns: [
        ...config.modulePathIgnorePatterns,
        "/node/",
    ],
    setupFiles: [
        ...config.setupFiles,
        "<rootDir>/src/util/polyfills.js",
    ],
    moduleNameMapper: {
        ...config.moduleNameMapper,
        ".+\\.(svg)$": "jest-transform-stub"
    },
    coverageThreshold: {},
    "globals": {
        "END_USER_VERSION": "0.0.0"
    },
};
