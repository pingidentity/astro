import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from 'underscore';

/**
 * @enum {string}
 * @alias TextArea~textAreaTypes
 * @desc Enum for the different types of text input styling
 */
export const textAreaTypes = {
    ERROR: 'error',
    SUCCESS: 'success',
};

/**
 * @class TextArea
 * @description A component for rendering a text input
 *
 * @param {string} className
 *      CSS class(es) applied to the button element.
 * @param {string} [data-id='text-input']
 *      The data-id attribute value applied to the input element.
 * @param {string|number} defaultValue
 *      The default value of the input
 * @param {TextArea~onChange} onChange
 *      The callback triggered when the input value changes.
 * @param {string|number} [height]
 *     Height for text areas.
 * @param {string} placeholder
 *      The text to display in text input before a value is entered a a placeholder.
 *      This value displays as a label once an input value is provided.
 * @param {TextArea~textAreaTypes} [type]
 *      Determines the styling of the input.
 * @param {string|number} value
 *      The current value of the input
 * @param {string|number} [width]
 *     Width for text areas.
 */

const TextArea = ({
    className,
    'data-id': dataId,
    defaultValue,
    height,
    name,
    onChange,
    onFocus,
    onBlur,
    onKeyPress,
    onKeyDown,
    onMouseDown,
    id,
    placeholder,
    isReadOnly,
    resize,
    type,
    value,
    width,
}) => {
    const classNames = classnames('text-area', className, {
        'text-area--error': type === textAreaTypes.ERROR,
        'text-area--success': type === textAreaTypes.SUCCESS,
        'text-area--no-resize': resize === false,
    });

    const iconClassNames = classnames('text-input__icon', {
        'text-input__icon--error': type === textAreaTypes.ERROR,
        'text-input__icon--success': type === textAreaTypes.SUCCESS,
    });

    return [
        (
            type === 'success' || type === 'error'
                ? <div className={iconClassNames} key="type-icon"></div>
                : null
        ),
        <textarea
            className={classNames}
            data-id={dataId}
            defaultValue={defaultValue}
            id={id}
            key='textarea'
            name={name ? name : id}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            onMouseDown={onMouseDown}
            placeholder={placeholder}
            readOnly={isReadOnly}
            resize={resize.toString()}
            value={value}
            style={{ width, height }}
        />,
    ];
};

TextArea.propTypes = {
    /**
     * CSS class(es) applied to the TextArea
     */
    className: PropTypes.string,
    /**
     * Sets a data-id property on the TextArea element to be used as a test hook
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
     * Height of the TextArea
     */
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    /**
     * ID to be applied to the TextArea
     */
    id: PropTypes.string,
    /**
     * Name for the input
     */
    name: PropTypes.name,
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
     * Placeholder for the TextArea
     */
    placeholder: PropTypes.string,
    /**
     * Read only state of TextArea
     */
    isReadOnly: PropTypes.bool,
    /**
     * Whether TextArea can be resized
     */
    resize: PropTypes.bool,
    /**
     * Determines the styling of the input
     */
    type: PropTypes.oneOf(Object.values(textAreaTypes)),
    /**
     * The current value of the input
     */
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    /**
     * Width of the TextArea
     */
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
};

TextArea.defaultProps = {
    'data-id': 'text-input',
    onChange: noop,
    onFocus: noop,
    onBlur: noop,
    onKeyPress: noop,
    onKeyDown: noop,
    onMouseDown: noop,
    isReadOnly: false,
    resize: true
};

export default TextArea;
