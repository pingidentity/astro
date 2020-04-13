import React from 'react';
import PropTypes from 'prop-types';

/**
 * Container with padding
 */
const Container = ({
    'data-id': dataId,
    children,
    maxWidth,
}) => {
    return (
        <div className="container" data-id={dataId}>
            <div className="container--inner" style={{ maxWidth, margin: '0 auto' }}>
                {children}
            </div>
        </div>
    );
};

Container.propTypes = {
    /**
     * Sets a data-id property on the Container to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Maximum width for the Container
     */
    maxWidth: PropTypes.string,
};

Container.defaultProps = {
    maxWidth: '960px',
};

export default Container;
