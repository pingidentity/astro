var React = require("react"),
    FormDropDownList = require("../../../components/forms/FormDropDownList.jsx");

/**
* @name FormDropDownListDemo
* @memberof FormDropDownList
* @desc A demo for FormDropDownList
*/
var FormDropDownListDemo = React.createClass({

    numDemos: 6,

    _handleValueChange: function (index, option) {
        var newState = {};

        newState["selectedValue" + index] = option;

        this.setState(newState);
    },

    getInitialState: function () {
        var initState = {};

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
        var options = [
            { label: "One", value: "1" },
            { label: "Two", value: "2" },
            { label: "Three", value: "3" },
            { label: "Four", value: "4" },
            { label: "Five", value: "5" },
            { label: "Six", value: "6" },
            { label: "Seven", value: "7" },
            { label: "Eight", value: "8" },
            { label: "Nine", value: "9" },
            { label: "Ten", value: "10" },
        ];

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
                        options={options}
                        autofocus={true}
                        label="Basic with autofocus"
                        selectedOption={this.state.selectedValue1}
                        onValueChange={this._handleValueChange1}
                    />
                    <div>Selected value: {this.state.selectedValue1.label}</div>
                </div>
                <div className="input-row">
                    <FormDropDownList
                        options={options}
                        contentType={customType}
                        label="With custom content type & search field"
                        searchField="value"
                        selectedOption={this.state.selectedValue2}
                        onValueChange={this._handleValueChange2}
                    />
                    <div>Selected value: {this.state.selectedValue2.value}</div>
                </div>
                <div className="input-row">
                    <FormDropDownList
                        options={options}
                        label="With help"
                        labelHelpText="Some help tip"
                        selectedOption={this.state.selectedValue3}
                        onValueChange={this._handleValueChange3}
                    />
                    <div>Selected value: {this.state.selectedValue3.label}</div>
                </div>
                <div className="input-row">
                    <FormDropDownList
                        options={options}
                        label="With error"
                        errorMessage="The error message appears when hovering over the input or the error icon."
                        selectedOption={this.state.selectedValue4}
                        onValueChange={this._handleValueChange4}
                    />
                    <div>Selected value: {this.state.selectedValue4.label}</div>
                </div>
                <div className="input-row">
                    <FormDropDownList
                        options={options}
                        label="Disabled"
                        disabled={true}
                        selectedOption={this.state.selectedValue5}
                        onValueChange={this._handleValueChange5}
                    />
                    <div>Selected value: {this.state.selectedValue5.label}</div>
                </div>
                <div className="input-row">
                    <FormDropDownList
                        options={options}
                        label="Required with none option"
                        required={this.state.selectedValue6.label === "--"}
                        selectedOption={this.state.selectedValue6}
                        noneOption={{ label: "--" }}
                        onValueChange={this._handleValueChange6}
                    />
                    <div>Selected value: {this.state.selectedValue6 && this.state.selectedValue6.label}</div>
                </div>
            </div>
        );
    }
});

module.exports = FormDropDownListDemo;
