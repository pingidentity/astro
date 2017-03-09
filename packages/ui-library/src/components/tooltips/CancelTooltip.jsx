"use strict";
var React = require("react"),
    DetailsTooltip = require("./DetailsTooltip.jsx");

/**
* @callback CancelTooltip~onCancel
*/

/**
* @callback CancelTooltip~onConfirm
*/

/**
 * @class CancelTooltip
 * @desc CancelTooltip implements tooltip used to confirm or deny the canceling of an action.
 *
 * @param {string} [data-id]
 *     The data-id of the component.
 * @param {string} cancelButtonText
 *     The text of the cancel link.
 * @param {string} confirmButtonText
 *     The text of the confirm button.
 * @param {string} messageText
 *     The text to display in the body of the tooltip.
 * @param {string} [positionClassName]
 *     CSS classes to set on the top-level HTML container. Used to manage tooltip callout positioning with the
 *     CancelTooltip.positionStyles enum and/or any extra css styling if needed.
 * @param {string} title
 *     The title of the details tooltip.
 *
 * @param {boolean} open
 *     The prop that controls whether the tooltip is visible or not
 *
 * @param {CancelTooltip~onCancel} onCancel
 *     The callback triggered when the cancel button is pressed.
 * @param {CancelTooltip~onConfirm} onConfirm
 *     The callback triggered when the confirm button is pressed.
 *
 * @example
 *     <CancelTooltip
 *          title={this.im("pingid.policies.deleterule.label")}
 *          label={this.im("pingid.policies.deleterule.title")}
 *          open={this.state.isInviteOpen} onToggle={this._handleToggle}
 *          disabled={false}>
 *              <p>what ever callout content is</p>
 *     </CancelTooltip>
 **/

var CancelTooltip = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string,
        cancelButtonText: React.PropTypes.string.isRequired,
        confirmButtonText: React.PropTypes.string.isRequired,
        label: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.object
        ]),
        onConfirm: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired,
        positionClassName: React.PropTypes.string
    },

    render: function () {
        return (
            <DetailsTooltip
                data-id={this.props["data-id"] + "-cancel-tooltip"}
                className="cancel-tooltip"
                label={this.props.label}
                open={this.props.open}
                positionClassName={this.props.positionClassName}
                stateless={true}
                showClose={false}
                title={this.props.title}>
                <p data-id={this.props["data-id"] + "-cancel-tooltip-text"}>
                    {this.props.messageText}
                </p>
                <div className="buttons">
                    <button
                        className="cancel"
                        data-id={this.props["data-id"] + "-cancel-confirm-btn"}
                        onClick={this.props.onConfirm}>
                        {this.props.confirmButtonText}
                    </button>
                    <div>
                        <a
                            className="cancel"
                            data-id={this.props["data-id"] + "-cancel-deny-btn"}
                            onClick={this.props.onCancel}>
                            {this.props.cancelButtonText}
                        </a>
                    </div>
                </div>
            </DetailsTooltip>
        );
    }
});

module.exports = CancelTooltip;
