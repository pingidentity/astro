import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import { noop } from 'lodash';

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
}) => {
    const SelectTag = optionsStrict ? Select : Creatable;
    return (
        <SelectTag
            classNamePrefix="multivalues"
            components={{
                DropdownIndicator: () => null,
                ClearIndicator: () => null,
                IndicatorSeparator: () => null,
                Control: ({ children, commonProps, innerProps }) => (
                    <div className="multivalues__control" {...innerProps}>
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
};

Multivalues.defaultProps = {
    autoFocus: false,
    entries: [],
    onBlur: noop,
    onFocus: noop,
    onValueChange: noop,
    options: [],
    optionsStrict: false,
};

export default Multivalues;
