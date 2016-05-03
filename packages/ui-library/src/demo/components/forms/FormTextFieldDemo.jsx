var React = require("react"),
    FormTextField = require("./../../../components/forms/form-text-field").v1,
    FormTextFieldV2 = require("./../../../components/forms/form-text-field").v2;

/**
 * A demo for FormTextField.
 */
var FormTextFieldDemo = React.createClass({

    getInitialState: function () {
        return {
            onChangeFieldValue: "",
            onBlurFieldValue: "",
            saved: false
        };
    },

    _changeCallback: function (event) {
        this.setState({
            onChangeFieldValue: event.target.value
        });
    },

    _blurCallback: function (event) {
        this.setState({
            onBlurFieldValue: event.target.value
        });
    },

    _undo: function () {
        this.setState({ undone: true });
        window.setTimeout(this.setState.bind(this, { undone: false }), 5000);
    },

    _save: function () {
        this.setState({ saved: true });
        window.setTimeout(this.setState.bind(this, { saved: false }), 5000);
    },

    render: function () {
        var originalValueForUndo = "this is the original value";

        return (
            <div>
                <div className="input-row">
                    <FormTextField
                        labelText="Basic"
                    />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Default value and undo"
                        showUndo={true}
                        onUndo={this._undo}
                        defaultValue={originalValueForUndo} />
                    <div>{this.state.undone ? "undone!" : null}</div>
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="Required and save"
                        required={true}
                        showSave={true}
                        onSave={this._save} />
                    <div>{this.state.saved ? "saved!" : null}</div>
                </div>
                <div className="input-row">
                    <FormTextFieldV2
                        labelText="Reveal"
                        maskValue={true}
                        showReveal={true} />
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="onChange callback and maxLength (10 chars)"
                        onChange={this._changeCallback}
                        maxLength={10} />
                    <span>{this.state.onChangeFieldValue}</span>
                </div>
                <div className="input-row">
                    <FormTextField
                        labelText="onBlur callback and placeholder"
                        onBlur={this._blurCallback}
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
            </div>
        );
    }
});


module.exports = FormTextFieldDemo;
