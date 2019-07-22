import PropTypes from 'prop-types';
import React from 'react';

/**
 * @class ButtonSet
 * @desc Display mutiple buttons
 *
 * @param {node} [children]
 *      Buttons to display in the set
 * @param {string} [data-id]
 *      To define the base "data-id" value for the card
 *
 */
const ButtonSet = ({ children, 'data-id': dataId }) => <div className="button-set" data-id={dataId}>{children}</div>;

ButtonSet.propTypes = {
    'data-id': PropTypes.string,
};

export default ButtonSet;
