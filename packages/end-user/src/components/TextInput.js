import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextInput = ({
    className,
    defaultValue,
    error,
    id,
    placeholder,
    primary,
    success,
    value,
}) => {
    const classNames = classnames('text-input', className, {
        'text-input--error': error,
        'text-input--success': success,
        'text-input--primary': primary,
    });

    return (
        <input
            className={classNames}
            defaultValue={defaultValue}
            id={id}
            name={id}
            placeholder={placeholder}
            type="text"
            value={value}
        />
    );
};

TextInput.propTypes = {
    placeholder: PropTypes.string,
    id: PropTypes.string,
    defaultValue: PropTypes.string,
    error: PropTypes.bool,
    success: PropTypes.bool,
    primary: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

export default TextInput;
