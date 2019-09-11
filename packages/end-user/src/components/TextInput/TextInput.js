import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
    id,
    placeholder,
    type,
    value,
    width,
}) => {
    const classNames = classnames('text-input', className, {
        'text-input--error': type === textInputTypes.ERROR,
        'text-input--success': type === textInputTypes.SUCCESS,
        'text-input--primary': type === textInputTypes.PRIMARY,
    });

    return (
        <input
            className={classNames}
            data-id={dataId}
            defaultValue={defaultValue}
            id={id}
            name={id}
            onChange={onChange}
            placeholder={placeholder}
            type="text"
            value={value}
            style={{ width }}
        />
    );
};

TextInput.defaultProps = {
    'data-id': 'text-input',
};

TextInput.propTypes = {
    'data-id': PropTypes.string,
    defaultValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    id: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(Object.values(textInputTypes)),
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
};

export default TextInput;
