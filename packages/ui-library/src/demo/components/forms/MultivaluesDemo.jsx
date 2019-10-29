import React from "react";
import Multivalues from "../../../components/forms/Multivalues";
import InputRow from "../../../components/layout/InputRow";
import userOptions from "./data/userOptions";

/**
* @name MultivaluesDemo
* @memberof Multivalues
* @desc A demo for Multivalues
*/
class MultivaluesDemo extends React.Component {
    state = {
        entries: [
            "First Entry",
            "Second Entry",
            "Another Entry",
            "Last Entry"
        ],
        urlEntries: [
            "http://www.someurl.com/foo/bar/",
            "http://www.someurl.com/foo/bar/longlonglongurl",
        ],
        iconEntries: [
            "First",
            {
                label: "Second",
                icon: "desktop"
            },
            {
                label: "Third",
                icon: "browser"
            },
            {
                label: "Four",
                icon: "clipboard"
            }
        ],
        errorEntries: [
            "Error",
            "will",
            "show",
            "if",
            "entry",
            "is",
            "repeated"
        ],
        optionsEntries: [],
        error: null
    };

    _handleValueChange = (entries) => {
        this.setState({
            entries: entries
        });
    };

    _handleIconChange = iconEntries => this.setState({
        iconEntries
    })

    _handleUrlChange = (entries) => {
        this.setState({
            urlEntries: entries
        });
    };

    _handleErrorEntryChange = (errorEntries) => this.setState({ errorEntries })

    _onNewValue = (keyCode) => keyCode === 13

    _onNewErrorEntry = (keyCode, value) => {
        // 13 is the keycode for enter
        if (keyCode === 13) {
            const isInvalid = this.state.errorEntries.some(entry => entry.toLowerCase() === value);
            if (isInvalid) {
                this.setState({
                    error: "Entries must be unique"
                });

                return false;
            } else {
                this.setState({
                    error: null
                });

                return this._onNewValue(keyCode);
            }
        } else {
            this.setState({
                error: null
            });
            return false;
        }
    }

    _onOptionsChange = optionsEntries => this.setState({ optionsEntries });

    render() {
        return (
            <div>
                <p>
                    Type ahead. Press "return" or "," or "tab" or "space" to add an item, or delete an item by
                    clicking "x".
                </p>
                <InputRow>
                    <Multivalues
   
                        stateless={false}
                        entries={this.state.entries}
                        onValueChange={this._handleValueChange}
                        autoFocus={true}
                        onFocus={()=>console.log("MultiValues focused!")}
                    />
                </InputRow>

                <InputRow>
                    <Multivalues
                        labelText="Default multi-values input with icons (XL)"
                        stateless={false}
                        entries={this.state.iconEntries}
                        onValueChange={this._handleIconChange}
                        width={Multivalues.inputWidths.XL}
                    />
                </InputRow>

                <InputRow>
                    <Multivalues
                        labelText="Alternate stacked formatting"
                        stateless={false}
                        entries={this.state.urlEntries}
                        onNewValue={this._onNewValue}
                        onValueChange={this._handleUrlChange}
                        stacked={true}
                        name="mv-demo"
                        required={true}
                        includeDraftInEntries
                    />
                    <p>State: {this.state.urlEntries.join(", ")}</p>
                </InputRow>

                <InputRow>
                    <Multivalues
                        labelText="With error message (MD) -- Error will show when entry is repeated"
                        stateless={false}
                        entries={this.state.errorEntries}
                        onNewValue={this._onNewErrorEntry}
                        onValueChange={this._handleErrorEntryChange}
                        errorMessage={this.state.error}
                        width={Multivalues.inputWidths.MD}
                    />
                </InputRow>

                <InputRow>
                    <Multivalues
                        labelText="With list of options"
                        stateless={false}
                        entries={this.state.optionsEntries}
                        onValueChange={this._onOptionsChange}
                        options={userOptions}
                        autoHeight
                        autoWidth
                    />
                </InputRow>

            </div>
        );
    }
}

module.exports = MultivaluesDemo;
