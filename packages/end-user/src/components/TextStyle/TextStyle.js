import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Apply custom effects and styling to text
 */
const TextStyle = ({ muted, children, 'data-id': dataId }) => {
    const classes = classnames({
        'muted-text': muted,
    });

    return (
        <span className={classes} data-id={dataId}>{children}</span>
    );
};

TextStyle.propTypes = {
    /**
     * Sets a data-id property on the TextStyle element to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Mutes the text if enabled
     */
    muted: PropTypes.bool,
};

export default TextStyle;
