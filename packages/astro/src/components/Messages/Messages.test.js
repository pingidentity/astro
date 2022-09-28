import React from 'react';
import { Item } from '@react-stately/collections';
import userEvent from '@testing-library/user-event';

import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';

import Messages, { messagesReducerStory, multiMessagesReducerStory } from '.';
import { ARIA_STATUSES } from '../Messages/Message';

jest.mock('@react-aria/live-announcer', () => ({ announce: jest.fn() }));

const testId = 'test-messages';
const defaultProps = {
  'data-testid': testId,
};
const items = [
  {
    key: 'message1',
    text: 'Here\'s a very neutral thing',
    isHidden: true,
  },
  {
    key: 'message2',
    text: 'Form saved successfully',
    status: 'success',
  },
];

const getComponent = (props = {}, renderFn = render) => renderFn(
  <Messages {...defaultProps} {...props}>
    <Item key="message1" data-id="message1">Here is a very neutral thing</Item>
    <Item key="message2" data-id="message2" status="success">Form saved successfully</Item>
  </Messages>,
);

const getWithDynamicList = (props = {}, renderFn = render) => renderFn(
  <Messages {...defaultProps} {...props}>
    {item => <Item {...item}>{item.text}</Item>}
  </Messages>,
);

// Need to be added to each test file to test accessibility using axe.
axeTest(getComponent);

test('renders Messages component in the default state', () => {
  getComponent();
  const messages = screen.getByTestId(testId);
  expect(messages).toBeInstanceOf(HTMLDivElement);
  expect(messages).toBeInTheDocument();
});

test('message with prop `isHidden` has max-height: 0', () => {
  getWithDynamicList({ items });
  const { firstChild: firstMessage } = screen.getByTestId(testId);
  expect(firstMessage).toHaveStyle('max-height: 0');
});

test('renders Messages component in the default state with dynamic list', () => {
  getWithDynamicList({ items });
  const messages = screen.getByTestId(testId);
  expect(messages).toBeInstanceOf(HTMLDivElement);
  expect(messages).toBeInTheDocument();
});

test('click on close button fires `onClose` callback', () => {
  const onClose = jest.fn();
  getComponent({ onClose });
  const buttons = screen.getAllByRole('button');
  userEvent.click(buttons[0]);
  expect(onClose).toHaveBeenCalled();
});

test('`onClose` get as first arg key of message', () => {
  const onClose = jest.fn();
  getComponent({ onClose });
  const buttons = screen.getAllByRole('button');
  userEvent.click(buttons[0]);
  expect(onClose).toHaveBeenCalledWith('message1');
});

test('click on close button removes message after delay', () => {
  getComponent();
  const messages = screen.getByTestId(testId);
  expect(messages.childElementCount).toBe(2);

  const buttons = screen.getAllByRole('button');
  userEvent.click(buttons[0]);
  setTimeout(() => {
    expect(messages.childElementCount).toBe(1);
  }, 200);
});

test('Item accepts a data-id and the data-id can be found in the DOM', () => {
  getComponent();
  const { firstChild: firstMessage } = screen.getByTestId(testId);
  expect(firstMessage).toHaveAttribute('data-id', 'message1');
});

test('message has role and aria-live attributes', () => {
  getComponent();
  const { firstChild: firstMessage } = screen.getByTestId(testId);
  expect(firstMessage).toHaveAttribute('role', 'status');
  expect(firstMessage).toHaveAttribute('aria-live', 'polite');
});

test('messages with a status have an aria-label announcing the status', () => {
  getComponent();
  const successMessage = screen.getAllByRole('status')[1];
  expect(successMessage).toHaveAttribute('aria-label', ARIA_STATUSES[0]);
});

test('messages without a status do not have an aria-label announcing the status', () => {
  getComponent();
  const statusMessage = screen.getAllByRole('status')[0];
  Object.keys(ARIA_STATUSES).map(key =>
    expect(statusMessage).not.toHaveAttribute('aria-label', ARIA_STATUSES[key]),
  );
});

test('should render messages with messagesReducerStory', () => {
  getComponent();
  messagesReducerStory.actions.showSuccessMessage();
  expect(screen.getByTestId(testId)).toBeInTheDocument();
});

test('should render messages with multiMessagesReducerStory', () => {
  getComponent();
  multiMessagesReducerStory.actions.showSuccessMessage();
  expect(screen.getByTestId(testId)).toBeInTheDocument();
});
