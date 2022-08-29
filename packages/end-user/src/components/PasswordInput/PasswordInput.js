import React, { useState } from 'react';
import { FocusRing } from '@react-aria/focus';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { noop } from 'underscore';

import TextInput from '../TextInput';

/**
 * @enum {string}
 * @alias PasswordInput~passwordInputTypes
 * @desc Enum for the different types of password input styling
 */
export const passwordInputTypes = {
    ERROR: 'error',
    PRIMARY: 'primary',
    SUCCESS: 'success',
};

const ARIA_LABELS_FOR_SHOW_PASSWORD_TOGGLE = {
    HIDE: 'hide password',
    SHOW: 'show password',
  };

/**
 * Hidden input field
 */
const PasswordInput = ({
    placeholder,
    id,
    inputProps,
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
    const isTriggerKey = key => [" ", "Enter"].includes(key);
    const [isHidden, setIsHidden] = useState(true);

    const classNames = classnames('text-input--pasword', className);
    const actionIconClassNames = classnames('text-input__icon', {
        'text-input__icon--hidden': isHidden,
        'text-input__icon--view-hidden': !isHidden,
        'text-input__icon--password': !!fieldMessage,
    });

    const handleKeyPress = (event) => {
      if (isTriggerKey(event.key)) {
        event.preventDefault();
        setIsHidden(!isHidden);
      }
    }

    const showPasswordToggleAriaLabel = !isHidden ?
        ARIA_LABELS_FOR_SHOW_PASSWORD_TOGGLE.HIDE :
        ARIA_LABELS_FOR_SHOW_PASSWORD_TOGGLE.SHOW;

    const actionComponent = (
      <FocusRing focusRingClass="is-focused">
        <div
            aria-label={showPasswordToggleAriaLabel}
            aria-pressed={!isHidden}
            className={actionIconClassNames}
            key="password-icon"
            onClick={() => setIsHidden(!isHidden)}
            onKeyPress={handleKeyPress}
            role="button"
            tabIndex={0}
        />
      </FocusRing>
    );

    return (
        <TextInput
            actionComponent={actionComponent}
            className={classNames}
            data-id={dataId}
            defaultValue={defaultValue}
            fieldMessage={fieldMessage}
            fieldMessageProps={fieldMessageProps}
            id={id}
            inputProps={{
                key: 'passwordinput',
                type: isHidden ? 'password' : 'text',
                ...inputProps,
            }}
            name={name ? name : id}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            onKeyPress={onKeyPress}
            onMouseDown={onMouseDown}
            placeholder={placeholder}
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
