import React from 'react';

import { Box, OverlayPanel } from '../../index';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';

import PopoverContainer from './PopoverContainer';

const getComponent = (props = {}) => render((
  <PopoverContainer {...props}>
    <Box>I am in a popover</Box>
  </PopoverContainer>
));

const getComponentInOverlayPanel = (props = {}) => render((
  <OverlayPanel isOpen>
    <PopoverContainer {...props}>
      <Box>I am in a popover</Box>
    </PopoverContainer>
  </OverlayPanel>
));

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('should render a popover with an arrow by default', () => {
  getComponent({ isOpen: true });
  const arrow = screen.queryByTestId('popover-arrow');
  expect(arrow).toBeInTheDocument();
});

test('should render a popover with no arrow', () => {
  getComponent({ isOpen: true, hasNoArrow: true });
  const arrow = screen.queryByTestId('popover-arrow');
  expect(arrow).not.toBeInTheDocument();
});

test('popover will not open if wrapped in an overlayPanel', () => {
  getComponentInOverlayPanel({ popoverProps: { 'data-test-id': 'popover-test' } });
  expect(screen.queryByTestId('popover-test')).not.toBeInTheDocument();
});
