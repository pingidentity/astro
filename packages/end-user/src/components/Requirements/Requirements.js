import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Requirement = ({ status, name }) => {
    const requirementClassNames = classnames('requirement__icon', {
        'icon-incomplete': status === 'no',
        'icon-success-round': status === 'yes',
        'requirement__icon--success': status === 'yes',
        'icon-error-triangle': status === 'error',
        'requirement__icon--error': status === 'error',
    });

    return (
        <div className="requirement">
            <span className={requirementClassNames}></span>
            <span className="requirement__name">{name}</span>
        </div>
    );
};

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
