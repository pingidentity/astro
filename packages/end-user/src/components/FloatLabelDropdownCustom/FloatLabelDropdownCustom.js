import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DropdownCustom from '../DropdownCustom';

const FloatLabelDropdownCustom = ({
    label, id = 'dropdownCustom', inputClassName, children, ...props
}) => {
    const inputClassNames = classnames('float-label__input', inputClassName);

    return (
        <DropdownCustom
            className="float-label"
            inputClassName={inputClassNames}
            placeholder={label}
            id={id}
            {...props}
        >
            <label className="float-label__label" htmlFor={id}>
                {label}
            </label>
            {children}
        </DropdownCustom>
    );
};

FloatLabelDropdownCustom.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    inputClassName: PropTypes.string,
};

export default FloatLabelDropdownCustom;
