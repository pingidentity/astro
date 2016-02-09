var React = require("react/addons");
var TimePicker = require("./../../../components/general/TimePicker.jsx");

var Calendar = require("./../../../components/calendars/Calendar.jsx");

var TimePickerDemo = React.createClass({
    _onChange: function (format, value) {
        var newState = {};
        newState[format] = value;

        this.setState(newState);
    },

    getInitialState: function () {
        return {
            12: "--",
            24: "--"
        };
    },

    render: function () {
        return (
            <div>
                <div className="input-row">
                    <TimePicker
                        onValueChange={this._onChange.bind(null, "12")}
                        increments={30}
                        label="12 Hour Format"
                    />
                    <br /><br />
                    12hr (w/30m): <strong>{this.state["12"]}</strong>
                </div>
                <div className="input-row">
                    <TimePicker
                        onValueChange={this._onChange.bind(null, "24")}
                        increments={60}
                        format="24"
                        value={"16:00"}
                        label="24 Hour Format"
                    />
                    <br /><br />
                    24hr: <strong>{this.state["24"]}</strong>
                </div>

                <label className="stand-alone">
                    Date/Time Picker Combo
                </label>
                <div className="input-datetime">
                    <Calendar
                        format="YYYY-MM-DD"
                        computableFormat="x"
                        closeOnSelect={true} />
                    <TimePicker
                        onValueChange={this._onChange.bind(null, "24")}
                        increments={60}
                        format="24"
                        value={"16:00"}
                    />
                </div>
            </div>
        );
    }
});

module.exports = TimePickerDemo;
