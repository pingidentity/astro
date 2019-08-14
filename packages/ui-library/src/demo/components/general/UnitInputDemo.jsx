import React from "react";
import UnitInput from "./../../../components/general/UnitInput";
import { InputWidths } from "./../../../components/forms/InputWidths";
import InputRow from "../../../components/layout/InputRow";

const OPTIONS = [
    { label: "--", value: "" },
    { label: "Minute(s)", value: "Minute(s)" },
    { label: "Hour(s)", value: "Hour(s)" },
    { label: "Day(s)", value: "Day(s)" },
    { label: "Week(s)", value: "Week(s)" },
    { label: "Month(s)", value: "Month(s)" },
    { label: "Year(s)", value: "Year(s)" }
];

/**
* @name UnitInputnDemo
* @memberof UnitInput
* @desc A demo for UnitInput
*/
class UnitInputDemo extends React.Component {
    static flags = [ "use-portal" ];


    state = {
        unitInputExample1: "1",
        unitInputExample2: "1",
        selectedValue1: { label: "Day(s)", value: "Day(s)" },
        selectedValue2: { label: "Day(s)", value: "Day(s)" }
    };

    _handleTextValueChange1 = (input) => {
        this.setState({
            unitInputExample1: input
        });
    };

    _handleDropdownValueChange1 = (value) => {
        this.setState({
            selectedValue1: value
        });
    };

    _handleTextValueChange2 = (input) => {
        this.setState({
            unitInputExample2: input
        });
    };

    _handleDropdownValueChange2 = (value) => {
        this.setState({
            selectedValue2: value
        });
    };

    render() {
        return (
            <div>
                <InputRow>
                    <UnitInput
                        labelText="Unit Input Text"
                        textFieldProps={{
                            onValueChange: this._handleTextValueChange1,
                            value: this.state.unitInputExample1,
                            width: InputWidths.XS,
                            name: "text-field",
                        }}
                        dropDownListProps={{
                            options: OPTIONS,
                            onValueChange: this._handleDropdownValueChange1,
                            selectedOption: this.state.selectedValue1,
                            width: InputWidths.SM,
                            name: "dropdown"
                        }}
                    />
                    <br /><br />
                    Selected Value: <strong>{this.state.unitInputExample1} {this.state.selectedValue1.value}</strong>
                </InputRow>

                <InputRow>
                    <UnitInput
                        labelText="Unit Input Text With Error"
                        errorMessage ="Unit Input Error Message."
                        textFieldProps={{
                            onValueChange: this._handleTextValueChange2,
                            value: this.state.unitInputExample2,
                            width: InputWidths.XS,
                            name: "text-field",
                        }}
                        dropDownListProps={{
                            options: OPTIONS,
                            onValueChange: this._handleDropdownValueChange2,
                            selectedOption: this.state.selectedValue2,
                            width: InputWidths.SM,
                            name: "dropdown"
                        }}
                    />
                    <br /><br />
                    Selected Value: <strong>{this.state.unitInputExample2} {this.state.selectedValue2.value}</strong>
                </InputRow>
            </div>
        );
    }
}

module.exports = UnitInputDemo;
