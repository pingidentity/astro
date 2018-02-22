/**
 * @module util/PropUtils
 * @desc The module contains common utility functions for use with props and prop names
 */

/**
 * @alias module:util/ReduxUtils.resolveAndClone
 * @desc This function will go to the specified path in the passed in object, cloning all parts along the path.
 *
 * @param {object} state
 *     The state to traverse
 * @param {string[]} parts
 *     An array of keys to traverse
 * @returns {object}
 *     The object found at the given path
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
    if (props.iconClassName) {
        return props.iconClassName;
    } else if (props.iconName) {
        return "icon-" + props.iconName;
    } else if (props.icon) {
        return "icon-" + props.icon;
    } else if (options.useId && props.id) {
        return "icon-" + props.id;
    }
    return null;
};

export default {
    getIconClassName
};
