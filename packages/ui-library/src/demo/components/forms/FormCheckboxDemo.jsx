var React = require("react");
var FormCheckbox = require("./../../../components/forms/FormCheckbox.jsx");

/**
* @name FormCheckboxDemo
* @memberof FormCheckbox
* @desc A demo for FormCheckbox
*/
var FormCheckboxDemo = React.createClass({
    getInitialState: function () {
        var initialState = {};

        for (var i=1; i<=11; i+=1) {
            initialState["checkboxChecked" + i] = Math.random() < 0.5;
        }

        return initialState;
    },
    _onChange: function (i, event) {
        var newState = {};
        newState["checkboxChecked" + i] = event.target.checked;
        this.setState(newState);
    },
    render: function () {
        return (
            <div>
                <div className="input-row">
                    <FormCheckbox
                        label = {"Regular Checkbox; checked: " + this.state.checkboxChecked1}
                        value = ""
                        onChange = {this._onChange.bind(this, 1)}
                        checked = {this.state.checkboxChecked1}
                    />
                </div>
                <div className="input-row">
                    <FormCheckbox
                        label = {"Default Checked; checked: " + this.state.checkboxChecked2}
                        value = ""
                        onChange = {this._onChange.bind(this, 2)}
                        checked = {this.state.checkboxChecked2}
                    />
                </div>
                <div className="input-row">
                    <FormCheckbox
                        label = {"Disabled; checked: " + this.state.checkboxChecked3}
                        value = ""
                        onChange = {this._onChange.bind(this, 3)}
                        checked = {this.state.checkboxChecked3}
                        disabled = {true}
                        labelHelpText = "Disabled with help"
                    />
                </div>
                <div className="input-row">
                    <FormCheckbox
                        label = {"With added Help Text; checked: " + this.state.checkboxChecked4}
                        value = ""
                        onChange = {this._onChange.bind(this, 4)}
                        checked = {this.state.checkboxChecked4}
                        labelHelpText = "Check this box!"
                    />
                </div>
                <div className="input-row">
                    <label className="detached">
                        Example of Stacked Options
                    </label>
                    <FormCheckbox
                        label="Stacked Checkbox"
                        onChange={this._onChange.bind(this, 5)}
                        checked={this.state.checkboxChecked5}
                        className="stacked"
                    />
                    <FormCheckbox
                        label="Stacked Checkbox"
                        onChange={this._onChange.bind(this, 6)}
                        checked={this.state.checkboxChecked6}
                        className="stacked"
                    />
                    <FormCheckbox
                        label="Stacked Checkbox"
                        onChange={this._onChange.bind(this, 7)}
                        checked={this.state.checkboxChecked7}
                        className="stacked"
                    />
                </div>
                <div className="input-row">
                    <label className="detached">
                        Example of Inline Options together and alone
                    </label>
                    <FormCheckbox
                        label="Inline Checkbox"
                        onChange={this._onChange.bind(this, 8)}
                        checked={this.state.checkboxChecked8}
                        className="inline"
                    />
                    <FormCheckbox
                        label="Inline Checkbox"
                        onChange={this._onChange.bind(this, 9)}
                        checked={this.state.checkboxChecked9}
                        className="inline"
                    />
                    <FormCheckbox
                        label="Inline Checkbox"
                        onChange={this._onChange.bind(this, 10)}
                        checked={this.state.checkboxChecked10}
                        className="inline"
                    />
                </div>
                <div className="input-row">
                    <FormCheckbox
                        label="Single Inline Checkbox"
                        onChange={this._onChange.bind(this, 11)}
                        checked={this.state.checkboxChecked11}
                        className="inline"
                    />
                </div>
            </div>
        );
    }
});
module.exports = FormCheckboxDemo;
