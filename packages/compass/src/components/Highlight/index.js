import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import themeGet from '@styled-system/theme-get';
import useCompassTheme from '../../styles/useCompassTheme';

const HighlightStyle = (theme, top, left, width, height) => css`
    position: fixed;
    z-index: 0;
    pointer-events: none;

    top: ${top}px;
    left: ${left}px;
    width: ${width}px;
    height: ${height}px;

    border: 2px solid ${themeGet('colors.active')({ theme })};
    border-radius: 3px;

    &:before {
        content: '';
        box-shadow: 0 1px 1px 70000px rgba(128, 137, 147, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
    }
`;

const Highlight = ({
    element,
}) => {
    const [dims, setDims] = useState({});

    const theme = useCompassTheme();

    useEffect(() => {
        setDims(element().getBoundingClientRect());
    }, [element]);

    if (!element) return null;

    return (
        <div
            css={HighlightStyle(theme, dims.top, dims.left, dims.width, dims.height)}
        />
    );
};

Highlight.propTypes = {
    /**
     * The target for the element desired to be highlighted.
     */
    element: PropTypes.node,
};

export default Highlight;
