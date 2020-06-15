import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FieldMessage from '../FieldMessage'

import { inStateContainer } from '../../util/StateContainer';
import { fieldMessageStatuses } from '../FieldMessage/FieldMessage';

const getValue = option => (option.value ? option.value : option);
const getLabel = option => (option.label ? option.label : option);

/**
 * @enum {string}
 * @alias Droppdown~dropdownStatuses
 * @desc Enum for the different types of text input styling
 */

export const dropdownStatuses = {
    DEFAULT: 'default',
    ERROR: 'error',
    SUCCESS: 'success',
};
/**
 * Toggle between options
 */
export const StatelessDropdown = ({
    children,
    className,
    fieldMessage,
    fieldMessageStatus,
    id,
    selectClassName = '',
    onChange,
    options,
    placeholder,
    status,
    value,
    'data-id': dataId,
}) => {
    const classNames = classnames('dropdown', className, {
        'dropdown--with-icon-and-message': fieldMessage && status === dropdownStatuses.ERROR || fieldMessage && status === dropdownStatuses.SUCCESS,
        'dropdown--with-status-icon': !fieldMessage && status === dropdownStatuses.ERROR || !fieldMessage && status === dropdownStatuses.SUCCESS,
        'dropdown--with-message': fieldMessage && status === dropdownStatuses.DEFAULT,
        'dropdown--standard': !fieldMessage && status === dropdownStatuses.DEFAULT,
    });
    const selectClassNames = classnames('dropdown__select', selectClassName, {
        'dropdown__select--error': status === dropdownStatuses.ERROR,
        'dropdown__select--success': status === dropdownStatuses.SUCCESS,
        'dropdown__select--info': status === dropdownStatuses.DEFAULT,
    });

    const iconClassNames = classnames('text-input__icon', {
        'text-input__icon--error': status === dropdownStatuses.ERROR,
        'text-input__icon--success': status === dropdownStatuses.SUCCESS,
    });

    return (
        <div className={classNames} data-id={dataId}>
        {
            status === 'success' || status === 'error' 
                ? <div className={iconClassNames} key="type-icon"></div>
                : null
        }
            <select
                id={id}
                name={id}
                value={value}
                className={selectClassNames}
                onChange={(e) => onChange(e.target.value)}
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
            {fieldMessage && (
                <FieldMessage
                    status={fieldMessageStatus || status}
                >
                    {fieldMessage}
                </FieldMessage>
            )}
        </div>
    );
};

StatelessDropdown.propTypes = {
    /**
     * Sets the Dropdown class
     */
    className: PropTypes.string,
    /**
     * Sets a data-id property on the Dropdown to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Sets field message
     */
    fieldMessage: PropTypes.node,
    /**
     * Sets field message status to override provided status
     */
    fieldMessageStatus: PropTypes.oneOf(Object.values(fieldMessageStatuses)),
    /**
     * Determines the styling of the input
     */
    status: PropTypes.oneOf(Object.values(dropdownStatuses)),
    /**
     * Sets the ID prop of the Dropdown select
     */
    id: PropTypes.string,
    /**
     * Fired when the value of the Dropdown changes
     */
    onChange: PropTypes.func,
    /**
     * Sets the Dropdown's options
     */
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        }),
    ])),
    /**
     * Sets the placeholder text of the Dropdown
     */
    placeholder: PropTypes.string,
    /**
     * Sets the Dropdown select class
     */
    selectClassName: PropTypes.string,
    /**
     * Sets the currently selected Dropdown option
     */
    value: PropTypes.string,
};

StatelessDropdown.defaultProps = {
    options: [],
    status: dropdownStatuses.DEFAULT,
    value: '',
    'data-id': 'dropdown',
};

const Dropdown = inStateContainer([
    {
        name: 'value',
        initial: '',
        callbacks: [
            {
                name: 'onChange',
                transform: value => getValue(value),
            },
        ],
    },
])(StatelessDropdown);

export default Dropdown;
