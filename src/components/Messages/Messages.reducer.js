import {
  messagesReducer as messagesReducerCore,
  multiMessagesReducer as multiMessagesReducerCore,
} from './utils';

export const messagesReducer = messagesReducerCore;
export const multiMessagesReducer = multiMessagesReducerCore;

const makeShowMessage = (status, timeout) => text => messagesReducer.actions.showMessage(
  { text, status },
  timeout,
);

const makeMultiShowMessage = (status, timeout) => (container, text) => (
  multiMessagesReducer.actions.showMessage(
    container,
    { text, status },
    timeout,
  )
);

messagesReducer.actions = {
  ...messagesReducer.actions,
  showSuccessMessage: makeShowMessage('success', 3000),
  showErrorMessage: makeShowMessage('error', -1),
  showWarningMessage: makeShowMessage('warning', -1),
};

multiMessagesReducer.actions = {
  ...multiMessagesReducer.actions,
  showSuccessMessage: makeMultiShowMessage('success', 3000),
  showCriticalMessage: makeMultiShowMessage('error', -1),
  showWarningMessage: makeMultiShowMessage('warning', -1),
};

export default messagesReducer;
