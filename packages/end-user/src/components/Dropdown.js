import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const getValue = option => (option.value ? option.value : option);
const getLabel = option => (option.label ? option.label : option);

const Dropdown = ({
    children,
    className,
    error,
    id,
    selectClassName = '',
    onChange,
    options,
    placeholder,
    value,
}) => {
    const classNames = classnames('dropdown', className, {
        'dropdown--error': error,
    });
    const selectClassNames = classnames('dropdown__select', selectClassName);

    return (
        <div className={classNames}>
            <select
                id={id}
                name={id}
                value={value}
                className={selectClassNames}
                onChange={onChange}
            >
                {placeholder && <option disabled value="">{placeholder}</option>}
                {options.map(option => (
                    <option
                        key={getValue(option)}
                        value={getValue(option)}
                    >
                        {getLabel(option)}
                    </option>
                ))}
            </select>
            {children}
        </div>
    );
};

Dropdown.propTypes = {
    id: PropTypes.string,
    selectClassName: PropTypes.string,
    error: PropTypes.bool,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        }),
    ])),
    placeholder: PropTypes.string,
    value: PropTypes.string,
};

export default Dropdown;
