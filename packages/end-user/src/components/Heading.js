import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class Heading
 * @desc Heading text
 *
 * @param {node} [children]
 *      Buttons to display in the set
 * @param {string} [data-id]
 *      Sets a data-id property on the Heading element to be used as a test hook
 * @param {number} [level]
 *      Size of the Heading text
 *
 */
const Heading = ({ children, level, 'data-id': dataId }) => {
    if (level === 4) {
        return <h4 className="heading heading--4" data-id={dataId}>{children}</h4>;
    }
    return <h1 className="heading" data-id={dataId}>{children}</h1>;
};

Heading.propTypes = {
    level: PropTypes.number,
    'data-id': PropTypes.string,
};

Heading.defaultProps = {
    'data-id': 'heading',
};

export default Heading;
