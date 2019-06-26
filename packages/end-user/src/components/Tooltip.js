import PropTypes from 'prop-types';

import React from 'react';

/**
 * @class Tooltip
 * @desc Show additional information regarding a topic
 *
 * @param {node} [children]
 *      Buttons to display in the set
 * @param {string} [data-id]
 *      Sets a data-id property on the tooltip element to be used as a test hook
 *
 */
const Tooltip = ({ children, 'data-id': dataId }) => <div className="tooltip" data-id={dataId}>{children}</div>;

Tooltip.propTypes = {
    'data-id': PropTypes.string,
};

Tooltip.defaultProps = {
    'data-id': 'tooltip',
};

export default Tooltip;
