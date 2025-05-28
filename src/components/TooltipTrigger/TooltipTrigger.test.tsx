import React from 'react';
import userEvent from '@testing-library/user-event';

import {
  AstroProvider,
  Button,
  ButtonProps,
  OnyxTheme,
  Tooltip,
  TooltipTrigger,
  TooltipTriggerProps,
} from '../../index';
import theme from '../../styles/theme';
import { act, fireEvent, render, screen, waitFor } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

interface getComponentProps extends TooltipTriggerProps {
  buttonProps?: ButtonProps;
}

const getComponent = ({ buttonProps, ...others }: getComponentProps = {}) => render((
  <TooltipTrigger {...others}>
    <Button {...buttonProps}>Mock Button</Button>
    <Tooltip>Tooltip Content</Tooltip>
  </TooltipTrigger>
));

const getOnyxComponent = ({ buttonProps, ...others }: getComponentProps = {}) => render((
  <AstroProvider theme={OnyxTheme}>
    <TooltipTrigger {...others}>
      <Button {...buttonProps}>Mock Button</Button>
      <Tooltip>Tooltip Content</Tooltip>
    </TooltipTrigger>
  </AstroProvider>
));

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
});

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

test('tooltip closes after closeDelay when mouse leaves trigger', async () => {
  const closeDelay = 10;

  getComponent({ closeDelay });
  const button = screen.getByRole('button');
  fireEvent.mouseEnter(button);
  expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  fireEvent.mouseLeave(button);

  act(() => { jest.advanceTimersByTime(300); });

  await act(() => {
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  }, { timeout: closeDelay + 301 });
});

test('tooltip stays open until closeDelay after mouse leaves trigger', async () => {
  const closeDelay = 10;

  getComponent({ closeDelay });
  const button = screen.getByRole('button');
  fireEvent.mouseEnter(button);
  expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  fireEvent.mouseLeave(button);

  await waitFor(() => {
    expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  }, { timeout: closeDelay - 1 });
});

test('tooltip uses mount transition when Onyx theme is applied', () => {
  getOnyxComponent();
  const button = screen.getByRole('button');
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

  fireEvent.mouseMove(button);
  fireEvent.mouseEnter(button);

  // Tooltip should be transitioning
  expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  expect(screen.queryByRole('presentation')).toHaveClass('is-transitioning');

  // Tooltip should now be fully mounted
  userEvent.click(button);
  expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  expect(screen.queryByRole('presentation')).not.toHaveClass('is-mounted');
  expect(screen.queryByRole('presentation')).toHaveClass('is-transitioning');
  act(() => {
    jest.advanceTimersByTime(201); // Simulate the transition duration
  });
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <TooltipTrigger {...props}>
      <Button>Mock Button</Button>
      <Tooltip>Tooltip Content</Tooltip>
    </TooltipTrigger>
  ),
});
