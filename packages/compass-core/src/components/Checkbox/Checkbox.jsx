import React, { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

/**
 * A controlled checkbox. External state is required for proper functionality. All props not
 * explicitly listed below are spread to the input element.
 */
const Checkbox = forwardRef((props, ref) => {
    const {
        isChecked,
        isDisabled,
        onChange,
        ...others
    } = props;
    const inputRef = ref || useRef();
    const handleChange = e => onChange(inputRef.current.checked, e);

    return (
        <input
            type="checkbox"
            ref={inputRef}
            disabled={isDisabled}
            checked={isChecked}
            onChange={handleChange}
            {...others}
        />
    );
});

Checkbox.propTypes = {
    /** Whether or not the checkbox is currently checked */
    isChecked: PropTypes.bool,
    /** Whether or not the checkbox is currently disabled */
    isDisabled: PropTypes.bool,
    /**
     * Callback which provides information about change events on the DOM ref
     *
     * e.g. `(isRefChecked, event) => { ... }`
     */
    onChange: PropTypes.func,
};

Checkbox.defaultProps = {
    isChecked: false,
    isDisabled: false,
    onChange: noop,
};

export default Checkbox;
