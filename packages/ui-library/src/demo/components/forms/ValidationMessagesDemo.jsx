import React from "react";
//eslint-disable-next-line import/no-extraneous-dependencies
import FormTextField from "ui-library/lib/components/forms/form-text-field";
//eslint-disable-next-line import/no-extraneous-dependencies
import ValidationMessages from "ui-library/lib/components/forms/ValidationMessages";
//eslint-disable-next-line import/no-extraneous-dependencies
import InputWidths from "ui-library/lib/components/forms/InputWidths";
//eslint-disable-next-line import/no-extraneous-dependencies
import InputRow from "ui-library/lib/components/layout/InputRow";

/**
* @name ValidationMessagesDemo
* @memberof ValidationMessages
* @desc A demo for ValidationMessages
*/

const _testLength = (value) => {
    return value && value.length > 5 ? ValidationMessages.Status.PASS : ValidationMessages.Status.FAIL;
};

const _testNumbers = (value) => {
    return /[0-9]/.test(value) ? ValidationMessages.Status.PASS : ValidationMessages.Status.FAIL;
};

const _testUppercase = (value) => {
    return /[A-Z]/.test(value) ? ValidationMessages.Status.PASS : ValidationMessages.Status.FAIL;
};

const _getMessages = (value) => {
    return [
        { text: "At least 6 characters", status: _testLength(value) },
        { text: "1 number", status: _testNumbers(value) },
        { text: "1 UPPERCASE letter", status: _testUppercase(value) },
    ];
};

class ValidationMessagesDemo extends React.Component {
    state = {
        messages1: _getMessages(),
        messages2: [],
        showValidateMessages: false,
    };

    _handleValueChange1 = (value) => {
        this.setState({
            messages1: _getMessages(value)
        });
    };

    _handleValueChange2 = (value) => {
        this.setState({
            messages2: _getMessages(value),
            showValidateMessages: true
        });
    };

    render() {
        return (
            <div>
                <InputRow>
                    <FormTextField
                        width={InputWidths.MD}
                        labelText="Validation always visible"
                        onValueChange={this._handleValueChange1}
                        maskValue={true}
                        showReveal={true}
                    />
                    <ValidationMessages
                        messages={this.state.messages1}
                        show
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        width={InputWidths.MD}
                        labelText="Validation only visibile when required"
                        maskValue={true}
                        onValueChange={this._handleValueChange2}
                        showReveal={true}
                    />
                    <ValidationMessages
                        messages={this.state.messages2}
                        show={this.state.showValidateMessages}
                    />
                </InputRow>
            </div>
        );
    }
}

module.exports = ValidationMessagesDemo;
