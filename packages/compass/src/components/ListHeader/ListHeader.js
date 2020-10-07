import React from 'react';
import Box from '../Box';

const ListHeader = ({
    children,
}) => (
    <Box
        alignItems="center"
        p="xl"
        borderBottom="separator"
        hGap="lg"
        isRow
    >
        {children}
    </Box>
);

export default ListHeader;
