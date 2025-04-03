import { Key } from 'react';
import { v4 as uuid } from 'uuid';

import { MessageItem, Status } from '../../../types';
import statuses from '../../../utils/devUtils/constants/statuses';

/**
* A set of message util functions.
*/
export const messagesActions = {
  ADD_MESSAGE: 'ADD_MESSAGE',
  HIDE_MESSAGE: 'HIDE_MESSAGE',
  REMOVE_MESSAGE: 'REMOVE_MESSAGE',
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
  SHOW_SUCCESS_MESSAGE: 'SHOW_SUCCESS_MESSAGE',
  SHOW_ERROR_MESSAGE: 'SHOW_ERROR_MESSAGE',
  SHOW_WARNING_MESSAGE: 'SHOW_WARNING_MESSAGE',
  MULTI_SHOW_SUCCESS_MESSAGE: 'MULTI_SHOW_SUCCESS_MESSAGE',
  MULTI_SHOW_CRITICAL_MESSAGE: 'MULTI_SHOW_CRITICAL_MESSAGE',
  MULTI_SHOW_WARNING_MESSAGE: 'MULTI_SHOW_WARNING_MESSAGE',
};

export interface Message extends MessageItem {
  isHidden?: boolean
}

type MessageAction = {
  message?: Message;
  key?: Key;
}

export interface AddMessageAction extends MessageAction {
  type: typeof messagesActions.ADD_MESSAGE;
}

export interface HideMessageAction extends MessageAction {
  type: typeof messagesActions.HIDE_MESSAGE;
}

export interface RemoveMessageAction extends MessageAction {
  type: typeof messagesActions.REMOVE_MESSAGE;
}

export interface ClearMessagesAction extends MessageAction {
  type?: typeof messagesActions.CLEAR_MESSAGES;
}

export type MessageActions =
  AddMessageAction | HideMessageAction | RemoveMessageAction | ClearMessagesAction;

export type MessagesState = Message[];

/**
 * Create an action to add a message
 * The message object to be added
 */
export const addMessage = (message: Message): AddMessageAction => ({
  type: messagesActions.ADD_MESSAGE,
  message,
});

/**
 * Create an action to hide a message by key
 */
export const hideMessage = (key: Key): HideMessageAction => ({
  type: messagesActions.HIDE_MESSAGE,
  key,
});

/**
 * Create an action to remove a message by key
 */
export const removeMessage = (key: Key): RemoveMessageAction => ({
  type: messagesActions.REMOVE_MESSAGE,
  key,
});

/**
 * Create an action to add a message and then remove it if there's a timeout
 */
export const showMessage = (messageArg: Message, timeout = -1) => (
  dispatch: (action: MessageActions) => void,
) => {
  const message = { key: uuid(), ...messageArg };
  dispatch(addMessage(message));

  if (timeout >= 0) {
    setTimeout(() => {
      dispatch(hideMessage(message.key));

      setTimeout(() => {
        dispatch(removeMessage(message.key));
      }, 200);
    }, timeout);
  }

  return message;
};

/** Create an action to clear all messages */
export const clearMessages = (): ClearMessagesAction => ({ type: messagesActions.CLEAR_MESSAGES });

// eslint-disable-next-line max-len
const makeShowMessage = (status: Status, timeout: number) => (text: string) => messagesReducer.actions.showMessage(
  { text, status },
  timeout,
);

/** Reducer to store a list of messages */
const messagesReducer = (
  state: MessagesState | [],
  action: MessageActions,
) => {
  switch (action.type) {
    case messagesActions.ADD_MESSAGE: return [...state, { ...action.message }];
    case messagesActions.HIDE_MESSAGE:
      return state.map(search => {
        if (search.key === action.key) {
          return {
            ...search,
            isHidden: true,
          };
        }
        return search;
      });
    case messagesActions.REMOVE_MESSAGE:
      return state.filter(search => action.key !== search.key);
    case messagesActions.CLEAR_MESSAGES: return [];
    default: return state;
  }
};

messagesReducer.actions = {
  addMessage,
  hideMessage,
  removeMessage,
  showMessage,
  clearMessages,
  showSuccessMessage: makeShowMessage(statuses.SUCCESS, 3000),
  showErrorMessage: makeShowMessage(statuses.ERROR, -1),
  showWarningMessage: makeShowMessage(statuses.WARNING, -1),
};

export default messagesReducer;
