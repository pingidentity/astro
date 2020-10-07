import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ScrollBoxCore from '../ScrollBox';

const renderDynamic = ({ cutTop, cutBottom }) => [
    <div
        key="top-shadow"
        className={classnames(
            'scroll-box__top-shadow',
            { 'scroll-box__top-shadow--show': cutTop },
        )}
    />,
    <div
        key="bottom-shadow"
        className={classnames(
            'scroll-box__bottom-shadow',
            { 'scroll-box__bottom-shadow--show': cutBottom },
        )}
    />,
];

/**
* ScrollBox adds a shadow to the top or bottom of the container
* when there's content to scroll to that way.
*/

const ScrollBox = ({
    children,
    className,
    'data-id': dataId,
    height,
    ...props
}) => (
    <ScrollBoxCore
        className={classnames('scroll-box', className)}
        contentClassName="scroll-box__content"
        data-id={dataId}
        height={height}
        renderDynamic={renderDynamic}
        {...props}
    >
        {children}
    </ScrollBoxCore>
);

ScrollBox.propTypes = {
    /** To define the base "data-id" value for the top-level HTML container. */
    'data-id': PropTypes.string,
    /** CSS classes to be set on the top-level HTML container. */
    className: PropTypes.string,
    /** Sets the maximum height for the container. */
    height: PropTypes.number,
    /** When true, the height prop will set the height rather than just the maximum height. */
    hasFixedHeight: PropTypes.bool,
};

export default ScrollBox;
