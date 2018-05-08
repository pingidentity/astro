import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../buttons/Button";
import DetailsTooltip from "../tooltips/DetailsTooltip";

/**
 * @class ConfirmTooltip
 * @desc ConfirmTooltip implements tooltip used to confirm or deny the canceling of an action.
 *
 * @param {string} [data-id]
 *     The data-id of the component.
 * @param {string} label
 *     The text of the link.
 * @param {string} [positionClassName]
 *     CSS classes to set on the top-level HTML container. Used to manage tooltip callout positioning with the
 *     CancelTooltip.positionStyles enum and/or any extra css styling if needed.
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
 * @param {ConfirmTooltip~onCancel} onCancel
 *     The callback triggered when the cancel button is pressed.
 * @param {ConfirmTooltip~onConfirm} onDelete
 *     The callback triggered when the delete button is pressed.
 * @param {ConfirmTooltip~onToggle}
 *      the callback to open and close the modal.
 *
 * @example
 *     <ConfirmTooltip
 *          positionClassName="bottom"
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


class ConfirmTooltip extends Component {
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
    }

    static defaultProps = {
        "data-id": "confirm-tooltip",
    };

    render() {
        return (
            <div data-id={this.props["data-id"]}>
                <DetailsTooltip
                    {...this.props}
                    data-id={`${this.props["data-id"]}-details`}
                >
                    {this.props.children}
                    <div className="button-group">
                        <Button
                            data-id={`${this.props["data-id"]}-button`}
                            label={this.props.buttonLabel || "Confirm"}
                            type={this.props.buttonType}
                            onClick={this.props.onConfirm}
                        />
                        <br /> <br />
                        <a
                            label="Cancel" data-id={`${this.props["data-id"]}-cancel`}
                            onClick={this.props.onCancel}
                        >
                            {this.props.cancelText || "Cancel"}
                        </a>
                    </div>
                </DetailsTooltip>
            </div>
        );
    }
}

module.exports = ConfirmTooltip;