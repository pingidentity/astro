"use strict";

var React = require("react"),
    _ = require("underscore"),
    FormSelectField = require("../forms/form-select-field"),
    Utils = require("../../util/Utils"),
    moment = require("moment-range"),
    Translator = require("../../util/i18n/Translator.js"),
    cx = require("classnames");

/**
 * @callback TimePicker~onValueChange
 * @param {string} time
 *              Time represented as a formatted string.
 */

/**
 * @class TimePicker
 * @desc  A drop-down form for selecting the time
 *
 * @param {string} [data-id="time-picker"]
 *              To define the base "data-id" value for the top-level HTML container.
 * @param {string}   [id]
 *              DEPRECATED. Use "data-id" instead.
 * @param {string}   [className]
 *              CSS classes to set on the top-level HTML container
 * @param {number}   [increments]
 *              The increments (in minutes) to populate the list. Default is 15
 * @param {string}   [format]
 *              The time format. Either "12" or "24". Default is "12"
 * @param {string}   [labelText]
 *              The text to display as the field's label
 * @param {string|object} [value]
 *              The value to be set, eg: "3:00pm" or a `moment` object
 * @param {TimePicker~onValueChange} onValueChange
 *              Callback to be triggered when the select element value changes
 */
module.exports = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        increments: React.PropTypes.number,
        format: React.PropTypes.string,
        labelText: React.PropTypes.string,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.object
        ]),
        onValueChange: React.PropTypes.func.isRequired
    },

    /**
     * Adjusts hours based on format, adds am/pm property if needed
     * @method Timpicker#_getHourType
     * @private
     * @ignore
     *
     * @param  {Object} hoursMinutes The hours/mins object
     * @param  {String} format       The time format
     * @return {Object}              The modified parameter
     */
    _getFormattedHourType: function (hoursMinutes, format) {
        var hourType = this._getHourType(hoursMinutes.hours, format);

        hoursMinutes.amPm = hourType.amPm;
        hoursMinutes.hours = hourType.hours;

        return hoursMinutes;
    },

    /**
     * Returns an object with the correct hours (based on format) and am/pm if 12 hour format
     *
     * @method TimePicker#_getHourType
     * @private
     * @ignore
     *
     * @param  {Integer}  hours  The amount of hours to parse
     * @param  {String}   format The hour format
     * @return {Object}          {amPm, hours}
     */
    _getHourType: function (hours, format) {
        var amPm = "";

        switch (format) {
            case "12":
                amPm = hours > 11 ? "pm" : "am";

                if (hours === 0) {
                    hours = 12;
                }

                if (hours > 12) {
                    hours -= 12;
                }

                break;
        }

        return {
            amPm: amPm,
            hours: hours
        };
    },

    /**
     * Pads with a zero if necessary
     * @method TimePicker#_getPaddedNumber
     * @private
     * @ignore
     *
     * @param  {String|Number} number The number
     * @return {String}               The padded number
     */
    _getPaddedNumber: function (number) {
        number = "" + number;
        return number.length === 1 ? "0" + number : number;
    },

    /**
     * Breaks minutes into hours and minutes
     * @method TimePicker#_getHoursMinutes
     * @private
     * @ignore
     *
     * @param  {Number} minutes The total minutes to be broken down
     * @return {Object}         eg: {
     *                                  hours: 3,
     *                                  minutes: 15
     *                              }
     */
    _getHoursMinutes: function (minutes) {
        return {
            hours: Math.floor(minutes / 60),
            minutes: minutes % 60
        };
    },

    /**
     * Populate an object of times
     * @method TimePicker#_getTimes
     * @private
     * @ignore
     *
     * @return {array} eg [
     *                         ...
     *                         { label: "6:00", value: "6:00" },
     *                         { label: "6:30", value: "6:30" }
     *                         { label: "7:00", value: "7:00" }
     *                         ...
     *                     ]
     */
    _getTimes: function () {
        var increments = this.props.increments;
        var times = [];
        var count = 24 * 60 / increments;
        var formattedTime;

        for (var i = 0; i < count; i += 1) {
            formattedTime = this._getHoursMinutes(i * increments);
            formattedTime = this._getFormattedHourType(formattedTime, this.props.format);
            formattedTime = formattedTime.hours + ":" +
                            this._getPaddedNumber(formattedTime.minutes) +
                            (formattedTime.amPm || "");

            if (this.props.increments === 30) {
                formattedTime = moment(formattedTime, ["hh:mm A"]).format("h:mma");
            }
            times.push({ label: formattedTime, value: formattedTime });
        }
        return times;
    },

    getDefaultProps: function () {
        return {
            increments: 15,
            format: "12",
            value: "12:00pm",
            "data-id": "time-picker"
        };
    },

    componentWillMount: function () {
        moment.locale(Translator.currentLanguage);

        if (this.props.id) {
            console.warn(Utils.deprecateMessage("id", "data-id"));
        }
    },

    render: function () {
        var id = this.props.id || this.props["data-id"];

        var times = this._getTimes();
        var classes = cx("input-time", this.props.className);
        var value = this.props.value;

        // if a moment object, parse to human-readable
        if (value && typeof value === "object") {
            var minutes = value.minutes();
            var hourType = this._getHourType(value.hours(), this.props.format);
            value = hourType.hours + ":" + this._getPaddedNumber(minutes) + hourType.amPm;
        }

        var props = _.defaults({
            "data-id": id,
            value: value,
            options: times,
            className: classes,
            label: this.props.labelText
        }, this.props);

        return React.createElement(FormSelectField, props);
    }
});
