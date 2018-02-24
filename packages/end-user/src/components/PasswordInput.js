import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const PasswordInput = ({
    placeholder, id, className, error, success,
}) => {
    const classNames = classnames('text-input', className, {
        'text-input--error': error,
        'text-input--success': success,
    });

    return <input className={classNames} id={id} name={id} placeholder={placeholder} type="password" />;
};

PasswordInput.propTypes = {
    placeholder: PropTypes.string,
    id: PropTypes.string,
    error: PropTypes.bool,
    success: PropTypes.bool,
};

export default PasswordInput;
