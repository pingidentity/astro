var React = require("react"),
    FormTextField = require("../../../components/forms/form-text-field"),
    ValidationMessages = require("./../../../components/forms/ValidationMessages");
    
var ValidationMessagesDemo = React.createClass({
    
    getInitialState: function () {
        return {
            statelessValue1: "",
            statelessValue2: "",
            messages1: [
                    { text: "At least 6 characters", status: ValidationMessages.Status.FAIL },
                    { text: "1 number", status: ValidationMessages.Status.FAIL },
                    { text: "1 UPPERCASE letter", status: ValidationMessages.Status.FAIL }
            ],
            messages2: [],
            showValidateMessages: ""
        };
    },
    
    _getLength: function (value) {
        var status;
        if (value.length > 5) {
            status = ValidationMessages.Status.PASS;
        }
        else {
            status = ValidationMessages.Status.FAIL;
        }
        return status;
    },
    
    _getNumbers: function (value) {
        var status;
        if (/[0-9]/.test(value)) {
            status = ValidationMessages.Status.PASS;
        }
        else {
            status = ValidationMessages.Status.FAIL;
        }
        return status;
    },
    
    _getUppercase: function (value) {
        var status;
        if (/[A-Z]/.test(value)) {
            status = ValidationMessages.Status.PASS;
        }
        else {
            status = ValidationMessages.Status.FAIL;
        }
        return status;
    },

    _getMessages: function (value) {
        var messages = [
                { text: "At least 6 characters", status: this._getLength(value) },
                { text: "1 number", status: this._getNumbers(value) },
                { text: "1 UPPERCASE letter", status: this._getUppercase(value) }
        ];
        return messages;
    },
    
    _handleStatelessValueChange1: function (value) {
        var messages = this._getMessages(value);
        this.setState({
            messages1: messages
        });
    },
    
    _handleStatelessValueChange2: function (value) {
        var messages = this._getMessages(value);
        this.setState({
            messages2: messages,
            showValidateMessages: "show"
        });
    },
    
    render: function () {

        return (
            <div>
                <div className="input-row">
                    <FormTextField
                        labelText="Password field with validation messages showing at the beginning."
                        className="input-width-medium"
                        maskValue={true}
                        showReveal={true}
                        onValueChange={this._handleStatelessValueChange1}
                        className="input-width-medium"
                    />
                    <ValidationMessages className="show"
                                        messages={this.state.messages1} />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Password field with validation messages that shows after first letter is typed."
                        className="input-width-medium"
                        maskValue={true}
                        showReveal={true}
                        onValueChange={this._handleStatelessValueChange2}
                        className="input-width-medium"
                    />
                    <ValidationMessages className={this.state.showValidateMessages}
                                        messages={this.state.messages2} />
                </div>
            </div>
        );
    }
});

module.exports = ValidationMessagesDemo;
