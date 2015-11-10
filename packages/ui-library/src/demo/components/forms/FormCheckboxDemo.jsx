var React = require("react");
var FormCheckbox = require("./../../../components/forms/FormCheckbox.jsx");

/**
 * A demo for FormCheckbox
 */

var FormCheckboxDemo = React.createClass({
    getInitialState: function () {
        return{
            checkboxChecked1: false,
            checkboxChecked2: true,
            checkboxChecked3: true,
            checkboxChecked4: false
        };
    },
    _onChange1: function (event) {

        this.setState({
            checkboxChecked1: event.target.checked
        });
    },
    _onChange2: function (event) {
        this.setState({
            checkboxChecked2: event.target.checked
        });
    },
    _onChange3: function (event) {
        this.setState({
            checkboxChecked3: event.target.checked
        });
    },
    _onChange4: function (event) {
        this.setState({
            checkboxChecked4: event.target.checked
        });
    },
    render: function () {
        return (
            <div>
                <div className="input-row">
                    <FormCheckbox
                        label = {"Regular Checkbox; checked: " + this.state.checkboxChecked1}
                        value = ""
                        onChange = {this._onChange1}
                        checked = {this.state.checkboxChecked1}
                        />
                </div>
                <div className="input-row">
                    <FormCheckbox
                        label = {"Default Checked; checked: " + this.state.checkboxChecked2}
                        value = ""
                        onChange = {this._onChange2}
                        checked = {this.state.checkboxChecked2}
                        />
                </div>
                <div className="input-row">
                    <FormCheckbox
                        label = {"Disabled; checked: " + this.state.checkboxChecked3}
                        value = ""
                        onChange = {this._onChange3}
                        checked = {this.state.checkboxChecked3}
                        disabled = {true}
                        />
                </div>
                <div className="input-row">
                    <FormCheckbox
                        label = {"With added Help Text; checked: " + this.state.checkboxChecked4
                        }
                        value = ""
                        onChange = {this._onChange4}
                        checked = {this.state.checkboxChecked4}
                        labelHelpText = "Check this box!"
                    />
                </div>
            </div>
        );
    }
});
module.exports = FormCheckboxDemo;
