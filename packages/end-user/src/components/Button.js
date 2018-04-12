import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Button = ({ disabled, label, primary, tertiary }) => {
    const classNames = classnames('button', {
        'button--primary': primary,
        'button--disabled': disabled,
        'button--tertiary': tertiary,
        'brand-primary-bg': primary,
    });
    return (
        <button className={classNames} disabled={disabled || false}>
            {label}
        </button>
    );
};

Button.propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    primary: PropTypes.bool,
};

export default Button;
