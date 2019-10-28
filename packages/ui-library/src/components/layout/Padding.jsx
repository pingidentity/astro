import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @enum {string}
 * @alias Padding.Sizes
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
};

const getClassName = (value, placement) => value !== undefined ? `padding-component--${placement}-${value}` : "";

/**
 * @class Padding
 * @desc Flexible component for adding padding. Different from Spacing because padding doesn't collapse.
 * @param {string} [data-id="padding-component"]
 *          To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *      class name(s) to add to the top-level container/div
 * @param {Padding.Sizes} bottom
 *      Padding on bottom
 * @param {Padding.Sizes} left
 *      Padding on left
 * @param {Padding.Sizes} right
 *      Padding on right
 * @param {Padding.Sizes} top
 *      Padding on top
 * @param {Padding.Sizes} vertical
 *      Padding on top and bottom
 * @param {Padding.Sizes} horizontal
 *      Padding on left and right
 * @param {Padding.Sizes} padding
 *      Padding on all sides
 */

function Padding({
    children,
    className,
    "data-id": dataId,
    inline,
    padding,
    vertical = padding,
    horizontal = padding,
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
                    "padding-component--inline": inline
                }
            )}
            data-id={dataId}
        >
            {children}
        </div>
    );
}

const paddingPropType = PropTypes.oneOf(Object.values(sizes));

Padding.propTypes = {
    bottom: paddingPropType,
    left: paddingPropType,
    right: paddingPropType,
    top: paddingPropType,
    vertical: paddingPropType,
    horizontal: paddingPropType,
    padding: paddingPropType,
};

Padding.defaultProps = {
    "data-id": "padding-component"
};

Padding.sizes = sizes;

export default Padding;
