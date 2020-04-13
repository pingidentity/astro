import PropTypes from 'prop-types';
import React from 'react';

/**
 * Display mutiple buttons
 */
const ButtonSet = ({
    children,
    'data-id': dataId
}) => <div className="button-set" data-id={dataId}>{children}</div>;

ButtonSet.propTypes = {
    /**
     * Sets a data-id property on the ButtonSet to be used as a test hook
     */
    'data-id': PropTypes.string,
};

export default ButtonSet;
