var React = require("react/addons");
var FormSelectField = require("./../../../components/forms/FormSelectField.jsx");

/**
 * A demo for FormSelectField.
 */
var FormSelectFieldDemo = React.createClass({

    getInitialState: function () {
        return {
            onChangeFieldValue1: "",
            onChangeFieldValue2: "",
            onChangeFieldValue3: ""
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
        var options = {
            1: "one",
            2: "two",
            3: "three"
        };

        return (
            <div>
                <div className="input-row">
                    <FormSelectField
                        label="Basic"
                        options={options}
                        onChange={this._changeCallback1}
                    />
                    <div>
                        selected option: {this.state.onChangeFieldValue1}
                    </div>
                </div>
                <div className="input-row">
                    <FormSelectField
                        label="Required Select"
                        options={options}
                        noneOption={true}
                        noneOptionText="- select option -"
                        noneOptionValue="0"
                        value="0"
                        onChange={this._changeCallback2}
                        isRequired={true}
                    />
                    <div>
                        selected option: {this.state.onChangeFieldValue2}
                    </div>
                </div>
                <div className="input-row">
                    <FormSelectField
                        label="With none option"
                        options={options}
                        onChange={this._changeCallback3}
                        noneOption={true}
                        noneOptionText="Select an option"
                        noneOptionValue="0"
                    />
                    <div>
                        selected option: {this.state.onChangeFieldValue3}
                    </div>
                </div>
                <div className="input-row">
                    <FormSelectField
                        label="With error message"
                        options={options}
                        onChange={this._changeCallback4}
                        errorMessage="error!"
                    />
                </div>
                <div className="input-row">
                    <FormSelectField
                        label="With help text"
                        labelHelpText="Help text goes here!"
                        options={options}
                        onChange={this._changeCallback4} />
                </div>
            </div>
        );
    }
});


module.exports = FormSelectFieldDemo;
