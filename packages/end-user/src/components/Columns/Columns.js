import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const alignments = {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
};

const widths = {
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

const Column = ({
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
    'data-id': PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.oneOf(Object.values(widths)),
    alignments: PropTypes.oneOf(Object.values(alignments)),
};

Column.defaultProps = {
    width: widths.ONE,
    alignment: alignments.LEFT,
};

Columns.Column = Column;
Columns.alignments = alignments;
Columns.widths = widths;

export default Columns;