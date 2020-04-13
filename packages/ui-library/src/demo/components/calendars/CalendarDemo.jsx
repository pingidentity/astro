import React from "react";
import moment from "moment-range";
import Calendar, { FormLabel, widths as calendarWidths } from "../../../components/calendars/Calendar";

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
        selectedDate4: moment(new Date(2019, 1, 1)),
        selectedDate5: moment(new Date(2019, 1, 1)),
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
    
    _compareDates = (date) => {
        return moment(date).isBefore(moment()) ? "Please enter a future date." : null;
    }

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

                <Calendar data-id="calendar-default-value"
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
                <br /><br />
                <Calendar
                    closeOnSelect
                    computableFormat="x"
                    labelText="With a large width"
                    width={calendarWidths.LG}
                />
                <br/><br/>
                <Calendar data-id="calendar"
                    closeOnSelect
                    computableFormat="x"
                    date={this.state.selectedDate4}
                    format="YYYY-MM-DD"
                    labelText="Calendar with error message"
                    name="calendar-demo"
                    onValueChange={this._onEnrollmentDateChanged(4)}
                    errorMessage={this._compareDates(this.state.selectedDate4)}
                />
                <br/><br/>
                <Calendar data-id="calendar"
                    closeOnSelect
                    computableFormat="x"
                    format="YYYY-MM-DD-Z"
                    labelText="Calendar with utcoffset prop"
                    name="calendar-demo"
                    onValueChange={this._getSelectedUTCOffset}
                    utcOffset = "+24:00"
                />
            </div>
        );
    }
}

module.exports = CalendarDemo;
