import React, { Component } from "react";
import ConfirmTooltip from "../../../components/tooltips/ConfirmTooltip";
import HR from "ui-library/lib/components/general/HR";

/**
* @name ConfirmTooltipDemo
* @memberof ConfirmTooltip
* @desc A demo for DetailsTooltip
*/

class ConfirmTooltipDemo extends Component {

    state = {
        open: this.props.open,
        loading: false,
    };

    _handleToggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    _handleConfirm = () => {
        this.setState({
            loading: true
        });

        setTimeout(() => {
            this.setState((state) => {
                return { open: !state.open };
            });
        }, 1000);
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
                    placement="bottom right"
                    label="Confirm Cancel With Loading State"
                    title="Confirm Cancel With Loading State"
                    onToggle={this._handleToggle}
                    open={this.state.open}
                    onConfirm={this._handleConfirm}
                    onCancel={this._handleCancel}
                    buttonLabel="Confirm"
                    cancelText="Cancel"
                    disableSave={false}
                    loading={this.state.loading}
                >
                    {markup}
                </ConfirmTooltip>
                <HR />
                <ConfirmTooltip
                    placement="bottom right"
                    label="Stateful Version"
                    title="Stateful Version"
                    buttonLabel="Confirm"
                    cancelText="Cancel"
                    disableSave={false}
                    closeOnConfirm={true}
                >
                    {markup}
                </ConfirmTooltip>
            </div>
        );
    }
}

module.exports = ConfirmTooltipDemo;