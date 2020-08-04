import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from 'underscore';
import TextInput from '../TextInput';
import FieldMessage from '../FieldMessage'

/**
 * @enum {string}
 * @alias PasswordInput~passwordInputTypes
 * @desc Enum for the different types of password input styling
 */
export const passwordInputTypes = {
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
    name,
    onChange,
    onFocus,
    onBlur,
    onKeyPress,
    onKeyDown,
    onMouseDown,
}) => {
    const [isHidden, setIsHidden] = useState(true);
    const classNames = classnames('text-input--pasword', className);
    const actionIconClassNames = classnames('text-input__icon', 'text-input__icon--action', {
        'text-input__icon--hidden': isHidden,
        'text-input__icon--view-hidden': !isHidden,
    });
    const actionComponent = (
        <div
            role="button"
            aria-pressed={!isHidden}
            className={actionIconClassNames}
            onClick={() => setIsHidden(!isHidden)}
            key="password-icon"
        />
    );

    return (
        <TextInput
            className={classNames}
            id={id}
            name={name ? name : id}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            onMouseDown={onMouseDown}
            placeholder={placeholder}
            inputProps={{
                key: 'passwordinput',
                type: isHidden ? 'password' : 'text',
            }}
            defaultValue={defaultValue}
            data-id={dataId}
            actionComponent={actionComponent}
            fieldMessage={fieldMessage}
            fieldMessageProps={fieldMessageProps}
            type={type}
        />
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
     * Name for the input
     */
    name: PropTypes.string,
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
    /**
     * Determines the styling of the input
     */
    type: PropTypes.oneOf(Object.values(passwordInputTypes)),
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

PasswordInput.passwordInputTypes = passwordInputTypes;
export default PasswordInput;
