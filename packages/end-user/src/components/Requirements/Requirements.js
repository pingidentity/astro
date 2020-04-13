import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Requirement = ({ status, name }) => {
    const requirementClassNames = classnames('requirement__icon', {
        'pingicon-incomplete': status === 'no',
        'pingicon-success-round': status === 'yes',
        'requirement__icon--success': status === 'yes',
        'pingicon-error-triangle': status === 'error',
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
 * Display a list of requirements
 */
const Requirements = ({ requirements, children, 'data-id': dataId }) => (
    <div className="requirements" data-id={dataId}>
        {requirements.map(requirement => <Requirement key={requirement.name} {...requirement} />)}
        {children}
    </div>
);

Requirements.propTypes = {
    /**
     * Sets a data-id property on the Requirements element to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * List of requirements [{status, name}]
     */
    requirements: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        status: PropTypes.string,
    })),
};

Requirements.defaultProps = {
    'data-id': 'requirements',
    requirements: [],
};

export default Requirements;
