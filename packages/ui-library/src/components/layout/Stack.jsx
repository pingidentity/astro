import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
* @class Stack
* @desc A container that spaces its children in a column
*
* @param {string} [data-id=stack]
*     The data-id of the component
* @param {string} [className]
*     Class name(s) to add to the top-level container/div
* @param {string} [gap="MD"]
*     Space items in the stack by XS, SM, MD, LG, XL, or XX
*/

const Stack = ({
    children,
    className,
    "data-id": dataId,
    gap,
}) => (
    <div
        className={classnames("stack", className, `stack--${gap.toLowerCase()}`)}
        data-id={dataId}
    >
        {children}
    </div>
);

Stack.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    gap: PropTypes.oneOf([ "XS", "SM", "MD", "LG", "XL", "XX" ]),
};

Stack.defaultProps = {
    "data-id": "stack",
    gap: "MD",
};

export default Stack;