import React, { Component } from "react";
import DropDownButton from "ui-library/lib/components/forms/DropDownButton";
import Icon from "ui-library/lib/components/general/Icon";
import HR from "ui-library/lib/components/general/HR";

/**
* @name DropDownButtonDemo
* @memberof DropDownButton
* @desc A demo for DropDownButton
*/
export default class DropDownButtonDemo extends Component {
    state = {
        selectedLabel: "None.",
        open: false
    };

    _dropDownOptions = {
        optionOne: "Option One",
        optionTwo: "Option Two",
        optionThree: "Option Three",
        optionFour: "Option Four",
        optionFive: "Option Five",
        optionSix: "Option Six",
        optionSeven: "Option Seven",
        optionEight: <span>Can do icons too <Icon iconName="globe" type="inline" /></span>
    };

    _onToggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    _onValueChange = (selectedLabel) =>
        this.setState({
            selectedLabel: this._dropDownOptions[selectedLabel],
            open: false
        });

    render() {
        return (
            <div>
                <DropDownButton
                    title="Options Title"
                    label="New Option"
                    onValueChange={this._onValueChange}
                    onToggle={this._onToggle}
                    open={this.state.open}
                    options={this._dropDownOptions}
                />
                <br/><br/>
                <div>
                    Selected menu item = {this.state.selectedLabel}
                </div>
                <HR />
                <DropDownButton
                    data-id="custom-icon"
                    iconName="success"
                    label="Custom Icon"
                    options={this._dropDownOptions}
                />
            </div>
        );
    }
}
