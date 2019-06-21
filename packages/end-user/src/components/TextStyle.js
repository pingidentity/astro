import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @class TextStyle
 * @desc Apply custom effects and styling to text
 *
 * @param {node} [children]
 *      Buttons to display in the set
 * @param {string} [data-id]
 *      To define the base "data-id" value for the card
 * @param {boolean} [muted=false]
 *     Mute the text's color
 *
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
    muted: PropTypes.bool,
    'data-id': PropTypes.string,
};

export default TextStyle;
