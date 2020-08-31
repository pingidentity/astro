import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
    labelClassName,
    defaultValue,
    value,
    children,
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
    const labelClassNames = classnames('float-label__label', labelClassName);

    return (
        <div className={floatClassNames} data-id={dataId}>
            <InputType
                id={id}
                placeholder={label}
                defaultValue={defaultValue}
                value={value}
                onChange={handleChange}
                className={inputClassNames}
                data-id={`${dataId}-input`}
                {...props}
            />
            <label className={labelClassNames} htmlFor={id}>
                {label}
            </label>
            {children}
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
