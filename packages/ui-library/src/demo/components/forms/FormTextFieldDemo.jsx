import React from "react";
import FormTextField from "../../../components/forms/form-text-field";
import InputWidths from "../../../components/forms/InputWidths";
import InputRow from "../../../components/layout/InputRow";

/**
* @name FormTextFieldDemo
* @memberof FormTextField
* @desc A demo for FormTextField
*/
class FormTextFieldDemo extends React.Component {
    static flags = [ "p-stateful" ];

    state = {
        onValueChangeFieldValue: "",
        onBlurFieldValue: "",
        onChangeValidationErrorMessage: "",
        onBlurValidationErrorMessage: "",
        saved: false,
        undone: false,
        showUndo: false,
        onUndoValue: null,
        originalValue: "this is the original value",
        requiredValue: "",
        statelessValue: "",
    };

    _handleStatelessValueChange = (value) => {
        this.setState({
            statelessValue: value
        });
    };

    _handleValueChange = (value) => {
        this.setState({
            onValueChangeFieldValue: value
        });
    };

    _handleBlur = (e) => {
        this.setState({
            onBlurFieldValue: e.target.value
        });
    };

    _handleUndoValueChange = (value) => {
        this.setState({
            onUndoValue: value,
            showUndo: value !== this.state.originalValue
        });
    };

    _handleUndo = (e) => {
        // prevents focus on characters in input field
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            undone: true,
            onUndoValue: this.state.originalValue,
            showUndo: false
        });
        window.setTimeout(this.setState.bind(this, { undone: false }), 5000);
    };

    _handleRequiredValueChange = (value) => {
        this.setState({
            requiredValue: value
        });
    };

    _handleSave = () => {
        this.setState({ saved: true });
        window.setTimeout(this.setState.bind(this, { saved: false }), 5000);
    };

    _handleChangeErrorValidation = (e) => {
        this.setState({
            onChangeValidationErrorMessage: this._validateInput(e.target.value)
        });
    };

    _handleBlurErrorValidation = (e) => {
        this.setState({
            onBlurValidationErrorMessage: this._validateInput(e.target.value)
        });
    };

    _validateInput = (value) => {
        var errorMessage = "";

        if (value.length === 0) {
            errorMessage = "";
        } else {
            if (value.length < 5) {
                errorMessage = "Please enter at least 5 chars";
            }
        }
        return errorMessage;
    };

    render() {
        const { flags } = this.props;

        return (
            <div>
                <InputRow>
                    <FormTextField
                        stateless={false}
                        labelText="Basic (stateful)"
                        width={InputWidths.MD}
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        stateless={true}
                        labelText="Basic (stateless)"
                        value={this.state.statelessValue}
                        onValueChange={this._handleStatelessValueChange}
                        width={InputWidths.MD}
                        name="basic-stateless"
                    />
                </InputRow>
                {flags.findIndex(item => item === "p-stateful") >= 0 &&
                    <p>
                        The below won't work in progressively-stateful mode.
                        Providing the value makes it stateless.
                        Use the "initialState" prop.
                    </p>
                }
                <InputRow>
                    <FormTextField
                        stateless={false}
                        labelText="Default value"
                        value="default"
                        width={InputWidths.MD}
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        labelText="Undo"
                        showUndo={this.state.showUndo}
                        onUndo={this._handleUndo}
                        value={this.state.onUndoValue || this.state.originalValue}
                        onValueChange={this._handleUndoValueChange}
                        width={InputWidths.MD}
                    />
                    {this.state.onUndoValue}
                    <div>{this.state.undone ? "undone!" : null}</div>
                </InputRow>
                <InputRow>
                    <FormTextField
                        labelText="Required indicator"
                        required={true}
                        onValueChange={this._handleRequiredValueChange}
                        value={this.state.requiredValue}
                        width={InputWidths.MD}
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        labelText="Inline save"
                        showSave={true}
                        onSave={this._handleSave}
                        onValueChange={this._handleRequiredValueChange}
                        value={this.state.requiredValue}
                        width={InputWidths.MD}
                    />
                    <div>{this.state.saved ? "saved!" : null}</div>
                </InputRow>
                <InputRow>
                    <FormTextField
                        stateless={false}
                        labelText="Reveal"
                        maskValue={true}
                        showReveal={true}
                        value="hidden text"
                        width={InputWidths.MD}
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        labelText="Disabled"
                        disabled={true}
                        width={InputWidths.MD}
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        stateless={false}
                        labelText="onChange callback"
                        onValueChange={this._handleValueChange}
                        width={InputWidths.MD}
                    />
                    <span>{this.state.onValueChangeFieldValue}</span>
                </InputRow>
                <InputRow>
                    <FormTextField
                        stateless={false}
                        labelText="MaxLength (10 chars)"
                        maxLength={10}
                        width={InputWidths.MD}
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        stateless={false}
                        labelText="Placeholder text"
                        placeholder="placeholder text"
                        width={InputWidths.MD}
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        stateless={false}
                        labelText="onBlur callback"
                        onBlur={this._handleBlur}
                        width={InputWidths.MD}
                    />
                    <span>{this.state.onBlurFieldValue}</span>
                </InputRow>
                <InputRow>
                    <FormTextField
                        labelText="Read-only"
                        value="text content cannot be edited"
                        readOnly
                        width={InputWidths.MD}
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        labelText="Read-only with arrow"
                        value="text content cannot be edited"
                        readOnly
                        width={InputWidths.MD}
                        withArrow
                    />
                    <FormTextField
                        labelText="Other text"
                        stateless={false}
                        width={InputWidths.MD}
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        stateless={false}
                        labelText="Error message"
                        errorMessage="The error message appears when hovering over the input/icon or when focus is
                            placed on the input."
                        width={InputWidths.MD}
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        stateless={false}
                        labelText="Help tooltip"
                        labelHelpText="This is my help text."
                        width={InputWidths.MD}
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        stateless={false}
                        labelText="Help and lock tooltips"
                        labelHelpText="This is my help text."
                        labelLockText="This is the reason the field is locked."
                        width={InputWidths.MD}
                        disabled={true}
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        stateless={false}
                        labelText="Validate onChange"
                        labelHelpText="Valid when 5 or more characters present"
                        errorMessage={this.state.onChangeValidationErrorMessage}
                        onChange={this._handleChangeErrorValidation}
                        width={InputWidths.MD}
                        helpClassName="right"
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        stateless={false}
                        labelText="Validate onBlur"
                        labelHelpText="Valid when 5 or more characters present"
                        errorMessage={this.state.onBlurValidationErrorMessage}
                        onBlur={this._handleBlurErrorValidation}
                        width={InputWidths.MD}
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        stateless={false}
                        labelText="Flex Width Input"
                        labelHelpText="A flex-width input grows with the content once it gets wider than the intial
                            width"
                        width={InputWidths.MD}
                        flexWidth={true}
                        placeholder="try entering text longer than this field"
                    />
                </InputRow>
                <InputRow>
                    <FormTextField
                        stateless={false}
                        labelText="Info message variant"
                        message="Info formatted messages are now supported within this component"
                        messageType={FormTextField.messageTypes.INFO}
                        width={InputWidths.MD}
                    />
                </InputRow>
            </div>
        );
    }
}

module.exports = FormTextFieldDemo;
