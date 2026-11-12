import React, { forwardRef, useCallback, useEffect, useMemo } from 'react';
import { useVisuallyHidden } from 'react-aria';
import { astroTokens } from '@pingux/onyx-tokens';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import useResizeObserver from 'use-resize-observer';

import { useGetTheme } from '../../../../hooks';
import { Box, Button, Text, Tooltip, TooltipTrigger } from '../../../../index';
import { neutral } from '../../../../styles/colors';
import { ListViewItemChartProps } from '../../../../types/listViewItem';

// `variant` keys into the theme's style objects but is not part of recharts'
// prop types; these aliases keep the extra prop typecheckable without
// changing what is passed through at runtime.
const TypedResponsiveContainer = ResponsiveContainer as React.ComponentType<
  React.ComponentProps<typeof ResponsiveContainer> & { variant?: string }
>;

const TypedLineChart = LineChart as React.ComponentType<
  React.ComponentProps<typeof LineChart> & { variant?: string }
>;

const ListViewItemChart = forwardRef<HTMLDivElement, ListViewItemChartProps>((props, ref) => {
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
    ariaLabel,
  } = props;
  const { width } = useResizeObserver({ ref: containerRef });
  const { visuallyHiddenProps } = useVisuallyHidden();
  // Before the observer's first measurement, width is undefined; the old JS
  // compared `undefined <= n` (false), so treat unmeasured as infinitely wide.
  const isTablet = useMemo(
    () => (width ?? Number.POSITIVE_INFINITY) <= tabletBreakPoint, [tabletBreakPoint, width],
  );
  const isMobile = useMemo(
    () => (width ?? Number.POSITIVE_INFINITY) <= mobileBreakPoint, [mobileBreakPoint, width],
  );

  const hideIfTablet = useCallback(() => isTablet && visuallyHiddenProps, [
    isTablet, visuallyHiddenProps,
  ]);

  const hideIfMobile = useCallback(() => isMobile && visuallyHiddenProps, [
    isMobile, visuallyHiddenProps,
  ]);

  useEffect(() => {
    async function setAriaLabel() {
      if (containerRef && containerRef.current) {
        const [rechartsWrapper] = Array.from(containerRef.current.getElementsByClassName('recharts-wrapper'));
        if (rechartsWrapper && ariaLabel) {
          rechartsWrapper.setAttribute('aria-label', ariaLabel);
        }
      }
    }
    setAriaLabel();
  }, [ariaLabel, containerRef]);

  const { themeState: { isOnyxDark } } = useGetTheme();

  return (
    <Box isRow alignItems="center" height={0} mr="md" ref={ref}>
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
            <Box variant="lisViewItemChart.chartContainer" id={ariaLabel}>
              <TypedResponsiveContainer variant="lisViewItemChart.responsiveContainer">
                <TypedLineChart
                  data={chartData}
                  variant="lisViewItemChart.chart"
                >
                  <Line
                    type="monotone"
                    dataKey={chartDataKey}
                    dot={false}
                    stroke={isOnyxDark ? astroTokens.color.gray[100] : neutral[20]}
                  />
                </TypedLineChart>
              </TypedResponsiveContainer>
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
});

ListViewItemChart.displayName = 'ListViewItemChart';

export default ListViewItemChart;
