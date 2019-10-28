import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @enum {string}
 * @alias Spacing.Sizes
 */
export const sizes = {
    /** xs */
    XS: "xs",
    /** sm */
    SM: "sm",
    /** md */
    MD: "md",
    /** lg */
    LG: "lg",
    /** xl */
    XL: "xl",
    /** xx */
    XX: "xx",
};

const getClassName = (value, placement) => value !== undefined ? `space-${placement}-${value}` : "";

/**
 * @class Spacing
 * @desc Flexible component for adding Spacing. Different from Padding because spacing uses margin, which can collapse.
 * @param {string} [data-id="spacing"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *      class name(s) to add to the top-level container/div
 * @param {Spacing.Sizes} bottom
 *      Spacing on bottom
 * @param {Spacing.Sizes} left
 *      Spacing on left
 * @param {Spacing.Sizes} right
 *      Spacing on right
 * @param {Spacing.Sizes} top
 *      Spacing on top
 * @param {Spacing.Sizes} vertical
 *      Spacing on top and bottom
 * @param {Spacing.Sizes} horizontal
 *      Spacing on left and right
 * @param {Spacing.Sizes} Spacing
 *      Spacing on all sides
 */

function Spacing({
    children,
    className,
    "data-id": dataId,
    inline,
    spacing,
    vertical = spacing,
    horizontal = spacing,
    bottom = vertical,
    left = horizontal,
    right = horizontal,
    top = vertical,
}) {
    return (
        <div
            className={classnames(
                className,
                getClassName(bottom, "bottom"),
                getClassName(left, "left"),
                getClassName(right, "right"),
                getClassName(top, "top"),
                {
                    "Spacing-component--inline": inline
                }
            )}
            data-id={dataId}
        >
            {children}
        </div>
    );
}

const SpacingPropType = PropTypes.oneOf(Object.values(sizes));

Spacing.propTypes = {
    bottom: SpacingPropType,
    left: SpacingPropType,
    right: SpacingPropType,
    top: SpacingPropType,
    vertical: SpacingPropType,
    horizontal: SpacingPropType,
    Spacing: SpacingPropType,
};

Spacing.defaultProps = {
    "data-id": "spacing"
};

Spacing.sizes = sizes;

export default Spacing;
