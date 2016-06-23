/*
 * Remove the temp and diff screenshot directory.
 */
var rimraf = require("rimraf");
var wdioConfig = require("./wdio.conf.js").config;
var tempRoot = wdioConfig.screenshotOpts.tempRoot;
var diffRoot = wdioConfig.screenshotOpts.diffRoot;

rimraf(diffRoot, function (err) {
    if (err) {
        console.log("Error while deleting diff screenshot directory:", err);
    }
});

rimraf(tempRoot, function (err) {
    if (err) {
        console.log("Error while deleting temp screenshot directory:", err);
    }
});
