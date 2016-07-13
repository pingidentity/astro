var React = require("react");
var FormTextArea = require("./../../../components/forms/form-text-area");

/**
 * A demo for FormTextArea.
 */
var FormTextAreaDemo = React.createClass({

    getInitialState: function () {
        return {
            onValueChangeFieldValue: "",
            onUndoValue: null
        };
    },

    _handleValueChange: function (value) {
        this.setState({
            onValueChangeFieldValue: value
        });
    },

    _handleUndoValueChange: function (value) {
        this.setState({
            onUndoValue: value,
            edited: value !== "Lorem ipsum dolor sit amet",
            showUndo: value !== "Lorem ipsum dolor sit amet"
        });
    },

    _handleUndo: function () {
        this.setState({
            onUndoValue: "Lorem ipsum dolor sit amet"
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
                        onValueChange={this._handleValueChange}
                        placeholder="placeholder"
                        required={true}>
                        {this.state.onValueChangeFieldValue}
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
                        labelText="With defaultValue and undo (stateful)"
                        defaultValue="Lorem ipsum dolor sit amet"
                        originalValue="Lorem ipsum dolor sit amet"
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        controlled={true}
                        labelText="With defaultValue and undo (stateless)"
                        value={this.state.onUndoValue}
                        onValueChange={this._handleUndoValueChange}
                        defaultValue="Lorem ipsum dolor sit amet"
                        edited={this.state.edited}
                        showUndo={this.state.showUndo}
                        onUndo={this._handleUndo}
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
                <div className="input-row">
                    <FormTextArea
                        labelText="Disabled With help tooltip"
                        labelHelpText="This is my help text."
                        disabled={true}
                    />
                </div>
            </div>
        );
    }
});


module.exports = FormTextAreaDemo;
