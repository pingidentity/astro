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

/**
 * Hidden input field
 */
const PasswordInput = ({
    placeholder,
    id,
    className,
    fieldMessage,
    fieldMessageProps,
    type,
    defaultValue,
    'data-id': dataId,
    onChange,
    onFocus,
    onBlur,
    onKeyPress,
    onKeyDown,
    onMouseDown,
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

    return (
        <div>
            {
                type === 'success' || type === 'error'
                    ? <div className={iconClassNames} key="type-icon"></div>
                    : null
            }
            <input
                className={classNames}
                id={id}
                name={id}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyPress={onKeyPress}
                onKeyDown={onKeyDown}
                onMouseDown={onMouseDown}
                placeholder={placeholder}
                type="password"
                defaultValue={defaultValue}
                data-id={dataId}
            />
            {fieldMessage && (
                <FieldMessage
                    status={type}
                    {...fieldMessageProps}
                >
                    {fieldMessage}
                </FieldMessage>
            )}
        </div>
    );
};

PasswordInput.propTypes = {
    /**
     * Sets a data-id property on the PasswordInput to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Default value for the PasswordInput
     */
    defaultValue: PropTypes.string,
    /**
     * Sets field message
     */
    fieldMessage: PropTypes.node,
    /**
     * Sets the ID of the PasswordInput
     */
    id: PropTypes.string,
    /**
     * Called when the PasswordInput is blurred
     */
    onBlur: PropTypes.func,
    /**
     * Called when the value of PasswordInput changes
     */
    onChange: PropTypes.func,
    /**
     * Called when the PasswordInput is focused
     */
    onFocus: PropTypes.func,
    /**
     * Called when a key is hit in the PasswordInput
     */
    onKeyDown: PropTypes.func,
    /**
     * Called when a key is pressed in the PasswordInput
     */
    onKeyPress: PropTypes.func,
    /**
     * Called when there is a mousedown event in the PasswordInput
     */
    onMouseDown: PropTypes.func,
    /**
     * Placeholder for the PasswordInput
     */
    placeholder: PropTypes.string,
    /**
     * Sets the success state of the PasswordInput if enabled
     */
    success: PropTypes.bool,
};

PasswordInput.defaultProps = {
    'data-id': 'password-input',
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    onKeyDown: noop,
    onKeyPress: noop,
    onMouseDown: noop,
};

export default PasswordInput;
