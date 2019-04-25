import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../buttons/Button";
import DetailsTooltip, { DetailsTooltipStateless } from "../tooltips/DetailsTooltip";

import popsOver from "../../util/behaviors/popsOver";
import ButtonGroup from "../layout/ButtonGroup";
import { cannonballPortalWarning } from "../../util/DeprecationUtils";
import { flagsPropType, hasFlag } from "../../util/FlagUtils";

/**
 * @class ConfirmTooltip
 * @desc ConfirmTooltip implements tooltip used to confirm or deny the canceling of an action.
 *
 * @param {string} [data-id]
 *     The data-id of the component.
 * @param {node} label
 *     The text of the link.
 * @param {array} [flags]
 *     Set the flag for "use-portal" to render with popper.js and react-portal
 * @param {string} [positionClassName]
 *     CSS classes to set on the top-level HTML container. Used to manage tooltip callout positioning.
 *      When using multiple positions like "top left" or "bottom right" do not use dashes as it will not work.
 * @param {("top" | "bottom" | "top left" | "top right" | "bottom left" | "bottom right")} [placement]
 *     How the tooltip is placed off of its trigger.
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
 * @param {bool} disableSave
 *      boolean to turn enable or disable the button.
 * @param {bool} [closeOnConfirm=false]
 *      when true, triggers onToggle when onConfirm is triggered.
 * @param {ConfirmTooltip~onCancel} onCancel
 *     The callback triggered when the cancel button is pressed.
 * @param {ConfirmTooltip~onConfirm} onDelete
 *     The callback triggered when the delete button is pressed.
 * @param {ConfirmTooltip~onToggle}
 *      the callback to open and close the modal.
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
        "data-id": PropTypes.string,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        className: PropTypes.string,
        open: PropTypes.bool,
        onToggle: PropTypes.func,
        label: PropTypes.node,
        cancelText: PropTypes.string,
        buttonLabel: PropTypes.string,
        buttonType: PropTypes.string,
        disableSave: PropTypes.bool,
        closeOnConfirm: PropTypes.bool,
        placement: PropTypes.oneOf(Object.values(DetailsTooltip.tooltipPlacements)),
        flags: flagsPropType,
    }

    static defaultProps = {
        "data-id": "confirm-tooltip",
        closeOnConfirm: false,
    };

    static contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

    componentDidMount() {
        if (!hasFlag(this, "use-portal")) {
            cannonballPortalWarning({ name: "ConfirmTooltip" });
        }
    }

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