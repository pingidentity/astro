import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @class TwoSided
 * @desc Card with front and back
 *
 * @param {bool} [flipped]
 *      Sets if the back of the card is showing
 * @param {array} [childen]
 *      Front and back elements of the card [front, back]
 * @param {string} [data-id]
 *      Sets a data-id property on the tooltip element to be used as a test hook
 *
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
    flipped: PropTypes.bool,
    'data-id': PropTypes.string,
};

TwoSided.defaultProps = {
    flipped: false,
    'data-id': 'two-sided',
};

export default TwoSided;
