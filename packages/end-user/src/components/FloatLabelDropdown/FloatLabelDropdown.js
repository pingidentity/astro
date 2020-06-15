import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Dropdown from '../Dropdown';

/**
 * @enum {string}
 * @alias Droppdown~dropdownStatuses
 * @desc Enum for the different types of text input styling
 */
export const dropdownStatuses = {
    INFO: 'info',
    ERROR: 'error',
    SUCCESS: 'success',
};

/**
 * Dropdown with a FloatLabel
 */
const FloatLabelDropdown = ({
    label,
    id,
    inputClassName,
    children,
    ...props
}) => {
    const inputClassNames = classnames('float-label__input', inputClassName);

    return (
        <Dropdown
            className="float-label"
            selectClassName={inputClassNames}
            placeholder={label}
            id={id}
            {...props}
        >
            <label className="float-label__label" htmlFor={id}>
                {label}
            </label>
            {children}
        </Dropdown>
    );
};

FloatLabelDropdown.propTypes = {
    /**
     * Sets field message
     */
    fieldMessage: PropTypes.node,
    /**
     * Determines the styling of the input
     */
    status: PropTypes.oneOf(Object.values(dropdownStatuses)),
    /**
     * The label for the Dropdown
     */
    label: PropTypes.string,
    /**
     * The ID for the Dropdown
     */
    id: PropTypes.string,
    /**
     * The CSS class to apply to the Dropdown
     */
    inputClassName: PropTypes.string,
    /**
     * Props to spread to the Dropdown
     */
    props: PropTypes.shape({}),
};

FloatLabelDropdown.defaultProps = {
    id: 'dropdown',
};

export default FloatLabelDropdown;
