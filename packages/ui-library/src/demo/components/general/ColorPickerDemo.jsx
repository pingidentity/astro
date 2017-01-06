var React = require("react"),
    ColorPicker = require("../../../components/general/ColorPicker.jsx");

/**
* @name ColorPickerDemo
* @memberof ColorPicker
* @desc A demo for ColorPicker
*/
var ColorPickerDemo = React.createClass({

    getInitialState: function () {
        return {
            picker1color: "#fff",
            picker2color: "#000",
            picker2open: false,
            errorMessage: ""
        };
    },

    // There is a lot of duplication in the methods below.
    // It's better than building the prop names on the state dynamically.

    _handleChange1: function (color) {
        this.setState({ picker1color: color });
    },

    _handleChange2: function (color) {
        this.setState({ picker2color: color });
    },

    _handleToggle: function () {
        this.setState({ picker2open: !this.state.picker2open });
    },

    _handleError: function (message) {
        this.setState({ errorMessage: message });
    },

    render: function () {
        return (
            <div>
                <div className="input-row">
                    <ColorPicker
                        data-id="color-picker1"
                        color={this.state.picker1color}
                        onValueChange={this._handleChange1}
                        labelText="Background color"
                        hintText="Pick a color or type in the hex code" />
                </div>
                <div className="input-row">
                    <ColorPicker
                        data-id="color-picker2"
                        color={this.state.picker2color}
                        onValueChange={this._handleChange2}
                        labelText="Background color"
                        hintText="Pick a color or type in the hex code"
                        onToggle={this._handleToggle}
                        onError={this._handleError}
                        errorMessage={this.state.errorMessage}
                        open={this.state.picker2open}
                        stateless={true} />
                    </div>
            </div>);
    }
});

module.exports = ColorPickerDemo;
