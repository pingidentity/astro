/*global browser:true */
var fs = require("fs");
var _ = require("underscore");
var im = require("./ImageMagick.js");
var wdioConfig = require("../../wdio.conf.js").config;
var ScreenshotComparisonException = require("./ScreenshotComparisonException.js");
var ComparisonExitCode = ScreenshotComparisonException.ComparisonExitCode;
var tempRoot = wdioConfig.screenshotOpts.tempRoot;
var baseLineRoot = wdioConfig.screenshotOpts.baseLineRoot;
var diffRoot = wdioConfig.screenshotOpts.diffRoot;
var globalTolerance = wdioConfig.screenshotOpts.tolerance || 0;
var unstableScreenshots = wdioConfig.screenshotOpts.unstableScreenshots || [];
var comparisonWaitTime = wdioConfig.screenshotOpts.comparisonWaitTime;
var isScreenshotActive = wdioConfig.screenshotOpts.useScreenshotTool;

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
        browser.waitUntil(crop, comparisonWaitTime, 100);
        return result;
    },

    /**
     * @desc this function to compare screenshot with baseline and create diff image
     * @param {string} fileName - name of screenshot file.
     * @param {string} [elementSelector] - xpath to element.
     * @param {number} [tolerance] - Increase or decrease the accuracy.
     *    Higher value makes for less accuracy.
     *    See the description on the param in wdio.conf.js for more details.
     * @returns {number} - number of different pixels between the current and the base screenshots;
     *    (see ComparisonExitCode for details)
     */
    compareScreenshotWithBaseline: function (fileName, elementSelector, tolerance) {
        var result;

        if (isScreenshotActive) {
            this.initializeScreenshotDir();
            var baselinePath = this.getBaseLineScreenshotPath(fileName);

            if (fs.existsSync(baselinePath)) {
                // if the comparison does not time out, this will get overwritten
                result = ComparisonExitCode.COMPARISON_TIMEOUT;

                // number of disimilar pixels allowed for the baseline
                // and the current screnshots to still be considered equal
                var disimilarPixelsAllowed = this.disimilarPixelsAllowed(baselinePath, tolerance);

                var currentPath = this.getCurrentScreenshotPath(fileName);
                var diffPath = this.getDiffScreenshotPath(fileName);
                var comp = im.compare(baselinePath, currentPath, diffPath);

                // execute IM command line
                comp.then(function (data) {
                    var error = (data.stderr || "").trim();
                    var diffPixelCount = Number(error);

                    if (diffPixelCount >= 0 && diffPixelCount <= disimilarPixelsAllowed) {
                        result = ComparisonExitCode.SUCCESS;

                        // remove diff screenshot if there is nothing difference
                        fs.unlinkSync(diffPath);
                    }
                    else if (diffPixelCount > disimilarPixelsAllowed) {
                        result = diffPixelCount;
                    }
                    else if (error.indexOf("image widths or heights differ") > -1) {
                        result = ComparisonExitCode.DIFFERENT_IMAGE_SIZE;

                        var label = "Cannot compare\n\nBase and New screenshot\nhave different size";
                        im.createBlankImageWithText(label, diffPath);
                        console.log("Error: Screenshot dimensions are different. Created a default diff screenshot");
                    }
                    else {
                        result = ComparisonExitCode.UNKNOWN_ERROR;
                    }
                });

                // wait for IM finishes its job
                browser.waitUntil(comp, comparisonWaitTime, 100);
            } else {
                result = ComparisonExitCode.NO_BASELINE;
                this.takeScreenshotThenSaveToCurrentDiff(fileName, elementSelector);
            }
        }
        return result;
    },

    /**
     * @desc this function to take screenshot then compare screenshot with baseline and create diff image
     * all transitions should have finished by the time this method is called
     * @param {string} fileName: name of screenshot file.
     * @param {number} [tolerance] - Increase or decrease the accuracy.
     *    Higher value makes for less accuracy.
     *    See the description on the param in wdio.conf.js for more details.
     * @throws {ScreenshotComparisonException}
     *    if the current screenshot does not match the baseline
     */
    takeScreenShotAndCompareWithBaseline: function (fileName, tolerance) {
        this.takeElementScreenShotAndCompareWithBaseline(
                fileName,
                "//div[@data-id='components']",
                tolerance);
    },

    /**
     * @desc this function to take element screenshot then compare it with baseline and create diff image
     * all transitions should have finished by the time this method is called
     * @param {string} fileName: name of screenshot file.
     * @param {string} elementSelector: xpath to element.
     * @param {number} [tolerance] - Increase or decrease the accuracy.
     *    Higher value makes for less accuracy.
     *    See the description on the param in wdio.conf.js for more details.
     * @throws {ScreenshotComparisonException}
     *    if the current screenshot does not match the baseline
     */
    takeElementScreenShotAndCompareWithBaseline: function (fileName, elementSelector, tolerance) {
        this.takeScreenShotAndCompare(fileName, elementSelector, tolerance);
    },

    takeScreenShotAndCompare: function (fileName, elementSelector, tolerance) {
        if (isScreenshotActive) {
            this.initializeScreenshotDir();
            var currentPath = this.getCurrentScreenshotPath(fileName),
                tryCount = 0,
                maxRetry = wdioConfig.screenshotOpts.maxScreenshotAttempt,
                result = 0,
                baselinePath = this.getBaseLineScreenshotPath(fileName);

            do {
                if (tryCount > 0) {
                    fs.unlinkSync(currentPath);
                    console.log("Comparison failed, taking other screenshot: " + fileName);
                }
                browser.pause(wdioConfig.screenshotOpts.retryInterval);
                if (browser.isExisting(elementSelector)) {
                    this.takeElementScreenshotAndSaveToCurrentPath(fileName, elementSelector);
                    result = this.compareScreenshotWithBaseline(fileName, elementSelector, tolerance);
                } else {
                    this.takeScreenshotAndSave(currentPath);
                    result = this.compareScreenshotWithBaseline(fileName, null, tolerance);
                }
                tryCount += 1;
            }
            while (result !== 0 && tryCount < maxRetry && fs.existsSync(baselinePath));

            if (result !== 0) {
                var error = new ScreenshotComparisonException(fileName, result);
                // this is a disgrace
                if (unstableScreenshots.indexOf(fileName) > -1) {
                    console.log("WARNING: The screenshot comparison for '" + fileName +
                                "' failed; since this comparison is known to be unstable," +
                                " the failure is ignored; error message: " + error.message);

                    // remove the diff file, so that it doesn't trip the approval plugin
                    fs.unlink(this.getDiffScreenshotPath(fileName), _.noop);
                }
                else {
                    throw error;
                }
            }
        }
    },

    /**
     * @desc Get the number of disimilar pixels allowed for the given image file and tolerance
     * @param {string} imagepath - the path of the image file
     * @param {number} [tolerance=globalTolerance] - Increase or decrease the accuracy.
     *    Higher value makes for less accuracy.
     *    See the description on the param in wdio.conf.js for more details.
     * @return {number} - the number of disimilar pixels allowed for the given image file
     */
    disimilarPixelsAllowed: function (imagepath, tolerance) {
        var _tolerance = tolerance || globalTolerance;

        // avoid the image file read if the tolerance is 0
        if (_tolerance === 0) {
            return 0;
        }

        var result = 0;
        var getSize = im.getSize(imagepath);

        // execute IM command line
        getSize.then(function (data) {
            if (data.width !== 0 && data.height !== 0) {
                result = Math.round(data.width * data.height * _tolerance / 100);
            }
        });

        // wait for IM finishes its job
        browser.waitUntil(getSize, comparisonWaitTime, 100);

        console.log("Allowing " + result + " disimilar pixels for image '" + imagepath + "'");

        return result;
    }
};
module.exports = ScreenshotUtils;
