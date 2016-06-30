/*global browser:true */

/*
 * @desc this is very basic common functions for integration component tests
 *       this is also a wrapper of wdio to fix some specific browser issue.
 */
function Page () {
    // Change browsers windows size to avoid negative fails
    browser.windowHandleSize({ width: 1024, height: 768 });
}

Page.prototype.format = function (string, keys) {
    var parts = string.split(/(?=[{])|}/);
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

Page.prototype.open = function (path) {
    browser.url("/" + path);
};

/*
* @desc this function is to return true if the element exist
*/
Page.prototype.isExisting = function (path) {
    return browser.isExisting(path);
};

/*
* @desc this function is to throw an error if the element does not exist
*/
Page.prototype.checkExistingElement = function (path) {
    if (!browser.isExisting(path)) {
        throw "#Error: the given path '" + path + "' not exist!";
    }
};

Page.prototype.click = function (path) {
    this.checkExistingElement(path);
    browser.click(path);
};

Page.prototype.end = function (done) {
    browser.end(done);
};

Page.prototype.getElement = function (path, params) {
    var formattedPath = this.format(path, params);

    return browser.element(formattedPath);
};

Page.prototype.getElements = function (path, params) {
    var formattedPath = this.format(path, params);

    return browser.elements(formattedPath);
};

Page.prototype.pause = function (time) {
    return browser.pause(time);
};

Page.prototype.waitForExist = function (elementPath, time, isReverse) {
    return browser.waitForExist(elementPath, time, isReverse);
};

Page.prototype.waitForVisible = function (elementPath, time, isReverse) {
    return browser.waitForVisible(elementPath, time, isReverse);
};

Page.prototype.hideElement = function (elementPath) {
    browser.selectorExecute(elementPath, "arguments[0][0].style.visibility = 'hidden'");
};

Page.prototype.showElement = function (elementPath) {
    browser.selectorExecute(elementPath, "arguments[0][0].style.visibility = 'visible'");
};

/**
 * @desc scroll element into specific position
 *
 * @param {string} elementPath(optional) the xPath
 * @param {number} offset position(pixel)
 */
Page.prototype.scrollElementToTop = function (elementPath, offset) {
    browser.selectorExecute(elementPath, "arguments[0][0].scrollTop = "+ offset);
};

/**
 * @desc scroll element into specific position
 *
 * @param {string} elementPath(optional) the xPath
 * @param {number} offset position(pixel)
 */
Page.prototype.scrollElementToLeft = function (elementPath, offset) {
    browser.selectorExecute(elementPath, "arguments[0][0].scrollLeft = "+ offset);
};

/**
 * @desc scroll browser into specific position
 *
 * @param {string} [elementPath] the xPath
 * @param {number} x offsetX
 * @param {number} y offsetY
 */
Page.prototype.scrollPage = function (elementPath, x, y) {
    if (elementPath) {
        browser.scroll(elementPath, x, y);
    } else {
        browser.scroll(x, y);
    }
};


module.exports = new Page();