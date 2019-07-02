import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @class Card
 * @desc Contains UI elements
 *
 * @param {string} [className]
 *      Classname to apply to the card
 * @param {string} [width]
 *      Width of the card element
 * @param {node} [children]
 *      Width of the card element
 * @param {string} [data-id]
 *      Sets a data-id property on the card element to be used as a test hook
 *
 */
const Card = ({ children, width, className, 'data-id': dataId }) => {
    const classNames = classnames('card', className, {
        'card--wide': width === 'large',
    });

    return (
        <div className={classNames} data-id={dataId}>{children}</div>
    );
};

Card.propTypes = {
    className: PropTypes.string,
    width: PropTypes.oneOf(['large']),
    'data-id': PropTypes.string,
};

export default Card;
