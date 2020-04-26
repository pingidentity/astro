const fs = require("fs");

const isBackstopTest = path => path && path.endsWith("Backstop.js");
const isDirectory = path => fs.lstatSync(path).isDirectory();

const scenarioDefaults = {
    delay: 200,
    postInteractionWait: 0,
    misMatchThreshold: 0.1,
    requireSameDimensions: true,
    readyEvent: "backstop ready",
    onReadyScript: "puppet/onReady.js",
};

const sanitizeLabel = label => label.replace(/\W/g, "");
const transformTestProps = baseUrl => ({
    root,
    label,
    section = label,
    sublabel = "",
    ...properties
}) => ({
    label: `${label}${sublabel && "__"}${sublabel}`,
    ...scenarioDefaults,
    url: `http://${baseUrl}/#/?selectedSection=${sanitizeLabel(section)}&selectedNode=${sanitizeLabel(label)}&root=${sanitizeLabel(root)}`,
    ...properties
});

// Walk through directories, finding all of the backstop test files
const getTests = baseUrl => (path = "", tests = []) => {
    if (isBackstopTest(path)) {
        const componentTests = require(path);
        return [
            // Add defaults into each test
            ...tests,
            ...componentTests.map(transformTestProps(baseUrl))
        ];
    } else if (isDirectory(path)) {
        return fs.readdirSync(path).reduce((testAcc, dirPath) =>
            getTests(baseUrl)(`${path}/${dirPath}`, testAcc), tests);
    } else {
        return tests;
    }
};

const skippedDemos = [
    "Calendar",
    "ChartLayout",
    "Checkbox",
    "Documentation",
    "DashboardLayout",
    "DonutCard",
    "EllipsisLoader",
    "HeatmapCard",
    "LineChart",
    "PageSpinner",
    "Spinner",
    "TimeZone",
    "ChartLayout"
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
            url: `http://${baseUrl}/#/?selectedSection=${section || id}&selectedNode=${id}&root=${root}`,
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

const generateConfig = (environment, port) => {
    // Set the URL based on whether this is a local run, since we use the Backstop Docker
    // option locally and just run directly from our own Gitlab Docker image in CI.
    const baseUrl = `${environment === "local" ? "host.docker.internal" : "localhost"}:${port}`;

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
        "onBeforeScript": "puppet/mockCurrentDate.js",
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
