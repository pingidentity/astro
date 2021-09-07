module.exports = {
    "rootDir": "./",
    "unmockedModulePathPatterns": [
        "<rootDir>/node_modules",
        "<rootDir>/src/util/Utils.js",
        "<rootDir>/src/testutil/TestUtils.js",
        "<rootDir>/src/util/ReduxTestUtils.js",
        "<rootDir>/src/util/ReactWithDefaultMethods.js"
    ],
    "testMatch": [
        "**/tests/**/*.js?(x)"
    ],
    "testPathIgnorePatterns": [
        "/node/",
        "/node_modules/",
        "/tests/coverage/",
        "/build/",
        "/demo/",
        "/dist/",
        "/src/selenium/tests",
        "commonTests.js?(x)",
        "Backstop",
    ],
    "modulePathIgnorePatterns": [
        "/node/",
        "/build/",
        "/dist/"
    ],
    "setupFiles": [
        "<rootDir>/src/util/polyfills.js",
        "<rootDir>/src/devUtil/enzymeSetup.js",
        "<rootDir>/src/devUtil/jestSetup.js"
    ],
    "setupFilesAfterEnv": [
        "<rootDir>/src/devUtil/jestAfterEnvSetup.js"
    ],
    "coverageThreshold": {
        "./src/**/*.*": {
            "lines": 92,
            "functions": 92,
            "branches": 80
        }
    },
    "transform": {
        "^.+\\.js$": "babel-jest",
        "\\.jsx?$": ["babel-jest", { rootMode: "upward" }],
        "^.+\\.svg$": "<rootDir>/svgTransform.js"
    },
    "coveragePathIgnorePatterns": [
        "testutil/TestUtils.js",
        "tooltips/HelpHint.jsx",
        "util/dragScroll.js",
        "util/format.js",
        "BackgroundLoader.jsx",
        "util/ReduxTestUtils.js",
        "wizard/Progress.jsx",
        "wizard/Choose.jsx",
    ]
};
