var React = require("react"),
    moment = require("moment-range"),
    Calendar = require("./../../../components/calendars/Calendar.jsx");

/**
* @name CalendarDemo
* @memberof Calendar
* @desc A demo for Calendar
*/
var CalendarDemo = React.createClass({

    numDemos: 2,

    getInitialState: function () {
        return {
            selectedDate1: moment(new Date()), //current date
            selectedDate2: new Date(2017, 1, 20), //Feb 20 2017
            dateRange: {
                startDate: new Date(2017, 1, 14),   //Feb 14 2017
                endDate: new Date(2018, 3, 28)  //Apr 28 2018
            }
        };
    },

    componentWillMount: function () {
        for (var i=1; i<=this.numDemos; i+=1) {
            this["_onEnrollmentDateChanged" + i] = this._onEnrollmentDateChanged.bind(null, i);
        }
    },

    _onEnrollmentDateChanged: function (index, newValue) {
        var newState = {};

        newState["selectedDate" + index] = parseInt(newValue);

        this.setState(newState);
    },

    _getSelectedDateLabel: function (date) {
        return date ? moment(date).format("MMMM Do YYYY") : "NONE";
    },

    render: function () {
        return (
            <div>
                <Calendar data-id="calendar"
                        closeOnSelect={true}
                        computableFormat="x"
                        date={this.state.selectedDate1}
                        format="YYYY-MM-DD"
                        helpClassName="right"
                        labelText="Date"
                        labelHelpText="Help text can go here"
                        onValueChange={this._onEnrollmentDateChanged1} />
                <div>{"Selected Date: " + this._getSelectedDateLabel(this.state.selectedDate1)}</div>

                <br /><br />

                <Calendar data-id="calendar-2"
                        closeOnSelect={true}
                        computableFormat="x"
                        dateRange={this.state.dateRange}
                        date={this.state.selectedDate2}
                        format="YYYY-MM-DD"
                        helpClassName="right"
                        labelText="Date with date range"
                        labelHelpText="Selection outside of date range is not permitted"
                        onValueChange={this._onEnrollmentDateChanged2} />
                <div>{"Selected Date: " + this._getSelectedDateLabel(this.state.selectedDate2)}</div>
            </div>
        );
    }
});

module.exports = CalendarDemo;
