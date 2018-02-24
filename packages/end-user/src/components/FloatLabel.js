import React from 'react';
import PropTypes from 'prop-types';

const FloatLabel = ({
    label, id, InputType, children,
}) => (
    <div className="float-label">
        <InputType className="float-label__input" placeholder={label} id={id} />
        <label className="float-label__label" htmlFor={id}>
            {label}
        </label>
        {children}
    </div>
);

FloatLabel.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    InputType: PropTypes.node,
};

export default FloatLabel;
