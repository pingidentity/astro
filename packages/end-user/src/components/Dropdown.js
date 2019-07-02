import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { inStateContainer } from '../util/StateContainer';

const getValue = option => (option.value ? option.value : option);
const getLabel = option => (option.label ? option.label : option);

/**
 * @class Dropdown
 * @desc Toggle an option
 *
 * @param {Dropdown~onChange} [onChange]
 *      Fired when the value of the dropdown changes
 * @param {string} [classname]
 *      Sets the dropdown class
 * @param {string} [id]
 *      Sets the id prop of the dropdown select
 * @param {string} [selectClassName]
 *      Sets the dropdown select class
 * @param {array} [options]
 *      Sets the dropdown's options
* @param {string} [placeholder]
 *      Sets the placeholder text of the dropdown
 * @param {string} [value]
 *      Sets the currently selected dropdown option
 * @param {string} [data-id]
 *      Sets a data-id property on the dropdown element to be used as a test hook
 *
 */
const StatelessDropdown = ({
    children,
    className,
    error,
    id,
    selectClassName = '',
    onChange,
    options,
    placeholder,
    value,
    'data-id': dataId,
}) => {
    const classNames = classnames('dropdown', className, {
        'dropdown--error': error,
    });
    const selectClassNames = classnames('dropdown__select', selectClassName);

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
        </div>
    );
};

StatelessDropdown.propTypes = {
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
    'data-id': PropTypes.string,
};

StatelessDropdown.defaultProps = {
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
