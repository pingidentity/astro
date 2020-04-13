import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Card with front and back
 */
const TwoSided = ({ children: [front, back], flipped, 'data-id': dataId }) => (
    <div
        className={classnames('two-sided', {
            'two-sided--flipped': flipped,
        })}
        data-id={dataId}
    >
        <div className="two-sided__front">{front}</div>
        <div className="two-sided__back">{back}</div>
    </div>
);

TwoSided.propTypes = {
    /**
     * Sets a data-id property on the TwoSided element to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Flips the card to the back of enabled
     */
    flipped: PropTypes.bool,
};

TwoSided.defaultProps = {
    'data-id': 'two-sided',
    flipped: false,
};

export default TwoSided;
