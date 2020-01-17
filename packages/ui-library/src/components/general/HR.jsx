import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @enum {string}
 * @alias HR.spacings
 */
export const spacings = {
    /** xs */
    XS: "xs",
    /** sm */
    SM: "sm",
    /** md */
    MD: "md",
    /** zero */
    ZERO: "zero",
};

/**
 * @class HR
 * @desc A horizontal rule
 *
 * @param {string} [data-id="h-rule"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string} [className]
 *     Extra CSS class(s) applied to the top-level HTML container.
 * @param {HR.spacings} [spacing]
 *     Sets the spacing above and below the line. Set to a constant on HR.spacings
 * @param {boolean} [solid=false]
 *     Renders a solid line rather than a dotted line.
 *
 * @example
 * <HR spacing={HR.spacings.SM} />
 *
 */

const HR = ({
    ["data-id"]: dataId,
    className,
    solid,
    spacing,
}) => (
    <hr
        data-id={dataId}
        className={classnames("hr", className, {
            [`hr--${spacing}`]: spacing,
            "hr--solid": solid,
        })}
    />
);

HR.propTypes = {
    "data-id": PropTypes.string,
    className: PropTypes.string,
    solid: PropTypes.bool,
    spacing: PropTypes.oneOf(Object.values(spacings)),
};

HR.defaultProps = {
    "data-id": "hr",
    solid: false,
};

HR.spacings = spacings;

export default HR;
