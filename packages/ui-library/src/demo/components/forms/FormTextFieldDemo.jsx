var React = require("react"),
    FormTextField = require("../../../components/forms/form-text-field").v2;


/**
* @name FormTextFieldDemo
* @memberof FormTextField
* @desc A demo for FormTextField
*/
class FormTextFieldDemo extends React.Component {
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
        requiredValue: null,
        statelessValue: "stateless default"
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

    _handleTimeValueChange = (value) => {
        this.setState({
            timeFieldValue: value
        });
    };

    _handleDateTimeValueChange = (value) => {
        this.setState({
            dateTimeFieldValue: value
        });
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

        return (
            <div>
                <div className="input-row">
                    <FormTextField
                        labelText="Basic (stateful)"
                        className="input-width-medium"
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        stateless={true}
                        labelText="Basic (stateless)"
                        value={this.state.statelessValue}
                        onValueChange={this._handleStatelessValueChange}
                        className="input-width-medium"
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Default value"
                        value="default"
                        className="input-width-medium"
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Default value and undo"
                        showUndo={this.state.showUndo}
                        onUndo={this._handleUndo}
                        value={this.state.onUndoValue || this.state.originalValue}
                        onValueChange={this._handleUndoValueChange}
                        className="input-width-medium"
                    />
                    {this.state.onUndoValue}
                    <div>{this.state.undone ? "undone!" : null}</div>
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Required and save"
                        required={true}
                        showSave={true}
                        onSave={this._handleSave}
                        onValueChange={this._handleRequiredValueChange}
                        value={this.state.requiredValue}
                        className="input-width-medium"
                    />
                    <div>{this.state.saved ? "saved!" : null}</div>
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Reveal"
                        maskValue={true}
                        showReveal={true}
                        className="input-width-medium"
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Reveal and disabled"
                        maskValue={true}
                        showReveal={true}
                        disabled={true}
                        className="input-width-medium"
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="onChange callback and maxLength (10 chars)"
                        onValueChange={this._handleValueChange}
                        maxLength={10}
                        className="input-width-medium"
                    />
                    <span>{this.state.onValueChangeFieldValue}</span>
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="onBlur callback and placeholder"
                        onBlur={this._handleBlur}
                        placeholder="placeholder"
                        className="input-width-medium"
                    />
                    <span>{this.state.onBlurFieldValue}</span>
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Read-only"
                        value="text content cannot be edited"
                        readOnly={true}
                        className="input-width-medium"
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="With error message"
                        errorMessage="The error message appears when hovering over the error icon or when focus is
                            placed on the input."
                        className="input-width-medium"
                        required={true}
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Required password field with error message"
                        errorMessage="The error message."
                        required={true}
                        maskValue={true}
                        showReveal={true}
                        className="input-width-medium"
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="With help tooltip"
                        labelHelpText="This is my help text."
                        className="input-width-medium"
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="With help and lock tooltips"
                        labelHelpText="This is my help text."
                        labelLockText="This is the reason the field is locked."
                        className="input-width-medium"
                        disabled={true}
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Validate onChange"
                        labelHelpText="Valid when have 5 or more chars"
                        errorMessage={this.state.onChangeValidationErrorMessage}
                        onChange={this._handleChangeErrorValidation}
                        className="input-width-medium"
                        helpClassName="right"
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Validate onBlur"
                        labelHelpText="Valid when have 5 or more chars"
                        errorMessage={this.state.onBlurValidationErrorMessage}
                        onBlur={this._handleBlurErrorValidation}
                        className="input-width-medium"
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Disabled field with help"
                        labelHelpText="Disabled field with help"
                        value="text content cannot be edited"
                        disabled={true}
                        className="input-width-medium"
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Flex Width Input"
                        labelHelpText="A flex-width input grows with the content once it gets wider than the intial
                            width"
                        className="input-width-medium"
                        flexWidth={true}
                        placeholder="try entering text longer than this field"
                    />
                </div>
            </div>
        );
    }
}

module.exports = FormTextFieldDemo;
