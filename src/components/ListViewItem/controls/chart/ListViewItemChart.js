import React, { useCallback, useMemo } from 'react';
import { useVisuallyHidden } from 'react-aria';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import useResizeObserver from 'use-resize-observer';

import { Box, Button, Text, Tooltip, TooltipTrigger } from '../../../../index';
import { neutral } from '../../../../styles/colors';

import { listViewItemChartPropTypes } from './ListViewItemChartAttributes';

const ListViewItemChart = props => {
  const {
    buttonProps,
    chartData,
    chartLabel,
    containerRef,
    title,
    tooltipText,
    contentCount,
    contentCountLabel,
    trend,
    chartDataKey,
    tabletBreakPoint = 605,
    mobileBreakPoint = 350,
  } = props;
  const { width } = useResizeObserver({ ref: containerRef });
  const { visuallyHiddenProps } = useVisuallyHidden();
  const isTablet = useMemo(() => width <= tabletBreakPoint, [tabletBreakPoint, width]);
  const isMobile = useMemo(() => width <= mobileBreakPoint, [mobileBreakPoint, width]);

  const hideIfTablet = useCallback(() => isTablet && visuallyHiddenProps, [
    isTablet, visuallyHiddenProps,
  ]);

  const hideIfMobile = useCallback(() => isMobile && visuallyHiddenProps, [
    isMobile, visuallyHiddenProps,
  ]);
  return (
    <Box isRow alignItems="center" height={0} mr="md">
      <Box
        variant="lisViewItemChart.titleContainer"
        {...hideIfMobile()}
      >
        <Text variant="variants.lisViewItemChart.title">
          {title}
        </Text>
      </Box>
      <Box
        variant="lisViewItemChart.content"
        {...hideIfTablet()}
      >
        <Text variant="variants.lisViewItemChart.count">
          {contentCount}
        </Text>
        <Text variant="variants.lisViewItemChart.countLabel">
          {contentCountLabel}
        </Text>
      </Box>
      <TooltipTrigger>
        <Button
          variant="variants.lisViewItemChart.chartButton"
          aria-label="line-chart button"
          {...buttonProps}
          {...hideIfMobile()}
        >
          <Box variant="lisViewItemChart.divider" />
          <Box ml="md">
            <Box variant="lisViewItemChart.chartContainer">
              <ResponsiveContainer variant="lisViewItemChart.responsiveContainer">
                <LineChart data={chartData} variant="lisViewItemChart.chart">
                  <Line
                    type="monotone"
                    dataKey={chartDataKey}
                    dot={false}
                    stroke={neutral[20]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
            <Text variant="variants.lisViewItemChart.chartLabel">
              {chartLabel}
            </Text>
          </Box>
          <Box size="sm" variant="lisViewItemChart.trendContainer">
            <Text variant="variants.lisViewItemChart.trend">
              {trend}
            </Text>
          </Box>
        </Button>
        <Tooltip>
          {tooltipText}
        </Tooltip>
      </TooltipTrigger>
    </Box>
  );
};

ListViewItemChart.propTypes = listViewItemChartPropTypes;

ListViewItemChart.displayName = 'ListViewItemChart';

export default ListViewItemChart;
