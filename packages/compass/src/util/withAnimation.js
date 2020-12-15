import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';
import { Box } from 'reflexbox';

/* eslint-disable react/prop-types */
const withAnimation = WrappedComponent => ({
    width,
    show = false,
    isShowing = show,
    ...props
}) => {
    const offsetMargin = `-${width}`;

    const [margin, setMargin] = useState(offsetMargin);

    useEffect(() => {
        if (isShowing) {
            setMargin(0);
        } else {
            setMargin(offsetMargin);
        }
    }, [isShowing]);

    return (
        <Box width={width} mr={margin} css={css`transition: margin 0.25s;`}>
            {isShowing && <WrappedComponent {...props} />}
        </Box>
    );
};

export default withAnimation;
