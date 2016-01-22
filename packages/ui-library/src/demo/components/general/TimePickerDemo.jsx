var React = require("react/addons");
var TimePicker = require("./../../../components/general/TimePicker.jsx");

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
                <TimePicker onValueChange={this._onChange.bind(null, "12")} increments={30} />
                <TimePicker onValueChange={this._onChange.bind(null, "24")}
                            increments={60} format="24" value={"16:00"} />
                <br /><br />
                <p>12hr (w/30m): <strong>{this.state["12"]}</strong></p>
                <p>24hr: <strong>{this.state["24"]}</strong></p>
            </div>
        );
    }
});

module.exports = TimePickerDemo;
