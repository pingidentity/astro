import React from "react";
import TimePicker from "./../../../components/general/TimePicker";
import Calendar from "./../../../components/calendars/Calendar";
import InputRow from "../../../components/layout/InputRow";
import FormLabel from "ui-library/lib/components/forms/FormLabel";

/**
* @name TimePickerDemo
* @memberof TimePicker
* @desc A demo for TimePicker
*/
class TimePickerDemo extends React.Component {
    static flags = [ "use-portal" ];

    state = {
        a: "--",
        b: "--",
        c1: "",
        c2: ""
    };

    _handleValueChange = index => value => {
        var newState = {};

        // special handling for the calendar value
        if (index === "c1") {
            value = parseInt(value);
        }

        newState[index] = value;
        this.setState(newState);
    };

    render() {
        return (
            <div>
                <InputRow>
                    <TimePicker
                        onValueChange={this._handleValueChange("a")}
                        increments={30}
                        labelText="12 Hour Format"
                        value={this.state.a}
                        name="timepicker-demo"
                    />
                    <br /><br />
                    12hr (w/30m): <strong>{this.state.a}</strong>
                </InputRow>
                <InputRow>
                    <TimePicker
                        onValueChange={this._handleValueChange("b")}
                        increments={60}
                        format="24"
                        labelText="24 Hour Format"
                        value={this.state.b}
                    />
                    <br /><br />
                    24hr: <strong>{this.state.b}</strong>
                </InputRow>

                <FormLabel detached>
                    Date/Time Picker Combo
                </FormLabel>
                <div>
                    <Calendar
                        format="YYYY-MM-DD"
                        computableFormat="x"
                        closeOnSelect={true}
                        onValueChange={this._handleValueChange("c1")}
                        date={this.state.c1}
                    />
                    <TimePicker
                        onValueChange={this._handleValueChange("c2")}
                        increments={60}
                        format="24"
                        value={this.state.c2}
                    />
                </div>
            </div>
        );
    }
}

module.exports = TimePickerDemo;
