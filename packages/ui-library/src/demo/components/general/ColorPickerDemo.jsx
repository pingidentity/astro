import React from "react";
import ColorPicker, { pickerTypes } from "../../../components/general/ColorPicker";
import InputRow from "../../../components/layout/InputRow";

/**
* @name ColorPickerDemo
* @memberof ColorPicker
* @desc A demo for ColorPicker
*/
class ColorPickerDemo extends React.Component {
    state = {
        picker1color: "#fff",
        picker2color: "#000",
        picker3color: "#000",
        picker2open: false,
        errorMessage: ""
    };

    // There is a lot of duplication in the methods below.
    // It's better than building the prop names on the state dynamically.

    _handleChange1 = (color) => {
        this.setState({ picker1color: color });
    };

    _handleChange2 = (color) => {
        this.setState({ picker2color: color });
    };

    _handleChange3 = (color) => {
        this.setState({ picker3color: color });
    };

    _handleToggle = () => {
        this.setState({ picker2open: !this.state.picker2open });
    };

    _handleError = (message) => {
        this.setState({ errorMessage: message });
    };

    render() {
        return (
            <div>
                <InputRow>
                    <ColorPicker
                        data-id="color-picker1"
                        color={this.state.picker1color}
                        onValueChange={this._handleChange1}
                        labelText="Background color"
                        name="stateful-demo"
                        hintText="Pick a color or type in the hex code"
                        description="Sample Description"
                    />
                </InputRow>
                <InputRow>
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
                    />
                </InputRow>
                <InputRow>
                    <ColorPicker
                        data-id="color-picker3"
                        color={this.state.picker3color}
                        type={pickerTypes.SIMPLE}
                        onValueChange={this._handleChange3}
                        labelText="Background color"
                        name="stateful-demo"
                        hintText="Pick a color or type in the hex code"
                        description="Sample Description"
                    />
                </InputRow>
            </div>);
    }
}

module.exports = ColorPickerDemo;
