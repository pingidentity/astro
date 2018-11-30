import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Card = ({ children, width }) => {
    const classNames = classnames('card', {
        'card--wide': width === 'large',
    });

    return (
        <div className={classNames}>{children}</div>
    );
};

Card.propTypes = {
    width: PropTypes.oneOf(['large']),
};

export default Card;
