import React from 'react';
import { Box } from '@pingux/compass';
import { leftContainer } from './LeftContainer.styles';


export default function LeftContainer({
    children,
    ...others
}) {
    return (
        <Box width="360px" height="100%" css={leftContainer} {...others}>
            {children}
        </Box>
    );
}
