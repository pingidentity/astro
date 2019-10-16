import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export const sizes = {
    XS: "xs",
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl",
};

const getClassName = (value, placement) => value !== undefined ? `padding-component--${placement}-${value}` : "";

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

export default Padding;
