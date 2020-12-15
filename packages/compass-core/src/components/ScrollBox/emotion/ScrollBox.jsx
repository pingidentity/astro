import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { layout, space, flexbox } from 'styled-system';
import ScrollBoxCore from '../ScrollBox';

const shadowCSS = (scrollBoxShadow = 'rgba(0, 0, 0, 0.05)') => `
    position: absolute;
    left: 0;
    right: 0;
    height: 4px;
    background: ${scrollBoxShadow};
`;

const renderDynamic = ({ cutTop, cutBottom }) => [
    <div
        key="top-shadow"
        css={({ scrollBoxShadow, scrollBoxLine = 'rgba(0, 0, 0, 0.1)' }) => css`
            ${shadowCSS(scrollBoxShadow)}
            visibility: ${cutTop ? 'visible' : 'hidden'};
            border-top: 1px solid ${scrollBoxLine};
            top: 0;
        `}
    />,
    <div
        key="bottom-shadow"
        css={({ scrollBoxShadow, scrollBoxLine = 'rgba(0, 0, 0, 0.1)' }) => css`
            ${shadowCSS(scrollBoxShadow)}
            visibility: ${cutBottom ? 'visible' : 'hidden'};
            border-bottom: 1px solid ${scrollBoxLine};
            bottom: 0;
        `}
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
    hasFixedHeight,
    isStretched,
    ...props
}) => (
    <ScrollBoxCore
        className={className}
        css={theme => css`
            ${space({ ...props, theme })}
            ${layout({ ...props, theme })}
            ${flexbox({ flex: isStretched ? '1 1 100%' : undefined, ...props, theme })}
            padding: 0;
            display: flex;
            flex-direction: column;
            max-height: 100%;
            position: relative;
        `}
        contentCss={theme => css`
            ${space({ ...props, theme })}
            flex-grow: 1;
            margin: 0;
            min-height: 0;
            overflow-y: auto;
            max-height: 100%;
            ${isStretched ? `
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            ` : ''}
        `}
        data-id={dataId}
        hasFixedHeight={hasFixedHeight}
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
    /** In this mode, the ScrollBox will ignore the size of its contents.
     *  If placed in a flex container, it will stretch to take up the available space.
     *  This is the mode that should be used when the ScrollBox is serving as the main
     *  content area for the page.
     */
    isStretched: PropTypes.bool,
};

export default ScrollBox;
