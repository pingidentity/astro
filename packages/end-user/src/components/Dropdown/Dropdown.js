import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FieldMessage from '../FieldMessage'

import { inStateContainer } from '../../util/StateContainer';

const getValue = option => (option.value ? option.value : option);
const getLabel = option => (option.label ? option.label : option);

/**
 * Toggle between options
 */
export const StatelessDropdown = ({
    children,
    className,
    error,
    errorMessage,
    id,
    selectClassName = '',
    onChange,
    options,
    placeholder,
    value,
    'data-id': dataId,
}) => {
    const classNames = classnames('dropdown', className, {
        'dropdown--error': error && errorMessage,
    });
    const selectClassNames = classnames('dropdown__select', selectClassName, {
        'dropdown__select--error': error,
    });

    return (
        <div className={classNames} data-id={dataId}>
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
            {error && errorMessage && (
                <FieldMessage
                    type={error && "error"}
                >
                    {errorMessage}
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
     * Sets the error state of the Dropdown
     */
    error: PropTypes.bool,
    /**
     * Sets error message active when error state is true
     */
    errorMessage: PropTypes.node,
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
    error: false,
    options: [],
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
