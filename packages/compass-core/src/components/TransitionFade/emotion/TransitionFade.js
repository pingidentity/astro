import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

/** A transition effect to fade in and out content */
const TransitionFade = ({
    children,
    interval,
    isShowing,
}) => (
    <div
        css={css`
            transition: opacity ${interval}ms;
            opacity: ${isShowing ? 1 : 0};
        `}
    >
        {children}
    </div>
);

TransitionFade.propTypes = {
    /** The length of delay for the content to unmount */
    interval: PropTypes.number,
    /** Whether to show the content */
    isShowing: PropTypes.bool,
};

TransitionFade.defaultProps = {
    isShowing: false,
};

export default TransitionFade;
