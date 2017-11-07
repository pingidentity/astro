var React = require("react");
var FormTextArea = require("./../../../components/forms/form-text-area");

/**
* @name FormTextAreaDemo
* @memberof FormTextArea
* @desc A demo for FormTextArea
*/
class FormTextAreaDemo extends React.Component {
    state = {
        onValueChangeFieldValue: "",
        onUndoValue: null
    };

    _handleValueChange = (value) => {
        this.setState({
            onValueChangeFieldValue: value
        });
    };

    _handleUndoValueChange = (value) => {
        this.setState({
            onUndoValue: value,
            edited: value !== "Lorem ipsum dolor sit amet",
            showUndo: value !== "Lorem ipsum dolor sit amet"
        });
    };

    _handleUndo = () => {
        this.setState({
            onUndoValue: "Lorem ipsum dolor sit amet"
        });
    };

    render() {
        var options = { 1: "one", 2: "two", 3: "three" };

        return (
            <div>
                <div className="input-row">
                    <FormTextArea
                        labelText="Basic"
                        className="input-width-medium"
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        labelText="Required with placeholder and change callback"
                        onValueChange={this._handleValueChange}
                        placeholder="placeholder"
                        required={true}
                        className="input-width-medium">
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
                        className="input-width-medium"
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        labelText="With defaultValue and undo (stateful)"
                        value="Lorem ipsum dolor sit amet"
                        originalValue="Lorem ipsum dolor sit amet"
                        className="input-width-medium"
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        stateless={true}
                        labelText="With defaultValue and undo (stateless)"
                        value={this.state.onUndoValue || "Lorem ipsum dolor sit amet"}
                        onValueChange={this._handleUndoValueChange}
                        edited={this.state.edited}
                        showUndo={this.state.showUndo}
                        onUndo={this._handleUndo}
                        className="input-width-medium"
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        mode="read_only"
                        labelText="Read-only"
                        value="Can't touch this"
                        className="input-width-medium"
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        labelText="With error message"
                        errorMessage="The error message appears when hovering over the error icon or when focus is
                            placed on the textarea."
                        className="input-width-medium"
                        required={true}
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        labelText="With help tooltip"
                        labelHelpText="This is my help text."
                        className="input-width-medium"
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        labelText="Disabled With help tooltip"
                        labelHelpText="This is my help text."
                        disabled={true}
                        className="input-width-medium"
                    />
                </div>
            </div>
        );
    }
}


module.exports = FormTextAreaDemo;
