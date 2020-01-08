"use strict";

import PropTypes from "prop-types";
import React from "react";
import ValueItem from "../layout/ValueItem";
import classnames from "classnames";

/**
 * @class StatusIndicator
 * @desc displays a small circular status indicator
 *
 * @param {string} [data-id="status-indicator"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {StatusIndicator.statusTypes} [type=MessageTypes.NOTICE]
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

/**
 * @enum {string}
 * @alias StatusIndicator.statusTypes
 * @desc Enum for the different types of status
 */
const statusTypes = {
    /** notice */
    NOTICE: "notice",
    /** error */
    ERROR: "error",
    /** warning */
    WARNING: "warning",
    /** success */
    SUCCESS: "success",
    /** empty */
    EMPTY: "empty",
};

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
    type: PropTypes.oneOf(Object.values(statusTypes)),
};

StatusIndicator.defaultProps = {
    "data-id": "status-indicator",
    inline: false,
};

StatusIndicator.Types = statusTypes;
StatusIndicator.statusTypes = statusTypes; // new standard

export default StatusIndicator;
