
var React = require("react"),
    ButtonBar = require("../../../components/forms/ButtonBar.jsx");

/**
* @name ButtonBarDemo
* @memberof ButtonBar
* @desc A demo for ButtonBar
*/
class ButtonBarDemo extends React.Component {
    state = {
        saving: false,
        showBar: true,
        statusText: "-",
        showCancelTooltip: false
    };

    _handleCancel = () => {
        this.setState({
            statusText: "Cancel button pressed"
        });
        this._closeTooltip();
    };

    _handleDiscard = () => {
        this.setState({
            statusText: "Discard button pressed"
        });
    };

    _handleSave = () => {
        this.setState({
            statusText: "Save button pressed"
        });
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

    _openTooltip = () => {
        this.setState({ showCancelTooltip: true });
    };

    _closeTooltip = () => {
        this.setState({ showCancelTooltip: false });
    };

    render() {
        var toggleButtonText = this.state.showBar ? "FALSE" : "TRUE",
            saveButtonSaving = this.state.saving ? "FALSE" : "TRUE",
            saveButtonStatus = this.state.saveDisabled ? "FALSE" : "TRUE";

        return (
            <div>
                <button onClick={this._toggleBar}>Set "visible" prop to {toggleButtonText}</button>
                <br /><br />
                <button onClick={this._toggleSaving}>Set "saving" prop to {saveButtonSaving}</button>
                <br /><br />
                <button onClick={this._toggleDisabled}>Set "saveDisabled" prop to {saveButtonStatus}</button>
                <br /><br />
                Demo status: &nbsp; <i>{this.state.statusText}</i>

                <ButtonBar
                    data-id="buttonbar"

                    cancelText="Cancel"
                    discardText="Discard"
                    saveText="Save"

                    onCancel={this._openTooltip}
                    onDiscard={this._handleDiscard}
                    onSave={this._handleSave}

                    enableSavingAnimation={this.state.saving}
                    visible={this.state.showBar}
                    saveDisabled={this.state.saveDisabled}

                    cancelTooltip={{
                        title: "Cancel Confirmation",
                        open: this.state.showCancelTooltip,
                        onConfirm: this._handleCancel,
                        onCancel: this._closeTooltip,
                        messageText: "Are you sure you want to cancel these changes?",
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
