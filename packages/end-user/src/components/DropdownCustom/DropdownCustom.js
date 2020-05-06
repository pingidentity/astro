import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _noop from 'lodash';

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
    onValueChange = _noop,
    onBlur = _noop,
    onFocus = _noop,
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
                onBlur={onBlur}
                onFocus={onFocus}
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
                            role="button"
                            onClick={(e) => onValueChange(getValue(option), e, option)}
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
    onValueChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
};

export default DropdownCustom;
