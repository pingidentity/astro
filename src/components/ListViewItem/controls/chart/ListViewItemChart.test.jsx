import React from 'react';
import useResizeObserver from 'use-resize-observer';

import { render, screen } from '../../../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../../../utils/testUtils/universalComponentTest';
import Box from '../../../Box/Box';

import { chartData } from './chartData';
import ListViewItemChart from './ListViewItemChart';

jest.mock('use-resize-observer');

const Chart = props => {
  const ref = React.useRef();
  return (
    <Box ref={ref}>
      <ListViewItemChart
        containerRef={ref}
        chartData={chartData}
        chartDataKey="fullData"
        title="Avg daily sign-ons:"
        contentCount="1,234,234"
        contentCountLabel="Past 7 days"
        chartLabel="12 wk trend"
        trend="+ 8.6%"
        tooltipText="See Contributing Data"
        ariaLabel="LoremIpsum"
        {...props}
      />
    </Box>
  );
};

const getComponent = (props = {}) => render((
  <Chart {...props} />
));

const { ResizeObserver } = window;

beforeEach(() => {
  useResizeObserver.mockReturnValue({ width: 800 });
  jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(400);
  jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(800);

  delete window.ResizeObserver;
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  window.ResizeObserver = ResizeObserver;
  jest.restoreAllMocks();
});

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <ListViewItemChart {...props} /> });

test('renders ListViewItemChart component', () => {
  getComponent();

  const chart = screen.getByRole('region');
  const content = screen.getByText('Past 7 days');

  expect(chart).toBeInTheDocument();
  expect(content).toBeInTheDocument();
  expect(!!content.parentNode.getAttribute('style')).toBeFalsy();
});

test('renders ListViewItemChart component for tablet', () => {
  useResizeObserver.mockReturnValue({ width: 500 });

  getComponent();

  const chart = screen.getByRole('region');
  const content = screen.getByText('Past 7 days');

  expect(chart).toBeInTheDocument();
  expect(content).toBeInTheDocument();
  expect(!!content.parentNode.getAttribute('style')).toBeTruthy();
});
