import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _noop from 'lodash';
import TextInput from '../TextInput';
import FieldMessage from '../FieldMessage';
import { fieldMessageStatuses } from '../FieldMessage/FieldMessage';

/**
 * @enum {string}
 * @alias Droppdown~dropdownStatuses
 * @desc Enum for the different types of text input styling
 */

export const dropdownStatuses = {
    PRIMARY: 'primary',
    ERROR: 'error',
    SUCCESS: 'success',
};


const getValue = option => (option.value ? option.value : option);
const getLabel = option => (option.label ? option.label : option);

const DropdownCustomSearchable = ({
    children,
    className,
    fieldMessage,
    fieldMessageStatus,
    id,
    inputClassName,
    open,
    options,
    placeholder,
    searchPlaceholder,
    searchValue,
    status,
    onSearchValueChange,
    value,
    onValueChange,
    onToggle
}) => {
    const classNames = classnames('dropdown dropdown--search', className, {
        'dropdown--open': open,
        'dropdown--with-icon-and-message': fieldMessage && status === dropdownStatuses.ERROR || fieldMessage && status === dropdownStatuses.SUCCESS,
        'dropdown--with-status-icon': !fieldMessage && status === dropdownStatuses.ERROR || !fieldMessage && status === dropdownStatuses.SUCCESS,
        'dropdown--with-message': fieldMessage && status === dropdownStatuses.PRIMARY,
        'dropdown--standard': !fieldMessage && status === dropdownStatuses.PRIMARY,
    });

    const inputClassNames = classnames('dropdown__input', inputClassName, {
        // 'dropdown__input--error': error,
    });

    const iconClassNames = classnames('text-input__icon', {
        'text-input__icon--error': status === dropdownStatuses.ERROR,
        'text-input__icon--success': status === dropdownStatuses.SUCCESS,
    });
    const _onSearchValueChange = (e) => onSearchValueChange(e.target.value, e);
    const doOpen = () => {
        onToggle(true);
    };
    const doClose = () => {
        onToggle(false);
    };

    return (
        <div className={classNames}>
            {
                status === 'success' || status === 'error'
                    ? <div className={iconClassNames} key="type-icon"></div>
                    : null
            }
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
            {fieldMessage && (
                <FieldMessage status={fieldMessageStatus || status}>
                    {fieldMessage}
                </FieldMessage>
            )}
        </div>
    );
};

DropdownCustomSearchable.propTypes = {
    id: PropTypes.string,
    inputClassName: PropTypes.string,
    fieldMessage: PropTypes.string,
    fieldMessage: PropTypes.oneOf(Object.values(fieldMessageStatuses)),
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
    status: PropTypes.oneOf(Object.values(dropdownStatuses)),
    onSearchValueChange: PropTypes.func,
    onValueChange: PropTypes.func,
    onToggle: PropTypes.func,
};

DropdownCustomSearchable.defaultProps = {
    open: false,
    options: [],
    placeholder: '',
    searchPlaceholder: 'Search',
    searchValue: '',
    status: dropdownStatuses.PRIMARY,
    onSearchValueChange: _noop,
    value: '',
    onValueChange: _noop,
    onToggle: _noop,
};

export default DropdownCustomSearchable;
