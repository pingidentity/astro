import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const PasswordInput = ({ placeholder, id, className }) => (
    <input
        type="password"
        className={classnames('text-input', className)}
        placeholder={placeholder}
        id={id}
        name={id}
    />
);

PasswordInput.propTypes = {
    placeholder: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
};

export default PasswordInput;
