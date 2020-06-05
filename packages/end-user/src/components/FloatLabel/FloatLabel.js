import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FieldMessage from '../FieldMessage'

/**
 * @class FloatLabel
 * @desc Form label that includes an input element
 *
 * @param {node} [children]
 *      Elements to display after the input
 * @param {string} [data-id]
 *      Sets a data-id property on the FloatLabel element to be used as a test hook
 * @param {string} [id]
 *      ID for the input element
 * @param {node} [input]
 *      Sets the input element to be used
 */
const FloatLabel = ({
    label,
    id,
    input,
    onChange,
    inputClassName,
    defaultValue,
    value,
    children,
    fieldMessage,
    type,
    InputType,
    'data-id': dataId,
    ...props
}) => {
    const [inputValue, setInputValue] = useState(value || defaultValue);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        if (onChange) {
            onChange(e);
        }
    };

    const floatClassNames = classnames('float-label', {
        'placeholder-shown': !inputValue
    });
    const inputClassNames = classnames('float-label__input', inputClassName);

    return (
        <div className={floatClassNames} data-id={dataId}>
            <InputType
                id={id}
                placeholder={label}
                defaultValue={defaultValue}
                value={value}
                onChange={handleChange}
                className={inputClassNames}
                {...props}
            />
            <label className="float-label__label" htmlFor={id}>
                {label}
            </label>
            {children}
            {fieldMessage && (
                <FieldMessage
                    type={type}
                >
                    {fieldMessage}
                </FieldMessage>
            )}
        </div>
    );
};

FloatLabel.propTypes = {
    fieldMessage: PropTypes.node,
    label: PropTypes.string,
    id: PropTypes.string,
    InputType: PropTypes.func,
    inputClassName: PropTypes.string,
    'data-id': PropTypes.string,
};

PropTypes.defaultProps = {
    'data-id': 'floatlabel',
};

export default FloatLabel;
