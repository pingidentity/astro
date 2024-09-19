import React, { useEffect, useReducer } from 'react';

import { act, render, screen } from '../../../../utils/testUtils/testWrapper';
import multiMessagesReducer, {
  addMessage,
  clearMessages,
  hideMessage,
  removeMessage,
  showMessage,
} from '../multiMessagesReducer';

const testId = 'test-messages';

const messages = [
  { text: 'uno', key: 1 },
  { text: 'dos', key: 2 },
  { text: 'tres', key: 3 },
];

const TestComponent = () => {
  const [state, dispatch] = useReducer(multiMessagesReducer, { container: [] });

  useEffect(() => {
    showMessage('container', { text: 'uno', key: 1 }, 500)(dispatch);
  }, []);

  return (
    <div data-testid={testId}>
      {state.container.map(({ key, text }) => <div key={key}>{text}</div>)}
    </div>
  );
};

const getComponent = (props = {}, renderFn = render) => renderFn(
  <TestComponent {...props} />,
);

test('should add a new message', () => {
  const state = multiMessagesReducer({ 'container-one': messages }, addMessage('container-one', { key: 4, text: 'quatro' }));
  expect(state['container-one'].length).toBe(4);
});

test('should hide a message by key', () => {
  const state = multiMessagesReducer({ 'container-one': messages }, hideMessage('container-one', 2));
  expect(state['container-one'].length).toBe(3);
  expect(state['container-one'][1].isHidden).toBe(true);
});

test('should remove a message by key', () => {
  const state = multiMessagesReducer({ 'container-one': messages }, removeMessage('container-one', 2));
  expect(state['container-one'].length).toBe(2);
});

test('should clear all messages', () => {
  const state = multiMessagesReducer({ 'container-one': messages }, clearMessages('container-one'));
  expect(state['container-one'].length).toBe(0);
});

test('should show and hide a message', () => {
  jest.useFakeTimers();

  getComponent();

  expect(screen.queryByTestId(testId)?.children.length).toBe(1);

  act(() => { jest.runAllTimers(); });

  expect(screen.queryByTestId(testId)?.children.length).toBe(0);
});
