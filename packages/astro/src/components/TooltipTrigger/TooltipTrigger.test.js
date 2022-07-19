import React from 'react';
import userEvent from '@testing-library/user-event';
import axeTest from '../../utils/testUtils/testAxe';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import theme from '../../styles/theme';
import {
  Button,
  TooltipTrigger,
  Tooltip,
} from '../../index';

const getComponent = (props = {}) => render((
  <TooltipTrigger {...props}>
    <Button {...props.buttonProps}>Mock Button</Button>
    <Tooltip>Tooltip Content</Tooltip>
  </TooltipTrigger>
));

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('tooltip doesnt show by default and is rendered when trigger is hovered', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

  fireEvent.mouseMove(button);
  fireEvent.mouseEnter(button);
  expect(screen.queryByRole('tooltip')).toBeInTheDocument();
});

test('renders a tooltip when trigger is focused with keyboard', () => {
  getComponent();
  const button = screen.getByRole('button');
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

  expect(button).not.toHaveFocus();
  expect(button).not.toHaveStyle(`box-shadow: ${theme.shadows.focus}`);

  userEvent.tab();
  expect(button).toHaveFocus();
});

test('renders tooltip by default with isOpen prop', () => {
  getComponent({ isOpen: true });
  const tooltip = screen.getByRole('tooltip');
  expect(tooltip).toBeInTheDocument();
});

test('trigger press events work when a tooltip is displayed', () => {
  const onPress = jest.fn();
  getComponent({ buttonProps: { onPress } });
  const button = screen.getByRole('button');

  expect(onPress).not.toHaveBeenCalled();
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  fireEvent.mouseMove(button);
  fireEvent.mouseEnter(button);
  expect(screen.queryByRole('tooltip')).toBeInTheDocument();

  userEvent.click(button);
  expect(onPress).toHaveBeenCalledTimes(1);
  // Tooltip is dismissed when a click event happens
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});

test('trigger press events work when a tooltip is disabled', () => {
  const onPress = jest.fn();
  getComponent({ isDisabled: true, buttonProps: { onPress } });
  const button = screen.getByRole('button');

  expect(onPress).not.toHaveBeenCalled();
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  fireEvent.mouseMove(button);
  fireEvent.mouseEnter(button);
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

  userEvent.click(button);
  expect(onPress).toHaveBeenCalledTimes(1);
});

test('passing in width applies the correct width to the container', () => {
  getComponent({ isOpen: true, width: '100px' });
  const arrow = screen.getByTestId('popover-container');
  expect(arrow).toHaveStyle('width: 100px');
});
