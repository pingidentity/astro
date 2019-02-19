"use strict";

import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { getIconClassName } from "../../util/PropUtils";
import { cannonballChangeWarning } from "../../util/DeprecationUtils";

/**
 * @class Icon
 * @desc A component for displaying an icon by itself or next to next.
 *
 * @param {string} [data-id="icon"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string} [iconName]
 *     The name of the icon
 * @param {string} [className]
 *     Extra CSS class(s) applied to the top-level HTML container.
 * @param {string} [type]
 *     Set to "leading" or "inline" to either provide extra spacing or not
 *
 * @example
 * <Icon iconName="cog">
 *    Some text or other content that appears next to the icon.
 * </Icon>
 *
 */

const Icon = ({ className, children, "data-id": dataId, type, ...props }) => {
    if (type === "inline") {
        return <span data-id={dataId} className={classnames(getIconClassName(props), className)} />;
    } else if (type !== "leading" && !children) {
        cannonballChangeWarning({
            message: (
                `By default, Icon will display a simple icon when no children are provided. ` +
                `You can use this rendering behavior now by setting the 'type' prop to 'inline'. ` +
                `To display a leading icon that includes the right margin, set 'type' to 'leading'.`
            ),
        });
    }

    return (
        <div className={classnames("icon", className)} data-id={dataId}>
            <div
                className={classnames("icon__graphic", getIconClassName(props))}
                data-id={`${dataId}-graphic`}
            />
            {children && (
                <div className="icon__content" data-id={`${dataId}-content`}>
                    {children}
                </div>
            )}
        </div>
    );
};

Icon.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    iconName: PropTypes.string,
    type: PropTypes.oneOf([ "leading", "inline" ]),
};

Icon.defaultProps = {
    "data-id": "icon",
};

module.exports = Icon;
