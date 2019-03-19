import React from "react";
import FormTextArea from "./../../../components/forms/form-text-area";
import InputWidths from "./../../../components/forms/InputWidths";

/**
* @name FormTextAreaDemo
* @memberof FormTextArea
* @desc A demo for FormTextArea
*/
class FormTextAreaDemo extends React.Component {
    static flags = [ "p-stateful" ];

    state = {
        onValueChangeFieldValue: "",
        onUndoValue: "Lorem ipsum dolor sit amet",
    };

    _handleValueChange = (value) => {
        this.setState({
            onValueChangeFieldValue: value
        });
    };

    _handleUndoValueChange = (value) => {
        this.setState({
            onUndoValue: value,
        });
    };

    _handleUndo = () => {
        this.setState({
            onUndoValue: "Lorem ipsum dolor sit amet"
        });
    };

    render() {
        var options = { 1: "one", 2: "two", 3: "three" },
            heightOptions = "With a default height of 'medium'. Options" +
                            " are 'short', 'medium', and 'large'.";
        const { flags } = this.props;

        return (
            <div>
                <div className="input-row">
                    <FormTextArea
                        stateless={false}
                        labelText="Basic"
                        width={InputWidths.MD}
                        flags={flags}
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        stateless={false}
                        labelText="Required with placeholder and change callback"
                        onValueChange={this._handleValueChange}
                        placeholder="placeholder"
                        required={true}
                        name="reqd-textarea"
                        width={InputWidths.MD}
                        flags={flags}
                    >
                        {this.state.onValueChangeFieldValue}
                    </FormTextArea>
                </div>
                <div className="input-row">
                    <FormTextArea
                        stateless={false}
                        labelText="With maxLength and defined size"
                        options={options}
                        cols={10}
                        rows={3}
                        maxLength={25}
                        width={InputWidths.MD}
                        flags={flags}
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        stateless={false}
                        labelText="With defaultValue and undo (stateful)"
                        value={flags.includes("p-stateful") ? undefined : "Lorem ipsum dolor sit amet"}
                        initialState={{
                            value: "Lorem ipsum dolor sit amet",
                        }}
                        originalValue="Lorem ipsum dolor sit amet"
                        showUndo={true}
                        width={InputWidths.MD}
                        flags={flags}
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        stateless={true}
                        labelText="With defaultValue and undo (stateless)"
                        value={this.state.onUndoValue}
                        onValueChange={this._handleUndoValueChange}
                        edited={this.state.onUndoValue !== "Lorem ipsum dolor sit amet"}
                        showUndo={true}
                        onUndo={this._handleUndo}
                        width={InputWidths.MD}
                        flags={flags}
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        mode="read_only"
                        labelText="Read-only"
                        value="Can't touch this"
                        width={InputWidths.MD}
                        flags={flags}
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        stateless={false}
                        labelText="With error message"
                        errorMessage="The error message appears when hovering over the error icon or when focus is
                            placed on the textarea."
                        width={InputWidths.MD}
                        required={true}
                        flags={flags}
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        stateless={false}
                        labelText="With help tooltip"
                        labelHelpText="This is my help text."
                        width={InputWidths.MD}
                        flags={flags}
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        stateless={false}
                        labelText="Disabled With help tooltip"
                        labelHelpText="This is my help text."
                        disabled={true}
                        width={InputWidths.MD}
                        flags={flags}
                    />
                </div>
                <div className="input-row">
                    <FormTextArea
                        stateless={false}
                        labelText={heightOptions}
                        labelHelpText="This is the default medium height."
                        className="textarea-height--medium"
                        width={InputWidths.MD}
                        flags={flags}
                    />
                </div>
            </div>
        );
    }
}


module.exports = FormTextAreaDemo;
