/*eslint-disable valid-jsdoc*/

"use strict";

/**
 * @module util/Utils
 * @desc A set of util functions.
 */

var moment = require("moment");

/**
 * @enum {string}
 * @alias module:util/Utils.Browsers
 * @desc An enum of browsers.
 **/
var browsers = {
    IE: "ie",
    EDGE: "edge",
    CHROME: "chrome",
    FIREFOX: "firefox",
    SAFARI: "safari",
    OPERA: "opera"
};
exports.Browsers = browsers;

/**
 * @alias module:util/Utils.isHtmlFileApiSupported
 * @desc Helper method to test if the HTML5 File API is supported by the user agent
 *
 * @returns {boolean}
 *     Returns true the API is supported
 */
exports.isHtmlFileApiSupported = function () {
    return global.File && global.FileList && global.FileReader;
};

/**
 * @alias module:util/Utils.stripFakePath
 * @desc Remove the leading "fakepath" directory added by the browser to `<input type="file" />` elements
 *
 * @param {string} path
 *     The path to strip
 * @returns {string}
 *     The stripped path
 */
exports.stripFakePath = function (path) {
    return path.replace(/^c:\\fakepath\\/i, "");
};

/**
 * @alias module:util/Utils.triggerFileDownload
 * @desc Trigger a Blob download - based on http://stackoverflow.com/a/23797348
 *
 * @param {string} filename
 *     Name of file
 * @param {Array} blobData
 *     Raw data for the file
 * @param {string} fileType
 *     MIME type e.g. 'text/plain'
 */
exports.triggerFileDownload = function (filename, blobData, fileType) {
    var blob = new Blob(blobData, { type: fileType });

    if (typeof global.navigator.msSaveBlob !== "undefined") {
        // IE has its own way of saving blobs locally (see HTML7007 error)
        global.navigator.msSaveBlob(blob, filename);
    } else {
        var URL = global.URL || global.webkitURL;
        var downloadUrl = URL.createObjectURL(blob);

        // use HTML5 a[download] attribute to specify filename
        var a = document.createElement("a");

        if (typeof a.download === "undefined") {
            global.window.location.href = downloadUrl;
        } else {
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
        }
    }
};

/**
 * @alias module:util/Utils.formatDate
 * @desc Format the given timestamp in milliseconds as a YYYY-MM-DD date.
 *
 * @param {number} timestamp
 *     The timestamp (UNIX time * 1000)
 * @returns {string}
 *     Formatted date
 */
exports.formatDate = function (timestamp) {
    return moment.utc(timestamp).format("YYYY-MM-DD");
};

/**
 * @alias module:util/Utils.diffProps
 * @desc A function that makes it more concise to compare parts of the passed in props to determine if the component
 *     should re-reneder
 *
 * @param {object} current
 *     Current props
 * @param {object} next
 *     Next props
 * @param {string[]} list
 *     An array of keys
 * @returns {boolean}
 *     Returns true if the props are different
 */
exports.diffProps = function (current, next, list) {
    for (var i = 0; i < list.length; i += 1) {
        if (current[list[i]] !== next[list[i]]) {
            return true;
        }
    }

    return false;
};

/**
 * @alias module:util/Utils.deprecateWarn
 * @desc Write to log or console.warn a deprecated usage message.
 *
 * @param {string} feature
 *    The name of the feature that is now deprecated.
 * @param {string} useInstead
 *    The name of the feature to use instead.
 * @param {function} log
 *    Custom log function to use to log the warning.
 */
exports.deprecateWarn = function (feature, useInstead, log) {
    var warning = [
        "Deprecated: use ", useInstead, " instead of ", feature,
        ". Support for ", feature, " will be removed in next version"
    ].join("");

    if (log) {
        log(warning);
    } else {
        global.console.warn(warning);
    }
};

/**
 * @alias module:util/Utils.deprecateMessage
 * @desc Return a formatted string for deprecated prop.
 *
 * @param {string} feature
 *    The name of the feature that is now deprecated.
 * @param {string} useInstead
 *    The name of the feature to use instead.
 * @return {string}
 *    Formatted warning string.
 */
exports.deprecateMessage = function (feature, useInstead) {
    var warning = [
        "Deprecated: use ", useInstead, " instead of ", feature,
        ". Support for ", feature, " will be removed in next version"
    ].join("");
    return warning;
};



var _this = this;

/**
 * @alias module:util/Utils.browserType
 * @desc Return a string with the name of current browser from the userAgent.
 * @return {string}
 *    Browser name.
 */
exports.browserType = function () {
    var userAgent = navigator.userAgent.toLowerCase();
    var browser = userAgent.match(/(edge|opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    //special safari detection. Chrome uses safari string
    if (Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0) {
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
 * @alias module:util/Utils.browserVersion
 * @desc Return a number with the browser version from the userAgent
 * @return {number}
 *    Browser version.
 */
exports.browserVersion = function () {
    var userAgent = navigator.userAgent.toLowerCase();
    var browser = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    if (_this.browserType() === browsers.SAFARI) {
        var version = userAgent.match(/(version(?=\/))\/?\s*(\d+)/i);
        return parseInt(version[2]);
    }
    if ( /trident/i.test(browser[1])) {
        var version = userAgent.match(/(rv(?=:)):?\s*(\d+)/i);
        return parseInt(version[2]);
    }
    if ( _this.browserType() === browsers.EDGE) {
        var version = userAgent.match(/(edge(?=\/))\/?\s*(\d+)/i);
        return parseInt(version[2]);
    }
    if (browser[2]) {
        return parseInt(browser[2]);
    }
};

/**
 * @alias module:util/Utils.browser
 * @desc Returns a string with browserType and browserVersion
 * @return {string}
 *    Full browser name and version.
 */

exports.browser = function () {
    return _this.browserType() + " " + _this.browserVersion();
};

/**
 * @alias module:util/Utils.isIE
 * @desc A function to detect IE browsers
 * @return {boolean}
 *    True if IE.
 */
exports.isIE = function () {
    return _this.browserType() === browsers.IE || _this.browserType() === browsers.EDGE ;
};

/**
 * @alias module:util/Utils.isFirefox
 * @desc A function to detect Firefox browsers
 * @return {boolean}
 *    True if Firefox.
 */
exports.isFirefox = function () {
    return _this.browserType() === browsers.FIREFOX;
};

/**
 * @alias module:util/Utils.isChrome
 * @desc A function to detect Chrome browsers
 * @return {boolean}
 *    True if Chrome.
 */
exports.isChrome = function () {
    return _this.browserType() === browsers.CHROME;
};

/**
 * @alias module:util/Utils.isSafari
 * @desc A function to detect Safari browsers
 * @return {boolean}
 *    True if Safari.
 */
exports.isSafari = function () {
    return _this.browserType() === browsers.SAFARI;
};

/**
 * @alias module:util/Utils.isIE9
 * @desc Return true for IE9 or older browsers
 *
 * @return {boolean}
 *    Return true for IE9 or older browsers and false for others
 */
exports.isIE9 = function () {
    return (_this.browserType() === browsers.IE) && (_this.browserVersion() <= 9) ;
};

/**
 * @alias module:util/Utils.isMobile
 * @desc Uses regex from detectmobilebrowsers.com to detect mobile devices. Currently used by Pingone Dock.
 *
 * @return {boolean}
 *    Return true mobile devices but not for tablets
 */
exports.isMobile = function () {
    var check = false;
    //regex to detect mobile
    /* eslint-disable */
    (function (a)
    {if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
    /* eslint-enable */
};
