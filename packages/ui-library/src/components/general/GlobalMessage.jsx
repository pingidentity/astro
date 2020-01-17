import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { noop } from "underscore";
import Button, { buttonTypes } from "../buttons/Button";
import FlexRow, { alignments, justifyOptions } from "../layout/FlexRow";
import Icon from "./Icon";

/**
 * @enum {string}
 * @alias GlobalMessage.messageTypes
 */
export const messageTypes = {
    /** error */
    ERROR: "error",
    /** info */
    INFO: "info",
    /** warning */
    WARNING: "warning",
};

/**
 * @class GlobalMessage
 * @desc A message meant to appear at the top of the screen- pushes down all application content.
 *       Intended to be used for application expiration messages.
 *
 * @param {string} [data-id]
 *     To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *     A class name to be applied to the top level of the component.
 * @param {node} [children]
 *     A node that will appear in the component, to the left of the button.
 * @param {node} [buttonLabel]
 *     The label for the button.
 * @param {GlobalMessage.messageTypes} [type="info"]
 *     The type of warning message to show. This controls the background color,
 *     button styling and whether the clear button appears.
 * @param {function} [onButtonClick]
 *     Callback to be triggered when the message button is clicked.
 * @param {function} [onClear]
 *     Callback to be triggered when the X at the right side of the message is clicked.
 */

function GlobalMessage({
    buttonLabel,
    className,
    children,
    "data-id": dataId,
    onButtonClick,
    onClear,
    type
}) {
    return (
        <FlexRow
            className={classnames(
                className,
                "global-message",
                `global-message--${type}`
            )}
            data-id={dataId}
            justify={justifyOptions.CENTER}
        >
            <FlexRow
                alignment={alignments.CENTER}
                className="global-message__content"
            >
                {children}
                {buttonLabel &&
                <Button
                    className={classnames(
                        "global-message__button",
                        `global-message__button--${type}`
                    )}
                    data-id="global-message__button"
                    inline
                    label={buttonLabel}
                    onClick={onButtonClick}
                    type={type === messageTypes.ERROR ? buttonTypes.DANGER : undefined}
                />
                }
            </FlexRow>
            {type !== messageTypes.ERROR &&
                <FlexRow
                    alignment={alignments.CENTER}
                    className="global-message__clear"
                >
                    <Icon
                        data-id="global-message__clear"
                        iconName="clear"
                        onClick={onClear}
                        type="inline"
                    />
                </FlexRow>
            }
        </FlexRow>
    );
}

GlobalMessage.propTypes = {
    buttonLabel: PropTypes.string,
    className: PropTypes.string,
    "data-id": PropTypes.string,
    onButtonClick: PropTypes.func,
    type: PropTypes.oneOf(Object.values(messageTypes))
};

GlobalMessage.defaultProps = {
    "data-id": "global-message",
    onButtonClick: noop,
    type: messageTypes.INFO
};

export default GlobalMessage;
