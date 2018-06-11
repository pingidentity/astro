import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextStyle = ({ muted, children }) => {
    const classes = classnames({
        'muted-text': muted,
    });

    return (
        <span className={classes}>{children}</span>
    );
};

TextStyle.propTypes = {
    muted: PropTypes.bool,
};

export default TextStyle;
