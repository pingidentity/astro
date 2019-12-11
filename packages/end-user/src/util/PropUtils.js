import React from 'react';
import { isEnter, isSpace } from './KeyboardUtils';
import Icon from '../components/shared/Icon';

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
    return `pingicon-${icon}`;
};

export const getIcon = (icon, props) => {
    if (typeof icon === "string") {
        return (
            <Icon iconName={icon} {...props} />
        );
    } else {
        return icon;
    }
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

/**
 * @alias module:util/PropUtils.defaultRender
 *
 * @desc Gets an object of props that make an element that's not normally clickable
 *       act like an HTML <button />.
 *
 * @param {function} onClick
 *    The onClick function that gets called when the component is clicked; call on enter and on space.
 * @returns {object}
 *    Returns a spreadable props object with an onKeyDown function, an aria role and a tabIndex.
 *
 */
export const getClickableA11yProps = (onClick = () => { }) => ({
    onKeyDown: e => {
        if (isEnter(e.keyCode) || isSpace(e.keyCode)) {
            e.preventDefault();
            onClick(e);
        }
    },
    role: "button",
    tabIndex: 0
});

export default {
    getIconClassName,
    defaultRender,
};
