import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

/** A transition effect to fade in and out content */
const TransitionFadeCollapse = ({
    children,
    interval,
    isShowing,
}) => {
    const innerRef = useRef(null);
    const [innerHeight, setInnerHeight] = useState(20000);

    useLayoutEffect(() => {
        setInnerHeight(innerRef.current.clientHeight);
    }, [children]);

    return (
        <div
            css={css`
                transition: opacity ${interval}ms, max-height ${interval}ms;
                opacity: ${isShowing ? 1 : 0};
                max-height: ${isShowing ? innerHeight : 0}px;
            `}
        >
            <div ref={innerRef}>
                {children}
            </div>
        </div>
    );
};

TransitionFadeCollapse.propTypes = {
    /** The length of delay for the content to unmount */
    interval: PropTypes.number,
    /** Whether to show the content */
    isShowing: PropTypes.bool,
};

TransitionFadeCollapse.defaultProps = {
    isShowing: false,
};

export default TransitionFadeCollapse;
