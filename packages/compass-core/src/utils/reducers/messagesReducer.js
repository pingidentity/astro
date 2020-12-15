import { v4 as uuid } from 'uuid';
import { doMessagesMatch } from '../MessagesUtils';

/**
* @module utils/reducers/messagesReducer
* @desc A set of message util functions.
*/

export const messagesActions = {
    ADD_MESSAGE: 'ADD_MESSAGE',
    REMOVE_MESSAGE: 'REMOVE_MESSAGE',
    CLEAR_MESSAGES: 'CLEAR_MESSAGES',
};

/** Create an action to remove a message
 *  @param {object} message
 *  The message object to be removed. It'll match by the `id` first.
 */
export const removeMessage = message => ({
    type: messagesActions.REMOVE_MESSAGE,
    message,
});

/** Create an action to add a message
 *  @param {object} message
 *  The message object to be added
 */
export const addMessage = message => ({
    type: messagesActions.ADD_MESSAGE,
    message,
});

/** Create an action to add a message and then remove it if there's a timeout
 *  @param {object} message
 *  The message object to be shown
 *  @param {number} timeout
 *  When provided, the number of milliseconds the message will show for
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
    state = [], { type, message } = {},
) => {
    switch (type) {
        case messagesActions.ADD_MESSAGE: return [...state, { id: uuid(), ...message }];
        case messagesActions.REMOVE_MESSAGE:
            return state.filter(search => !doMessagesMatch(search, message));
        case messagesActions.CLEAR_MESSAGES: return [];
        default: return state;
    }
};

messagesReducer.actions = {
    removeMessage,
    addMessage,
    clearMessages,
    showMessage,
};

export default messagesReducer;
