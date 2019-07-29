import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const messageTypes = {
    critical: {
        fill: '#EDDAD9', // $color-critical-red-light
        color: '#A31200', // $color-critical-red-dark
        icon: '../../icons/error.svg',
    },
};

/**
 * @class CardMessage
 * @desc Message for the Card component
 *
 * @param {string} [className]
 *      Classname to apply to the card
 * @param {node} [children]
 *      Width of the card element
 * @param {string} [data-id]
 *      Sets a data-id property on the card element to be used as a test hook
 *
 */
const CardMessage = ({
    children,
    className,
    type,
    'data-id': dataId,
}) => {
    const classNames = classnames('card__message', className);

    return (
        <div className={classNames} data-id={dataId} style={{ backgroundColor: type.fill }}>
            <div className="card__message--icon">
                <img
                    src={type.icon}
                    alt="Message icon"
                    style={{
                        fill: type.color,
                    }}
                />
            </div>
            <div className="card__message--content" style={{ color: type.color }}>
                {children}
            </div>
        </div>
    );
};

CardMessage.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(Object.values(messageTypes)),
    'data-id': PropTypes.string,
};

export default CardMessage;
