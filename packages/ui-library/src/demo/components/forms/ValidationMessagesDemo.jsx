import React from "react";
import FormTextField from "../../../components/forms/form-text-field";
import ValidationMessages from "./../../../components/forms/ValidationMessages";


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
        showValidateMessages: "",
    };

    _handleValueChange1 = (value) => {
        this.setState({
            messages1: _getMessages(value)
        });
    };

    _handleValueChange2 = (value) => {
        this.setState({
            messages2: _getMessages(value),
            showValidateMessages: "show"
        });
    };

    render() {
        return (
            <div>
                <div className="input-row">
                    <FormTextField
                        className="input-width-medium"
                        labelText="Validation always visible"
                        onValueChange={this._handleValueChange1}
                        maskValue={true}
                        showReveal={true}
                        stateless={false}
                    />
                    <ValidationMessages
                        className="show"
                        messages={this.state.messages1}
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        className="input-width-medium"
                        labelText="Validation only visibile when required"
                        maskValue={true}
                        onValueChange={this._handleValueChange2}
                        showReveal={true}
                        stateless={false}
                    />
                    <ValidationMessages
                        className={this.state.showValidateMessages}
                        messages={this.state.messages2}
                    />
                </div>
            </div>
        );
    }
}

module.exports = ValidationMessagesDemo;
