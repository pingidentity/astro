import React from 'react';
import PropTypes from 'prop-types';
import FloatLabel from '../FloatLabel';
import TextInput from '../TextInput';
import { noop } from "underscore";

/**
 * TextInput with a FloatLabel
 */
const FloatLabelTextInput = ({
    onChange,
    value,
    defaultValue,
    inputClassName,
    label,
    id,
    fieldMessage,
    ...props
}) => (
    <FloatLabel
        defaultValue={defaultValue}
        label={label}
        fieldMessage={fieldMessage}
        id={id}
        InputType={TextInput}
        inputClassName={inputClassName}
        onChange={onChange}
        value={value}
        {...props}
    />
);

FloatLabelTextInput.propTypes = {
    /**
     * Default value for the input
     */
    defaultValue: PropTypes.string,
    /**
     * ID to add to the input
     */
    fieldMessage: PropTypes.node,
    /**
     * Message below field
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

FloatLabelTextInput.defaultProps = {
    onChange: noop,
};

export default FloatLabelTextInput;
