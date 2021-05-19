import React from 'react';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { Box } from '../../index';
import PopoverContainer from './PopoverContainer';

const getComponent = (props = {}) => render((
  <>
    <PopoverContainer {...props}>
      <Box>I am in a popover</Box>
    </PopoverContainer>
  </>
));

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
