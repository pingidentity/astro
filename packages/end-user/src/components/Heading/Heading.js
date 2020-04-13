import React from 'react';
import PropTypes from 'prop-types';

/**
 * Heading text
 */
const Heading = ({ children, level, 'data-id': dataId }) => {
    if (level === 4) {
        return <h4 className="heading heading--4" data-id={dataId}>{children}</h4>;
    }
    return <h1 className="heading" data-id={dataId}>{children}</h1>;
};

Heading.propTypes = {
    /**
     * Sets a data-id property on the Heading element to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Size of the Heading text
     */
    level: PropTypes.oneOf([1 ,4]),
};

Heading.defaultProps = {
    'data-id': 'heading',
};

export default Heading;
