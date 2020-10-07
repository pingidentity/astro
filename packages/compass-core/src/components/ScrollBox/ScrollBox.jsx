import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import { cssPropType } from '../../utils/PropUtils';

/**
* ScrollBox adds a shadow to the top or bottom of the container
* when there's content to scroll to that way.
*/

const ScrollBox = ({
    children,
    className,
    css: cssProp,
    contentClassName,
    contentCss,
    'data-id': dataId,
    hasFixedHeight,
    height,
    renderDynamic,
    tabIndex,
    ...props
}) => {
    const [cut, setCut] = useState([false, false]);

    const innerRef = useRef(null);
    const outerRef = useRef(null);

    const handleScroll = useCallback(() => {
        const inner = innerRef.current;
        const outer = outerRef.current;
        const innerHeight = inner ? inner.scrollHeight : 0;
        const outerHeight = outer ? outer.clientHeight : 0;
        const scrollTop = inner ? inner.scrollTop : 0;

        const cutTop = (scrollTop > 0);
        const cutBottom = (innerHeight > outerHeight + scrollTop);

        if (cutTop !== cut[0] || cutBottom !== cut[1]) {
            setCut([cutTop, cutBottom]);
        }
    });

    useEffect(handleScroll);

    return (
        <div
            className={className}
            css={cssProp}
            data-id={dataId}
            ref={outerRef}
        >
            <div
                className={contentClassName}
                css={contentCss}
                onScroll={handleScroll}
                ref={innerRef}
                style={height !== undefined ? { [hasFixedHeight ? 'height' : 'maxHeight']: height } : {}}
                tabIndex={tabIndex}
                {...props}
            >
                {children}
            </div>
            {renderDynamic({ cutTop: cut[0], cutBottom: cut[1] })}
        </div>
    );
};

ScrollBox.propTypes = {
    /** To define the base "data-id" value for the top-level HTML container. */
    'data-id': PropTypes.string,
    /** CSS classes to be set on the top-level HTML container. */
    className: PropTypes.string,
    /** CSS prop can be used for CSS-in-JS components. */
    css: cssPropType,
    /** CSS classes to be set on the content container. */
    contentClassName: PropTypes.string,
    /** Use CSS-in-JS to style the content */
    contentCss: cssPropType,
    /** When true, the height prop will set the height rather than just the maximum height. */
    hasFixedHeight: PropTypes.bool,
    /** Sets the maximum height for the container. */
    height: PropTypes.number,
    /** Function to render the dynamic parts of the component like the scroll indicators.
     * @param {boolean} [props.cutTop]
     *        Whether the top of the content is cut off.
     * @param {boolean} [props.cutBottom]
     *        Whether the bottom of the content is cut off.
     */
    renderDynamic: PropTypes.func,
    /** Passes tabIndex to the inner div */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

ScrollBox.defaultProps = {
    hasFixedHeight: false,
    renderDynamic: noop,
    tabIndex: 0,
};


export default ScrollBox;
