/*global browser:true */

var Page = require("./Page.js");
var ScreenshotUtils = require("../../devUtil/ScreenshotUtils.js");
var ScreenshotComparisonException = require("../../devUtil/ScreenshotComparisonException.js");

var HomePage = Object.create(Page, {
    /**
     * @desc this function is to return wait interval for waitForVisible and waitForExist function
     */
    waitInterval: {
        get: function() {
            return 10000;
        }
    },

    /**
     * @desc this function is to return a given component path
     * @param {string} name - name of the element
     * @param {string} [type="*"] - type of the element
     */
    navComponent: {
        value: function(name, type) {
            return this.formatXpath("//{type}[@data-id='{name}-label']", {
                type: type ? type : "*",
                name: name
            });
        }
    },

    /**
     * @desc open the root node with the given name and wait until it's open
     * @param {string} name - the root name (eg. Templates)
     */
    openNavRoot: {
        value: function(name) {
            var path = this.navComponent(name, "a");
            this.click(path);
            this.waitForExist(
                "//div[@data-id='nav-top-content' and text()='" + name + "']",
                2000
            );
        }
    },

    /**
     * @desc open the navigation node (not leaf) with the given name and wait until it's open
     * @param {string} name - the node name (eg. Templates)
     */
    openNavNode: {
        value: function(name) {
            var path = this.navComponent(name, "a");
            this.click(path);
            this.waitForExist(
                path +
                    "/parent::div[contains(concat(' ', @class, ' '), ' open ')" +
                    " or contains(concat(' ', @class, ' '), ' selected ')]",
                2000
            );
        }
    },

    /**
     * @desc open the navigation leaf (not node) with the given name and wait until it's open
     * @param {string} name - the leaf name (eg. Edit View - Collapsible)
     */
    openNavLeaf: {
        value: function(name) {
            var path = this.navComponent(name, "a");
            this.click(path);
            this.waitForExist(
                path +
                    "/parent::*[contains(concat(' ', @class, ' '), 'highlighted')]",
                4000
            );
        }
    },

    /**
     * @desc navigate to the given path in the navigation menu
     * @param {string} categoryName - the node name (eg. Templates)
     * @param {string} pageName - the leaf name (eg. Edit View - Collapsible)
     */
    navigateToPath: {
        value: function(rootName, categoryName, pageName) {
            if (!pageName) {
                pageName = categoryName;
            }

            this.openNavRoot(rootName);
            if (categoryName) {
                this.openNavNode(categoryName);
            }

            // wait for the menu item to be on the page (ie. the node has fully opened)
            this.waitForExist(this.navComponent(pageName));
            this.scrollMenuNavigation(pageName);

            this.openNavLeaf(pageName);
        }
    },

    /**
     * @desc this function is to open index page
     */
    openHomePage: {
        value: function() {
            this.open("/index.html");
        }
    },

    /**
     * @desc this function is to scroll the navigation menu
     *    to the element with the given name, and wait up to 1000ms
     *    for the element to get into the viewport
     * @param {string} labelName - the name of the label to scroll to
     *    (the '-label' suffix will be appended automatically)
     */
    scrollMenuNavigation: {
        value: function(labelName) {
            this.scrollToElement("a", labelName + "-label");

            // the isVisibleWithinViewport state verification doesn't seem to work properly;
            // instead, wait blindly 1000ms
            this.pause(1000);
        }
    },

    /**
     * @desc this function to take screenshot then compare screenshot with baseline and create diff image
     * all transitions should have finished by the time this method is called
     * @param {string} fileName - name of screenshot file.
     * @throws {ScreenshotComparisonException}
     *    if the current screenshot does not match the baseline
     */
    takeScreenshotAndCompare: {
        value: function(filename, tolerance) {
            this.blurElement();
            this.outHover();
            ScreenshotUtils.takeScreenShotAndCompareWithBaseline(
                filename,
                tolerance
            );
        }
    },

    /**
     * @desc this function to take element screenshot then compare it with baseline and create diff image
     * all transitions should have finished by the time this method is called
     * @param {string} fileName - name of screenshot file.
     * @param {string} elementSelector - xpath to element.
     * @throws {ScreenshotComparisonException}
     *    if the current screenshot does not match the baseline
     */
    takeElementScreenshotAndCompare: {
        value: function(filename, elementSelector, tolerance) {
            this.blurElement();
            this.outHover();
            ScreenshotUtils.takeElementScreenShotAndCompareWithBaseline(
                filename,
                elementSelector,
                tolerance
            );
        }
    },

    /**
     * @desc this function is to focus out of current element
     */
    focusOutCurrentElement: {
        value: function() {
            this.blurElement();
            this.outHover();
        }
    },

    /**
     * @desc wrap the given retriable function
     *    which is to be retried on failure (the number of retries is defined in the wdio config)
     *    if there is a screen comparison exception
     * @param {function} retriableFunction - the function to be executed; since it's retried
     *    on failure, it should reset the page/context itself
     * @return {function} - the wrapper function which will be retried on failure
     */
    retriable: {
        value: function(retriableFunction) {
            var self = this;

            return function() {
                var retryCount = 0;
                var maxRetryCount = browser.options.testRetryCount;
                var retryWaitTime = browser.options.testRetryWaitTime;
                var error;

                do {
                    if (retryCount > 0) {
                        self.pause(retryWaitTime);
                    }
                    try {
                        retriableFunction();
                        error = null;
                    } catch (err) {
                        // let it bubble up if it's not a screenshot comparison exception
                        if (err instanceof ScreenshotComparisonException) {
                            console.log(
                                "ERROR: try #" +
                                    retryCount +
                                    "; failure: " +
                                    err.message +
                                    ";\n    stack: " +
                                    err.stack
                            );
                        } else {
                            throw err;
                        }

                        retryCount += 1;
                        error = err;
                    }
                } while (retryCount <= maxRetryCount && error !== null);

                if (error !== null) {
                    throw new Error(error.message);
                }
            };
        }
    }
});
module.exports = HomePage;
