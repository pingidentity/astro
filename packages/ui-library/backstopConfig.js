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

const sanitizeLabel = label => label.replace(/\W/g, "");
const transformTestProps = baseUrl => ({
    root,
    label,
    section = label,
}) => ({
    ...scenarioDefaults,
    url: `http://${baseUrl}:8085/#/?selectedSection=${sanitizeLabel(section)}&selectedNode=${sanitizeLabel(label)}&root=${sanitizeLabel(root)}`,
});

// Walk through directories, finding all of the backstop test files
const getTests = baseUrl => (path = "", tests = []) => {
    if (isBackstopTest(path)) {
        const componentTests = require(path);
        return [
            // Add defaults into each test
            ...tests.map(transformTestProps(baseUrl)),
            ...componentTests
        ];
    } else if (isDirectory(path)) {
        return fs.readdirSync(path).reduce((testAcc, dirPath) =>
            getTests(baseUrl)(`${path}/${dirPath}`, testAcc), tests);
    } else {
        return tests;
    }
};

const skippedDemos = [
    "Checkbox",
    "Documentation",
    "DashboardLayout",
    "DonutCard",
    "EllipsisLoader",
    "HeatmapCard",
    "PageSpinner",
    "Spinner",
    "TimeZone"
];

// Remove require statements to avoid parsing and resolving them
const demosWithoutRequires = fs.readFileSync("./src/demo/core/demos.js")
    .toString()
    .replace(/(?<=demo: ).*?(?=,)/g, "\"\"");
// Parse out just module.exports, then use eval to convert that string into
// an object. I would use JSON.parse, but demos.js includes trailing commas
// and property names that aren't in quotes.
const demos = eval(`(
    ${demosWithoutRequires.substring(
        demosWithoutRequires.lastIndexOf("module.exports = ") + 10,
        demosWithoutRequires.lastIndexOf(";")
    )}
)`);

const generateBaseDemoTests = ({
    baseUrl,
    root,
    section
}) => nodes => nodes.flatMap(({
    children,
    label
}) => {
    const id = sanitizeLabel(label);
    if (skippedDemos.includes(id)) {
        return [];
    }
    return children === undefined
        ? [{
            label,
            url: `http://${baseUrl}:8085/#/?selectedSection=${section || id}&selectedNode=${id}&root=${root}`,
            selectors: [
                root === "Templates" ? ".demo-item" : ".output"
            ],
            delay: section === "Dashboard" ? 2500 : 0
        }]
        : generateBaseDemoTests({
            baseUrl,
            root: root || id,
            section: root && !section ? id : section
        })(children);
});

const generateConfig = environment => {
    // Set the URL based on whether this is a local run, since we use the Backstop Docker
    // option locally and just run directly from our own Gitlab Docker image in CI.
    const baseUrl = environment === "local" ? "host.docker.internal" : "localhost";

    const baseTests = generateBaseDemoTests({ baseUrl })(demos);

    const componentTests = getTests(baseUrl)("./src/components");
    const templateTests = getTests(baseUrl)("./src/templates");

    return {
        "id": "ui_lib",
        "viewports": [
            {
                label: "Large height, standard width",
                width: 1440,
                height: 3000
            }
        ],
        "scenarios": [...baseTests, ...templateTests, ...componentTests],
        "paths": {
            "bitmaps_reference": "backstop_data/bitmaps_reference",
            "bitmaps_test": "backstop_data/bitmaps_test",
            "engine_scripts": "backstop_data/engine_scripts",
            "html_report": "backstop_data/html_report",
            "ci_report": "backstop_data/ci_report"
        },
        "report": [environment === "local" ? "browser" : "ci"],
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
};

module.exports = generateConfig;
