import React, { Component } from "react";
import ConfirmTooltip from "../../../components/tooltips/ConfirmTooltip";

/**
* @name ConfirmTooltipDemo
* @memberof ConfirmTooltip
* @desc A demo for DetailsTooltip
*/

class ConfirmTooltipDemo extends Component {
    static flags = ["use-portal"];

    state = {
        open: this.props.open
    };

    _handleToggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    _handleConfirm = () => {
        this._handleToggle();
    }

    _handleCancel = () => {
        this._handleToggle();
    }

    render() {
        var markup =
            `Are you absolutely sure you want to delete?`;
        return (
            <div>
                <ConfirmTooltip
                    positionClassName="bottom"
                    label="Confirm Cancel"
                    title="Confirm Cancel"
                    onToggle={this._handleToggle}
                    open={this.state.open}
                    onConfirm={this._handleConfirm}
                    onCancel={this._handleCancel}
                    buttonLabel="Confirm"
                    cancelText="Cancel"
                    disableSave={false}
                    flags={this.props.flags}
                >
                    {markup}
                </ConfirmTooltip>
                <hr className="hr"/>
                <ConfirmTooltip
                    positionClassName="bottom"
                    label="Stateful Version"
                    title="Stateful Version"
                    buttonLabel="Confirm"
                    cancelText="Cancel"
                    disableSave={false}
                    closeOnConfirm={true}
                    flags={this.props.flags}
                >
                    {markup}
                </ConfirmTooltip>
            </div>
        );
    }
}

module.exports = ConfirmTooltipDemo;