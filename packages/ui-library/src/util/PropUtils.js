import React from "react";
import PropTypes from "prop-types";

/**
 * @module util/PropUtils
 * @desc The module contains common utility functions for use with props and prop names
 */

/**
 * @alias module:util/PropUtils.getIconClassName
 *
 * @desc Given an object of props that may contain 'iconClassName', 'iconName', or
 *    'icon', returns a class name for the right icon
 *
 * @param {object} props
 *    The props.
 * @returns {string}
 *    The className to get the correct CSS
 *
 * @example
 *   getIconClassName({iconName: 'globe'})
 *   // 'icon-globe'
 * @example
 *   getIconClassName({iconClassName: 'globe-icon'})
 *   // 'icon-globe'
 */

export const getIconClassName = (props, options = {}) => {
    const icon = props.iconClassName || props.iconName || props.icon || (options.useId && props.id);
    if (!icon || typeof icon !== "string") {
        return null;
    }
    if (props.iconClassName) {
        return icon;
    }
    return `icon-${icon}`;
};

/**
 * @alias module:util/PropUtils.defaultRender
 *
 * @desc This can be the default value for any simple render function.
 *    It will simply pass the props to the default component
 *
 * @param {object} props
 *    The props.
 * @param {object} DefaultComponent
 *    The default component that is rendered unless this function is overridden.
 * @returns {node}
 *    A rendered node.
 *
 */
export const defaultRender = (props, DefaultComponent) => <DefaultComponent {...props} />;

/**
 * @alias module:util/PropUtils.defaultRender
 *
 * @desc Takes a constant object and sets up a oneOf propType for it.
 *
 * @param {object} constant
 *    A constant object, like:
 *      const Sizes = {
 *          SM: "sm",
 *          MD: "md",
 *          LG: "lg"
 *      }
 */

export const standardPropTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
};

export default {
    getIconClassName,
    defaultRender,
};
