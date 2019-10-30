import React from "react";
import moment from "moment-range";
import Calendar, { FormLabel } from "../../../components/calendars/Calendar";

/**
* @name CalendarDemo
* @memberof Calendar
* @desc A demo for Calendar
*/
class CalendarDemo extends React.Component {

    numDemos = 3;

    state = {
        selectedDate1: moment(new Date(2021, 1, 20)), //last day!
        selectedDate2: moment("2015-10-15"), //Feb 20 2017
        selectedDate3: moment(new Date(2016, 2, 7)), //Broncos won Superbowl 50!
        dateRange: {
            startDate: new Date(2015, 9, 10), //Oct 10 2015
            endDate: new Date(2015, 10, 20) //Nov 20 2015
        }
    };

    _onEnrollmentDateChanged = index => newValue => {
        var newState = {};

        newState["selectedDate" + index] = parseInt(newValue);

        this.setState(newState);
    };

    _getSelectedDateLabel = (date) => {
        return date ? moment(date).format("MMMM Do YYYY") : "NONE";
    };

    render() {
        return (
            <div>
                <Calendar data-id="calendar"
                    closeOnSelect={true}
                    computableFormat="x"
                    date={this.state.selectedDate1}
                    format="YYYY-MM-DD"
                    helpPlacement="right"
                    labelText="Date"
                    labelHelpText="Help text can go here"
                    name="calendar-demo"
                    onValueChange={this._onEnrollmentDateChanged(1)}
                />
                <div>{"Selected Date: " + this._getSelectedDateLabel(this.state.selectedDate1)}</div>

                <br /><br />

                <Calendar data-id="calendar-2"
                    closeOnSelect
                    computableFormat="x"
                    dateRange={this.state.dateRange}
                    date={this.state.selectedDate2}
                    format="YYYY-MM-DD"
                    helpPlacement="right"
                    required
                    labelNode={
                        <FormLabel
                            data-id="Example ID"
                            value="Date with date range"
                            hint="Selection outside of date range is not permitted"
                            description="Sample Description"
                        />
                    }
                    onValueChange={this._onEnrollmentDateChanged(2)}
                />
                <div>{"Selected Date: " + this._getSelectedDateLabel(this.state.selectedDate2)}</div>

                <br /><br />

                <Calendar data-id="calendar-3"
                    closeOnSelect={true}
                    computableFormat="x"
                    date={this.state.selectedDate3}
                    format="YYYY-MM-DD"
                    labelText="Date only showing months"
                    onValueChange={this._onEnrollmentDateChanged(3)}
                    minView={Calendar.Views.MONTHS}
                />
                <div>{"Selected Date: " + this._getSelectedDateLabel(this.state.selectedDate2)}</div>

                <br /><br />

                <Calendar data-id="calendar-4"
                    closeOnSelect={true}
                    computableFormat="x"
                    labelText="Internally managed state"
                />
                <br /><br />

                <Calendar data-id="calendar-5"
                    date={new Date(2017, 1, 20)}
                    computableFormat="x"
                    labelText="Sets date prop / no handler"
                    required
                />
            </div>
        );
    }
}

module.exports = CalendarDemo;
