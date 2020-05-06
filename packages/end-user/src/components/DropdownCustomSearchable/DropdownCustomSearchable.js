import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _noop from 'lodash';
import TextInput from '../TextInput';


const getValue = option => (option.value ? option.value : option);
const getLabel = option => (option.label ? option.label : option);

const DropdownCustomSearchable = ({
    children,
    className,
    error,
    id,
    inputClassName,
    open,
    options,
    placeholder,
    searchPlaceholder,
    searchValue,
    onSearchValueChange,
    value,
    onValueChange,
    onToggle
}) => {
    const classNames = classnames('dropdown  dropdown--search', className, {
        'dropdown--error': error,
        'dropdown--open': open,
    });
    const inputClassNames = classnames('dropdown__input', inputClassName);
    const _onSearchValueChange = (e) => onSearchValueChange(e.target.value, e);
    const doOpen = () => {
        onToggle(true);
    };
    const doClose = () => {
        onToggle(false);
    };

    return (
        <div className={classNames}>
            <input
                className={inputClassNames}
                id={id}
                name={id}
                placeholder={placeholder}
                type="text"
                value={getLabel(value)}
                onClick={doOpen}
                readOnly
            />
            {children}
            {open && (
                <ul className="dropdown__list">
                    <li className="dropdown__option--search">
                        <TextInput
                            className="text-input--dropdown-search"
                            placeholder={searchPlaceholder}
                            onChange={_onSearchValueChange}
                            value={searchValue}
                            onBlur={doClose}
                            autoFocus
                            useAutoComplete={false}
                        />
                        <button className="dropdown__close" onClick={doClose} />
                    </li>
                    {options.map(option => (
                        <li
                            className={classnames(
                                'dropdown__option',
                                {
                                    'dropdown__option--selected': getValue(option) === getValue(value),
                                },
                            )}
                            key={getValue(option)}
                            value={getValue(option)}
                            role="button"
                            onMouseDown={(e) => {
                                /* required; otherwise input's onBlur will happen before onClick
                                 and it will collapse dropdown list preventing onClick be fired */
                                e.preventDefault();
                            }}
                            onClick={(e) => onValueChange(getValue(option), e, option)}
                        >
                            {getLabel(option)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

DropdownCustomSearchable.propTypes = {
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
    searchValue: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    onSearchValueChange: PropTypes.func,
    onValueChange: PropTypes.func,
    onToggle: PropTypes.func,
};

DropdownCustomSearchable.defaultProps = {
    open: false,
    options: [],
    placeholder: '',
    error: false,
    searchPlaceholder: 'Search',
    searchValue: '',
    onSearchValueChange: _noop,
    value: '',
    onValueChange: _noop,
    onToggle: _noop,
};

export default DropdownCustomSearchable;
