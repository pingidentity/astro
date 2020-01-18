import React from "react";
import CheckboxGroup from "ui-library/lib/components/forms/CheckboxGroup";
import HR from "ui-library/lib/components/general/HR";
import { partial } from "underscore";

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

const testIcon = <span className="icon-cog inline-icon"></span>;
const testImage = <img src="./favicon.png" />;

const optionsData2 = [
    { label: "Apple", value: 1 },
    { label: "Orange", value: 2, disabled: true },
    { label: "Banana", value: 3,
        hint: "Help Hint with dynamic icon",
        helpTarget: testIcon },
    { label: "Watermelon", value: 4,
        hint: "Help Hint with custom image",
        helpTarget: testImage } ,
    { label: "Grape Fruit", value: 5 },
    { label: "Peach", value: 6, conditionalContent: "Some content" },
    { label: "Plum", value: 7,
        hint: "Checkboxes may have Help Hints" },
    { label: "Strawberry", value: 8 },
    { label: "Kiwi", value: 9 }
];

/**
* @name CheckboxGroupDemo
* @memberof CheckboxGroup
* @desc A demo for CheckboxGroup
*/
class CheckboxGroupDemo extends React.Component {
    state = {
        values1: ["one"]
    }

    _handleValueChange = (key, values) => this.setState({ [`values${key}`]: values });

    render() {
        return (
            <>
                <CheckboxGroup
                    options={optionsData}
                    values={this.state.values1}
                    onValueChange={partial(this._handleValueChange, "1")}
                />
                <HR />
                <CheckboxGroup
                    options={optionsData2}
                    values={this.state.values2}
                    onValueChange={partial(this._handleValueChange, "2")}
                />
            </>
        );
    }
}

module.exports = CheckboxGroupDemo;
