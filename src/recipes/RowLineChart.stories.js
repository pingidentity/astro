import React, { useCallback, useMemo } from 'react';
import { useVisuallyHidden } from 'react-aria';
import { action } from '@storybook/addon-actions';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import useResizeObserver from 'use-resize-observer';

import {
  Box,
  Button,
  SwitchField,
  Text,
  Tooltip,
  TooltipTrigger,
} from '../index';
import { neutral } from '../styles/colors';

export default {
  title: 'Recipes/Row Line Chart',
  parameters: {
    chromatic: { diffThreshold: 0.9 },
  },
};

const chartData = [
  { id: 1, emptyData: 0, fullData: 1 },
  { id: 2, emptyData: 0, fullData: 5 },
  { id: 3, emptyData: 0, fullData: 3 },
  { id: 4, emptyData: 0, fullData: 2 },
  { id: 5, emptyData: 0, fullData: 5 },
  { id: 6, emptyData: 0, fullData: 1 },
  { id: 7, emptyData: 0, fullData: 5 },
  { id: 8, emptyData: 0, fullData: 5 },
  { id: 9, emptyData: 0, fullData: 1 },
  { id: 10, emptyData: 0, fullData: 2 },
  { id: 11, emptyData: 0, fullData: 4 },
  { id: 12, emptyData: 0, fullData: 11 },
];

const partialDataData = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7, value: 6 },
  { id: 8, value: 5 },
  { id: 9, value: 4 },
  { id: 10, value: 3 },
  { id: 11, value: 2 },
  { id: 12, value: 1 },
];

const zeroValuesData = [
  { id: 1, value: 0 },
  { id: 2, value: 0 },
  { id: 3, value: 0 },
  { id: 4, value: 0 },
];

const zeroData = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8, value: 0 },
  { id: 9, value: 0 },
  { id: 10, value: 0 },
  { id: 11, value: 0 },
  { id: 12, value: 0 },
];

const expandableRowSharedStyle = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};
const alignCellRightWrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
};

const sx = {
  container: {
    backgroundColor: 'accent.99',
    alignItems: 'center',
    justifyContent: 'space-between',
    pr: '20px',
  },
  chartTitleContainer: {

  },
  chartContainer: {
    width: '100%',
    height: '100%',
  },
  chart: {
    width: '50',
    height: '18',
  },
  chartTrendContainer: {
    ml: 'md',
    width: '50px',
  },
  expandableRow: {
    titleWrapper: {
      maxWidth: '50%',
      p: 'md',
    },
    lineChart: {
      title: {
        ...alignCellRightWrapper,
        ml: '20px',
        pr: 'md',
      },
      content: {
        ...alignCellRightWrapper,
        width: 100,
      },
      chart: {
        width: '50px',
        height: '18px',
      },
      chartWrapper: {
        '&:hover': {
          backgroundColor: '#4462ED1A',
        },
      },
      divider: {
        backgroundColor: 'neutral.80',
        height: '35px',
        width: '1px',
      },
    },
  },
  expandableRowButton: {
    chartWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      color: 'black',
      background: 'none',
      cursor: 'pointer',
      height: 60,
      padding: 0,
      ml: 'md',
      pr: 'md',
      border: 'none',
      '&:hover': {
        backgroundColor: '#4462ED1A',
      },
    },
  },
  expandableRowText: {
    title: {
      fontSize: 'lg',
      color: 'neutral.20',
      ...expandableRowSharedStyle,
    },
    subtitle: {
      fontSize: 'sm',
      color: 'neutral.60',
      ...expandableRowSharedStyle,
    },
    lineChart: {
      title: {
        fontSize: 'sm',
        color: 'neutral.40',
        maxWidth: '100%',
        ...expandableRowSharedStyle,
      },
      count: {
        color: 'neutral.20',
        fontSize: 22,
        fontWeight: 2,
      },
      countLabel: {
        fontSize: 'xs',
        color: 'neutral.50',
      },
      chartLabel: {
        fontSize: 'xs',
        color: 'neutral.50',
        minWidth: '60px',
      },
      trend: {
        color: 'neutral.20',
        fontSize: 'sm',
        fontWeight: 3,
        whiteSpace: 'nowrap',
      },
    },
  },
};

export const Default = () => {
  const { ref, width } = useResizeObserver();
  const { visuallyHiddenProps } = useVisuallyHidden();

  const isTablet = useMemo(() => width <= 605, [width]);
  const isMobile = useMemo(() => width <= 350, [width]);

  const hideIfTablet = useCallback(() => isTablet && visuallyHiddenProps, [
    isTablet,
  ]);

  const hideIfMobile = useCallback(() => isMobile && visuallyHiddenProps, [
    isMobile,
  ]);

  const EmptyData = (
    <Box
      isRow
      sx={sx.container}
      ref={ref}
    >
      <Box sx={sx.expandableRow.titleWrapper}>
        <Text sx={sx.expandableRowText.title}>Expanded Row with Line Chart</Text>
        <Text sx={sx.expandableRowText.subtitle}>Empty Data</Text>
      </Box>
      <Box isRow alignItems="center">
        <Box
          sx={sx.expandableRow.lineChart.title}
          {...hideIfMobile()}
        >
          <Text sx={sx.expandableRowText.lineChart.title}>
            Avg daily sign-ons:
          </Text>
        </Box>
        <Box
          sx={sx.expandableRow.lineChart.content}
          {...hideIfTablet()}
        >
          <Text sx={sx.expandableRowText.lineChart.count}>0</Text>
          <Text sx={sx.expandableRowText.lineChart.countLabel}>Past 7 days</Text>
        </Box>
        <TooltipTrigger>
          <Button
            sx={sx.expandableRowButton.chartWrapper}
            onPress={action('seeContributingDataAction')}
            aria-label="line-chart button"
            {...hideIfTablet()}
          >
            <Box sx={sx.expandableRow.lineChart.divider} />
            <Box ml={15}>
              <Box sx={sx.expandableRow.lineChart.chart}>
                <ResponsiveContainer sx={sx.chartContainer}>
                  <LineChart sx={sx.chart} data={chartData}>
                    <Line
                      type="monotone"
                      dataKey="emptyData"
                      dot={false}
                      stroke={neutral[20]}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
              <Text sx={sx.expandableRowText.lineChart.chartLabel}>
                No data yet
              </Text>
            </Box>
            <Box size="sm" sx={sx.chartTrendContainer}>
              <Text sx={sx.expandableRowText.lineChart.trend}>+ 0%</Text>
            </Box>
          </Button>
          <Tooltip>See Contributing Data</Tooltip>
        </TooltipTrigger>
        <Box size="sm">
          <SwitchField aria-label="line-chart switch-field" />
        </Box>
      </Box>
    </Box>
  );

  const FullData = (
    <Box
      isRow
      sx={sx.container}
      mt={20}
    >
      <Box sx={sx.expandableRow.titleWrapper}>
        <Text sx={sx.expandableRowText.title}>Expanded Row with Line Chart</Text>
        <Text sx={sx.expandableRowText.subtitle}>Full Data</Text>
      </Box>
      <Box isRow alignItems="center">
        <Box
          sx={sx.expandableRow.lineChart.title}
          {...hideIfMobile()}
        >
          <Text sx={sx.expandableRowText.lineChart.title}>
            Avg daily sign-ons:
          </Text>
        </Box>
        <Box
          sx={sx.expandableRow.lineChart.content}
          {...hideIfTablet()}
        >
          <Text sx={sx.expandableRowText.lineChart.count}>1,234,234</Text>
          <Text sx={sx.expandableRowText.lineChart.countLabel}>Past 7 days</Text>
        </Box>
        <TooltipTrigger>
          <Button
            sx={sx.expandableRowButton.chartWrapper}
            onPress={action('seeContributingDataAction')}
            aria-label="line-chart button"
            {...hideIfTablet()}
          >
            <Box sx={sx.expandableRow.lineChart.divider} />
            <Box ml={15}>
              <Box sx={sx.expandableRow.lineChart.chart} width={50}>
                <ResponsiveContainer sx={sx.chartContainer}>
                  <LineChart sx={sx.chart} data={chartData}>
                    <Line
                      type="monotone"
                      dataKey="fullData"
                      dot={false}
                      stroke={neutral[20]}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
              <Text sx={sx.expandableRowText.lineChart.chartLabel}>
                12 wk trend
              </Text>
            </Box>
            <Box size="sm" sx={sx.chartTrendContainer}>
              <Text sx={sx.expandableRowText.lineChart.trend}>+ 8.6%</Text>
            </Box>
          </Button>
          <Tooltip>See Contributing Data</Tooltip>
        </TooltipTrigger>
        <Box size="sm">
          <SwitchField aria-label="line-chart switch-field" />
        </Box>
      </Box>
    </Box>
  );

  const PartialData = (
    <Box
      isRow
      sx={sx.container}
      mt={20}
    >
      <Box sx={sx.expandableRow.titleWrapper}>
        <Text sx={sx.expandableRowText.title}>Expanded Row with Line Chart</Text>
        <Text sx={sx.expandableRowText.subtitle}>Partial Data</Text>
      </Box>
      <Box isRow alignItems="center">
        <Box
          sx={sx.expandableRow.lineChart.title}
          {...hideIfMobile()}
        >
          <Text sx={sx.expandableRowText.lineChart.title}>
            Avg daily sign-ons:
          </Text>
        </Box>
        <Box
          sx={sx.expandableRow.lineChart.content}
          {...hideIfTablet()}
        >
          <Text sx={sx.expandableRowText.lineChart.count}>234,234</Text>
          <Text sx={sx.expandableRowText.lineChart.countLabel}>Past 7 days</Text>
        </Box>
        <TooltipTrigger>
          <Button
            sx={sx.expandableRowButton.chartWrapper}
            onPress={action('seeContributingDataAction')}
            aria-label="line-chart button"
            {...hideIfTablet()}
          >
            <Box sx={sx.expandableRow.lineChart.divider} />
            <Box ml={15}>
              <Box sx={sx.expandableRow.lineChart.chart} width={50}>
                <ResponsiveContainer sx={sx.chartContainer}>
                  <LineChart sx={sx.chart} data={partialDataData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      dot={false}
                      stroke={neutral[20]}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
              <Text sx={sx.expandableRowText.lineChart.chartLabel}>
                12 wk trend
              </Text>
            </Box>
            <Box size="sm" sx={sx.chartTrendContainer}>
              <Text sx={sx.expandableRowText.lineChart.trend}>- 8.6%</Text>
            </Box>
          </Button>
          <Tooltip>See Contributing Data</Tooltip>
        </TooltipTrigger>
        <Box size="sm">
          <SwitchField aria-label="line-chart switch-field" />
        </Box>
      </Box>
    </Box>
  );

  const ZeroData = (
    <Box
      isRow
      sx={sx.container}
      mt={20}
    >
      <Box sx={sx.expandableRow.titleWrapper}>
        <Text sx={sx.expandableRowText.title}>Expanded Row with Line Chart</Text>
        <Text sx={sx.expandableRowText.subtitle}>Zero Data</Text>
      </Box>
      <Box isRow alignItems="center">
        <Box
          sx={sx.expandableRow.lineChart.title}
          {...hideIfMobile()}
        >
          <Text sx={sx.expandableRowText.lineChart.title}>
            Avg daily sign-ons:
          </Text>
        </Box>
        <Box
          sx={sx.expandableRow.lineChart.content}
          {...hideIfTablet()}
        >
          <Text sx={sx.expandableRowText.lineChart.count}>0</Text>
          <Text sx={sx.expandableRowText.lineChart.countLabel}>Past 7 days</Text>
        </Box>
        <TooltipTrigger>
          <Button
            sx={sx.expandableRowButton.chartWrapper}
            onPress={action('seeContributingDataAction')}
            aria-label="line-chart button"
            {...hideIfTablet()}
          >
            <Box sx={sx.expandableRow.lineChart.divider} />
            <Box ml={15}>
              <Box sx={sx.expandableRow.lineChart.chart} width={50}>
                <ResponsiveContainer sx={sx.chartContainer}>
                  <LineChart sx={sx.chart} data={zeroData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      dot={false}
                      stroke={neutral[20]}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
              <Text sx={sx.expandableRowText.lineChart.chartLabel}>
                12 wk trend
              </Text>
            </Box>
            <Box size="sm" sx={sx.chartTrendContainer}>
              <Text sx={sx.expandableRowText.lineChart.trend}>+ 0%</Text>
            </Box>
          </Button>
          <Tooltip>See Contributing Data</Tooltip>
        </TooltipTrigger>
        <Box size="sm">
          <SwitchField aria-label="line-chart switch-field" />
        </Box>
      </Box>
    </Box>
  );

  const ZeroValues = (
    <Box
      isRow
      sx={sx.container}
      mt={20}
    >
      <Box sx={sx.expandableRow.titleWrapper}>
        <Text sx={sx.expandableRowText.title}>Expanded Row with Line Chart</Text>
        <Text sx={sx.expandableRowText.subtitle}>Zero Values</Text>
      </Box>
      <Box isRow alignItems="center">
        <Box
          sx={sx.expandableRow.lineChart.title}
          {...hideIfMobile()}
        >
          <Text sx={sx.expandableRowText.lineChart.title}>
            Avg daily sign-ons:
          </Text>
        </Box>
        <Box
          sx={sx.expandableRow.lineChart.content}
          {...hideIfTablet()}
        >
          <Text sx={sx.expandableRowText.lineChart.count}>0</Text>
          <Text sx={sx.expandableRowText.lineChart.countLabel}>Past 7 days</Text>
        </Box>
        <TooltipTrigger>
          <Button
            sx={sx.expandableRowButton.chartWrapper}
            onPress={action('seeContributingDataAction')}
            aria-label="line-chart button"
            {...hideIfTablet()}
          >
            <Box sx={sx.expandableRow.lineChart.divider} />
            <Box ml={15}>
              <Box sx={sx.expandableRow.lineChart.chart} width={50}>
                <ResponsiveContainer sx={sx.chartContainer}>
                  <LineChart sx={sx.chart} data={zeroValuesData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      dot={false}
                      stroke={neutral[20]}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
              <Text sx={sx.expandableRowText.lineChart.chartLabel}>
                12 wk trend
              </Text>
            </Box>
            <Box size="sm" sx={sx.chartTrendContainer}>
              <Text sx={sx.expandableRowText.lineChart.trend}>+ 0%</Text>
            </Box>
          </Button>
          <Tooltip>See Contributing Data</Tooltip>
        </TooltipTrigger>
        <Box size="sm">
          <SwitchField aria-label="line-chart switch-field" />
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {EmptyData}
      {FullData}
      {PartialData}
      {ZeroData}
      {ZeroValues}
    </>
  );
};
