import React, { useCallback, useMemo } from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { action } from '@storybook/addon-actions';
import useResizeObserver from 'use-resize-observer';
import { useVisuallyHidden } from '@react-aria/visually-hidden';
import { neutral } from '../styles/colors';
import {
  Box,
  Button,
  SwitchField,
  Text,
  Tooltip,
  TooltipTrigger,
} from '../index';

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
      bg="accent.99"
      alignItems="center"
      justifyContent="space-between"
      pr={20}
      ref={ref}
    >
      <Box p="md" variant="boxes.expandableRow.titleWrapper">
        <Text variant="expandableRow.title">Expanded Row with Line Chart</Text>
        <Text variant="expandableRow.subtitle">Empty Data</Text>
      </Box>
      <Box isRow alignItems="center">
        <Box
          variant="boxes.expandableRow.lineChart.alignCellRightWrapper"
          ml={20}
          pr={15}
          {...hideIfMobile()}
        >
          <Text variant="expandableRow.lineChart.title">
            Avg daily sign-ons:
          </Text>
        </Box>
        <Box
          variant="boxes.expandableRow.lineChart.alignCellRightWrapper"
          width={100}
          {...hideIfTablet()}
        >
          <Text variant="expandableRow.lineChart.count">0</Text>
          <Text variant="expandableRow.lineChart.countLabel">Past 7 days</Text>
        </Box>
        <TooltipTrigger>
          <Button
            variant="expandableRow.chartWrapper"
            onPress={action('seeContributingDataAction')}
            ml={15}
            pr={15}
            aria-label="line-chart button"
            {...hideIfTablet()}
          >
            <Box variant="boxes.expandableRow.lineChart.divider" />
            <Box ml={15}>
              <Box variant="boxes.expandableRow.lineChart.chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart width={50} height={18} data={chartData}>
                    <Line
                      type="monotone"
                      dataKey="emptyData"
                      dot={false}
                      stroke={neutral[20]}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
              <Text variant="expandableRow.lineChart.chartLabel">
                No data yet
              </Text>
            </Box>
            <Box size="sm" ml={15} width={50}>
              <Text variant="expandableRow.lineChart.trend">+ 0%</Text>
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
      bg="accent.99"
      alignItems="center"
      justifyContent="space-between"
      pr={20}
      mt={20}
    >
      <Box p="md" variant="boxes.expandableRow.titleWrapper">
        <Text variant="expandableRow.title">Expanded Row with Line Chart</Text>
        <Text variant="expandableRow.subtitle">Full Data</Text>
      </Box>
      <Box isRow alignItems="center">
        <Box
          variant="boxes.expandableRow.lineChart.alignCellRightWrapper"
          ml={20}
          pr={15}
          {...hideIfMobile()}
        >
          <Text variant="expandableRow.lineChart.title">
            Avg daily sign-ons:
          </Text>
        </Box>
        <Box
          variant="boxes.expandableRow.lineChart.alignCellRightWrapper"
          width={100}
          {...hideIfTablet()}
        >
          <Text variant="expandableRow.lineChart.count">1,234,234</Text>
          <Text variant="expandableRow.lineChart.countLabel">Past 7 days</Text>
        </Box>
        <TooltipTrigger>
          <Button
            variant="expandableRow.chartWrapper"
            onPress={action('seeContributingDataAction')}
            ml={15}
            pr={15}
            aria-label="line-chart button"
            {...hideIfTablet()}
          >
            <Box variant="boxes.expandableRow.lineChart.divider" />
            <Box ml={15}>
              <Box variant="boxes.expandableRow.lineChart.chart" width={50}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart width={50} height={18} data={chartData}>
                    <Line
                      type="monotone"
                      dataKey="fullData"
                      dot={false}
                      stroke={neutral[20]}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
              <Text variant="expandableRow.lineChart.chartLabel">
                12 wk trend
              </Text>
            </Box>
            <Box size="sm" ml={15} width={50}>
              <Text variant="expandableRow.lineChart.trend">+ 8.6%</Text>
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
      bg="accent.99"
      alignItems="center"
      justifyContent="space-between"
      pr={20}
      mt={20}
    >
      <Box p="md" variant="boxes.expandableRow.titleWrapper">
        <Text variant="expandableRow.title">Expanded Row with Line Chart</Text>
        <Text variant="expandableRow.subtitle">Partial Data</Text>
      </Box>
      <Box isRow alignItems="center">
        <Box
          variant="boxes.expandableRow.lineChart.alignCellRightWrapper"
          ml={20}
          pr={15}
          {...hideIfMobile()}
        >
          <Text variant="expandableRow.lineChart.title">
            Avg daily sign-ons:
          </Text>
        </Box>
        <Box
          variant="boxes.expandableRow.lineChart.alignCellRightWrapper"
          width={100}
          {...hideIfTablet()}
        >
          <Text variant="expandableRow.lineChart.count">234,234</Text>
          <Text variant="expandableRow.lineChart.countLabel">Past 7 days</Text>
        </Box>
        <TooltipTrigger>
          <Button
            variant="expandableRow.chartWrapper"
            onPress={action('seeContributingDataAction')}
            ml={15}
            pr={15}
            aria-label="line-chart button"
            {...hideIfTablet()}
          >
            <Box variant="boxes.expandableRow.lineChart.divider" />
            <Box ml={15}>
              <Box variant="boxes.expandableRow.lineChart.chart" width={50}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart width={50} height={18} data={partialDataData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      dot={false}
                      stroke={neutral[20]}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
              <Text variant="expandableRow.lineChart.chartLabel">
                12 wk trend
              </Text>
            </Box>
            <Box size="sm" ml={15} width={50}>
              <Text variant="expandableRow.lineChart.trend">- 8.6%</Text>
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
      bg="accent.99"
      alignItems="center"
      justifyContent="space-between"
      pr={20}
      mt={20}
    >
      <Box p="md" variant="boxes.expandableRow.titleWrapper">
        <Text variant="expandableRow.title">Expanded Row with Line Chart</Text>
        <Text variant="expandableRow.subtitle">Zero Data</Text>
      </Box>
      <Box isRow alignItems="center">
        <Box
          variant="boxes.expandableRow.lineChart.alignCellRightWrapper"
          ml={20}
          pr={15}
          {...hideIfMobile()}
        >
          <Text variant="expandableRow.lineChart.title">
            Avg daily sign-ons:
          </Text>
        </Box>
        <Box
          variant="boxes.expandableRow.lineChart.alignCellRightWrapper"
          width={100}
          {...hideIfTablet()}
        >
          <Text variant="expandableRow.lineChart.count">0</Text>
          <Text variant="expandableRow.lineChart.countLabel">Past 7 days</Text>
        </Box>
        <TooltipTrigger>
          <Button
            variant="expandableRow.chartWrapper"
            onPress={action('seeContributingDataAction')}
            ml={15}
            pr={15}
            aria-label="line-chart button"
            {...hideIfTablet()}
          >
            <Box variant="boxes.expandableRow.lineChart.divider" />
            <Box ml={15}>
              <Box variant="boxes.expandableRow.lineChart.chart" width={50}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart width={50} height={18} data={zeroData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      dot={false}
                      stroke={neutral[20]}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
              <Text variant="expandableRow.lineChart.chartLabel">
                12 wk trend
              </Text>
            </Box>
            <Box size="sm" ml={15} width={50}>
              <Text variant="expandableRow.lineChart.trend">+ 0%</Text>
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
      bg="accent.99"
      alignItems="center"
      justifyContent="space-between"
      pr={20}
      mt={20}
    >
      <Box p="md" variant="boxes.expandableRow.titleWrapper">
        <Text variant="expandableRow.title">Expanded Row with Line Chart</Text>
        <Text variant="expandableRow.subtitle">Zero Values</Text>
      </Box>
      <Box isRow alignItems="center">
        <Box
          variant="boxes.expandableRow.lineChart.alignCellRightWrapper"
          ml={20}
          pr={15}
          {...hideIfMobile()}
        >
          <Text variant="expandableRow.lineChart.title">
            Avg daily sign-ons:
          </Text>
        </Box>
        <Box
          variant="boxes.expandableRow.lineChart.alignCellRightWrapper"
          width={100}
          {...hideIfTablet()}
        >
          <Text variant="expandableRow.lineChart.count">0</Text>
          <Text variant="expandableRow.lineChart.countLabel">Past 7 days</Text>
        </Box>
        <TooltipTrigger>
          <Button
            variant="expandableRow.chartWrapper"
            onPress={action('seeContributingDataAction')}
            ml={15}
            pr={15}
            aria-label="line-chart button"
            {...hideIfTablet()}
          >
            <Box variant="boxes.expandableRow.lineChart.divider" />
            <Box ml={15}>
              <Box variant="boxes.expandableRow.lineChart.chart" width={50}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart width={50} height={18} data={zeroValuesData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      dot={false}
                      stroke={neutral[20]}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
              <Text variant="expandableRow.lineChart.chartLabel">
                12 wk trend
              </Text>
            </Box>
            <Box size="sm" ml={15} width={50}>
              <Text variant="expandableRow.lineChart.trend">+ 0%</Text>
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
