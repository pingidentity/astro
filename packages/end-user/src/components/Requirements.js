import React from 'react';
import PropTypes from 'prop-types';
import noIcon from '../icons/incomplete.svg';
import yesIcon from '../icons/success.svg';
import errorIcon from '../icons/error.svg';

const Requirement = ({ status, name }) => (
    <div className="requirement">
        {status === 'no' && <img className="requirement__icon" src={noIcon} alt="No" />}
        {status === 'yes' && <img className="requirement__icon" src={yesIcon} alt="Yes" />}
        {status === 'error' && <img className="requirement__icon" src={errorIcon} alt="Error" />}
        <span className="requirement__name">{name}</span>
    </div>
);

Requirement.propTypes = {
    status: PropTypes.string,
    name: PropTypes.string,
};

/**
 * @class Requirements
 * @desc Display a list of requirements
 *
 * @param {node} [children]
 *      Elements to appear after the requirements
 * @param {string} [data-id]
 *      Sets a data-id property on the Requirements element to be used as a test hook
 * @param {array} [requirements]
 *      List of requirements [{status, name}]
 *
 */
const Requirements = ({ requirements, children, 'data-id': dataId }) => (
    <div className="requirements" data-id={dataId}>
        {requirements.map(requirement => <Requirement key={requirement.name} {...requirement} />)}
        {children}
    </div>
);

Requirements.propTypes = {
    requirements: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        status: PropTypes.string,
    })),
    'data-id': PropTypes.string,
};

Requirements.defaultProps = {
    'data-id': 'requirements',
    requirements: [],
};

export default Requirements;
