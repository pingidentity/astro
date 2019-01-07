"use strict";

import PropTypes from "prop-types";
import React from "react";
import { MessageTypes } from "../general/messages/MessagesConstants";
import ValueItem from "../layout/ValueItem";
import classnames from "classnames";

/**
 * @class StatusIndicator
 * @desc displays a small circular status indicator
 *
 * @param {string} [data-id="status-indicator"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {StatusIndicator.MessageTypes} [type=MessageTypes.NOTICE]
 *     Type of icon to display (MessageTypes.NOTICE, MessageTypes.ERROR, MessageTypes.WARNING)
 * @param {string} [className]
 *     CSS classes to add on the top-level HTML container.
 * @param {boolean} [inline=false]
 *     When true, the value item displays inline
 *
 * @example
 *    <StatusIndicator>
 *        foobar
 *    </StatusIndicator>
 */

const _getIcon = type => {
    return <span className={`status-indicator--icon status-indicator--icon__${type}`} />;
};

const StatusIndicator = ({
    children,
    className,
    "data-id": dataId,
    inline,
    type,
}) => {
    return (
        <ValueItem
            className={classnames("status-indicator", className)}
            data-id={dataId}
            icon={_getIcon(type)}
            inline={inline}>
            {children}
        </ValueItem>
    );
};

StatusIndicator.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    inline: PropTypes.bool,
    type: PropTypes.oneOf([
        MessageTypes.NOTICE, MessageTypes.ERROR, MessageTypes.WARNING, MessageTypes.SUCCESS
    ]),
};

StatusIndicator.defaultProps = {
    "data-id": "status-indicator",
    inline: false,
};

StatusIndicator.Types = MessageTypes;
export default StatusIndicator;
