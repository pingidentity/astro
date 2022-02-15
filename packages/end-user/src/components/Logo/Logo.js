import React from 'react';
import PropTypes from 'prop-types';

/**
 * Display a logo
 */
const Logo = ({
    altText,
    src,
    'data-id': dataId,
}) => (
    <div className="org-logo" data-id={dataId}>
        <img className="org-logo__image" src={src} alt={altText} />
    </div>
);

Logo.propTypes = {
    altText: PropTypes.string,
    /**
     * Sets a data-id property on the Logo to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * The Logo image's src
     */
    src: PropTypes.string.isRequired,
};

Logo.defaultProps = {
    altText: 'Company Logo',
};

export default Logo;
