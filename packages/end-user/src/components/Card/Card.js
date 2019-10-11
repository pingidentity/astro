import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const CardTypes = {
    SLIM: 'slim',
    ERROR: 'error'
};


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
    error,
    header,
    type,
    'data-id': dataId,
}) => {
    const classNames = classnames('card', 'card--no-padding', className, {
        'card--wide': width === 'large',
        'card--slim': type === CardTypes.SLIM,
        'card--error': error === true,
    });

    return (
        <div className={classNames} data-id={dataId}>
              { header ?<div className="card__header">
                    {header}
                </div> : null}
            <div className="card__content">
                {children}
            </div>
        </div>
    );
};

Card.CardTypes = CardTypes;

Card.propTypes = {
    className: PropTypes.string,
    width: PropTypes.oneOf(['large']),
    error: PropTypes.bool,
    type: PropTypes.oneOf(Object.values(CardTypes)),
    header: PropTypes.node,
    'data-id': PropTypes.string,
};

export default Card;
