import React from 'react';
import {
    ExplicitGrid,
    ExplicitGridItem,
    Card,
} from '../../.';

export default {
    title: 'Explicit Grid',
    component: ExplicitGrid,
    subcomponent: { ExplicitGridItem },
};

export const Default = () => (
    <ExplicitGrid gap={10} columns={2} rows={2}>
        <ExplicitGridItem column={1} row={2}><Card>Content</Card></ExplicitGridItem>
        <ExplicitGridItem column={2} row={1}><Card>For</Card></ExplicitGridItem>
        <ExplicitGridItem column={2} row={2}><Card>Grid</Card></ExplicitGridItem>
        <ExplicitGridItem column={1} row={1}><Card>Grid</Card></ExplicitGridItem>
    </ExplicitGrid>
);

export const WithSpans = () => (
    <ExplicitGrid gap={10} columns={3} rows={4}>
        <ExplicitGridItem column={1} row={2} columnSpan={2} rowSpan={2}>
            <Card height="100%">Content</Card>
        </ExplicitGridItem>
        <ExplicitGridItem column={3} row={2} rowSpan={2}><Card height="100%">For</Card></ExplicitGridItem>
        <ExplicitGridItem column={2} row={4}><Card>Grid</Card></ExplicitGridItem>
        <ExplicitGridItem column={1} row={1} columnSpan={3}><Card>Grid</Card></ExplicitGridItem>
    </ExplicitGrid>
);

export const Responsive = () => (
    <ExplicitGrid gap={10} columns={[1, 2, 3]} rows={[6, 4]}>
        <ExplicitGridItem column={1} row={2} columnSpan={[1, 1, 2]} rowSpan={2}>
            <Card height="100%">Content</Card>
        </ExplicitGridItem>
        <ExplicitGridItem column={[1, 2, 3]} row={[4, 2, 2]} rowSpan={2}>
            <Card height="100%">For</Card>
        </ExplicitGridItem>
        <ExplicitGridItem column={[1, 1, 2]} row={[6, 4, 4]}><Card>Grid</Card></ExplicitGridItem>
        <ExplicitGridItem column={1} row={1} columnSpan={[1, 2, 3]}>
            <Card>Grid</Card>
        </ExplicitGridItem>
    </ExplicitGrid>
);
