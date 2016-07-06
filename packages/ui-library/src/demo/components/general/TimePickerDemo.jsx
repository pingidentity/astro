var React = require("react");
var TimePicker = require("./../../../components/general/TimePicker.jsx");

var Calendar = require("./../../../components/calendars/Calendar.jsx");

var TimePickerDemo = React.createClass({
    _onChange: function (index, value) {
        var newState = {};

        // special handling for the calendar value
        if (index === "c1") {
            value = parseInt(value);
        }

        newState[index] = value;
        this.setState(newState);
    },

    getInitialState: function () {
        return {
            a: "--",
            b: "--",
            c1: "",
            c2: ""
        };
    },

    render: function () {
        return (
            <div>
                <div className="input-row">
                    <TimePicker
                        onValueChange={this._onChange.bind(null, "a")}
                        increments={30}
                        label="12 Hour Format"
                        value={this.state.a}
                    />
                    <br /><br />
                    12hr (w/30m): <strong>{this.state.a}</strong>
                </div>
                <div className="input-row">
                    <TimePicker
                        onValueChange={this._onChange.bind(null, "b")}
                        increments={60}
                        format="24"
                        label="24 Hour Format"
                        value={this.state.b}
                    />
                    <br /><br />
                    24hr: <strong>{this.state.b}</strong>
                </div>

                <label className="stand-alone">
                    Date/Time Picker Combo
                </label>
                <div className="input-datetime">
                    <Calendar
                        format="YYYY-MM-DD"
                        computableFormat="x"
                        closeOnSelect={true}
                        onChange={this._onChange.bind(null, "c1")}
                        date={this.state.c1}
                    />
                    <TimePicker
                        onValueChange={this._onChange.bind(null, "c2")}
                        increments={60}
                        format="24"
                        value={this.state.c2}
                    />
                </div>
            </div>
        );
    }
});

module.exports = TimePickerDemo;
