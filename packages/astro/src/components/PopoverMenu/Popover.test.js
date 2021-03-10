import React from 'react';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { Box } from '../../index';
import { Popover } from './Popover';

const getComponent = (props = {}) => render((
  <>
    <Popover {...props}>
      <Box>I am in a popover</Box>
    </Popover>
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
