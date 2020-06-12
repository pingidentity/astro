import React from 'react';
import PropTypes from 'prop-types';
import FloatLabel from '../FloatLabel';
import PasswordInput from '../PasswordInput';
import { noop } from "underscore";

/**
 * PasswordInput with a FloatLabel
 */
const FloatLabelPasswordInput = ({
    defaultValue,
    onChange,
    value,
    inputClassName,
    label,
    id,
    ...props
}) => {
    return (
        <FloatLabel
            label={label}
            id={id}
            InputType={PasswordInput}
            inputClassName={inputClassName}
            onChange={onChange}
            defaultValue={defaultValue}
            value={value}
            {...props}
        />
    );
};

FloatLabelPasswordInput.propTypes = {
    /**
     * Default value for the input
     */
    defaultValue: PropTypes.string,
    /**
    /**
     * ID to add to the input
     */
    id: PropTypes.string,
    /**
     * Class name(s) to add to the input
     */
    inputClassName: PropTypes.string,
    /**
     * Label for the input
     */
    label: PropTypes.string,
    /**
     * Called when the value of the input changes
     */
    onChange: PropTypes.func,
    /**
     * Value of the input
     */
    value: PropTypes.string,
};

FloatLabelPasswordInput.defaultProps = {
    error: false,
    onChange: noop,
};

export default FloatLabelPasswordInput;
