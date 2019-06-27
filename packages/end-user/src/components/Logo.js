import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class Logo
 * @desc Display a menu with a list of selections
 *
 * @param {string} [src]
 *      Logo image src
 *
 */
const Logo = ({ src, 'data-id': dataId }) => (
    <div className="org-logo" data-id={dataId}>
        <img className="org-logo__image" src={src} alt="Company Logo" />
    </div>
);

Logo.propTypes = {
    src: PropTypes.string.isRequired,
    'data-id': PropTypes.string,
};

export default Logo;
