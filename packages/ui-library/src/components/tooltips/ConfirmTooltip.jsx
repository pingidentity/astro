import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../buttons/Button";
import DetailsTooltip, { DetailsTooltipStateless } from "../tooltips/DetailsTooltip";

import popsOver from "../../util/behaviors/popsOver";
import ButtonGroup from "../layout/ButtonGroup";

/**
 * @class ConfirmTooltip
 * @desc ConfirmTooltip implements tooltip used to confirm or deny the canceling of an action.
 *
 * @param {string} buttonLabel
 *      text for the button label
 * @param {string} buttonType
 *      css class to set the type of button(primary, secondary, danger)
 * @param {string} cancelText
 *      text of the cancel A tag
 * @param {bool} [closeOnConfirm=false]
 *      when true, triggers onToggle when onConfirm is triggered.
 * @param {string} [data-id]
 *     The data-id of the component.
 * @param {bool} disableSave
 *      boolean to turn enable or disable the button.
 * @param {node} label
 *     The text of the link.
 * @param {boolean} loading
 *     While true, loading animation will be shown.
 * @param {boolean} open
 *     The prop that controls whether the tooltip is visible or not
 * @param {ConfirmTooltip~onCancel} onCancel
 *     The callback triggered when the cancel button is pressed.
 * @param {ConfirmTooltip~onConfirm} onDelete
 *     The callback triggered when the delete button is pressed.
 * @param {ConfirmTooltip~onToggle}
 *      the callback to open and close the modal.
 * @param {string} [positionClassName]
 *     CSS classes to set on the top-level HTML container. Used to manage tooltip callout positioning.
 *      When using multiple positions like "top left" or "bottom right" do not use dashes as it will not work.
 * @param {("top" | "bottom" | "top left" | "top right" | "bottom left" | "bottom right")} [placement]
 *     How the tooltip is placed off of its trigger.
 * @param {string} title
 *     The title of the ConfirmTooltip tooltip.
 * @param {string} type
 *     The Style/type of button
 *
 * @example
 *     <ConfirmTooltip
 *          placement="bottom right"
 *          label="Confirm Delete Cancel"
 *          title="Confirm Delete Cancel"
 *          onToggle={this._handleToggle}
 *          open={this.state.open}
 *          onConfirm={this._handleConfirm}
 *          onDelete={this._handleConfirm}
 *          onCancel={this._handleCancel}
 *          buttonLabel="Confirm"
 *          cancelText="Cancel"
 *          >
 *          {markup}
 *     </ConfirmTooltip>
 */


class ConfirmTooltipBase extends Component {
    static propTypes = {
        buttonLabel: PropTypes.string,
        buttonType: PropTypes.string,
        className: PropTypes.string,
        cancelText: PropTypes.string,
        closeOnConfirm: PropTypes.bool,
        "data-id": PropTypes.string,
        disableSave: PropTypes.bool,
        flags: flagsPropType,
        label: PropTypes.node,
        loading: PropTypes.bool,
        onCancel: PropTypes.func,
        onConfirm: PropTypes.func,
        open: PropTypes.bool,
        onToggle: PropTypes.func,
        placement: PropTypes.oneOf(Object.values(DetailsTooltip.tooltipPlacements)),
    }

    static defaultProps = {
        "data-id": "confirm-tooltip",
        closeOnConfirm: false,
    };

    _handleConfirm = e => {
        if (this.props.onConfirm) {
            this.props.onConfirm(e);
        }

        if (this.props.closeOnConfirm) {
            this.props.onToggle(e);
        }
    }

    render() {
        return (
            <DetailsTooltipStateless
                {...this.props}
                data-id={this.props["data-id"]}
            >
                {this.props.children}
                <ButtonGroup>
                    <Button
                        data-id={`${this.props["data-id"]}-button`}
                        label={this.props.buttonLabel || "Confirm"}
                        type={this.props.buttonType}
                        onClick={this._handleConfirm}
                        disabled={this.props.disableSave}
                        loading={this.props.loading}
                    />
                    <br />
                    <a
                        className="cancel"
                        label="Cancel"
                        data-id={`${this.props["data-id"]}-cancel`}
                        onClick={this.props.onCancel || this.props.onClose}
                    >
                        {this.props.cancelText || "Cancel"}
                    </a>
                </ButtonGroup>
            </DetailsTooltipStateless>
        );
    }
}

const ConfirmTooltip = popsOver(ConfirmTooltipBase);
export default ConfirmTooltip;