var React = require("react");
var FormSelectField = require("../forms/FormSelectField.jsx");

/**
 * @class TimePicker
 * @desc   A drop-down form for selecting the time
 *
 * @param {function} onValueChange Handles the select element value change
 * @param {number}   [increments]  The increments (in minutes) to populate the list. Default is 15
 * @param {string}   [format]      The time format. Either 12/24hr. Default is "12"
 * @param {string}   [value]       The value to be initially selected
 * @param {string}   [id]          The data-id to pass to the FormSelectField
 */
module.exports = React.createClass({

    propTypes: {
        onValueChange: React.PropTypes.func.isRequired,
        increments: React.PropTypes.number,
        format: React.PropTypes.string,
        value: React.PropTypes.string,
        id: React.PropTypes.string
    },

    /**
     * Adjusts hours based on format, adds am/pm property if needed
     * @method Timpicker#_getHourType
     *
     * @param  {Object} hoursMinutes The hours/mins object
     * @param  {String} format       The time format
     * @return {Object}              The modified parameter
     */
    _getHourType: function (hoursMinutes, format) {
        switch (format) {
            case "12":
                if (hoursMinutes.hours > 11) {
                    hoursMinutes.amPm = "pm";
                } else {
                    hoursMinutes.amPm = "am";
                }

                if (hoursMinutes.hours === 0) {
                    hoursMinutes.hours = 12;
                }

                if (hoursMinutes.hours > 12) {
                    hoursMinutes.hours -= 12;
                }

                break;
        }

        return hoursMinutes;
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
            formattedTime = this._getHourType(formattedTime, this.props.format);
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

        return (
            /* jshint ignore:start */
            <FormSelectField {...this.props}
                             options={times}
                             onChange={this._onChange} />
            /* jshint ignore:end */
        );
    }
});