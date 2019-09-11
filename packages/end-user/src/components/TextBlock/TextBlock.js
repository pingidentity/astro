import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @class TextBlock
 * @desc Display a block of text
 *
 * @param {node} [children]
 *      Buttons to display in the set
 * @param {string} [data-id]
 *      Sets a data-id property on the TextBlock element to be used as a test hook
 * @param {string} [size]
 *      Set the size of the TextBlock (small|small-right|large)
 * @param {string} [className]
 *      Classname to apply to the TextBlock
 * @param {string} [spacing]
 *      Set the spacing of the TextBlock (xxlarge)
 *
 */
const TextBlock = ({
    children,
    size,
    spacing,
    className,
    'data-id': dataId,
}) => {
    const classNames = classnames('text-block', className, {
        'text-block--small': size === 'small',
        'text-block--large': size === 'large',
        'text-block--small-right': size === 'small-right',
        'text-block--margin-xx': spacing === 'xxlarge',
    });

    const Outer = typeof Children === 'string' ? 'p' : 'div';
    const Inner = typeof Children === 'string' ? 'span' : 'div';

    return (
        <Outer className={classNames} data-id={dataId}>
            <Inner className="text-block__text">{children}</Inner>
        </Outer>
    );
};

TextBlock.propTypes = {
    size: PropTypes.oneOf(['small', 'large', 'small-right']),
    spacing: PropTypes.oneOf(['xxlarge']),
    className: PropTypes.string,
    'data-id': PropTypes.string,
};

TextBlock.defaultProps = {
    'data-id': 'textblock',
};

export default TextBlock;
