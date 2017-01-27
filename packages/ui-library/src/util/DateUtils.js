/*eslint-disable valid-jsdoc*/

"use strict";
var moment = require("moment");

var DateUtils = {
    /**
     * @alias module:util/Utils.formatDate
     * @desc Format the given timestamp in milliseconds as a YYYY-MM-DD date.
     *
     * @param {number} timestamp
     *     The timestamp (UNIX time * 1000)
     * @returns {string}
     *     Formatted date
     */
    formatDate: function (timestamp) {
        return moment.utc(timestamp).format("YYYY-MM-DD");
    }
};

module.exports = DateUtils;