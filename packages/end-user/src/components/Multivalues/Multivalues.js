import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import { noop } from 'lodash';
import FieldMessage from '../FieldMessage'

/**
 * @enum {string}
 * @alias Multivalues~multivaluesInputTypes
 * @desc Enum for the different types of multivalue input styling
 */
 export const multivalueInputTypes = {
    PRIMARY: 'default',
    ERROR: 'error',
    SUCCESS: 'success',
    EMPTY: '',
};

const Multivalues = ({
    autoFocus,
    className,
    entries,
    label,
    name,
    onBlur,
    onFocus,
    onValueChange,
    options,
    optionsStrict,
    placeholder,
    type,
    fieldMessage,  
    fieldMessageProps, 
}) => {
    const classNames = classnames('multivalues__control', className, {
        'multivalues__control--error': type === multivalueInputTypes.ERROR,
        'multivalues__control--success': type === multivalueInputTypes.SUCCESS,
        'multivalues__control--primary': type === multivalueInputTypes.PRIMARY,
    });

    const iconClassNames = classnames('multivalues__icon', {
        'multivalues__icon--error': type === multivalueInputTypes.ERROR,
        'multivalues__icon--success': type === multivalueInputTypes.SUCCESS,
    });

    const SelectTag = optionsStrict ? Select : Creatable;
    return (
        <>
            {(
                type === 'success' || type === 'error'
                    ? <div className={iconClassNames} key="type-icon"></div>
                    : null
            )}
            <SelectTag
                classNamePrefix="multivalues"
                components={{
                    DropdownIndicator: () => null,
                    ClearIndicator: () => null,
                    IndicatorSeparator: () => null,
                    Control: ({ children, commonProps, innerProps }) => (
                        <div className={classNames} {...innerProps}>
                            {label && <label>{label}</label>}
                            {children}
                        </div>
                    ),
                }}
                className={className}
                isMulti
                autoFocus={autoFocus}
                defaultValue={entries}
                options={options}
                name={name}
                onBlur={onBlur}
                onFocus={onFocus}
                placeholder={placeholder}
                onChange={onValueChange}
            />
        
            {fieldMessage && (
                <FieldMessage
                    status={type}
                    {...fieldMessageProps}
                >
                    {fieldMessage}
                </FieldMessage>
            )}
        </>
    );
};

Multivalues.propTypes = {
    /**
     * Whether or not to auto-focus the element.
     */
    autoFocus: PropTypes.bool,
    /**
     * CSS classes to set on the top-level HTML container.
     */
    className: PropTypes.string,
    /**
     * Array of strings used to display initial entry boxes.
     */
    entries: PropTypes.arrayOf(
        PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
    ),
    /**
     * Internal label for the control.
     */
    label: PropTypes.node,
    /**
     * Whether or not to auto-focus the element.
     */
    name: PropTypes.string,
    /**
     * Blur callback.
     */
    onBlur: PropTypes.func,
    /**
     * Focus callback.
     */
    onFocus: PropTypes.func,
    /**
     * Callback triggered when a new entry is added or removed.
     */
    onValueChange: PropTypes.func,
    /**
     * An array of value-label pairs. When supplied, the behavior changes a bit. - The entries prop will be a list of values -
     * The component will display the corresponding labels - Only valid options can be added as entries -
     * An auto-complete list will appear while focused
     */
    options: PropTypes.arrayOf(
        PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
    ),
    /**
     * When true, the component will only accept values from the options array.
     */
    optionsStrict: PropTypes.bool,
    /**
     * Placeholder text to display when there are no entries or drafts.
     */
    placeholder: PropTypes.string,
    /**
     * Determines the styling of the input
     */
    type: PropTypes.oneOf(Object.values(multivalueInputTypes)),
};

Multivalues.defaultProps = {
    autoFocus: false,
    entries: [],
    onBlur: noop,
    onFocus: noop,
    onValueChange: noop,
    options: [],
    optionsStrict: false,
    type: multivalueInputTypes.EMPTY,
};

export default Multivalues;
