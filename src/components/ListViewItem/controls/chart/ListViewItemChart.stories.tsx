import React, { useRef } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../../../.storybook/storybookDocsLayout';
import { Box, ListViewItemChart } from '../../../../index';
import { ListViewItemChartProps } from '../../../../types';

import { chartData } from './chartData';
import ListViewItemChartReadMe from './ListViewItemChart.mdx';
import { listViewItemChartArgTypes } from './ListViewItemChartAttributes';

export default {
  title: 'Components/ListViewItem/Controls/ListViewItemChart',
  component: ListViewItemChart,
  parameters: {
    docs: {
      page: () => (
        <>
          <ListViewItemChartReadMe />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: listViewItemChartArgTypes,
} satisfies Meta<typeof ListViewItemChart>;

export const Default: StoryFn<ListViewItemChartProps> = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Box ref={ref}>
      <ListViewItemChart
        containerRef={ref}
        chartData={chartData}
        chartDataKey="fullData"
        title="Avg daily sign-ons:"
        contentCount="31"
        contentCountLabel="Past 7 days"
        chartLabel="12 wk trend"
        trend="+115.0%"
        tooltipText="See Contributing Data"
        ariaLabel="LoremIpsum"
      />
    </Box>
  );
};
