var React = require("react"),
    ColorPicker = require("../../../components/general/ColorPicker.jsx");

var ColorPickerDemo = React.createClass({

    getInitialState: function () {
        return {
            picker1color: "#fff",
            picker2color: "#000",
            picker2open: false
        };
    },

    // There is a lot of duplication in the methods below.
    // It's better than building the prop names on the state dynamically.

    _handleChange1: function (color, keepOpen) {
        if (keepOpen === true) {
            this.setState({ picker1color: color });
        }
        else {
            this.setState(
                { picker1open: false },
                function () {
                    this.setState({ picker1color: color });
                }
            );
        }
    },

    _handleChange2: function (color, keepOpen) {
        if (keepOpen === true) {
            this.setState({ picker2color: color });
        }
        else {
            this.setState(
                { picker2open: false },
                function () {
                    this.setState({ picker2color: color });
                }
            );
        }
    },

    _toggle2: function () {
        this.setState({ picker2open: !this.state.picker2open });
    },

    render: function () {
        return (
            <div>
                <div>
                    <ColorPicker
                        id="color-picker"
                        color={this.state.picker1color}
                        onChange={this._handleChange1}
                        labelText="Background color"
                        hintText="Pick a color or type in the hex code" />
                </div>

                <div>
                    <ColorPicker
                        id="color-picker"
                        color={this.state.picker2color}
                        onChange={this._handleChange2}
                        labelText="Background color"
                        hintText="Pick a color or type in the hex code"
                        onToggle={this._toggle2}
                        open={this.state.picker2open}
                        controlled={true} />
                    </div>
            </div>);
    }
});

module.exports = ColorPickerDemo;
