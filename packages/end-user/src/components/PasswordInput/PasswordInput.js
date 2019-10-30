import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from 'underscore';

/**
 * @callback PasswordInput~onChange
 *
 * @param {object} e
 *    The ReactJS synthetic event object.
 */

/**
* @callback PasswordInput~onBlur
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback PasswordInput~onFocus
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback PasswordInput~onKeyDown
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback PasswordInput~onKeyPress
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback PasswordInput~onMouseDown
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

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
    placeholder,
    id,
    className,
    error,
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
    );
};

PasswordInput.propTypes = {
    placeholder: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyDown: PropTypes.func,
    onMouseDown: PropTypes.func,
    error: PropTypes.bool,
    success: PropTypes.bool,
    defaultValue: PropTypes.string,
    'data-id': PropTypes.string,
};

PasswordInput.defaultProps = {
    'data-id': 'password-input',
    onChange: noop,
    onFocus: noop,
    onBlur: noop,
    onKeyPress: noop,
    onKeyDown: noop,
    onMouseDown: noop,
};

export default PasswordInput;
