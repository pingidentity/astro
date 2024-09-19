import React, { useEffect, useReducer } from 'react';

import { act, render, screen } from '../../../../utils/testUtils/testWrapper';
import messagesReducer, {
  addMessage,
  clearMessages,
  hideMessage,
  removeMessage,
  showMessage,
} from '../messagesReducer';

const testId = 'test-messages';

const messages = [
  { text: 'uno', key: 1 },
  { text: 'dos', key: 2 },
  { text: 'tres', key: 3 },
];

const TestComponent = () => {
  const [state, dispatch] = useReducer(messagesReducer, []);

  useEffect(() => {
    showMessage({ text: 'uno', key: 1 }, 500)(dispatch);
  }, []);

  return (
    <div data-testid={testId}>
      {state.map(({ key, text }) => <div key={key}>{text}</div>)}
    </div>
  );
};

const getComponent = (props = {}, renderFn = render) => renderFn(
  <TestComponent {...props} />,
);

test('should create an empty state', () => {
  const state = messagesReducer([], {});
  expect(state.length).toBe(0);
});

test('should add a new message', () => {
  const state = messagesReducer(messages, addMessage({ key: 4, text: 'quatro' }));
  expect(state.length).toBe(4);
});

test('should hide a message by key', () => {
  const state = messagesReducer(messages, hideMessage(2));
  expect(state.length).toBe(3);
  expect(state[1].isHidden).toBe(true);
});

test('should remove a message by key', () => {
  const state = messagesReducer(messages, removeMessage(2));
  expect(state.length).toBe(2);
});

test('should clear all messages', () => {
  const state = messagesReducer(messages, clearMessages());
  expect(state.length).toBe(0);
});

test('should show and hide a message', () => {
  jest.useFakeTimers();
  getComponent();
  expect(screen.queryByTestId(testId)?.children.length).toBe(1);
  act(() => { jest.runAllTimers(); });
  expect(screen.queryByTestId(testId)?.children.length).toBe(0);
});
