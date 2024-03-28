import { v4 as uuid } from 'uuid';

import statuses from '../../../utils/devUtils/constants/statuses';

import messagesReducer, {
  Message,
  MessageActions,
} from './messagesReducer';

export const withContainer = (container, action) => ({
  container,
  ...action,
});

export const createMultiple = actionCreator => (container, ...args) => {
  return withContainer(container, actionCreator(...args));
};

/**
 * Create an action to add a message
 */
export const addMessage = createMultiple(messagesReducer.actions.addMessage);

/**
 * Create an action to hide a message by key
 */
export const hideMessage = createMultiple(messagesReducer.actions.hideMessage);

/**
 * Create an action to remove a message
 */
export const removeMessage = createMultiple(messagesReducer.actions.removeMessage);

/**
 * Create an action to clear all messages
 */
export const clearMessages = createMultiple(messagesReducer.actions.clearMessages);

/**
 * Create an action to add a message and then remove it if there's a timeout
 */
export const showMessage = (container, messageArg: Message, timeout = -1) => dispatch => {
  const message = { key: uuid(), ...messageArg };
  dispatch(addMessage(container, message));

  if (timeout >= 0) {
    setTimeout(() => {
      dispatch(hideMessage(container, message.key));

      setTimeout(() => {
        dispatch(removeMessage(container, message.key));
      }, 200);
    }, timeout);
  }

  return message;
};

const makeMultiShowMessage = (status, timeout) => (container, text) => (
  multiMessagesReducer.actions.showMessage(
    container,
    { text, status },
    timeout,
  )
);

export interface MultiMessagesReducerState {
  container?: string;
}

export interface MultiMessagesReducerActions {
  container?: string;
  action: MessageActions;
}

const multiMessagesReducer = (
  state,
  { container, ...action },
) => (
  container
    ? {
      ...state,
      [container]: messagesReducer(state[container], action),
    }
    : state
);

multiMessagesReducer.actions = {
  removeMessage,
  addMessage,
  hideMessage,
  clearMessages,
  showMessage,
  showSuccessMessage: makeMultiShowMessage(statuses.SUCCESS, 3000),
  showCriticalMessage: makeMultiShowMessage(statuses.ERROR, -1),
  showWarningMessage: makeMultiShowMessage(statuses.WARNING, -1),
};

export default multiMessagesReducer;
