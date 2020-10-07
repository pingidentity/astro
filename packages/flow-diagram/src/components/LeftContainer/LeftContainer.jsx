import React from 'react';
import { Box } from '@pingux/compass/index.esm';
import { leftContainer } from './LeftContainer.styles';


export default function LeftContainer({
    children,
}) {
    return (
        <Box width="20%" css={leftContainer}>
            {children}
        </Box>
    );
}
