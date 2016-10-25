var React = require("react"),
    moment = require("moment-range"),
    Calendar = require("./../../../components/calendars/Calendar.jsx");

/**
* @name CalendarDemo
* @memberof Calendar
* @desc A demo for Calendar
*/
var CalendarDemo = React.createClass({

    getInitialState: function () {
        return {
            selectedDate: moment(new Date()) //current date
        };
    },

    _onEnrollmentDateChanged: function (newValue) {
        this.setState({
            selectedDate: parseInt(newValue)
        });
    },

    render: function () {
        return (
            <Calendar
                data-id="calendar"
                closeOnSelect={true}
                computableFormat="x"
                date={this.state.selectedDate}
                format="YYYY-MM-DD"
                helpClassName="right"
                labelText="Date"
                labelHelpText="Help text can go here"
                onValueChange={this._onEnrollmentDateChanged} />
        );
    }
});

module.exports = CalendarDemo;
