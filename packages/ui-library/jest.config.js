module.exports = {
    "rootDir": "./",
    resolver: require.resolve(`jest-pnp-resolver`),
    "testMatch": [
        "**/tests/**/*.js?(x)"
    ],
    "testPathIgnorePatterns": [
        "/.yarn/",
        "/build/",
        "/demo/",
        "/dist/",
        "/node/",
        "/src/selenium/tests",
        "/tests/coverage/",
        "Backstop",
        "commonTests.js?(x)",
    ],
    "modulePathIgnorePatterns": [
        "<rootDir>/build/",
        "<rootDir>/demo/",
        "<rootDir>/dist/",
        "<rootDir>/lib/",
        "<rootDir>/node/",
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
