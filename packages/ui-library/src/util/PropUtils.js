import React, { useState } from "react";
import PropTypes from "prop-types";
import { isObject } from "underscore";
import { isEnter, isSpace } from "./KeyboardUtils";
import Icon from "../components/general/Icon";
import classnames from "classnames";

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

export const getIcon = (icon, props) => {
    if (typeof icon === "string") {
        return (
            <Icon iconName={icon} {...props}/>
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
 * @alias module:util/PropUtils.makeRenderWithClassName
 *
 * @desc Returns render function that inserts a new className into the props
 *
 * @param {string} className
 */
export const makeRenderWithClassName = className => (props, DefaultComponent) => (
    defaultRender({
        ...props,
        className: classnames(props.className, className),
    }, DefaultComponent)
);

/**
 * @alias module:util/PropUtils.getClickableA11yProps
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
export const getClickableA11yProps = (onClick = () => {}) => ({
    onKeyDown: e => {
        if (isEnter(e.keyCode) || isSpace(e.keyCode)) {
            e.preventDefault();
            onClick(e);
        }
    },
    role: "button",
    tabIndex: 0
});

const navProps = {
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    label: PropTypes.string,
};

export const navTreePropType = PropTypes.arrayOf(
    PropTypes.shape(navProps)
);

/**
 * @alias module:util/PropUtils.generateNavTreePropType
 *
 * @desc Creates a propType for a navTree with a given number of levels, along with optional extra
 * props.
 *
 * @param {int} levels
 *    The number of levels that the tree should have.
 * @param {Object[]}
 *    An array of extra prop objects added to the level corresponding to their position in array.
 *    For example, passing [null, { icon: PropTypes.string }] would give the second level of the
 *    tree an icon prop.
 * @returns {function}
 *    Returns a propType that can be used to validate a nav tree.
 *
 */
export const generateNavTreePropType = (levels, extraProps = []) =>
    new Array(levels)
        .fill(undefined)
        // Create each level in reverse order, starting with the lowest level of the tree.
        .reduce((childPropType, _, idx) =>
            // Just use the starting accumulator if it's the lowest level of the tree,
            // since that won't have children.
            idx === 0
                ? childPropType
                : PropTypes.arrayOf(
                    PropTypes.shape({
                        ...navProps,
                        children: childPropType,
                        // Look for the extra props in non-reverse order.
                        ...isObject(extraProps[levels - idx - 1]) ? extraProps[levels - idx - 1] : {}
                    })
                ),
        navTreePropType
        );

/**
 * @alias module:util/PropUtils.valueProp
 *
 * @desc A prop type for any values that can be numbers or strings
 */
export const valueProp = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

/**
 * @alias module:util/PropUtils.translateItemToOption
 *
 * @desc Turns object with id and name into object with value and label
 */
export const translateItemToOption = ({
    id,
    name,
    value = id,
    label = name,
    helpHintText,
    hint = helpHintText,
    ...item
}) => ({
    ...item,
    hint,
    value,
    label,
    id: value,
    name: label,
});

export const usePStateful = (propValue, initial) => {
    if (propValue === undefined) {
        return useState(initial);
    } else {
        return [propValue, () => {}];
    }
};

/**
 * @alias module:util/PropUtils.usePStateful
 *
 * @desc A progressive state hook.
 */
export const usePStateful = (propValue, initial) => {
    if (propValue === undefined) {
        return useState(initial);
    } else {
        return [propValue, () => {}];
    }
};

/**
 * @alias module:util/PropUtils.translateItemsToOptions
 *
 * @desc Turns objects with ids and names into objects with values and labels
 */
export const translateItemsToOptions = items => items.map(translateItemToOption);

export default {
    getIconClassName,
    defaultRender,
};