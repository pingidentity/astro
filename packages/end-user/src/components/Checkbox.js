import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ label, id }) => (
    <label className="checkbox" htmlFor={id}>
        <input type="checkbox" className="checkbox__input" id={id} />
        <span className="checkbox__standin" />
        <span className="checkbox__label">{label}</span>
    </label>
);

Checkbox.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
};

export default Checkbox;
