import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Dropdown from '../Dropdown';

/**
 * Dropdown with a FloatLabel
 */
const FloatLabelDropdown = ({
    error,
    errorMessage,
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
            error={error}
            errorMessage={errorMessage}
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
     * Sets error state for the FloatLabelDropdown if enabled
     */
    error: PropTypes.bool,
    /**
     * Sets error message active when error state is true
     */
    errorMessage: PropTypes.node,
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
    error: false,
    id: 'dropdown',
};

export default FloatLabelDropdown;
