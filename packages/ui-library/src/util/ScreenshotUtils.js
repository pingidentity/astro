/*global browser:true */
var fs = require("fs");
var im = require("./ImageMagick.js");
var wdioConfig = require("../../wdio.conf.js").config;
var tempRoot = wdioConfig.screenshotOpts.tempRoot;
var baseLineRoot = wdioConfig.screenshotOpts.baseLineRoot;
var diffRoot = wdioConfig.screenshotOpts.diffRoot;
var globalEqualRatio = wdioConfig.screenshotOpts.globalEqualRatio;
var useScreenshotTool = wdioConfig.screenshotOpts.useScreenshotTool;
var activeBrowsers = wdioConfig.screenshotOpts.browsers;
var browserName = wdioConfig.capabilities[0].browserName;
var isScreenshotActive= (useScreenshotTool && activeBrowsers.indexOf(browserName) > -1)? true : false;

var ScreenshotUtils = {
    /**
     * @desc this function to create screenshot directories unless they doesn't exist
     */
    initializeScreenshotDir: function () {
        if (!fs.existsSync(baseLineRoot)) {
            fs.mkdirSync(baseLineRoot);
        }
        if (!fs.existsSync(tempRoot)) {
            fs.mkdirSync(tempRoot);
        }
        if (!fs.existsSync(diffRoot)) {
            fs.mkdirSync(diffRoot);
        }
    },



    getBaseLineScreenshotPath: function (fileName) {
        return baseLineRoot + fileName + "-BASELINE"+ ".png";
    },

    getCurrentScreenshotPath: function (fileName) {
        return tempRoot + fileName + "-CURRENT"+ ".png";
    },

    getDiffScreenshotPath: function (fileName) {
        return diffRoot + fileName + "-DIFF"+ ".png";
    },

    /**
     * @desc this function to take screenshot and and save to current screenshot directory
     * @param {string} fileName: name of screenshot file.
     */
    takeScreenshotAndSaveToCurrentPath: function (fileName) {
        if (isScreenshotActive) {
            this.initializeScreenshotDir();
            var currentPath = this.getCurrentScreenshotPath(fileName);
            this.takeScreenshotAndSave(currentPath);
        }
    },

    /**
     * @desc this function to take screenshot and and save to baseline screenshot directory
     * @param {string} fileName: name of screenshot file.
     */
    takeScreenshotAndSaveToBaselinePath: function (fileName) {
        if (isScreenshotActive) {
            this.initializeScreenshotDir();
            var baselinePath = this.getBaseLineScreenshotPath(fileName);
            this.takeScreenshotAndSave(baselinePath);
        }
    },

    takeScreenshotAndSave: function (path) {
        browser.saveScreenshot(path);
    },

    /**
     * @desc this function to compare screenshot with baseline and create diff image
     * @param {string} fileName: name of screenshot file.
     * @param {number} equalRatio By default it will be set to 0.
     * - This is an optional parameter to increase or decrease the accuracy
     * - Higher value is less accuracy
     * @returns {bool} true if they are matched and false if they are difference.
     */
    compareScreenshotWithBaseline: function (fileName, equalRatio) {
        var result = false;
        if (isScreenshotActive) {
            this.initializeScreenshotDir();
            var baselinePath = this.getBaseLineScreenshotPath(fileName);
            if (fs.existsSync(baselinePath)) {
                var currentPath = this.getCurrentScreenshotPath(fileName);
                var diffPath = this.getDiffScreenshotPath(fileName);
                var comp = im.compare(baselinePath, currentPath, diffPath, equalRatio? equalRatio: globalEqualRatio);
                // execute IM command line
                comp.then(function (data) {
                    if (data.error && parseInt(data.stderr) > 0) {
                        result = false;
                    } else if (!data.error && parseInt(data.stderr) === 0) {
                        result = true;
                        // remove diff screenshot if there is nothing difference
                        fs.unlinkSync(diffPath);
                    } else {
                        console.log("Error: "+ data.stderr);
                        result = false;
                    }
                });

                // wait for IM finishes its job
                browser.waitUntil(comp, 5000, 100);
            } else {
                this.takeScreenshotAndSaveToBaselinePath(fileName);
                result = true;
            }
        } else {
            result = true;
        }
        return result;
    },

    /**
     * @param {string} fileName: name of screenshot file.
     * @param {number} equalRatio By default it will be set to 0.
     * - This is an optional parameter to increase or decrease the accuracy
     * - Higher value is less accuracy
     * @returns {bool} true if they are matched and false if they are difference.
     */
    takeScreenShotAndCompareWithBaseline: function (fileName, equalRatio) {
        if (isScreenshotActive) {
            this.initializeScreenshotDir();
            var currentPath = this.getCurrentScreenshotPath(fileName);
            this.takeScreenshotAndSave(currentPath);
            return this.compareScreenshotWithBaseline(fileName, equalRatio);
        } else {
            return true;
        }
    }
};

module.exports = ScreenshotUtils;