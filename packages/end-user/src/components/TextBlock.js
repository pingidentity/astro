import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextBlock = ({ children, size }) => {
    const classNames = classnames('text-block', {
        'text-block--small': size === 'small',
        'text-block--large': size === 'large',
    });

    const Outer = typeof Children === 'string' ? 'p' : 'div';
    const Inner = typeof Children === 'string' ? 'span' : 'div';

    return (
        <Outer className={classNames}>
            <Inner className="text-block__text">{children}</Inner>
        </Outer>
    );
};

TextBlock.propTypes = {
    size: PropTypes.oneOf(['small', 'large']),
};

export default TextBlock;
