var React = require("react"),
    moment = require("moment-range"),
    Calendar = require("./../../../components/calendars/Calendar.jsx");

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
                format="YYYY-MM-DD"
                date={this.state.selectedDate}
                computableFormat="x"
                closeOnSelect={true}
                onValueChange={this._onEnrollmentDateChanged} />
        );
    }
});

module.exports = CalendarDemo;
