import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from 'underscore';

/**
 * @enum {string}
 * @alias TextInput~textInputTypes
 * @desc Enum for the different types of text input styling
 */
export const textInputTypes = {
    PRIMARY: 'primary',
    ERROR: 'error',
    SUCCESS: 'success',
};

/**
 * @callback TextInput~onChange
 *
 * @param {object} e
 *    The ReactJS synthetic event object.
 */

/**
* @callback TextInput~onBlur
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback TextInput~onFocus
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback TextInput~onKeyDown
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback TextInput~onKeyPress
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback TextInput~onMouseDown
*
* @param {object} e
*     The ReactJS synthetic event object.
*/


/**
 * @class TextInput
 * @description A component for rendering a text input
 *
 * @param {string} className
 *      CSS class(es) applied to the button element.
 * @param {string} [data-id='text-input']
 *      The data-id attribute value applied to the input element.
 * @param {string|number} defaultValue
 *      The default value of the input
 * @param {TextInput~onChange} onChange
 *      The callback triggered when the input value changes.
 * @param {string} placeholder
 *      The text to display in text input before a value is entered a a placeholder.
 *      This value displays as a label once an input value is provided.
 * @param {TextInput~textInputTypes} [type]
 *      Determines the styling of the input.
 * @param {string|number} value
 *      The current value of the input
 */

const TextInput = ({
    className,
    'data-id': dataId,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    onKeyPress,
    onKeyDown,
    onMouseDown,
    id,
    placeholder,
    type,
    value,
    width,
}) => {
    const classNames = classnames('text-input', className, {
        'text-input--error-icon': type === textInputTypes.ERROR,
        'text-input--success-icon': type === textInputTypes.SUCCESS,
        'text-input--primary': type === textInputTypes.PRIMARY,
    });

    const iconClassNames = classnames('text-input__icon', {
        'text-input__icon--error': type === textInputTypes.ERROR,
        'text-input__icon--success': type === textInputTypes.SUCCESS,
    });

    return [
        (type ? <div className={iconClassNames} key="type-icon"></div> : null),
        <input
            className={classNames}
            data-id={dataId}
            defaultValue={defaultValue}
            id={id}
            name={id}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            onMouseDown={onMouseDown}
            placeholder={placeholder}
            value={value}
            style={{width}}
            type="text"
            key="textinput"
        />,
    ];
};

TextInput.defaultProps = {
    'data-id': 'text-input',
    onChange: noop,
    onFocus: noop,
    onBlur: noop,
    onKeyPress: noop,
    onKeyDown: noop,
    onMouseDown: noop,
};

TextInput.propTypes = {
    'data-id': PropTypes.string,
    defaultValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    id: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyDown: PropTypes.func,
    onMouseDown: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(Object.values(textInputTypes)),
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
};

export default TextInput;
