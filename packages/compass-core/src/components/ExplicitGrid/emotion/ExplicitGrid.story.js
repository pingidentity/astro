import React from 'react';

import ExplicitGrid, { ExplicitGridItem } from './ExplicitGrid';

export default {
    title: 'Explicit Grid',
    component: ExplicitGrid,
    subcomponent: { ExplicitGridItem },
};

const theme = {
    breakpoints: ['480px', '768px', '960px', '1280px', '1920px'],
};

export const Default = () => (
    <ExplicitGrid gap={10} columns={2} rows={2} theme={theme}>
        <ExplicitGridItem bg="red" column={1} row={2}>Content</ExplicitGridItem>
        <ExplicitGridItem bg="blue" column={2} row={1}>For</ExplicitGridItem>
        <ExplicitGridItem bg="magenta" column={2} row={2}>Grid</ExplicitGridItem>
        <ExplicitGridItem bg="yellow" column={1} row={1}>Grid</ExplicitGridItem>
    </ExplicitGrid>
);

export const WithSpans = () => (
    <ExplicitGrid gap={10} columns={3} rows={4} theme={theme}>
        <ExplicitGridItem bg="red" column={1} row={2} columnSpan={2} rowSpan={2} theme={theme}>Content</ExplicitGridItem>
        <ExplicitGridItem bg="blue" column={3} row={2} rowSpan={2} theme={theme}>For</ExplicitGridItem>
        <ExplicitGridItem bg="magenta" column={2} row={4} theme={theme}>Grid</ExplicitGridItem>
        <ExplicitGridItem bg="yellow" column={1} row={1} columnSpan={3} theme={theme}>Grid</ExplicitGridItem>
    </ExplicitGrid>
);

export const Responsive = () => (
    <ExplicitGrid gap={10} columns={[1, 2, 3]} rows={[6, 4]} theme={theme}>
        <ExplicitGridItem bg="red" column={1} row={2} columnSpan={[1, 1, 2]} rowSpan={2} theme={theme}>Content</ExplicitGridItem>
        <ExplicitGridItem bg="blue" column={[1, 2, 3]} row={[4, 2, 2]} rowSpan={2} theme={theme}>For</ExplicitGridItem>
        <ExplicitGridItem bg="magenta" column={[1, 1, 2]} row={[6, 4, 4]} theme={theme}>Grid</ExplicitGridItem>
        <ExplicitGridItem bg="yellow" column={1} row={1} columnSpan={[1, 2, 3]} theme={theme}>Grid</ExplicitGridItem>
    </ExplicitGrid>
);
