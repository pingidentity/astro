import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import EllipsisLoader from "../general/EllipsisLoader";
import Icon from "../general/Icon";
import classnames from "classnames";
import _ from "underscore";

/**
 * @class MessageButton
 * @desc button component
 *
 * @param {string} [className]
 *     Class name to add to the top-level container
 * @param {string} label
 *     The text displayed in the button
 * @param {boolean} [inline=false]
 *     When true, the button displays as an inline button
 * @param {boolean} [disabled=false]
 *     When true, the button is disabled
 * @param {MessageButton.statuses} [status=MessageButton.statuses.DEFAULT]
 *     Determines the styling of the message button.
 * @example
 *  <MessageButton
 *      label="Button"
 *      type="Danger">
 *  </MessageButton>
 *
 */

/**
 * @enum {string}
 * @alias MessageButton.statuses
 */
const statuses = {
    DEFAULT: "default",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
};

const statusTypes = Object.values(statuses);


function MessageButton (props) {
    const {
        className,
        label,
        status,
    } = props;

    const classes = classnames(
        className,
        "message-button",
        {
            [`message-button--${status}`]: status,
        }
    );

    const disabled = status !== statuses.DEFAULT || props.disabled;

    return (
        <Button
            {...props}
            className={classes}
            label={null}
            loading={false}
            disabled={disabled}
        >
            {status === statuses.DEFAULT && label}
            {status === statuses.SUCCESS && (
                <Icon data-id="icon" iconName="success-round" type="leading">
                    {label}
                </Icon>
            )}
            {status === statuses.ERROR && (
                <Icon data-id="icon" iconName="alert-solid" type="leading">
                    {label}
                </Icon>
            )}
            {status === statuses.LOADING && ([
                <span key="label">{label}</span>,
                <EllipsisLoader key="loader" loading />
            ])}
        </Button>
    );
}

MessageButton.displayName="MessageButton";

MessageButton.defaultProps = {
    "data-id": "message-button",
    inline: false,
    disabled: false,
    loading: false,
    onClick: _.noop,
    status: statuses.DEFAULT,
};

MessageButton.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    status: PropTypes.oneOf(statusTypes),
    inline: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
};

MessageButton.statuses = statuses;
export default MessageButton;
