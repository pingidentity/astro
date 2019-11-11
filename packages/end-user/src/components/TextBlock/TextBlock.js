
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const overflowTypes = {
    WRAP: 'wrap',
    ELLIPSIS: 'ellipsis',
};

const alignments = {
    LEFT: 'left',
    RIGHT: 'right',
};

const sizes = {
    SM: 'small',
    LG: 'large',
    SMALLRIGHT: 'small-right',
};

const margins = {
    SM: 'small',
    XXL: 'xxlarge',
};

/**
 * @class TextBlock
 * @desc Display a block of text
 *
* @param {string} [alignments]
 *      Aligns the textblock contents (left|right)
 * @param {node} [children]
 *      Buttons to display in the set
 * @param {string} [className]
 *      Classname to apply to the TextBlock
 * @param {string} [data-id]
 *      Sets a data-id property on the TextBlock element to be used as a test hook
 * @param {string} [size]
 *      Set the size of the TextBlock (small|small-right|large)
 * @param {string} [spacing]
 *      Set the spacing of the TextBlock (small|xxlarge)
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
    const classNamesOuter = classnames('text-block', className, {
        'text-block--small': size === sizes.SM,
        'text-block--large': size === sizes.LG,
        'text-block--small-right': size === sizes.SMALLRIGHT,
        'text-block--margin-sm': spacing === margins.SM,
        'text-block--margin-xx': spacing === margins.XXL,
        'text-block--right': alignment === alignments.RIGHT,
        'text-block--left': alignment === alignments.LEFT,
    });

    const Outer = typeof Children === 'string' ? 'p' : 'div';
    const Inner = typeof Children === 'string' ? 'span' : 'div';

    return (
        <Outer className={classNamesOuter} data-id={dataId}>
            <Inner className={`text-block--overflow-${overflow}`}>{children}</Inner>
        </Outer>
    );
};

TextBlock.propTypes = {
    size: PropTypes.oneOf(Object.values(sizes)),
    spacing: PropTypes.oneOf(Object.values(margins)),
    className: PropTypes.string,
    'data-id': PropTypes.string,
    alignment: PropTypes.oneOf(Object.values(alignments)),
    overflow: PropTypes.oneOf(Object.values(overflowTypes)),
};

TextBlock.defaultProps = {
    'data-id': 'textblock',
    overflow: overflowTypes.WRAP,
};

TextBlock.overflowTypes = overflowTypes;
TextBlock.alignments = alignments;
TextBlock.sizes = sizes;
TextBlock.margins = margins;
export default TextBlock;

