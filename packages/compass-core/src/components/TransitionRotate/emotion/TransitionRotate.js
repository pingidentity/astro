import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

/** A transition effect to fade in and out content */
const TransitionRotate = ({
    interval,
    isRotated,
    ...props
}) => (
    <div
        css={css`
            display: inline-block;
            transition: transform ${interval}ms ease-in-out;
            transform: rotate(${isRotated ? '-180deg' : '0deg'});

            > * {
                display: block;
            }
        `}
        {...props}
    />
);

TransitionRotate.propTypes = {
    /** The length of delay for the content to unmount */
    interval: PropTypes.number,
    /** Whether to rotate the content */
    isRotated: PropTypes.bool,
};

TransitionRotate.defaultProps = {
    isRotated: false,
};

export default TransitionRotate;
