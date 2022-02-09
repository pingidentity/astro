import React, { useState } from 'react';
import { announce } from '@react-aria/live-announcer';
import { Item } from '@react-stately/collections';
import userEvent from '@testing-library/user-event';

import axeTest from '../../utils/testUtils/testAxe';
import { render, screen } from '../../utils/testUtils/testWrapper';

import Messages, { messagesReducerStory, multiMessagesReducerStory } from '.';
import Button from '../Button';

jest.mock('@react-aria/live-announcer');

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

const MessagesWithButton = (props) => {
  const [messages, setMessages] = useState([]);

  const addMessage = () => {
    setMessages([...messages, {
      key: `message${messages.length + 1}`,
      text: `New message ${messages.length + 1}`,
      status: 'default',
    }]);
  };

  return (
    <>
      <Button onPress={addMessage}>Click me!</Button>
      <Messages items={messages} {...props}>
        {item => <Item {...item}>{item.text}</Item>}
      </Messages>
    </>
  );
};

const getWithButton = (props = {}, renderFn = render) => renderFn(
  <MessagesWithButton {...defaultProps} {...props} />,
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

describe('announcements', () => {
  // Live announcer is (mostly) only used on apple devices for VoiceOver.
  // Mock navigator.platform so we take that codepath.
  let platformMock;
  beforeEach(() => {
    platformMock = jest.spyOn(navigator, 'platform', 'get').mockImplementation(() => 'MacIntel');
  });

  afterEach(() => {
    jest.clearAllMocks();
    platformMock.mockRestore();
  });

  test('should announce on render', () => {
    getWithDynamicList({ items });
    items.forEach(item => expect(announce).toHaveBeenCalledWith(item.text, 'polite'));
  });

  test('should announce on adding item', () => {
    getWithButton();

    const messages = screen.getByTestId(testId);
    expect(messages.childElementCount).toBe(0);

    const button = screen.getByText('Click me!');
    userEvent.click(button);
    expect(messages.childElementCount).toBe(1);
    expect(announce).toHaveBeenCalledWith('New message 1', 'polite');
  });
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
