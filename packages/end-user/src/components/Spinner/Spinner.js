import PropTypes from 'prop-types';
import React from 'react';

/**
 * Spinner icon
 */
const Spinner = ({
    'data-id': dataId
}) => (
    <div className="spinner">
        <div className="spinner__icon" data-id={dataId}></div>
    </div>
);

Spinner.propTypes = {
    /**
     * Sets a data-id property on the Spinner element to be used as a test hook
     */
    'data-id': PropTypes.string,
};

Spinner.defaultProps = {
    'data-id': 'spinner',
};

export default Spinner;
