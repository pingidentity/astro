import React from 'react';
import PropTypes from 'prop-types';
import FloatLabel from '../FloatLabel';
import TextArea from '../TextArea';
import { noop } from "underscore";

/**
 * Textarea with a FloatLabel
 */
const FloatLabelTextArea = ({
    onChange,
    value,
    defaultValue,
    inputClassName,
    label,
    id,
    ...props
}) => (
    <FloatLabel
        defaultValue={defaultValue}
        label={label}
        id={id}
        InputType={TextArea}
        inputClassName={inputClassName}
        onChange={onChange}
        value={value}
        {...props}
    />
);

FloatLabelTextArea.propTypes = {
    /**
     * Default value for the textarea
     */
    defaultValue: PropTypes.string,
    /**
     * Message below field
     */
    fieldMessage: PropTypes.node,
    /**
     * ID to add to the textarea
     */
    id: PropTypes.string,
    /**
     * Class name(s) to add to the textarea
     */
    inputClassName: PropTypes.string,
    /**
     * Label for the textarea
     */
    label: PropTypes.string,
    /**
     * Called when the value of the textarea changes
     */
    onChange: PropTypes.func,
    /**
     * Value of the textarea
     */
    value: PropTypes.string,
};

FloatLabelTextArea.defaultProps = {
    onChange: noop,
};

export default FloatLabelTextArea;
