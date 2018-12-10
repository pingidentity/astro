var React = require("react");
var TimePicker = require("./../../../components/general/TimePicker");

var Calendar = require("./../../../components/calendars/Calendar");

/**
* @name TimePickerDemo
* @memberof TimePicker
* @desc A demo for TimePicker
*/
class TimePickerDemo extends React.Component {
    static flags = [ "use-portal" ];

    constructor(props) {
        super(props);
        var initialState = {
            a: "--",
            b: "--",
            c1: "",
            c2: ""
        };

        for (var key in initialState) {
            this["_handleValueChange" + key.toUpperCase()] = this._handleValueChange.bind(null, key);
        }

        this.state = initialState;
    }

    _handleValueChange = (index, value) => {
        var newState = {};

        // special handling for the calendar value
        if (index === "c1") {
            value = parseInt(value);
        }

        newState[index] = value;
        this.setState(newState);
    };

    render() {
        const { flags } = this.props;

        return (
            <div>
                <div className="input-row">
                    <TimePicker
                        onValueChange={this._handleValueChangeA}
                        increments={30}
                        labelText="12 Hour Format"
                        value={this.state.a}
                        name="timepicker-demo"
                        flags={flags}
                    />
                    <br /><br />
                    12hr (w/30m): <strong>{this.state.a}</strong>
                </div>
                <div className="input-row">
                    <TimePicker
                        onValueChange={this._handleValueChangeB}
                        increments={60}
                        format="24"
                        labelText="24 Hour Format"
                        value={this.state.b}
                        flags={flags}
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
                        onValueChange={this._handleValueChangeC1}
                        date={this.state.c1}
                        flags={flags}
                    />
                    <TimePicker
                        onValueChange={this._handleValueChangeC2}
                        increments={60}
                        format="24"
                        value={this.state.c2}
                        flags={flags}
                    />
                </div>
            </div>
        );
    }
}

module.exports = TimePickerDemo;
