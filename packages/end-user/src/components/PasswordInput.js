import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @class PasswordInput
 * @desc Hidden input field
 *
 * @param {string} [classname]
 *      Sets the Input class
 * @param {string} [id]
 *      Sets the id prop of the Input
 * @param {string} [data-id]
 *      To define the base "data-id" value for the input
 * @param {string} [placeholder]
 *      Sets the Input placeholder
 * @param {bool} [error]
 *      Added error style to the input
 * @param {bool} [success]
 *      Added success style to the input
 *
 */
const PasswordInput = ({
    placeholder, id, className, error, success, defaultValue, 'data-id': dataId,
}) => {
    const classNames = classnames('text-input', className, {
        'text-input--error': error,
        'text-input--success': success,
    });

    return (
        <input
            className={classNames}
            id={id}
            name={id}
            placeholder={placeholder}
            type="password"
            defaultValue={defaultValue}
            data-id={dataId}
        />
    );
};

PasswordInput.propTypes = {
    placeholder: PropTypes.string,
    id: PropTypes.string,
    error: PropTypes.bool,
    success: PropTypes.bool,
    defaultValue: PropTypes.string,
    'data-id': PropTypes.string,
};

PasswordInput.defaultProps = {
    'data-id': 'password-input',
};

export default PasswordInput;
