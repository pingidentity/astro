import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Dropdown from './Dropdown';

const FloatLabelDropdown = ({
    label, id = 'dropdown', inputClassName, children, ...props
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
    label: PropTypes.string,
    id: PropTypes.string,
    inputClassName: PropTypes.string,
};

export default FloatLabelDropdown;
