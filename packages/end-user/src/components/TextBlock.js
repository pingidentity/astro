import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextBlock = ({ children, size }) => {
    const classNames = classnames('text-block', {
        'text-block--small': size === 'small',
        'text-block--large': size === 'large',
    });
    return (
        <p className={classNames}>
            <span className="text-block__text">{children}</span>
        </p>
    );
};

TextBlock.propTypes = {
    size: PropTypes.string,
};

export default TextBlock;
