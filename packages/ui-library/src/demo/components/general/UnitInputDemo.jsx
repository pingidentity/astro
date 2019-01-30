import React from "react";
import UnitInput from "./../../../components/general/UnitInput";
import { InputWidths } from "./../../../components/forms/InputWidths";

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

    constructor(props) {
        super(props);
        var initialState = {
            a: "1",
            b: "2",
            selectedValue: { label: "Day(s)", value: "Day(s)" }
        };
        this.state = initialState;
    }

    _handleTextValueChange = (e) => {
        this.setState({
            a: e
        });
    };

    _handleDropdownValueChange = (value) => {
        var newState = {};
        newState["selectedValue"] = value;
        this.setState(newState);
    };

    render() {
        return (
            <div>
                <div className="input-row">
                    <UnitInput
                        labelText="Unit Input Text"
                        textFieldProps={{
                            onValueChange: this._handleTextValueChange,
                            value: this.state.a,
                            width: InputWidths.XS,
                            name: "text-field"
                        }}
                        dropDownListProps={{
                            options: OPTIONS,
                            onValueChange: this._handleDropdownValueChange,
                            selectedOption: this.state.selectedValue,
                            width: InputWidths.XS,
                            name: "dropdown"
                        }}
                        flags={this.props.flags}
                    />
                    <br /><br />
                    Selected Value: <strong>{this.state.a} {this.state.selectedValue.value}</strong>
                </div>
            </div>
        );
    }
}

module.exports = UnitInputDemo;
