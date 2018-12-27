import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TwoSided = ({ children: [front, back], flipped }) => (
    <div
        className={classnames('two-sided', {
            'two-sided--flipped': flipped,
        })}
    >
        <div className="two-sided__front">{front}</div>
        <div className="two-sided__back">{back}</div>
    </div>
);

TwoSided.propTypes = {
    flipped: PropTypes.bool,
};

TwoSided.defaultProps = {
    flipped: false,
};

export default TwoSided;
