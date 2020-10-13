import React from 'react';
import { Box } from '@pingux/compass';
import { leftContainer } from './LeftContainer.styles';


export default function LeftContainer({
    children,
    ...others
}) {
    return (
        <Box width="20%" css={leftContainer} {...others}>
            {children}
        </Box>
    );
}
