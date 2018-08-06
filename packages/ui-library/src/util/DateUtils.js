/*eslint-disable valid-jsdoc*/

"use strict";
const moment = require("moment");
const dateFormat = "YYYY-MM-DD";
const timeFormat = "hh:MM:SSa";

const DateUtils = {
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
        return moment.utc(timestamp).format(dateFormat);
    },

    /**
     * @alias module:util/Utils.formatTime
     * @desc Format the given timestamp in milliseconds as a YYYY-MM-DD hh:MM:SSa date.
     *
     * @param {number} timestamp
     *     The timestamp (UNIX time * 1000)
     * @returns {string}
     *     Formatted date+time
     */
    formatDateTime: function (timestamp) {
        return moment.utc(timestamp).format(`${dateFormat} ${timeFormat}`);
    },

    /**
     * @alias module:util/Utils.formatTime
     * @desc Format the given timestamp in milliseconds as a hh:MM:SSa time.
     *
     * @param {number} timestamp
     *     The timestamp (UNIX time * 1000)
     * @returns {string}
     *     Formatted time
     */
    formatTime: function (timestamp) {
        return moment.utc(timestamp).format(timeFormat);
    },
};

module.exports = DateUtils;