import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ src }) => (
    <div className="org-logo">
        <img className="org-logo__image" src={src} alt="Company Logo" />
    </div>
);

Logo.propTypes = {
    src: PropTypes.string.isRequired,
};

export default Logo;
