const fs = require("fs");

const isBackstopTest = path => path && path.endsWith("Backstop.js");
const isDirectory = path => fs.lstatSync(path).isDirectory();

const scenarioDefaults = {
    delay: 200,
    postInteractionWait: 0,
    misMatchThreshold: 0.1,
    requireSameDimensions: true,
    readyEvent: "backstop ready"
};

// Walk through directories, finding all of the backstop test files
function getTests(path = "", tests = []) {
    if (isBackstopTest(path)) {
        const componentTests = require(path);
        return [
            // Add defaults into each test
            ...tests.map(test => ({ ...scenarioDefaults, ...test })),
            ...componentTests
        ];
    } else if (isDirectory(path)) {
        return fs.readdirSync(path).reduce((testAcc, dirPath) =>
            getTests(`${path}/${dirPath}`, testAcc), tests);
    } else {
        return tests;
    }
}

const componentTests = getTests("./src/components");
const templateTests = getTests("./src/templates");

module.exports = {
    "id": "ui_lib",
    "viewports": [
        {
            label: "MacBook Pro",
            width: 1440,
            height: 900
        }
    ],
    "scenarios": [...templateTests, ...componentTests],
    "paths": {
        "bitmaps_reference": "backstop_data/bitmaps_reference",
        "bitmaps_test": "backstop_data/bitmaps_test",
        "engine_scripts": "backstop_data/engine_scripts",
        "html_report": "backstop_data/html_report",
        "ci_report": "backstop_data/ci_report"
    },
    "report": ["browser"],
    "engine": "puppeteer",
    "engineOptions": {
        "args": ["--no-sandbox"]
    },
    "asyncCaptureLimit": 5,
    "asyncCompareLimit": 50,
    "debug": false,
    "debugWindow": false,
    "misMatchThreshold": 0.01
};
