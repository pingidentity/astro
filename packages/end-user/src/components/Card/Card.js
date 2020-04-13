import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Types of different Cards
 * @enum {string}
 */
const CardTypes = {
    SLIM: 'slim',
};

/**
 * Contains UI elements.
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
              { header ? <div className="card__header">
                    {header}
                </div> : null}
            <div className="card__content">
                {children}
            </div>
        </div>
    );
};

Card.propTypes = {
    /**
     * Classname to apply to the card
     */
    className: PropTypes.string,
    /**
     * Sets a data-id property on the Card to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Width of the card element
     */
    width: PropTypes.oneOf(['large']),
    /**
     * Show the error state
     */
    error: PropTypes.bool,
    /**
     * Type of card that is to be used
     * @param {CardTypes}
     */
    type: PropTypes.oneOf(Object.values(CardTypes)),
    /**
     * Card header
     */
    header: PropTypes.node,
};

Card.CardTypes = CardTypes;

export default Card;
