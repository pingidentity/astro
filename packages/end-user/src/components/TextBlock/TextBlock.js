
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Types of overflow
 * @alias overflowTypes
 */
const overflowTypes = {
    WRAP: 'wrap',
    ELLIPSIS: 'ellipsis',
};

/**
 * Types of alignments
 * @alias alignments
 */
const alignments = {
    LEFT: 'left',
    RIGHT: 'right',
};

/**
 * Sizes for the TextBlock
 * @alias sizes
 */
const sizes = {
    SM: 'small',
    LG: 'large',
    SMALLRIGHT: 'small-right',
};

/**
 * Margins for the TextBlock
 * @alias margins
 */
const margins = {
    SM: 'small',
    XXL: 'xxlarge',
};

/**
 * Display a block of text
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
    /**
     * Aligns the TextBlock contents
     * @param {alignments}
     */
    alignment: PropTypes.oneOf(Object.values(alignments)),
    /**
     * Classname to apply to the top-level container
     */
    className: PropTypes.string,
    /**
     * Sets a data-id property on the TextBlock element to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Overflow behavior for the TextBlock
     * @param {overflowTypes}
     */
    overflow: PropTypes.oneOf(Object.values(overflowTypes)),
    /**
     * Set the size of the TextBlock
     * @param {sizes}
     */
    size: PropTypes.oneOf(Object.values(sizes)),
    /**
     * Set the spacing of the TextBlock
     * @param {margins}
     */
    spacing: PropTypes.oneOf(Object.values(margins)),
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

