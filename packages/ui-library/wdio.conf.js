// added sub folders to store baseline for specific browser
var baseLineRoot = "./src/selenium/base-screenshot/";
var browserName = "";
var argv7 = (process && process.argv && (process.argv.length > 7)) ? process.argv[7] : "";
switch (argv7) {
    case "--ie11":
        baseLineRoot += "InternetExplorer11/";
        browserName = "ie11";
        break;
    case "--ie10":
        baseLineRoot += "InternetExplorer10/";
        browserName = "ie10";
        break;
    case "--chrome":
        baseLineRoot += "chrome/";
        browserName = "chrome";
        break;
    case "--safari":
        baseLineRoot += "safari/";
        browserName = "safari";
        break;
    default:
        baseLineRoot += "firefox/";
        browserName = "firefox";
}

exports.config = {

    host: "127.0.0.1",
    port: 4444,
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        "./src/selenium/tests/**/*IntegrationTest.js"
    ],

    // Patterns to exclude.
    exclude: [
        // "path/to/excluded/files"
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let"s
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 4,
    capabilities: [{
        browserName: "firefox"
    }],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async way
    // e.g. using promises you can set the sync option to false.
    sync: true,
    //
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: "error",
    //
    // Enables colors for log output.
    coloredLogs: true,
    //
    // Saves a screenshot to a given path if a command fails.
    // screenshotPath: "./errorShots/",
    //
    // Set a base URL in order to shorten url command calls. If your url parameter starts
    // with "/", then the base url gets prepended.
    baseUrl: "http://localhost:8080",
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 30000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn"t send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Initialize the browser instance with a WebdriverIO plugin. The object should have the
    // plugin name as key and the desired plugin options as properties. Make sure you have
    // the plugin installed before running any tests. The following plugins are currently
    // available:
    // WebdriverCSS: https://github.com/webdriverio/webdrivercss
    // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
    // Browserevent: https://github.com/webdriverio/browserevent
    // plugins: {
    //     webdrivercss: {
    //         screenshotRoot: "my-shots",
    //         failedComparisonsRoot: "diffs",
    //         misMatchTolerance: 0.05,
    //         screenWidth: [320,480,640,1024]
    //     },
    //     webdriverrtc: {},
    //     browserevent: {}
    // },
    //
    // Test runner services
    // Services take over a specific job you don"t want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don"t add new
    // commands. Instead, they hook themselves up into the test process.
    // services: [],//
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: http://webdriver.io/guide/testrunner/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: "jasmine",
    //
    // Test reporter for stdout.
    // The following are supported: dot (default), spec, and xunit
    // see also: http://webdriver.io/guide/testrunner/reporters.htm
    reporters: ["dot","junit"],
    reporterOptions: {
        junit: {
            outputDir: "./reports"
        }
    },
    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        //
        // Jasmine default timeout
        defaultTimeoutInterval: 60000,
        //
        // The Jasmine framework allows interception of each assertion in order to log the state of the application
        // or website depending on the result. For example, it is pretty handy to take a screenshot every time
        // an assertion fails.
        // expectationResultHandler: function (passed, assertion) {
        // }
    },

    screenshotOpts: {
        useScreenshotTool: true, // turn on or off screenshot validation
        // Screenshot directory should end with "/" character otherwise the code will not work as expected
        tempRoot: "./build/temp-screenshot/",
        diffRoot: "./build/diff-screenshot/",
        baseLineRoot: baseLineRoot,
        tolerance: 0, // 0..100 - floating point values are allowed; the percentage of pixels which are allowed for the screenshot comparison to still succeed
        maxScreenshotAttempt: 2, // number of retry time when the comparison is failed. set to 1 if you want to turn it off
        retryInterval: 500, // delay time after failed comparison
        unstableScreenshots: [ // list of baseline screenshots which are flaky during validation; an error will be logged, but they will not fail the build
            "TemplatesEditViewCollapsible_ExpandedAddress",
            "TemplatesWizardView_Wizard2Step3"
        ],
        comparisonWaitTime: 10000 // how long to wait for the comparison to finish
    },

    // number of retries (set to 0 for no retry) for failed tests
    testRetryCount: 2,
    // how many milliseconds to wait between test retries
    testRetryWaitTime: 1000,

    //
    // =====
    // Hooks
    // =====
    // WedriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    //
    // Gets executed once before all workers get launched.
    onPrepare: function (config, capabilities) {
        // this is to support running a single IT instead of all ITs
        if (config.suite) {
            var re = /(?:\.([^./]+))?$/;
            var fileExt = re.exec(config.suite)[0];

            if (fileExt === ".js") {
                config.specs = [config.suite];
            }
        }

        switch (browserName) {
            case "chrome":
                capabilities[0].browserName = "chrome";
                capabilities[0].platform = "OS X 10.11";
                capabilities[0].version = "54";
                capabilities[0].screenResolution = "1376x1032";
                capabilities[0].maxInstances = 1;
                capabilities[0].tunnelIdentifier = "uilibrary";
                break;
            case "safari":
                capabilities[0].browserName = "safari";
                capabilities[0].platform = "OS X 10.11";
                capabilities[0].version = "10";
                capabilities[0].screenResolution = "1376x1032";
                capabilities[0].maxInstances = 1;
                capabilities[0].tunnelIdentifier = "uilibrary";
                break;
            case "ie11":
                capabilities[0].browserName = "internet explorer";
                capabilities[0].platform = "WIN10";
                capabilities[0].version = "11";
                capabilities[0].screenResolution = "1400x1050";
                capabilities[0].maxInstances = 1;
                capabilities[0].tunnelIdentifier = "uilibrary";
                break;
            case "ie10":
                capabilities[0].browserName = "internet explorer";
                capabilities[0].platform = "WIN8";
                capabilities[0].version = "10";
                capabilities[0].screenResolution = "1400x1050";
                capabilities[0].maxInstances = 1;
                capabilities[0].tunnelIdentifier = "uilibrary";
                break;
            default:
                break;
        }

        // support job name for single IT on Saucelab (only for other browser except firefox)
        if (browserName === "chrome" ||
            browserName === "safari" ||
            browserName === "ie11" ||
            browserName === "ie10") {
            var folders = config.specs[0].split("/");
            var testFile = folders[folders.length - 1];
            capabilities.forEach(function (capability) {
                capability.name = testFile;
            });
        }
    },

    //
    // Gets executed before test execution begins. At this point you can access all global
    // variables, such as `browser`. It is the perfect place to define custom commands.
    // before: function (capabilities, specs) {
    // },
    //
    // Hook that gets executed before the suite starts
    // beforeSuite: function (suite) {
    // },
    //
    // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
    // beforeEach in Mocha)
    // beforeHook: function () {
    // },
    //
    // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
    // afterEach in Mocha)
    // afterHook: function () {
    // },
    //
    // Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
    // beforeTest: function (test) {
    // },
    //
    // Runs before a WebdriverIO command gets executed.
    // beforeCommand: function (commandName, args) {
    // },
    //
    // Runs after a WebdriverIO command gets executed
    // afterCommand: function (commandName, args, result, error) {
    // },
    //
    // Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
    // afterTest: function (test) {
    //    console.log(test);
    // },
    //
    // Hook that gets executed after the suite has ended
    // afterSuite: function (suite) {
    // },
    //
    // Gets executed after all tests are done. You still have access to all global variables from
    // the test.
    // after: function (capabilities, specs) {
    // },
    //
    // Gets executed after all workers got shut down and the process is about to exit. It is not
    // possible to defer the end of the process using a promise.
    onComplete: function () {
        var exec = require("child_process").exec;
        exec("kill $(ps -ef | grep -E 'selenium|http-server' | awk '{print $2}') exit");
        process.exit();
    }
};
