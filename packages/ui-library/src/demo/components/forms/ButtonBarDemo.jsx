
var React = require("react"),
    ButtonBar = require("../../../components/forms/ButtonBar");

import Button from "../../../components/buttons/Button";

/**
* @name ButtonBarDemo
* @memberof ButtonBar
* @desc A demo for ButtonBar
*/
class ButtonBarDemo extends React.Component {
    static flags = [ "use-portal" ];

    state = {
        saving: false,
        showBar: true,
        statusText: "-",
        showCancelTooltip: false,
        showSaveTooltip: false,
    };

    _handleCancel = () => {
        this.setState({
            statusText: "Cancel button pressed"
        });
        this._closeCancelTooltip();
    };

    _handleDiscard = () => {
        this.setState({
            statusText: "Discard button pressed"
        });
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
            statusText: this.state.saveDisabled ? '"saveDisabled" prop set to FALSE' : '"saveDisabled" prop set to TRUE'
        });
    };

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

    render() {
        var toggleButtonText = this.state.showBar ? "FALSE" : "TRUE",
            saveButtonSaving = this.state.saving ? "FALSE" : "TRUE",
            saveButtonStatus = this.state.saveDisabled ? "FALSE" : "TRUE";

        return (
            <div>
                <Button onClick={this._toggleBar}>Set "visible" prop to {toggleButtonText}</Button>
                <br /><br />
                <Button onClick={this._toggleSaving}>Set "saving" prop to {saveButtonSaving}</Button>
                <br /><br />
                <Button onClick={this._toggleDisabled}>Set "saveDisabled" prop to {saveButtonStatus}</Button>
                <br /><br />
                <button onClick={this._toggleUnfix}>Unfix button bar</button>
                <br /><br />
                Demo status: &nbsp; <i>{this.state.statusText}</i>

                <ButtonBar
                    data-id="buttonbar"
                    flags={this.props.flags}

                    cancelText="Cancel"
                    discardText="Discard"
                    saveText="Save"

                    onCancel={this._openCancelTooltip}
                    onDiscard={this._handleDiscard}
                    onSave={this._openSaveTooltip}

                    enableSavingAnimation={this.state.saving}
                    visible={this.state.showBar}
                    saveDisabled={this.state.saveDisabled}
                    unfixed={this.state.unfixed}

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
