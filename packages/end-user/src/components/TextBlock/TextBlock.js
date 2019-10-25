import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const overflowTypes = {
    WRAP: 'wrap',
    ELLIPSIS: 'ellipsis',
};

export const alignments = {
    LEFT: 'left',
    RIGHT: 'right',
};

/**
 * @class TextBlock
 * @desc Display a block of text
 *
* @param {string} [alignments]
 *      Aligns the textblock contents (left | right )
 * @param {node} [children]
 *      Buttons to display in the set
 * @param {string} [className]
 *      Classname to apply to the TextBlock
 * @param {string} [data-id]
 *      Sets a data-id property on the TextBlock element to be used as a test hook
 * @param {string} [size]
 *      Set the size of the TextBlock (small|small-right|large)
 * @param {string} [spacing]
 *      Set the spacing of the TextBlock (small| xxlarge)
 *
 */

const TextBlock = ({
    children,
    size,
    spacing,
    alignment,
    className,
    overflow,
    'data-id': dataId,
}) => {
    const classNamesOuter = classnames(
        'text-block',
        className,
        {
            'text-block--small': size === 'small',
            'text-block--large': size === 'large',
            'text-block--small-right': size === 'small-right',
            'text-block--margin-sm': spacing === 'small',
            'text-block--margin-xx': spacing === 'xxlarge',
            'text-block--right': alignment === alignments.RIGHT,
            'text-block--left': alignment === alignments.LEFT,
        }
    );

    const Outer = typeof Children === 'string' ? 'p' : 'div';
    const Inner = typeof Children === 'string' ? 'span' : 'div';

    return (
        <Outer className={classNamesOuter} data-id={dataId}>
            <Inner className={`text-block--overflow-${overflow}`}>{children}</Inner>
        </Outer>
    );
};

TextBlock.propTypes = {
    size: PropTypes.oneOf(['small', 'large', 'small-right']),
    spacing: PropTypes.oneOf(['small', 'xxlarge']),
    className: PropTypes.string,
    'data-id': PropTypes.string,
    alignment: PropTypes.oneOf(Object.values(alignments)),
    overflow: PropTypes.oneOf(Object.values(overflowTypes)),
};

TextBlock.defaultProps = {
    'data-id': 'textblock',
    overflow: overflowTypes.WRAP,
};

export default TextBlock;

