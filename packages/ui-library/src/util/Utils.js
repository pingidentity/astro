/*eslint-disable valid-jsdoc*/

"use strict";

/**
 * @module util/Utils
 * @desc A set of util functions.
 */

var moment = require("moment");

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
 * @desc Remove the leading 'fakepath' directory added by the browser to `<input type="file" />` elements
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
 *    The name of the feature that is now deprecated
 * @param {string} useInstead
 *    The name of the feature to use instead
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
