
var React = require("react"),
    ButtonBar = require("../../../components/forms/ButtonBar.jsx");

var ButtonBarDemo = React.createClass({

    _handleCancel: function () {
        this.setState({
            statusText: "Cancel button pressed"
        });
    },

    _handleDiscard: function () {
        this.setState({
            statusText: "Discard button pressed"
        });
    },

    _handleSave: function () {
        this.setState({
            statusText: "Save button pressed"
        });
    },

    _toggleBar: function () {
        this.setState({
            showBar: !this.state.showBar,
            statusText: this.state.showBar ? '"visible" prop set to FALSE' : '"visible" prop set to TRUE'
        });
    },

    _toggleSaving: function () {
        this.setState({
            saving: !this.state.saving,
            statusText: this.state.saving ? '"saving" prop set to FALSE' : '"saving" prop set to TRUE'
        });
    },

    _toggleDisabled: function () {
        this.setState({
            saveDisabled: !this.state.saveDisabled,
            statusText: this.state.saveDisabled ? '"saveDisabled" prop set to FALSE' : '"saveDisabled" prop set to TRUE'
        });
    },

    getInitialState: function () {
        return {
            saving: false,
            showBar: true,
            statusText: "-"
        };
    },

    render: function () {
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
                    onCancel={this._handleCancel}
                    onDiscard={this._handleDiscard}
                    onSave={this._handleSave}

                    cancelText="Cancel"
                    discardText="Discard"
                    saveText="Save"

                    enableSavingAnimation={this.state.saving}
                    visible={this.state.showBar}
                    saveDisabled={this.state.saveDisabled}>

                    <span style={{ margin: "0 30px 0 0" }}>
                        Child content can added and will display to the left of the buttons by default.
                    </span>
                </ButtonBar>
            </div>
        );
    }
});

module.exports = ButtonBarDemo;
