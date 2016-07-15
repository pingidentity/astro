var React = require("react"),
    FormTextField = require("../../../components/forms/form-text-field"),
    FormTimeField = require("../../../components/forms/FormTimeField.jsx"),
    Utils = require("../../../util/Utils.js");


/**
* @name FormTextFieldDemo
* @memberof FormTextField
* @desc A demo for FormTextField
*/
var FormTextFieldDemo = React.createClass({

    getInitialState: function () {
        return {
            onValueChangeFieldValue: "",
            onBlurFieldValue: "",
            onChangeValidationErrorMessage: "",
            onBlurValidationErrorMessage: "",
            saved: false,
            undone: false,
            timeFieldValue: "00:00:00",
            dateTimeFieldValue: Utils.formatDate(Date.now()),
            onUndoValue: null
        };
    },

    _handleValueChange: function (value) {
        this.setState({
            onValueChangeFieldValue: value
        });
    },

    _handleBlur: function (e) {
        this.setState({
            onBlurFieldValue: e.target.value
        });
    },

    _handleUndoValueChange: function (value) {
        this.setState({
            onUndoValue: value,
            showUndo: value !== "this is the original value"
        });
    },

    _handleUndo: function () {
        this.setState({
            undone: true,
            onUndoValue: "this is the original value"
        });
        window.setTimeout(this.setState.bind(this, { undone: false }), 5000);
    },

    _handleSave: function () {
        this.setState({ saved: true });
        window.setTimeout(this.setState.bind(this, { saved: false }), 5000);
    },

    _handleTimeValueChange: function (value) {
        this.setState({
            timeFieldValue: value
        });
    },

    _handleDateTimeValueChange: function (value) {
        this.setState({
            dateTimeFieldValue: value
        });
    },

    _handleChangeErrorValidation: function (e) {
        this.setState({
            onChangeValidationErrorMessage: this._validateInput(e.target.value)
        });
    },

    _handleBlurErrorValidation: function (e) {
        this.setState({
            onBlurValidationErrorMessage: this._validateInput(e.target.value)
        });
    },
    
    _validateInput: function (value) {
        var errorMessage = "";

        if (value.length === 0) {
            errorMessage = "";
        } else {
            if (value.length < 5) {
                errorMessage = "Please enter at least 5 chars";
            }
        }
        return errorMessage;
    },

    render: function () {

        return (
            <div>
                <div className="input-row">
                    <FormTimeField
                        defaultValue={this.state.timeFieldValue}
                        onValueChange={this._handleTimeValueChange}
                        labelText="Time Field" />
                </div>
                <div>{this.state.timeFieldValue}</div>
                <br />
                <div className="input-row">
                    <FormTimeField type={FormTimeField.Types.DATE}
                        defaultValue={this.state.dateTimeFieldValue}
                        onValueChange={this._handleDateTimeValueChange}
                        labelText="Date Time Field" />
                </div>
                <div>{this.state.dateTimeFieldValue}</div>
                <br />
                <div className="input-row">
                    <FormTextField
                        labelText="Basic"
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Default value and undo"
                        showUndo={true}
                        onUndo={this._handleUndo}
                        value={this.state.onUndoValue}
                        onValueChange={this._handleUndoValueChange}
                        defaultValue="this is the original value"
                    />
                    <div>{this.state.undone ? "undone!" : null}</div>
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Required and save"
                        required={true}
                        showSave={true}
                        onSave={this._handleSave} />
                    <div>{this.state.saved ? "saved!" : null}</div>
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Reveal"
                        maskValue={true}
                        showReveal={true} />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="onChange callback and maxLength (10 chars)"
                        onValueChange={this._handleValueChange}
                        maxLength={10} />
                    <span>{this.state.onValueChangeFieldValue}</span>
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="onBlur callback and placeholder"
                        onBlur={this._handleBlur}
                        placeholder="placeholder" />
                    <span>{this.state.onBlurFieldValue}</span>
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Read-only"
                        defaultValue="can't touch this"
                        mode="read_only" />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="With error message"
                        errorMessage="error!" />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="With help tooltip"
                        labelHelpText="This is my help text." />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Validate onChange"
                        labelHelpText="Valid when have 5 or more chars"
                        errorMessage={this.state.onChangeValidationErrorMessage}
                        onChange={this._handleChangeErrorValidation}
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Validate onBlur"
                        labelHelpText="Valid when have 5 or more chars"
                        errorMessage={this.state.onBlurValidationErrorMessage}
                        onBlur={this._handleBlurErrorValidation}
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Disabled field with help"
                        labelHelpText="Disabled field with help"
                        disabled={true}
                    />
                </div>
            </div>
        );
    }
});

module.exports = FormTextFieldDemo;
