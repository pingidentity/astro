import React from 'react';
import PropTypes from 'prop-types';
import { noop } from "underscore";

/**
 * Toggles an option
 */
const Checkbox = ({
    'data-id': dataId,
    checked,
    id,
    label,
    onChange,
}) => {
    return (
        <label className="checkbox" htmlFor={id} data-id={dataId}>
            <input
                type="checkbox"
                className="checkbox__input"
                id={id}
                defaultChecked={checked}
                onChange={onChange}
            />
            <span className="checkbox__standin" />
            <span className="checkbox__label">{label}</span>
        </label>
    );
};

Checkbox.propTypes = {
    /**
     * Sets the checkbox's state
     */
    checked: PropTypes.bool,
    /**
     * Sets a data-id property on the Checkbox to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * ID to apply to the Checkbox element itself
     */
    id: PropTypes.string,
    /**
     * Label for the Checkbox
     */
    label: PropTypes.string,
    /**
     * Fired when the value of the checkbox changes
     */
    onChange: PropTypes.func,
};

Checkbox.defaultProps = {
    checked: false,
    onChange: noop,
};

export default Checkbox;