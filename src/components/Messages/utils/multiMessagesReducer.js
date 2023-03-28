import { v4 as uuid } from 'uuid';

import messagesReducer, {
  addMessage as addMessageSingle,
  clearMessages as clearMessagesSingle,
  hideMessage as hideMessageSingle,
  removeMessage as removeMessageSingle,
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
export const addMessage = createMultiple(addMessageSingle);

/**
 * Create an action to hide a message by key
 */
export const hideMessage = createMultiple(hideMessageSingle);

/**
 * Create an action to remove a message
 */
export const removeMessage = createMultiple(removeMessageSingle);

/**
 * Create an action to clear all messages
 */
export const clearMessages = createMultiple(clearMessagesSingle);

/**
 * Create an action to add a message and then remove it if there's a timeout
 */
export const showMessage = (container, messageArg, timeout = -1) => dispatch => {
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

const multiMessagesReducer = (
  state = {}, { container, ...action } = {},
) => (
  container
    ? ({
      ...state,
      [container]: messagesReducer(state[container], action),
    })
    : state
);

multiMessagesReducer.actions = {
  removeMessage,
  addMessage,
  hideMessage,
  clearMessages,
  showMessage,
};

export default multiMessagesReducer;
