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
        return browser.saveScreenshot(path);
    },

    takeElementScreenshotAndSave: function (path, elementSelector) {
        this.takeScreenshotAndSave(path);
        var size = browser.selectorExecute(elementSelector,
            "return { width: arguments[0][0].offsetWidth, height: arguments[0][0].offsetHeight};");
        var location = browser.getLocationInView(elementSelector);
        if (!size || !location) {
            console.log("Error: unable to crop screenshot due to offset or location is undefined: " + path);
        }
        return this.cropImage(path, size.width, size.height, location.x, location.y);
    },

    takeScreenshotThenSaveToCurrentDiff: function (fileName, elementSelector) {
        this.initializeScreenshotDir();
        var screenshotDiffPath = this.getDiffScreenshotPath(fileName),
            screenshotCurrentPath = this.getCurrentScreenshotPath(fileName);

        if (!elementSelector) {
            this.takeScreenshotAndSave(screenshotCurrentPath);
            this.takeScreenshotAndSave(screenshotDiffPath);
        } else {
            this.takeElementScreenshotAndSave(screenshotCurrentPath, elementSelector);
            this.takeElementScreenshotAndSave(screenshotDiffPath, elementSelector);
        }
    },

    /**
     * @desc this function to take screenshot and and save to baseline screenshot directory
     * @param {string} fileName: name of screenshot file.
     * @param {string} elementSelector: xpath to element.
     * @returns {bool} is completed
     */
    takeElementScreenshotAndSaveToBaselinePath: function (fileName, elementSelector) {
        if (isScreenshotActive) {
            this.initializeScreenshotDir();
            var baselinePath = this.getBaseLineScreenshotPath(fileName);
            return this.takeElementScreenshotAndSave(baselinePath, elementSelector);
        }
    },

    /**
     * @desc this function to take screenshot and and save to baseline screenshot directory
     * @param {string} fileName: name of screenshot file.
     * @param {string} elementSelector: xpath to element.
     * @returns {bool} is completed
     */
    takeElementScreenshotAndSaveToCurrentPath: function (fileName, elementSelector) {
        if (isScreenshotActive) {
            this.initializeScreenshotDir();
            var currentPath = this.getCurrentScreenshotPath(fileName);
            return this.takeElementScreenshotAndSave(currentPath, elementSelector);
        }
    },

    cropImage: function (path, width, height, x, y) {
        var crop = im.crop(path, path, width, height, x, y);
        var result = false;
        // execute IM command line
        crop.then(function (data) {
            if (!data.error) {
                result = true;
            } else {
                console.log("Error: "+ data.stderr);
                result = false;
            }
        });

        // wait for IM finishes its job
        browser.waitUntil(crop, 5000, 100);
        return result;
    },

    /**
     * @desc this function to compare screenshot with baseline and create diff image
     * @param {string} fileName: name of screenshot file.
     * @param {number} equalRatio By default it will be set to 0.
     * @param {string} elementSelector: xpath to element.
     * - This is an optional parameter to increase or decrease the accuracy
     * - Higher value is less accuracy
     * @returns {boolean} true if they are matched and false if they are difference.
     */
    compareScreenshotWithBaseline: function (fileName, equalRatio, elementSelector) {
        var result = false;
        var differentScreenshotSize = false;

        if (isScreenshotActive) {
            this.initializeScreenshotDir();
            var baselinePath = this.getBaseLineScreenshotPath(fileName);

            if (fs.existsSync(baselinePath)) {
                var currentPath = this.getCurrentScreenshotPath(fileName);
                var diffPath = this.getDiffScreenshotPath(fileName);
                var comp = im.compare(baselinePath, currentPath, diffPath, equalRatio);

                // execute IM command line
                comp.then(function (data) {
                    if (data.error && parseInt(data.stderr) > 0) {
                        result = false;
                    } else if (!data.error && parseInt(data.stderr) === 0) {
                        result = true;
                        // remove diff screenshot if there is nothing difference
                        fs.unlinkSync(diffPath);
                    } else {
                        if (data.stderr.indexOf("compare: image widths or heights differ") > -1) {
                            differentScreenshotSize = true;
                        }
                        console.log("Error: "+ data.stderr);
                        result = false;
                    }
                });

                // wait for IM finishes its job
                browser.waitUntil(comp, 5000, 100);
            } else {
                this.takeScreenshotThenSaveToCurrentDiff(fileName, elementSelector);
                result = false;
            }

            if (differentScreenshotSize && !fs.existsSync(diffPath)) {
                var label = "Cannot compare\n\nBase and New screenshot\nhave different size";
                im.createBlankImageWithText(label, diffPath);
                console.log("Error: Screenshot dimensions are different. Created a default diff screenshot");
            }
        } else {
            result = true;
        }
        return result;
    },

    /**
     * @desc this function to take screenshot then compare screenshot with baseline and create diff image
     * all transitions should have finished by the time this method is called
     * @param {string} fileName: name of screenshot file.
     * @param {number} equalRatio By default it will be set to 0.
     * - This is an optional parameter to increase or decrease the accuracy
     * - Higher value is less accuracy
     * @returns {boolean} true if they are matched and false if they are difference.
     */
    takeScreenShotAndCompareWithBaseline: function (fileName, equalRatio) {
        return this.takeElementScreenShotAndCompareWithBaseline(fileName, "//div[@data-id='components']", equalRatio);
    },

    /**
     * @desc this function to take element screenshot then compare it with baseline and create diff image
     * all transitions should have finished by the time this method is called
     * @param {string} fileName: name of screenshot file.
     * @param {string} elementSelector: xpath to element.
     * @param {number} equalRatio By default it will be set to 0.
     * - This is an optional parameter to increase or decrease the accuracy
     * - Higher value is less accuracy
     * @returns {bool} true if they are matched and false if they are difference.
     */
    takeElementScreenShotAndCompareWithBaseline: function (fileName, elementSelector, equalRatio) {
        var _equalRatio = equalRatio !== undefined ? equalRatio : globalEqualRatio;
        return this.takeScreenShotAndCompare(fileName, _equalRatio, elementSelector);
    },

    takeScreenShotAndCompare: function (fileName, equalRatio, elementSelector) {
        if (isScreenshotActive) {
            this.initializeScreenshotDir();
            var currentPath = this.getCurrentScreenshotPath(fileName),
                tryCount = 0,
                maxRetry = wdioConfig.screenshotOpts.maxScreenshotAttempt,
                isNoDiff = false,
                baselinePath = this.getBaseLineScreenshotPath(fileName);

            do {
                if (tryCount > 0) {
                    fs.unlinkSync(currentPath);
                    console.log("Compare failed, take other screenshot: " + fileName);
                }
                browser.pause(wdioConfig.screenshotOpts.retryInterval);
                if (elementSelector) {
                    this.takeElementScreenshotAndSaveToCurrentPath(fileName, elementSelector);
                    isNoDiff = this.compareScreenshotWithBaseline(fileName, equalRatio, elementSelector);
                } else {
                    this.takeScreenshotAndSave(currentPath);
                    isNoDiff = this.compareScreenshotWithBaseline(fileName, equalRatio);
                }
                tryCount += 1;
            }
            while (!isNoDiff && tryCount < maxRetry && fs.existsSync(baselinePath));

            return isNoDiff;
        } else {
            return true;
        }
    },
};
module.exports = ScreenshotUtils;
