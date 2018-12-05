// require CI configuration
var configDev = require("./wdio.dev.conf.js").config;

// yes the spread operator would make this easier, no the version of node we use does not support it...
var debugDockerOptionsOptions = Object.assign(
    {},
    configDev.dockerOptions.options,
    { p: ["4444:4444", "5901:5900"] }
);

var debugDockerOptions = Object.assign(
    {},
    configDev.dockerOptions,
    { options: debugDockerOptionsOptions, image: "selenium/standalone-firefox-debug", }
);
// Custom properties
var configLocal = {
    dockerOptions: debugDockerOptions,
    //so you can see everything
    maxInstances: 1,
    onDockerReady: function() {
    },
};

// find "Vnc viewer.app"  !  -prune -o -print

// clone prod config and add new properties/overrides
exports.config = Object.assign({}, configDev, configLocal);
