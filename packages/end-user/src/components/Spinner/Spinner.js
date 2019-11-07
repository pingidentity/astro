import PropTypes from 'prop-types';
import React from 'react';

/**
 * @class Spinner
 * @desc Spinner icon
 *
 * @param {string} [data-id]
 *      To define the base "data-id" value for the card
 *
 */
const Spinner = ({ 'data-id': dataId }) => (
    <div className="spinner">
        <div className="spinner__icon" data-id={dataId}></div>
    </div>
);

Spinner.propTypes = {
    'data-id': PropTypes.string,
};

Spinner.defaultProps = {
    'data-id': 'spinner',
};

export default Spinner;
