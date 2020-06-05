import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from 'underscore';
import FieldMessage from '../FieldMessage'

/**
 * Hidden input field
 */
const PasswordInput = ({
    placeholder,
    id,
    className,
    error,
    errorMessage,
    success,
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
        'text-input--error': error,
        'text-input--success': success,
    });

    return (
        <div>
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
            {error && errorMessage && (
                <FieldMessage
                    type={error && "error"}
                >
                    {errorMessage}
                </FieldMessage>
            )}
        </div>
    );
};

PasswordInput.propTypes = {
    /**
     * Sets error state for the PasswordInput if enabled
     */
    error: PropTypes.bool,
    /**
     * Sets error message active when error state is true
     */
    errorMessage: PropTypes.node,
    /**
     * Sets a data-id property on the PasswordInput to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Default value for the PasswordInput
     */
    defaultValue: PropTypes.string,
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
    error: false,
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    onKeyDown: noop,
    onKeyPress: noop,
    onMouseDown: noop,
};

export default PasswordInput;
