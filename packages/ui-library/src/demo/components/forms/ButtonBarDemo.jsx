
import React from "react";
import ButtonBar, { buttonAlignments } from "ui-library/lib/components/forms/ButtonBar";
import Button from "ui-library/lib/components/buttons/Button";

/**
* @name ButtonBarDemo
* @memberof ButtonBar
* @desc A demo for ButtonBar
*/
class ButtonBarDemo extends React.Component {

    state = {
        leftAlign: false,
        saving: false,
        showBar: true,
        statusText: "-",
        showCancelTooltip: false,
        showSaveTooltip: false,
        saveDisabledText: null,
        cancelButtons: true,
    };

    _handleCancel = () => {
        this.setState({
            statusText: "Cancel button pressed"
        });
        this._closeCancelTooltip();
    };

    _handleSave = () => {
        this.setState(({ showSaveTooltip }) => ({
            statusText: "Save button pressed",
            showSaveTooltip: !showSaveTooltip
        }));
    };

    _toggleBar = () => {
        this.setState({
            showBar: !this.state.showBar,
            statusText: this.state.showBar ? '"visible" prop set to FALSE' : '"visible" prop set to TRUE'
        });
    };

    _toggleSaving = () => {
        this.setState({
            saving: !this.state.saving,
            statusText: this.state.saving ? '"saving" prop set to FALSE' : '"saving" prop set to TRUE'
        });
    };

    _toggleDisabled = () => {
        this.setState({
            saveDisabled: !this.state.saveDisabled,
            saveDisabledText: null,
            statusText: this.state.saveDisabled && !this.state.saveDisabledText
                ? '"saveDisabled" prop set to FALSE'
                : '"saveDisabled" prop set to TRUE'
        });
    };

    _toggleDisabledHelpHint = () => {
        this.setState(({
            saveDisabled,
            saveDisabledText
        }) => ({
            saveDisabled: !saveDisabled,
            saveDisabledText: "this is disabled texted",
            statusText: saveDisabled && saveDisabledText
                ? '"saveDisabledText" prop set to FALSE'
                : '"saveDisabledText" prop set to TRUE'
        }));
    };

    _toggleAlignment = () => this.setState(
        ({ leftAlign }) => ({
            leftAlign: !leftAlign
        })
    );

    _openCancelTooltip = () => {
        this.setState({ showCancelTooltip: true });
    };

    _openSaveTooltip = () => this.setState({
        showSaveTooltip: true
    })

    _closeCancelTooltip = () => {
        this.setState({ showCancelTooltip: false });
    };

    _closeSaveTooltip = () => this.setState({
        showSaveTooltip: false
    })

    _toggleUnfix = () => {
        this.setState({ unfixed: !this.state.unfixed });
    }

    _toggleCancelButtons = () => this.setState(({ cancelButtons }) => ({ cancelButtons: !cancelButtons }));

    render() {
        var toggleButtonText = this.state.showBar ? "FALSE" : "TRUE",
            saveButtonSaving = this.state.saving ? "FALSE" : "TRUE",
            saveButtonStatus = this.state.saveDisabled && !this.state.saveDisabledText ? "FALSE" : "TRUE",
            saveButtonHelpHint = this.state.saveDisabled && this.state.saveDisabledText ? "FALSE" : "TRUE";

        return (
            <div>
                <Button onClick={this._toggleBar}>Set "visible" prop to {toggleButtonText}</Button>
                <br /><br />
                <Button onClick={this._toggleSaving}>Set "saving" prop to {saveButtonSaving}</Button>
                <br /><br />
                <Button onClick={this._toggleDisabled}>Set "saveDisabled" prop to {saveButtonStatus}</Button>
                <br /><br />
                <Button onClick={this._toggleDisabledHelpHint}>
                    Set "saveDisabled with helphint" prop to {saveButtonHelpHint}
                </Button>
                <br /><br />
                <Button onClick={this._toggleCancelButtons}>
                    Use cancel buttons or links
                </Button>
                <br /><br />
                <button onClick={this._toggleUnfix}>Unfix button bar</button>
                <br /><br />
                <Button onClick={this._toggleAlignment}>
                    Change button alignment
                </Button>
                <br /><br />
                Demo status: &nbsp; <i>{this.state.statusText}</i>

                <ButtonBar
                    data-id="buttonbar"

                    cancelText="Cancel"
                    saveText="Save"

                    onCancel={this._openCancelTooltip}
                    onSave={this._openSaveTooltip}


                    enableSavingAnimation={this.state.saving}
                    visible={this.state.showBar}
                    saveDisabled={this.state.saveDisabled}
                    unfixed={this.state.unfixed}
                    saveDisabledText={this.state.saveDisabledText}

                    useButtonForCancel={this.state.cancelButtons}
                    alignment={this.state.leftAlign ? buttonAlignments.LEFT : buttonAlignments.RIGHT}

                    cancelTooltip={{
                        title: "Cancel Confirmation",
                        open: this.state.showCancelTooltip,
                        onConfirm: this._handleCancel,
                        onCancel: this._closeCancelTooltip,
                        messageText: "Are you sure you want to cancel these changes?",
                        confirmButtonText: "Yes",
                        cancelButtonText: "No"
                    }}

                    saveTooltip={{
                        title: "Save Confirmation",
                        open: this.state.showSaveTooltip,
                        onConfirm: this._handleSave,
                        onCancel: this._closeSaveTooltip,
                        messageText: "Are you sure you want to save these changes?",
                        confirmButtonText: "Yes",
                        cancelButtonText: "No"
                    }}>

                    <span style={{ margin: "0 30px 0 0" }}>
                        Child content can added and will display to the left of the buttons by default.
                    </span>
                </ButtonBar>
            </div>
        );
    }
}

module.exports = ButtonBarDemo;
