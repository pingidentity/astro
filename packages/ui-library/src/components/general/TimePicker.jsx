var React = require("react");
var FormSelectField = require("../forms/FormSelectField.jsx");
var cx = require("classnames");

/**
 * @class TimePicker
 * @desc  A drop-down form for selecting the time
 *
 * @param {TimePicker~valueCallback} onValueChange Handles the select element value change
 * @param {number}   [increments]       The increments (in minutes) to populate the list. Default is 15
 * @param {string}   [format]           The time format. Either "12" or "24". Default is "12"
 * @param {string}   [labelText]        The text to display as the field's label
 * @param {string|object} [value]       The value to be set, eg: "3:00pm" or a `moment` object
 * @param {string}   [id="time-picker"] The data-id to pass to the FormSelectField
 * @param {string}   [className]        Additional class names for container
 */
module.exports = React.createClass({

    propTypes: {
        onValueChange: React.PropTypes.func.isRequired,
        increments: React.PropTypes.number,
        format: React.PropTypes.string,
        labelText: React.PropTypes.string,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.object
        ]),
        id: React.PropTypes.string,
        className: React.PropTypes.string
    },

    /**
     * Adjusts hours based on format, adds am/pm property if needed
     * @method Timpicker#_getHourType
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
     *
     * @return {Object} eg {
     *                         ...
     *                         "6:00": "6:00",
     *                         "6:30": "6:30",
     *                         "7:00": "7:00",
     *                         ...
     *                     }
     */
    _getTimes: function () {
        var increments = this.props.increments;
        var times = {};
        var count = 24 * 60 / increments;
        var formattedTime;

        for (var i = 0; i < count; i += 1) {
            formattedTime = this._getHoursMinutes(i * increments);
            formattedTime = this._getFormattedHourType(formattedTime, this.props.format);
            formattedTime = formattedTime.hours + ":" +
                            this._getPaddedNumber(formattedTime.minutes) +
                            (formattedTime.amPm || "");

            times[formattedTime] = formattedTime;
        }

        return times;
    },

    /**
     * handles the change event
     * @method TimePicker#_onChange
     *
     * @param {Object} e The event object
     */
    _onChange: function (e) {
        this.props.onValueChange(e.target.value);
    },

    getDefaultProps: function () {
        return {
            increments: 15,
            format: "12",
            value: "12:00pm",
            id: "time-picker"
        };
    },

    render: function () {
        var times = this._getTimes();
        var classes = cx("input-time", this.props.className);
        var value = this.props.value;

        // if a moment object, parse to human-readable
        if (value && typeof value === "object") {
            var minutes = value.minutes();
            var hourType = this._getHourType(value.hours(), this.props.format);
            value = hourType.hours + ":" + this._getPaddedNumber(minutes) + hourType.amPm;
        }

        return (
            <FormSelectField
                {...this.props}
                value={value}
                options={times}
                onChange={this._onChange}
                className={classes}
                label={this.props.labelText}
            />
        );
    }
});
