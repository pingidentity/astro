import { v4 as uuid } from 'uuid';
import messagesReducer, {
  addMessage as addMessageSingle,
  removeMessage as removeMessageSingle,
  clearMessages as clearMessagesSingle,
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
export const showMessage = (container, messageArg, timeout = -1) => (dispatch) => {
  const message = { id: uuid(), ...messageArg };
  dispatch(addMessage(container, message));

  if (timeout >= 0) {
    setTimeout(() => {
      dispatch(removeMessage(container, message));
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
  clearMessages,
  showMessage,
};

export default multiMessagesReducer;
