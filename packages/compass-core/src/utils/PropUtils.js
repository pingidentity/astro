import React from 'react';
import PropTypes from 'prop-types';
import { isProduction } from './DebugUtils';

/** @module PropUtils */

/**
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

export const valuePropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

export const optionPropType = PropTypes.shape({
    id: valuePropType,
    value: valuePropType,
    label: PropTypes.node,
});

export const cssPropType = PropTypes.oneOfType(
    [PropTypes.string, PropTypes.func, PropTypes.object],
);

/** Function to support moving from types to variants. Return the value of type if it
 *  matches one of the provided variants. Throws a console warning as a side effect.
 *
 *  @param {string} component
 *      Component name
 *  @param {array} variants
 *      List of variant names
 *  @param {string} type
 *      The passed value of type
 *  @param defaultValue
 *      The default value if type doesn't match
 */
export const typeToVariant = (component, variants, type, defaultValue) => {
    if (variants.includes(type)) {
        if (!isProduction()) {
            console.warn(`The "type" prop for ${component} has been deprecated for purposes other than setting the type on the HTML element. Please use "variant" instead.`); // eslint-disable-line no-console
        }

        return type;
    }
    return defaultValue;
};
