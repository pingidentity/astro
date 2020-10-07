import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

/** A transition effect that uses fading and scaling to make content look like it's popping in */
const TransitionGrow = ({
    children,
    interval,
    isShowing,
    ...props
}) => {
    const scale = isShowing ? 1 : 0.75;

    return (
        <div
            css={css`
                display: block;
                transition: opacity ${interval}ms, transform ${interval}ms;
                transform: scale(${scale}, ${scale});
                opacity: ${isShowing ? 1 : 0};
            `}
            {...props}
        >
            {children}
        </div>
    );
};

TransitionGrow.propTypes = {
    /** The length of delay for the content to unmount */
    interval: PropTypes.number,
    /** Whether to show the content */
    isShowing: PropTypes.bool,
};

TransitionGrow.defaultProps = {
    isShowing: false,
};

export default TransitionGrow;
