import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from 'underscore';
import FieldMessage from '../FieldMessage'

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

export const textInputFormats = {
    TEXT: 'text',
    NUMERIC: 'numeric',
    EMAIL: 'email',
    DEFAULT: ''
};

const inputmodeByFormats = {
    [textInputFormats.TEXT]: { inputMode: 'text' },
    [textInputFormats.NUMERIC]: { inputMode: 'numeric', pattern: '\d*', noValidate: true },
    [textInputFormats.EMAIL]: { inputMode: 'email' },
    [textInputFormats.DEFAULT]: {}
};

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
 * @param {node} fieldMessage
 *      The field message below the input
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
    fieldMessage,
    format,
    autoFocus,
    useAutoComplete,
}) => {
    const classNames = classnames('text-input', className, {
        'text-input--error': type === textInputTypes.ERROR,
        'text-input--success': type === textInputTypes.SUCCESS,
        'text-input--primary': type === textInputTypes.PRIMARY,
    });

    const iconClassNames = classnames('text-input__icon', {
        'text-input__icon--error': type === textInputTypes.ERROR,
        'text-input__icon--success': type === textInputTypes.SUCCESS,
    });

    return [
        (
            type === 'success' || type === 'error' 
                ? <div className={iconClassNames} key="type-icon"></div>
                : null
        ),
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
            autoFocus={autoFocus}
            autoComplete={useAutoComplete ? 'on' : 'off'}
            {...inputmodeByFormats[format]}
        />,
        fieldMessage && (
            <FieldMessage
                type={type}
            >
                {fieldMessage}
            </FieldMessage>
        )
    ];
};

TextInput.propTypes = {
    /**
     * CSS class(es) applied to the TextInput
     */
    className: PropTypes.string,
    /**
     * Sets a data-id property on the TextInput element to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * The default value of the input
     */
    defaultValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    /**
     * ID to be applied to the TextInput
     */
    id: PropTypes.string,
    /**
     * The callback triggered when the input value changes
     */
    onChange: PropTypes.func,
    /**
     * The callback triggered when the input recieves a focus event
     */
    onFocus: PropTypes.func,
    /**
     * The callback triggered when the input recieves a blur event
     */
    onBlur: PropTypes.func,
    /**
     * The callback triggered when the input recieves a keypress event
     */
    onKeyPress: PropTypes.func,
    /**
     * The callback triggered when the input recieves a keydown event
     */
    onKeyDown: PropTypes.func,
    /**
     * The callback triggered when the input recieves a mousedown event
     */
    onMouseDown: PropTypes.func,
    /**
     * Placeholder for the TextInput
     */
    placeholder: PropTypes.string,
    /**
     * Determines the styling of the input
     */
    type: PropTypes.oneOf(Object.values(textInputTypes)),
    /**
     * The current value of the input
     */
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    /**
     * Width of the TextInput
     */
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    /**
     * Type of value format the TextInput accepts
     */
    fieldMessage: PropTypes.node,
    /**
     * Message below field
     */
    format: PropTypes.oneOf(Object.values(textInputFormats)),
    /**
     * Focus field upon mount
     */
    autoFocus: PropTypes.bool,
    /**
     * Should browser autocompletion be enabled
     */
    useAutoComplete: PropTypes.bool,
};

TextInput.defaultProps = {
    'data-id': 'text-input',
    onChange: noop,
    onFocus: noop,
    onBlur: noop,
    onKeyPress: noop,
    onKeyDown: noop,
    onMouseDown: noop,
    format: textInputFormats.DEFAULT,
    autoFocus: false,
    useAutoComplete: true,
};

export default TextInput;
