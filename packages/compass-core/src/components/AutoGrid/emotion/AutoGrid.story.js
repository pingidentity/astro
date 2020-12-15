import React from 'react';

import AutoGrid from './AutoGrid';
import Box from '../../Box/emotion';

export default {
    title: 'Auto Grid',
    component: AutoGrid,

};

const theme = {
    breakpoints: ['480px', '768px', '960px', '1280px', '1920px'],
};

export const Default = () => (
    <AutoGrid gap={[20, 10]} columns={[1, 2, 3, 4]} minColumnWidth={['100%', 300]} theme={theme}>
        <Box bg="red">Content</Box>
        <Box bg="blue">
            For<br />
            For<br />
            For<br />
            For<br />
            For<br />
            For<br />
        </Box>
        <Box bg="magenta">Grid</Box>
        <Box bg="yellow">Grid</Box>
    </AutoGrid>
);

export const NoBreakpoints = () => (
    <AutoGrid gap={10} columns={3} minColumnWidth={300}>
        <Box bg="red">Content</Box>
        <Box bg="blue">For</Box>
        <Box bg="magenta">Grid</Box>
        <Box bg="yellow">Grid</Box>
    </AutoGrid>
);
