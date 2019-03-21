import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Card = ({ children, width, className }) => {
    const classNames = classnames('card', className, {
        'card--wide': width === 'large',
    });

    return (
        <div className={classNames}>{children}</div>
    );
};

Card.propTypes = {
    className: PropTypes.string,
    width: PropTypes.oneOf(['large']),
};

export default Card;
