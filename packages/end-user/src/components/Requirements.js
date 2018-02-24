import React from 'react';
import PropTypes from 'prop-types';
import noIcon from '../icons/error.svg';
import yesIcon from '../icons/success.svg';

const Requirement = ({ status, name }) => (
    <div className="requirement">
        {status === 'no' && <img className="requirement__icon" src={noIcon} alt="No" />}
        {status === 'yes' && <img className="requirement__icon" src={yesIcon} alt="Yes" />}
        <span className="requirement__name">{name}</span>
    </div>
);

Requirement.propTypes = {
    status: PropTypes.string,
    name: PropTypes.string,
};

const Requirements = ({ requirements, children }) => (
    <div className="requirements">
        {requirements.map(requirement => <Requirement key={requirement.name} {...requirement} />)}
        {children}
    </div>
);

Requirements.propTypes = {
    requirements: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        status: PropTypes.string,
    })),
};

export default Requirements;
