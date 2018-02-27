import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const FloatLabel = ({
    label, id, InputType, inputClassName, children,
}) => {
    const inputClassNames = classnames("float-label__input", inputClassName);

    return (
        <div className="float-label">
            <InputType className={inputClassNames} placeholder={label} id={id} />
            <label className="float-label__label" htmlFor={id}>
                {label}
            </label>
            {children}
        </div>
    );
}

FloatLabel.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    InputType: PropTypes.func,
    inputClassName: PropTypes.string,
};

export default FloatLabel;
