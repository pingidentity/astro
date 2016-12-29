/*global browser:true */

/**
 * @desc this is very basic common functions for integration component tests
 *       this is also a wrapper of wdio to fix some specific browser issue.
 */
function Page () {
}

/**
 * @desc this function is to format an xpath
 * @param {string} unformattedXPath - text to format
 * @param {string} keys - params
 *
 * @returns {string} formatted path
 *
 * @example: path = "//{type}[@data-id='{name}-label']"
 *           params = { type: "*", name: "Calendar" }
 *           return //*[@data-id='Calendar-label']
 */
Page.prototype.formatXpath = function (unformattedXPath, keys) {
    var parts = unformattedXPath.split(/(?=[{])|}/);
    var l = parts.length;

    for (var i = 0; i < l; i += 1) {
        if (parts[i][0] === "{") {
            var result = keys[parts[i].slice(1)];
            if (typeof(result) !== "undefined") {
                parts[i] = typeof(result) === "function" ? result() : result;
            } else {
                parts[i] = parts[i] + "}";
            }
        }
    }

    return parts.join("");
};

/**
 * @desc this function is to open browser with a given path
 * @param {string} path - URL to open
 */
Page.prototype.open = function (path) {
    // set default size for browsers
    browser.windowHandleSize({ width: 1400, height: 800 });
    browser.url(path);
};

/**
 * @desc this function is to return true if the element exist
 * @param {string} path to check
 *
 * @returns {bool} true if exist, false if not
 */
Page.prototype.isExisting = function (path) {
    return browser.isExisting(path);
};

/**
 * @desc this function is to throw an error if the element does not exist
 * @param {string} path - xpath of element to check
 * @private
 * @ignore
 */
Page.prototype.assertExistingElement = function (path) {
    if (!browser.isExisting(path)) {
        throw "#Error: the given path '" + path + "' not exist!";
    }
};

/**
 * @desc this function is to click on a given xpath
 * @param {string} path - xpath of element to click
 */
Page.prototype.click = function (path) {
    this.assertExistingElement(path);
    browser.click(path);
};

/**
 * @desc this function is to set value for select HTML tag
 * @param {string} path - xpath of element to set value
 * @param {string} value - value to set
 */
Page.prototype.setDropDownValue = function (path, value) {
    this.assertExistingElement(path);
    browser.selectByValue(path, value);
};

Page.prototype.end = function (done) {
    browser.end(done);
};

/**
 * @desc this function is to get element by a given xpath
 * @param {string} path - xpath to get element
 * @param {string} params - params to format
 *
 * @returns {object} element - WebElement JSON object
 */
Page.prototype.getElement = function (path, params) {
    var formattedPath = this.formatXpath(path, params);

    this.assertExistingElement(formattedPath);
    return browser.element(formattedPath);
};

/**
 * @desc this function is to get element list by a given xpath
 * @param {string} path - xpath to get elements
 * @param {string} params - params to format
 *
 * @returns {object} elements - WebElement JSON objects
 */
Page.prototype.getElements = function (path, params) {
    var formattedPath = this.formatXpath(path, params);

    this.assertExistingElement(formattedPath);
    return browser.elements(formattedPath);
};

/**
 * @desc this function is to pause integration process for a given time,
 *     only if time is a positive number.
 * @param {number} time - number of milliseconds to wait
 *
 * @returns {object} browser - execute object
 */
Page.prototype.pause = function (time) {
    return time > 0 ? browser.pause(time) : browser;
};

/**
 * @desc this function is to wait for a given element to exist
 * @param {string} elementPath - xpath of element to wait for exist
 * @param {number} time - number of interval to wait
 * @param {bool} isReverse - is reversed or not
 */
Page.prototype.waitForExist = function (elementPath, time, isReverse) {
    browser.waitForExist(elementPath, time, isReverse);
};

/**
 * @desc this function is to wait for a given element to be visible within a given time
 * @param {string} elementPath - xpath of element to wait for visible
 * @param {number} time - number of interval to wait
 * @param {bool} isReverse - is reversed
 */
Page.prototype.waitForVisible = function (elementPath, time, isReverse) {
    browser.waitForVisible(elementPath, time, isReverse);
};

/**
 * @desc this function is to resize browser
 *
 * @param {number} widthSize - number of width
 * @param {number} heightSize - number of height
 */
Page.prototype.windowResize = function (widthSize, heightSize) {
    browser.windowHandleSize({ width: widthSize, height: heightSize });
};

/**
 * @desc this function is to hide a given element so screenshot tool will not see this element
 * @param {string} elementPath - xpath of element to hide
 */
Page.prototype.hideElement = function (elementPath) {
    if (browser.isExisting(elementPath)) {
        browser.selectorExecute(elementPath, "arguments[0][0].style.visibility = 'hidden'");
    }
};

/**
 * @desc this function is to show a given element after it is hidden
 * @param {string} elementPath - xpath of element to show
 */
Page.prototype.showElement = function (elementPath) {
    if (browser.isExisting(elementPath)) {
        browser.selectorExecute(elementPath, "arguments[0][0].style.visibility = 'visible'");
    }
};

/**
 * @desc scroll element into specific position
 *
 * @param {string} elementPath the xPath
 * @param {number} offset position(pixel)
 */
Page.prototype.scrollElementToTop = function (elementPath, offset) {
    this.assertExistingElement(elementPath);
    browser.selectorExecute(elementPath, "arguments[0][0].scrollTop = "+ offset);
};

/**
 * @desc scroll element into specific position
 *
 * @param {string} elementPath the xPath
 * @param {number} offset position(pixel)
 */
Page.prototype.scrollElementToLeft = function (elementPath, offset) {
    this.assertExistingElement(elementPath);
    browser.selectorExecute(elementPath, "arguments[0][0].scrollLeft = "+ offset);
};

/**
 * @desc scroll browser into specific position
 *
 * @param {string} elementPath the xPath
 * @param {number} x offsetX
 * @param {number} y offsetY
 */
Page.prototype.scrollPage = function (elementPath, x, y) {
    if (browser.isExisting(elementPath)) {
        browser.scroll(elementPath, x, y);
    } else {
        browser.scroll(x, y);
    }
};

/**
 * @desc scroll element into specific position and wait for completed
 * @param {string} elementPath the xPath
 * @param {number} offset position(pixel)
 *
 * @returns {object} browser execute object
 */
Page.prototype.scrollElementToTopSync = function (elementPath, offset) {
    this.assertExistingElement(elementPath);

    var newOffset = browser.selectorExecute(elementPath, "return arguments[0][0].scrollTop = "+ offset);
    return browser.waitUntil(browser.selectorExecute(elementPath,
        "return arguments[0][0].scrollTop") === newOffset , 5000, "Error: Cannot wait for scrolling", 100);
};

/**
 * @desc Scroll the element with the given name and data-id into view.
 *    If more than one element with the given coordinates exist on the page,
 *    only the first element is scrolled.
 * @param {string} tagName - the tag name of the element to scroll to
 * @param {string} dataId - the value of the data-id attribute on the element to scroll to
 */
Page.prototype.scrollToElement = function (tagName, dataId) {
    browser.execute(
        "document.querySelector(\"" + tagName + "[data-id='" + dataId + "']\").scrollIntoView();"
    );
};

/**
 * @desc blur current active element to screenshot failed
 * @returns {object} browser waitUntil object
 */
Page.prototype.blurElement = function () {
    browser.execute("return document.activeElement.blur();");
    return browser.waitUntil(browser.execute("return !document.hasFocus();")
        , 5000, "Error: fail when waiting to lose focus", 100);

};

/**
 * @desc move mouse to root of page to remove hover
 */
Page.prototype.outHover = function () {
    browser.moveToObject("/*", 0, 0);
};

/**
 * @desc Execute the provided callback repeateadly until it returns true.
 *     If the callback still returns false after "timeout" millis, throw exception.
 * @param {function} callback - a function which returns true or false.
 * @param {number} timeout - the time (in millis) to wait until callback returns true.
 *     If the timeout is reached and callback still hasn't returned true,
 *     this function will return false.
 * @param {number} delay - the time (in millis) to wait between consecutive executions
 *     of the callback.
 * @param {number} initialDelay - the time (in millis) to wait before executing the callback
 *     the first time.
 * @throws Throw error if the callback hasn't succeeded.
 */
Page.prototype.waitForCondition = function (callback, timeout, delay, initialDelay) {
    var start = Date.now();
    var result = false;

    this.pause(initialDelay);

    do {
        result = callback();

        // if the callback hasn't succeeded, wait
        if (result === false) {
            this.pause(delay);
        }
    }
    // execute the block above while the callback hasn't succeeded and while there's time left
    while (result === false && Date.now() < (start + timeout));

    if (result === false) {
        throw "Timed out waiting for the callback to return true";
    }
};

module.exports = new Page();
