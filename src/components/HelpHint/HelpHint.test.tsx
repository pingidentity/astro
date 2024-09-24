import React from 'react';
import userEvent from '@testing-library/user-event';

import { HelpHint, Link } from '../../index';
import { HelpHintProps } from '../../types';
import { act, fireEvent, render, screen, waitFor } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

const testId = 'help-hint__button';
const popoverValue = 'Some text';

const defaultProps = {
  children: popoverValue,
};

const getComponent = (props: HelpHintProps = {}) => render(
  <HelpHint {...defaultProps} {...props} />,
);

const getComponentWithLink = (props: HelpHintProps = {}) => render(
  <HelpHint {...defaultProps} {...props}>
    <Link href="https://uilibrary.ping-eng.com/">Learn More</Link>
  </HelpHint>,
);

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders HelpHint component', () => {
  getComponent();
  const helpHintButton = screen.getByTestId(testId);
  expect(helpHintButton).toBeInTheDocument();
});

test('shows popover when trigger is hovered', async () => {
  getComponent();
  const helpHintButton = screen.getByTestId(testId);
  expect(screen.queryByText(popoverValue)).not.toBeInTheDocument();
  fireEvent.mouseMove(helpHintButton);
  fireEvent.mouseEnter(helpHintButton);

  const popover = screen.getByRole('presentation');
  expect(popover).toBeInTheDocument();
});

test('keeps the popover open if the popover is hovered', async () => {
  getComponent();
  const helpHintButton = screen.getByTestId(testId);
  expect(screen.queryByText(popoverValue)).not.toBeInTheDocument();
  fireEvent.mouseMove(helpHintButton);
  fireEvent.mouseEnter(helpHintButton);

  const popover = screen.getByRole('presentation');

  fireEvent.mouseMove(popover);
  fireEvent.mouseEnter(popover);
  expect(popover).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByRole('presentation')).toBeInTheDocument();
  }, { timeout: 2000 });
});

test('popover without focusable children should open onPress and disappear in 1000ms after blur', async () => {
  getComponent();
  const helpHintButton = screen.getByTestId(testId);
  userEvent.tab();
  expect(helpHintButton).toHaveFocus();
  userEvent.type(helpHintButton, '{enter}', { skipClick: true });
  userEvent.tab();

  await waitFor(() => {
    expect(screen.queryByRole('presentation')).toBeInTheDocument();
  }, { timeout: 500 });

  await waitFor(() => {
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  }, { timeout: 1100 });
});

test('popover with focusable children should open onPress and focus the first focusable child', async () => {
  getComponentWithLink();
  const helpHintButton = screen.getByTestId(testId);
  userEvent.tab();
  expect(helpHintButton).toHaveFocus();
  userEvent.type(helpHintButton, '{enter}', { skipClick: true });

  await waitFor(() => {
    expect(screen.queryByRole('presentation')).toBeInTheDocument();
  }, { timeout: 3000 });
  const link = screen.queryByRole('link');
  expect(link).toBeInTheDocument();
  expect(link).toHaveFocus();
});

test('applies popoverProps', () => {
  getComponent({ popoverProps: { isOpen: true } });
  expect(screen.getByText(popoverValue)).toBeInTheDocument();
});

test('applies tooltipProps', () => {
  getComponent({ tooltipProps: { isOpen: true, maxWidth: 'unset', width: '1000px' } });

  const popover = screen.queryByRole('presentation');
  expect(popover).toBeInTheDocument();
  expect(popover).toHaveStyle('width: 1000px');
  expect(popover).toHaveStyle('maxWidth: unset');
});

test('applies iconButtonProps', () => {
  const newLabel = 'New label';
  getComponent({ iconButtonProps: { 'aria-label': newLabel } });
  expect(screen.getByLabelText(newLabel)).toBeInTheDocument();
});

test('popover stays open until closeDelay after mouse leaves trigger', async () => {
  const closeDelay = 10;

  getComponent({ closeDelay });
  const helpHintButton = screen.getByTestId(testId);
  fireEvent.mouseEnter(helpHintButton);
  fireEvent.mouseLeave(helpHintButton);

  await waitFor(() => {
    expect(screen.queryByRole('presentation')).toBeInTheDocument();
  }, { timeout: closeDelay - 1 });
});

test('popover closes after closeDelay when mouse leaves trigger', async () => {
  const closeDelay = 10;

  getComponent({ closeDelay });
  const helpHintButton = screen.getByTestId(testId);
  fireEvent.mouseEnter(helpHintButton);
  fireEvent.mouseLeave(helpHintButton);

  act(() => { jest.advanceTimersByTime(11); });

  await act(() => {
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  }, { timeout: closeDelay + 1 });
});

test('popover automatically closes in 1000ms after mouse leaves trigger', async () => {
  const oneSecond = 1000;
  getComponent();
  const helpHintButton = screen.getByTestId(testId);
  fireEvent.mouseEnter(helpHintButton);
  fireEvent.mouseLeave(helpHintButton);

  act(() => { jest.advanceTimersByTime(1001); });

  await act(() => {
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  }, { timeout: oneSecond + 1 });
});

// Needs to be added to each components test file
universalComponentTests({ renderComponent: props => <HelpHint {...defaultProps} {...props} /> });
