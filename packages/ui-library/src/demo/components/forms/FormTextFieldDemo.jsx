var React = require('react/addons');
var FormTextField = require('./../../../components/forms/FormTextField.jsx');

/**
 * A demo for FormTextField.
 */
var FormTextFieldDemo = React.createClass({

    getInitialState: function () {
        return {
            onChangeFieldValue: '',
            onBlurFieldValue: '',
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

    _clearSave: function () {
        this.setState({
            saved: false
        });
    },

    _save: function () {
        this.setState({
            saved: true
        });
        window.setTimeout(this._clearSave, 5000);
    },

    render: function () {
        var originalValueForUndo = 'this is the original value';

        return (
            <div>
                <div>
                    <FormTextField labelText="Basic" />
                </div>
                <div>
                    <FormTextField labelText="Default value and undo" defaultValue={originalValueForUndo}
                                   originalValue={originalValueForUndo} />
                </div>
                <div>
                    <FormTextField labelText="Required and save" isRequired={true} save={this._save} />
                    <div>{this.state.saved ? 'saved!' : null}</div>
                </div>
                <div>
                    <FormTextField labelText="onChange callback and maxLength (10 chars)"
                                   onChange={this._changeCallback} maxLength={10} />
                    <span>{this.state.onChangeFieldValue}</span>
                </div>
                <div>
                    <FormTextField labelText="onBlur callback and placeholder" onBlur={this._blurCallback}
                                   placeholder={"placeholder"} />
                    <span>{this.state.onBlurFieldValue}</span>
                </div>
                <div>
                    <FormTextField labelText="Read-only" defaultValue={"can't touch this"}
                                   mode={"readonly"} />
                </div>
                <div>
                    <FormTextField labelText="With error message" errorMessage="error!" />
                </div>
            </div>
        );
    }
});


module.exports = FormTextFieldDemo;
