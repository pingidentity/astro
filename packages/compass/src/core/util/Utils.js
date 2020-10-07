const browsers = {
    IE: 'ie',
    EDGE: 'edge',
    CHROME: 'chrome',
    FIREFOX: 'firefox',
    SAFARI: 'safari',
    OPERA: 'opera',
};

/**
* @alias module:util/Utils.isProduction
* @desc Checks if the current build is a production build.
*
* @return {boolean}
*    Returns true if on production build, false otherwise.
*/
export const isProduction = () => {
    return process.env.NODE_ENV === 'production';
};

/**
 * @alias module:util/Utils.browserType
 * @desc Return a string with the name of current browser from the userAgent.
 * @return {string}
 *    Browser name.
 */
const browserType = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const browser = userAgent.match(/(edge|opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) {
        return browsers.SAFARI;
    }
    if (userAgent.indexOf(browsers.EDGE) !== -1) {
        return browsers.EDGE;
    }
    if (browser[1] === "msie" || /trident/i.test(browser[1])) {
        return browsers.IE;
    }

    if (browser[1] === browsers.CHROME && userAgent.indexOf("opr") !== -1) {
        return browsers.OPERA;
    }
    return (browser[1]);
};

/**
 * @alias module:util/Utils.isIE
 * @desc A function to detect IE browsers
 * @return {boolean}
 *    True if IE.
 */
export const isIE = () => {
    return browserType() === browsers.IE || browserType() === browsers.EDGE;
};

/**
 * @alias module:util/Utils.isIE
 * @desc A function to detect IE browsers
 * @return {boolean}
 *    True if IE.
 */
export const isIE11 = () => {
    return browserType() === browsers.IE;
};

