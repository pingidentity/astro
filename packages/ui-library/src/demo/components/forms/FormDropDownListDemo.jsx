var React = require("react"),
    FormDropDownList = require("../../../components/forms/FormDropDownList.jsx");

/**
* @name FormDropDownListDemo
* @memberof FormDropDownList
* @desc A demo for FormDropDownList
*/
var FormDropDownListDemo = React.createClass({

    numDemos: 10,

    _options: [
        { label: "One", value: "1" },
        { label: "Two", value: "2", group: 4 },
        { label: "Three", value: "3", group: 1 },
        { label: "Four", value: "4", group: 2 },
        { label: "Five", value: "5", group: 3 },
        { label: "Six", value: "6", group: 2 },
        { label: "Seven", value: "7", group: 1 },
        { label: "Eight", value: "8", group: 3 },
        { label: "Nine", value: "9" },
        { label: "Ten", value: "10", group: 4 }
    ],

    _groups: [
        { label: "Section C", id: 3 },
        { label: "Section B", id: 2 },
        { label: "Section A", id: 1 },
        { label: "Disabled", id: 4, disabled: true }
    ],

    _getValue: function (string) {
        var value = "";
        for (var i=0; i<string.length; i+=1) {
            value = value + string.charCodeAt(i);
        }
        return value;
    },

    _handleValueChange: function (index, option) {
        var newState = {};

        newState["selectedValue" + index] = option;

        this.setState(newState);
    },

    _handleAdd7: function (optionLabel) {
        // Mock new option
        var newOption = { label: optionLabel, value: this._getValue(optionLabel) };
        var newOptions = this.state.addOptions7.concat([newOption]);

        // Update options & select the newly added option
        this.setState({
            addOptions7: newOptions,
            selectedValue7: newOption
        });
    },

    _handleAdd9: function (optionLabel) {
        // Mock new option with group always being "Section A"
        var newOption = { label: optionLabel, value: this._getValue(optionLabel), group: 1 };
        var newOptions = this.state.addOptions9.concat([newOption]);

        // Update options & select the newly added option
        this.setState({
            addOptions9: newOptions,
            selectedValue9: newOption
        });
    },

    getInitialState: function () {
        var initState = {
            addOptions7: this._options,
            addOptions9: this._options
        };

        for (var i=1; i<=this.numDemos - 1; i+=1) {
            initState["selectedValue" + i] = { label: "One", value: "1" };
        }
        initState["selectedValue" + this.numDemos] = { label: "--" };

        return initState;
    },

    componentDidMount: function () {
        for (var i=1; i<=this.numDemos; i+=1) {
            this["_handleValueChange" + i] = this._handleValueChange.bind(null, i);
        }
    },

    render: function () {
        var CustomType = React.createClass({
            render: function () {
                return <div>{this.props.value}</div>;
            }
        });
        var customType = <CustomType />;

        return (
            <div>
                <div className="input-row">
                    <FormDropDownList
                        options={this._options}
                        autofocus={true}
                        label="Basic with autofocus"
                        selectedOption={this.state.selectedValue1}
                        onValueChange={this._handleValueChange1}
                        className="input-width-small"
                    />

                </div>
                <div>Selected value: {this.state.selectedValue1.label}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        options={this._options}
                        contentType={customType}
                        label="Custom content type and search field"
                        searchField="value"
                        selectedOption={this.state.selectedValue2}
                        onValueChange={this._handleValueChange2}
                        className="input-width-small"
                    />
                </div>
                <div>Selected value: {this.state.selectedValue2.value}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        options={this._options}
                        label="With help"
                        labelHelpText="Some help tip"
                        selectedOption={this.state.selectedValue3}
                        onValueChange={this._handleValueChange3}
                        className="input-width-small"
                    />
                </div>
                <div>Selected value: {this.state.selectedValue3.label}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        options={this._options}
                        label="With error"
                        errorMessage="The error message appears when hovering over the input or the error icon."
                        selectedOption={this.state.selectedValue4}
                        onValueChange={this._handleValueChange4}
                        className="input-width-small"
                    />
                </div>
                <div>Selected value: {this.state.selectedValue4.label}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        options={this._options}
                        label="Disabled"
                        disabled={true}
                        selectedOption={this.state.selectedValue5}
                        onValueChange={this._handleValueChange5}
                        className="input-width-small"
                    />
                </div>
                <div>Selected value: {this.state.selectedValue5.label}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        options={this._options}
                        groups={this._groups}
                        label="With groups"
                        selectedOption={this.state.selectedValue6}
                        onValueChange={this._handleValueChange6}
                        className="input-width-small"
                    />
                </div>
                <div>Selected value: {this.state.selectedValue6.label}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        options={this.state.addOptions7}
                        label="With add"
                        canAdd={true}
                        onAdd={this._handleAdd7}
                        labelAdd="ADD"
                        labelPrompt="Type to search or add"
                        selectedOption={this.state.selectedValue7}
                        onValueChange={this._handleValueChange7}
                        className="input-width-small"
                    />
                </div>
                <div>Selected value: {this.state.selectedValue7.label}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        options={this._options}
                        label="With search box filtering"
                        labelPrompt="Type to search"
                        searchType={FormDropDownList.SearchTypes.BOX}
                        selectedOption={this.state.selectedValue8}
                        onValueChange={this._handleValueChange8}
                        className="input-width-small"
                    />
                </div>
                <div>Selected value: {this.state.selectedValue8.label}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        groups={this._groups}
                        options={this.state.addOptions9}
                        label="With groups & add"
                        canAdd={true}
                        onAdd={this._handleAdd9}
                        labelAdd="ADD"
                        labelPrompt="Type to search or add"
                        selectedOption={this.state.selectedValue9}
                        onValueChange={this._handleValueChange9}
                        className="input-width-medium"
                    />
                </div>
                <div>Selected value: {this.state.selectedValue9.label}</div>
                <br/>

                <div className="input-row">
                    <FormDropDownList
                        options={this._options}
                        label="Required with none option"
                        required={this.state["selectedValue" + this.numDemos].label === "--"}
                        selectedOption={this.state["selectedValue" + this.numDemos]}
                        noneOption={{ label: "--" }}
                        onValueChange={this["_handleValueChange" + this.numDemos]}
                        className="input-width-small"
                    />
                </div>
                <div>Selected value: {this.state["selectedValue" + this.numDemos] &&
                    this.state["selectedValue" + this.numDemos].label}
                </div>

            </div>
        );
    }
});

module.exports = FormDropDownListDemo;
