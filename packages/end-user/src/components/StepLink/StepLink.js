import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Link to advance forwards or backwards
 */
const StepLink = ({
    type = 'forward',
    children,
    ...props
}) => (
    <div className={classnames('step-link', `step-link--${type}`)}>
        <a className="step-link__link" {...props}>{children}</a>
    </div>
);

StepLink.propTypes = {
    /**
     * Where to show the arrow
     */
    type: PropTypes.oneOf(['forward', 'back']),
};

export default StepLink;
