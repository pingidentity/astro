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
 * @param {string} [type]
 *      Type of card that is to be used.
 * @param {node} [children]
 *      Children of the card component
 * @param {string} [data-id]
 *      Sets a data-id property on the card element to be used as a test hook
 *
 */
const Card = ({
    children,
    width,
    className,
    header,
    type,
    'data-id': dataId,
}) => {
    const classNames = classnames('card', 'card--no-padding', className, {
        'card--wide': width === 'large',
        'card--error': type === 'error',
    });

    return (
        <div className={classNames} data-id={dataId}>
            {type ? <div className="card__error" /> : null }
            <div className="card__header">
                {header}
            </div>
            <div className="card__content">
                {children}
            </div>
        </div>
    );
};

Card.propTypes = {
    className: PropTypes.string,
    width: PropTypes.oneOf(['large']),
    type: PropTypes.oneOf(['error']),
    header: PropTypes.node,
    'data-id': PropTypes.string,
};

export default Card;
