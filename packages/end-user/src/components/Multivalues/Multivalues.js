import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import { noop } from 'lodash';
import FieldMessage from '../FieldMessage';

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

const CrossIcon = ({ size }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        aria-hidden="true"
        fill="currentColor"
        strokeWidth="1"
        stroke="currentColor"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
    </svg>
);

const MultiValueRemove = ({ innerProps, data }) => {
    const [focused, setFocused] = useState(false);

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            innerProps.onClick();
        }
    };
  
    const classNames = classnames("multivalues__multi-value__remove", innerProps.className, {
        "multivalues__multi-value__remove--is-focused": focused
    });
  
    return (
        <div
            role="button"
            {...innerProps}
            onFocus={onFocus}
            onBlur={onBlur}
            className={classNames}
            tabIndex={0}
            aria-label={`delete ${data.label}`}
            onKeyDown={onKeyDown}
        >
            <CrossIcon size={14} />
        </div>
    );
};

const guidance = (props) => {
    const { isSearchable, isMulti, isDisabled, tabSelectsValue, context } = props;
    switch (context) {
        case "menu":
            return `Use Up and Down to choose options${isDisabled ? "" : ", press Enter to select the currently focused option"
                }, press Escape to exit the menu${tabSelectsValue
                    ? ", press Tab to select the option and exit the menu"
                    : ""
                }.`;
        case "input":
            return `${props["aria-label"] || "Select"} is focused ${isSearchable ? ",type to refine list" : ""
                }, press Down to open the menu, ${isMulti ? " press Shift+Tab to focus selected values" : ""
                }`;
        case "value":
            return "Use Tab and Shift+Tab to toggle between focused values, press Enter to remove the currently focused value";
        default:
            return "";
    }
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

    const onKeyDown = (e) => {
        // prevents react-selects ArrowLeft and ArrowRight behavior
        if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
            return;
        }
    };

    const handleIsValidNewOption = (inputValue) => {
        const key = inputValue.trim();
        if (key === '' ){
            return false
        }
        return true;
    }

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
                    MultiValueRemove,
                }}
                onKeyDown={onKeyDown}
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
                backspaceRemovesValue={false}
                ariaLiveMessages={{ guidance }}
                isValidNewOption={handleIsValidNewOption}
            />

            {fieldMessage && (
                <FieldMessage status={type} {...fieldMessageProps}>
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
     * Name of the HTML Input.
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
