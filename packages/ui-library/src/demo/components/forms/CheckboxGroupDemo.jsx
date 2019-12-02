import React from "react";
import CheckboxGroup from "../../../components/forms/CheckboxGroup";

const optionsData = [
    {
        value: "one",
        label: "Uno"
    },
    {
        value: "two",
        label: "Dos",
        conditionalContent: "This only shows when the box is checked"
    },
    {
        value: "three",
        label: "Three",
        labelHelpText: "this is a help text"
    },
    {
        value: "four",
        label: "Four disabled",
        disabled: true
    },
];

/**
* @name CheckboxGroupDemo
* @memberof CheckboxGroup
* @desc A demo for CheckboxGroup
*/
class CheckboxGroupDemo extends React.Component {
    state = {
        values: ["one"]
    }

    _handleValueChange = values => this.setState({ values })

    render() {
        return (
            <CheckboxGroup
                options={optionsData}
                values={this.state.values}
                onValueChange={this._handleValueChange}
            />
        );
    }
}

module.exports = CheckboxGroupDemo;
