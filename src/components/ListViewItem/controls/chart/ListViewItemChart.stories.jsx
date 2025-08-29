import React, { useRef } from 'react';

import DocsLayout from '../../../../../.storybook/storybookDocsLayout';
import { Box, ListViewItemChart } from '../../../../index';

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
};

export const Default = () => {
  const ref = useRef();
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
