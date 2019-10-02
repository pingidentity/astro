import React from "react";
import FormRadioGroup from "../../../components/forms/FormRadioGroup";
import InputRow from "../../../components/layout/InputRow";

/**
* @name FormRadioGroupDemo
* @memberof FormRadioGroup
* @desc A demo for FormRadioGroup
*/
class FormRadioGroupDemo extends React.Component {
    constructor(props, context) {
        super(props, context);
        var initialState = { showSpinner: true };

        for (var i=1; i<=this._numDemos; i+=1) {
            initialState["selectedId" + i] = i;
        }

        this.state = initialState;
    }

    _numDemos = 4;

    _handleChange = i => value => {
        var newState = {};
        newState["selectedId" + i] = value;
        this.setState(newState);
    };

    render() {
        var radioItems = [
            { id: "1", name: "Radio 1" },
            { id: "2", name: "Radio 2", helpHintText: "Radio 2 help hint" },
            { id: "3", name: "Radio 3", disabled: true }
        ];

        var radioItemsWithHidden = [
            { id: "1", name: "Radio A" },
            { id: "2", name: "Radio B" },
            { id: "3", name: "Radio C" },
            { id: "4", name: "Radio D" }
        ];
        radioItemsWithHidden[Math.round(Math.random() * 3)].hidden = true;

        return (
            <div>
                <InputRow>
                    <FormRadioGroup
                        groupName="horizontal-group"
                        selected={this.state.selectedId1}
                        onValueChange={this._handleChange(1)}
                        items={radioItems}
                        labelText="Horizonal Alignment"
                        stacked={false}
                        description="Sample Description"
                        labelHelpText="This is an example help hint."
                    />
                </InputRow>

                <InputRow>
                    selected id = {this.state.selectedId1}
                </InputRow>

                <InputRow>
                    <FormRadioGroup
                        groupName="stacked-group"
                        selected={this.state.selectedId2}
                        onValueChange={this._handleChange(2)}
                        labelText="Stacked/Vertical Alignment"
                        items={radioItems}
                    />
                </InputRow>

                <InputRow>
                    selected id = {this.state.selectedId2}
                </InputRow>

                <InputRow>
                    <FormRadioGroup
                        groupName="disabled-stacked-group"
                        selected={this.state.selectedId3}
                        onValueChange={this._handleChange(3)}
                        items={radioItems}
                        labelText="Disabled Radio Group"
                        disabled={true}
                    />
                </InputRow>

            </div>
        );
    }
}

module.exports = FormRadioGroupDemo;
