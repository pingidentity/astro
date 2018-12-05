// require CI configuration

var configCI = require("./wdio.conf.js").config;

var localScreenshotOpts = Object.assign({}, configCI.screenshotOpts,
    {
        useScreenshotTool: false,
    });

// yes the spread operator would make this easier, no the version of node we use does not support it...
var localDockerOptionsOptions = Object.assign(
    {},
    configCI.dockerOptions.options,
    { net: null }
);

var localDockerOptions = Object.assign(
    {},
    configCI.dockerOptions,
    { options: localDockerOptionsOptions }
);
// Custom properties
var configLocal = {
    baseUrl: "http://docker.for.mac.localhost:8080",
    screenshotOpts: localScreenshotOpts,
    dockerOptions: localDockerOptions,
    deprecationWarnings: false,
};

// clone prod config and add new properties/overrides
exports.config = Object.assign({}, configCI, configLocal);
