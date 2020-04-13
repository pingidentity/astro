import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Column alignments
 * @alias Columns.alignments
 */
export const alignments = {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
};

/**
 * Column widths
 * @alias Columns.widths
 */
export const widths = {
    ONE: 'one',
    TWO: 'two',
    THREE: 'three',
    FOUR: 'four',
    FIVE: 'five',
    SIX: 'six',
    SEVEN: 'seven',
    EIGHT: 'eight',
    NINE: 'nine',
    TEN: 'ten',
    ELEVEN: 'eleven',
    TWELVE: 'twelve',
};

const Columns = ({
    children,
}) => {
    return (
        <div className="columns">
            {children}
        </div>
    );
};

/**
 * A singular column
 */
export const Column = ({
    className,
    'data-id': dataId,
    children,
    width,
    alignment,
}) => {
    const classNames = classnames(className, `column__${width}`, {
        'column--left': alignment === alignments.LEFT,
        'column--center': alignment === alignments.CENTER,
        'column--right': alignment === alignments.RIGHT,
    });

    return (
        <div className={classNames} data-id={dataId}>
            {children}
        </div>
    );
};

Column.propTypes = {
    /**
     * Alignment of the Column
     * @param {Columns.alignments}
     */
    alignments: PropTypes.oneOf(Object.values(alignments)),
    /**
     * CSS class to be applied to the Column
     */
    className: PropTypes.string,
    /**
     * Sets a data-id property on the Column to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Width of the Column
     * @param {Columns.widths}
     */
    width: PropTypes.oneOf(Object.values(widths)),
};

Column.defaultProps = {
    width: widths.ONE,
    alignment: alignments.LEFT,
};

export default Columns;