import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextBlock = ({ children, size, spacing }) => {
    const classNames = classnames('text-block', {
        'text-block--small': size === 'small',
        'text-block--large': size === 'large',
        'text-block--small-right': size === 'small-right',
        'text-block--margin-xx': spacing === 'xxlarge',
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
    size: PropTypes.oneOf(['small', 'large', 'small-right']),
    spacing: PropTypes.oneOf(['xxlarge']),
};

export default TextBlock;
