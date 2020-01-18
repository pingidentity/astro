import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * @enum {string}
 * @alias Stack.gapSizes
 * @desc Different sizes of gap
 */
export const gapSizes = {
    /** ZERO */
    ZERO: "ZERO",
    /** XS */
    XS: "XS",
    /** SM */
    SM: "SM",
    /** MD */
    MD: "MD",
    /** LG */
    LG: "LG",
    /** XL */
    XL: "XL",
    /** XX */
    XX: "XX",
};

/**
* @class Stack
* @desc A container that spaces its children in a column
*
* @param {string} [data-id=stack]
*     The data-id of the component
* @param {string} [className]
*     Class name(s) to add to the top-level container/div
* @param {Stack.gapSizes} [gap="MD"]
*     Space items in the stack by ZERO, XS, SM, MD, LG, XL, or XX
* @param {boolean} [wrappers=false]
*     When true, use wrapper elements around items.
*/

const Stack = ({
    children,
    className,
    "data-id": dataId,
    gap,
    wrappers,
}) => (
    <div
        className={classnames("stack", className, `stack--${gap.toLowerCase()}`)}
        data-id={dataId}
    >
        {wrappers ? React.Children.map(
            children,
            child => <div className="stack__wrapper">{child}</div>
        ) : children}
    </div>
);

Stack.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    gap: PropTypes.oneOf(Object.values(gapSizes)),
};

Stack.defaultProps = {
    "data-id": "stack",
    gap: "MD",
};

export default Stack;