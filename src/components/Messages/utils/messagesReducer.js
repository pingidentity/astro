import { v4 as uuid } from 'uuid';

/**
* A set of message util functions.
*/
export const messagesActions = {
  ADD_MESSAGE: 'ADD_MESSAGE',
  REMOVE_MESSAGE: 'REMOVE_MESSAGE',
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
};

/**
 * Create an action to add a message
 * The message object to be added
 */
export const addMessage = message => ({
  type: messagesActions.ADD_MESSAGE,
  message,
});

/**
 * Create an action to remove a message by key
 */
export const removeMessage = key => ({
  type: messagesActions.REMOVE_MESSAGE,
  key,
});

/**
 * Create an action to add a message and then remove it if there's a timeout
 */
export const showMessage = (messageArg, timeout = -1) => (dispatch) => {
  const message = { id: uuid(), ...messageArg };
  dispatch(addMessage(message));

  if (timeout >= 0) {
    setTimeout(() => {
      dispatch(removeMessage(message));
    }, timeout);
  }

  return message;
};

/** Create an action to clear all messages */
export const clearMessages = () => ({ type: messagesActions.CLEAR_MESSAGES });

/** Reducer to store a list of messages */
const messagesReducer = (
  state = [], { type, message, key } = {},
) => {
  switch (type) {
    case messagesActions.ADD_MESSAGE: return [...state, { key: uuid(), ...message }];
    case messagesActions.REMOVE_MESSAGE:
      return state.filter(search => key !== search.key);
    case messagesActions.CLEAR_MESSAGES: return [];
    default: return state;
  }
};

messagesReducer.actions = {
  addMessage,
  removeMessage,
  showMessage,
  clearMessages,
};

export default messagesReducer;
