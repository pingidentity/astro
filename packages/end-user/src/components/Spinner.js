import PropTypes from 'prop-types';

import React from 'react';
import spinnerIcon from '../icons/spinner.svg';

/**
 * @class Spinner
 * @desc Spinner icon
 *
 * @param {string} [data-id]
 *      To define the base "data-id" value for the card
 *
 */
const Spinner = ({ 'data-id': dataId }) => <img className="spinner" src={spinnerIcon} alt="Loading spinner" data-id={dataId} />;

Spinner.propTypes = {
    'data-id': PropTypes.string,
};

Spinner.defaultProps = {
    'data-id': 'spinner',
};

export default Spinner;
