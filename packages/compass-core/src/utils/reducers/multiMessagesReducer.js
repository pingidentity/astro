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

/** Create an action to add a message
 *  @param {string} container
 *  Id of the message container
 *  @param {object} message
 *  The message object to be added
 */
export const addMessage = createMultiple(addMessageSingle);

/** Create an action to remove a message
 *  @param {string} container
 *  Id of the message container
 *  @param {object} message
 *  The message object to be removed. It'll match by the `id` first.
 */
export const removeMessage = createMultiple(removeMessageSingle);

/** Create an action to clear all messages
 *  @param {string} container
 *  Id of the message container
*/
export const clearMessages = createMultiple(clearMessagesSingle);

/** Create an action to add a message and then remove it if there's a timeout
 *  @param {string} container
 *  Id of the message container
 *  @param {object} message
 *  The message object to be shown
 *  @param {number} timeout
 *  When provided, the number of milliseconds the message will show for
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
    container ? ({
        ...state,
        [container]: messagesReducer(state[container], action),
    }) : state
);

multiMessagesReducer.actions = {
    removeMessage,
    addMessage,
    clearMessages,
    showMessage,
};

export default multiMessagesReducer;
