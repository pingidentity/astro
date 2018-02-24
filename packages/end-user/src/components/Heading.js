import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ children, level }) => {
    if (level === 4) {
        return <h4 className="heading heading--4">{children}</h4>;
    }
    return <h1 className="heading">{children}</h1>;
};

Heading.propTypes = {
    level: PropTypes.number,
};

export default Heading;
