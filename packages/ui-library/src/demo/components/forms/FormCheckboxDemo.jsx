import React from "react";
import FormCheckbox from "./../../../components/forms/FormCheckbox";
import InputRow from "../../../components/layout/InputRow";
import FormLabel from "../../../components/forms/FormLabel";

/**
* @name FormCheckboxDemo
* @memberof FormCheckbox
* @desc A demo for FormCheckbox
*/
class FormCheckboxDemo extends React.Component {
    constructor(props, context) {
        super(props, context);
        var initialState = {};

        for (var i=1; i<=this._numDemos; i+=1) {
            initialState["checkboxChecked" + i] = Math.random() < 0.5;
        }

        this.state = initialState;
    }

    _numDemos = 12;

    _onChange = i => event => {
        var newState = {};
        newState["checkboxChecked" + i] = event.target.checked;
        this.setState(newState);
    };

    render() {
        return (
            <div>
                <InputRow>
                    <FormCheckbox
                        label = {"Regular Checkbox; checked: " + this.state.checkboxChecked1}
                        value = ""
                        onChange = {this._onChange(1)}
                        checked = {this.state.checkboxChecked1}
                    />
                </InputRow>
                <InputRow>
                    <FormCheckbox
                        label = {"Default Checked; checked: " + this.state.checkboxChecked2}
                        value = ""
                        onChange = {this._onChange(2)}
                        checked = {this.state.checkboxChecked2}
                        name = "default-checked"
                    />
                </InputRow>
                <InputRow>
                    <FormCheckbox
                        label = {"Disabled; checked: " + this.state.checkboxChecked3}
                        value = ""
                        onChange = {this._onChange(3)}
                        checked = {this.state.checkboxChecked3}
                        disabled = {true}
                        labelHelpText = "Disabled with help"
                    />
                </InputRow>
                <InputRow>
                    <FormCheckbox
                        label = {"With added Help Text; checked: " + this.state.checkboxChecked4}
                        value = ""
                        onChange = {this._onChange(4)}
                        checked = {this.state.checkboxChecked4}
                        labelHelpText = "Check this box!"
                    />
                </InputRow>
                <InputRow>
                    <FormLabel detached>
                        Example of Stacked Options
                    </FormLabel>
                    <FormCheckbox
                        conditionalContent="Some conditional content"
                        label="Stacked Checkbox"
                        onChange={this._onChange(5)}
                        checked={this.state.checkboxChecked5}
                        stacked
                    />
                    <FormCheckbox
                        label="Stacked Checkbox"
                        onChange={this._onChange(6)}
                        checked={this.state.checkboxChecked6}
                        stacked
                    />
                    <FormCheckbox
                        label="Stacked Checkbox"
                        onChange={this._onChange(7)}
                        checked={this.state.checkboxChecked7}
                        stacked
                    />
                </InputRow>
                <InputRow>
                    <FormLabel detached>
                        Example of Inline Options together and alone
                    </FormLabel>
                    <FormCheckbox
                        label="Inline Checkbox"
                        onChange={this._onChange(8)}
                        checked={this.state.checkboxChecked8}
                        inline
                    />
                    <FormCheckbox
                        label="Inline Checkbox"
                        onChange={this._onChange(9)}
                        checked={this.state.checkboxChecked9}
                        inline
                    />
                    <FormCheckbox
                        label="Inline Checkbox"
                        onChange={this._onChange(10)}
                        checked={this.state.checkboxChecked10}
                        inline
                    />
                </InputRow>
                <InputRow>
                    <FormCheckbox
                        label="Single Inline Checkbox"
                        onChange={this._onChange(11)}
                        checked={this.state.checkboxChecked11}
                        inline
                    />
                </InputRow>
                <InputRow>
                    <FormCheckbox
                        label={"With Error Message; checked: " + this.state.checkboxChecked12}
                        renderLabel= {
                            (props, FormLabel) => (
                                <FormLabel
                                    {...props}
                                    description="Sample Description"
                                />
                            )
                        }
                        value=""
                        onChange={this._onChange(12)}
                        checked={this.state.checkboxChecked12}
                        errorMessage="An error has occurred"
                    />
                </InputRow>
            </div>
        );
    }
}

module.exports = FormCheckboxDemo;
