import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../buttons/Button";
import DetailsTooltip from "../tooltips/DetailsTooltip";

import popsOver from "../../util/behaviors/popsOver";

/**
 * @class ConfirmTooltip
 * @desc ConfirmTooltip implements tooltip used to confirm or deny the canceling of an action.
 *
 * @param {string} [data-id]
 *     The data-id of the component.
 * @param {string} label
 *     The text of the link.
 * @param {string} [positionClassName]
 *     CSS classes to set on the top-level HTML container. Used to manage tooltip callout positioning.
 *      When using multiple positions like "top left" or "bottom right" do not use dashes as it will not work.
 * @param {string} title
 *     The title of the ConfirmTooltip tooltip.
 * @param {string} type
 *     The Style/type of button
 * @param {boolean} open
 *     The prop that controls whether the tooltip is visible or not
 * @param {string} cancelText
 *      text of the cancel A tag
 * @param {string} buttonLabel
 *      text for the button label
 * @param {string} buttonType
 *      css class to set the type of button(primary, secondary, danger)
 * @param {bool} disabledSave
 *      boolean to turn enable or disable the button.
 * @param {ConfirmTooltip~onCancel} onCancel
 *     The callback triggered when the cancel button is pressed.
 * @param {ConfirmTooltip~onConfirm} onDelete
 *     The callback triggered when the delete button is pressed.
 * @param {ConfirmTooltip~onToggle}
 *      the callback to open and close the modal.
 *
 * @example positionClassName does not use dashes for positioning.
 * "bottom"
 * "top"
 * "top right"
 * "top left"
 * "bottom right"
 * "bottom left"
 *
 * @example
 *     <ConfirmTooltip
 *          positionClassName="bottom right"
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
 **/


class ConfirmTooltipBase extends Component {
    static PropTypes = {
        "data-id": PropTypes.string,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        className: PropTypes.string,
        open: PropTypes.bool,
        onToggle: PropTypes.func,
        label: PropTypes.string,
        cancelText: PropTypes.string,
        buttonLabel: PropTypes.string,
        buttonType: PropTypes.string,
        disableSave: PropTypes.bool,
    }

    static defaultProps = {
        "data-id": "confirm-tooltip",
    };

    render() {
        return (
            <div data-id={this.props["data-id"]}>
                <DetailsTooltip
                    {...this.props}
                    stateless={true}
                    data-id={`${this.props["data-id"]}-details`}
                >
                    {this.props.children}
                    <div className="button-group">
                        <Button
                            data-id={`${this.props["data-id"]}-button`}
                            label={this.props.buttonLabel || "Confirm"}
                            type={this.props.buttonType}
                            onClick={this.props.onConfirm}
                            disabled={this.props.disableSave}
                        />
                        <br /> <br />
                        <a
                            label="Cancel" data-id={`${this.props["data-id"]}-cancel`}
                            onClick={this.props.onCancel || this.props.onClose}
                        >
                            {this.props.cancelText || "Cancel"}
                        </a>
                    </div>
                </DetailsTooltip>
            </div>
        );
    }
}

const ConfirmTooltip = popsOver(ConfirmTooltipBase);
module.exports = ConfirmTooltip;