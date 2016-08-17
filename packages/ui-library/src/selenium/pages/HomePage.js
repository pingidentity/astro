var Page = require("./Page.js");
var ScreenshotUtils = require("../../util/ScreenshotUtils.js");
var wdioConfig = require("../../../wdio.conf.js").config;

var HomePage = Object.create(Page, {

    /**
     * @desc this function is to return wait interval for waitForVisible and waitForExist function
     */
    waitInterval: {
        get: function () {
            return 10000;
        }
    },

    /**
     * @desc this function is to return a given component path
     * @param {string} name - name of the element
     * @param {string} type - type of the element
     */
    navComponent: {
        value: function (name, type) {
            return this.formatXpath("//{type}[@data-id='{name}-label']", { type: type ? type : "*", name: name });
        }
    },

    /**
     * @desc this function is to open index page
     */
    openHomePage: {
        value: function () {
            this.open(wdioConfig.baseUrl + "/index.html");
        }
    },

    /**
     * @desc this function is to scroll the nemu navigation
     */
    scrollMenuNavigation: {
        value: function (y) {
            this.scrollElementToTop("//div[@data-id='header-bar']/following-sibling::div/div", y);
        }
    },

    /**
     * @desc this function to take screenshot then compare screenshot with baseline and create diff image
     * all transitions should have finished by the time this method is called
     * @param {string} fileName - name of screenshot file.
     *
     * @returns {bool} true if they are matched and false if they are difference.
     */
    takeScreenshotAndCompare: {
        value: function (filename) {
            this.blurElement();
            this.outHover();
            return ScreenshotUtils.takeScreenShotAndCompareWithBaseline(filename);
        }
    },

    /**
     * @desc this function to take element screenshot then compare it with baseline and create diff image
     * all transitions should have finished by the time this method is called
     * @param {string} fileName - name of screenshot file.
     * @param {string} elementSelector - xpath to element.
     *
     * @returns {bool} true if they are matched and false if they are difference.
     */
    takeElementScreenshotAndCompare: {
        value: function (filename, elementSelector) {
            this.blurElement();
            this.outHover();
            return ScreenshotUtils.takeElementScreenShotAndCompareWithBaseline(filename, elementSelector);
        }
    },

    /**
     * @desc this function is to focus out of current element
     */
    focusOutCurrentElement: {
        value: function () {
            this.blurElement();
            this.outHover();
        }
    }
});
module.exports = HomePage;