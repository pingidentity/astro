import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const getValue = option => (option.value ? option.value : option);
const getLabel = option => (option.label ? option.label : option);

const DropdownCustom = ({
    children,
    className,
    error,
    id,
    inputClassName,
    open = false,
    options,
    placeholder,
    value,
}) => {
    const classNames = classnames('dropdown', className, {
        'dropdown--error': error,
        'dropdown--open': open,
    });
    const inputClassNames = classnames('dropdown__input', inputClassName);

    return (
        <div className={classNames}>
            <input
                className={inputClassNames}
                id={id}
                name={id}
                placeholder={placeholder}
                type="text"
                value={value}
                readOnly
            />
            {children}
            {open &&
                <ul className="dropdown__list">
                    {options.map(option => (
                        <li
                            className={classnames(
                                'dropdown__option',
                                {
                                    'dropdown__option--selected': getValue(option) === value,
                                },
                            )}
                            key={getValue(option)}
                            value={getValue(option)}
                        >
                            {getLabel(option)}
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
};

DropdownCustom.propTypes = {
    id: PropTypes.string,
    inputClassName: PropTypes.string,
    error: PropTypes.bool,
    open: PropTypes.bool,
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

export default DropdownCustom;
