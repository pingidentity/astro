var React = require("react/addons");
var FormTextArea = require("./../../../components/forms/FormTextArea.jsx");

/**
 * A demo for FormTextArea.
 */
var FormTextAreaDemo = React.createClass({

    getInitialState: function () {
        return {
            onChangeFieldValue: ""
        };
    },

    _changeCallback: function (event) {
        this.setState({
            onChangeFieldValue: event.target.value
        });
    },

    render: function () {
        var options = { 1: "one", 2: "two", 3: "three" };

        return (
            <div>
                <div className="input-row">
                    <FormTextArea
                        labelText="Basic"
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        labelText="Required with placeholder and change callback"
                        onValueChange={this._changeCallback}
                        placeholder="placeholder"
                        isRequired={true}>
                        {this.state.onChangeFieldValue}
                    </FormTextArea>
                </div>
                <div className="input-row">
                    <FormTextArea
                        labelText="With maxLength and defined size"
                        options={options}
                        cols={10}
                        rows={3}
                        maxLength={25}
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        labelText="With defaultValue and undo"
                        defaultValue="Lorem ipsum dolor sit amet"
                        originalValue="Lorem ipsum dolor sit amet"
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        mode="read_only"
                        labelText="Read-only"
                        value="Can't touch this" />
                </div>
                <div className="input-row">
                    <FormTextArea
                        labelText="With error message"
                        errorMessage="error!"
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        labelText="With help tooltip"
                        labelHelpText="This is my help text."
                    />
                </div>
            </div>
        );
    }
});


module.exports = FormTextAreaDemo;
