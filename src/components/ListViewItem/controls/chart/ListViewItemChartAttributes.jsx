import PropTypes from 'prop-types';

import { docArgTypes } from '../../../../utils/docUtils/docArgTypes';
import { buttonArgTypes } from '../../../Button/buttonAttributes';

const descriptions = {
  buttonProps: 'Object includes same props as `Button` component',
  chartData: 'Array with objects `{ id, keyName }` for chart',
  chartDataKey: 'Name of the `keyName` in `chartData`',
  chartLabel: 'Label under chart',
  mobileBreakPoint: 'Container width breakpoint to hide all ListViewItemChart',
  tabletBreakPoint: 'Container width breakpoint to hide content (counter and counter label)',
  title: 'Main title of chart',
  tooltipText: 'Text inside tooltip',
  contentCount: 'Number of events',
  contentCountLabel: 'Label under `contentCount`',
  trend: 'Text for trend',
};

export const listViewItemChartArgTypes = {
  buttonProps: {
    ...buttonArgTypes,
    type: { summary: docArgTypes.object },
    description: descriptions.buttonProps,
    control: 'object',
  },
  chartData: {
    description: descriptions.chartData,
    type: { summary: docArgTypes.object },
    control: 'object',
  },
  chartDataKey: {
    description: descriptions.chartDataKey,
    type: { summary: docArgTypes.string },
    control: 'text',
  },
  chartLabel: {
    description: descriptions.chartLabel,
    type: { summary: docArgTypes.string },
    control: 'text',
  },
  mobileBreakPoint: {
    description: descriptions.mobileBreakPoint,
    type: { summary: docArgTypes.number },
    control: 'number',
  },
  tabletBreakPoint: {
    description: descriptions.tabletBreakPoint,
    type: { summary: docArgTypes.number },
    control: 'number',
  },
  title: {
    description: descriptions.title,
    type: { summary: docArgTypes.string },
    control: 'text',
  },
  tooltipText: {
    description: descriptions.tooltipText,
    type: { summary: docArgTypes.string },
    control: 'text',
  },
  contentCount: {
    description: descriptions.contentCount,
    type: { summary: docArgTypes.string },
    control: 'text',
  },
  contentCountLabel: {
    description: descriptions.contentCountLabel,
    type: { summary: docArgTypes.string },
    control: 'text',
  },
  trend: {
    description: descriptions.trend,
    type: { summary: docArgTypes.string },
    control: 'text',
  },
};

export const listViewItemChartPropTypes = {
  chartData: PropTypes.arrayOf(PropTypes.shape({})),
  chartLabel: PropTypes.string,
  chartDataKey: PropTypes.string,
  contentCount: PropTypes.string,
  contentCountLabel: PropTypes.string,
  mobileBreakPoint: PropTypes.number,
  tabletBreakPoint: PropTypes.number,
  title: PropTypes.string,
  tooltipText: PropTypes.string,
  trend: PropTypes.string,
};
