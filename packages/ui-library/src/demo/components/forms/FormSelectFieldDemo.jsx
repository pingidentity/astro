var React = require('react/addons');
var FormSelectField = require('./../../../components/forms/FormSelectField.jsx');

/**
 * A demo for FormSelectField.
 */
var FormSelectFieldDemo = React.createClass({

    getInitialState: function () {
        return {
            onChangeFieldValue1: '',
            onChangeFieldValue2: '',
            onChangeFieldValue3: ''
        };
    },

    _changeCallback1: function (event) {
        this.setState({
            onChangeFieldValue1: event.target.value
        });
    },

    _changeCallback2: function (event) {
        this.setState({
            onChangeFieldValue2: event.target.value
        });
    },

    _changeCallback3: function (event) {
        this.setState({
            onChangeFieldValue3: event.target.value
        });
    },

    _changeCallback4: function () {
        // don't do anything (for error message display example)
    },

    render: function () {
        var options = { 1: 'one', 2: 'two', 3: 'three' };

        return (
            <div>
                <div className="input-row">
                    <FormSelectField
                        label="Basic"
                        options={options}
                        onChange={this._changeCallback1} />
                    <span>{this.state.onChangeFieldValue1}</span>
                </div>
                <div className="input-row">
                    <FormSelectField
                        label="Required with help text"
                        options={options}
                        onChange={this._changeCallback2}
                        isRequired={true}
                        labelHelpText="Please select a value" />
                    <span>{this.state.onChangeFieldValue2}</span>
                </div>
                <div className="input-row">
                    <FormSelectField
                        label="With none option"
                        options={options}
                        onChange={this._changeCallback3}
                        noneOption={true}
                        noneOptionText="Select an option"
                        noneOptionValue="0" />
                    <span>{this.state.onChangeFieldValue3}</span>
                </div>
                <div className="input-row">
                    <FormSelectField
                        label="With error message"
                        options={options}
                        onChange={this._changeCallback4}
                        errorMessage="error!" />
                </div>
            </div>
        );
    }
});


module.exports = FormSelectFieldDemo;
