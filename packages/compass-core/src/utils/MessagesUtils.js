import { useReducer, useCallback, useState, useEffect } from 'react';
import { isEqual } from 'underscore';
import messagesReducer, { addMessage, clearMessages, removeMessage, showMessage } from './reducers/messagesReducer';

/**
* @module utils/MessagesUtils
* @desc A set of message util functions.
*/

export const doMessagesMatch = (first, second) => {
    if (first.id !== undefined || second.id !== undefined) {
        return first.id === second.id;
    }
    return first.message === second.message;
};

const doesContainMessage = (list, message) => (
    list.find(search => doMessagesMatch(search, message)) !== undefined
);

/** Custom hook to create a messages store
 *  @param {array} initial
 *  List of messages to initialize the store with
 *  @returns {object} Object with a list of messages
 *      and functions to manage the messages in the store
 */
export const useMessagesStore = (initial = []) => {
    const [messages, dispatch] = useReducer(messagesReducer, initial);

    const showMessageCallback = useCallback((message, timeout) => (
        showMessage(message, timeout)(dispatch)
    ), [dispatch]);

    const addMessageCallback = useCallback(
        message => dispatch(addMessage(message)), [dispatch],
    );

    const removeMessageCallback = useCallback(
        message => dispatch(removeMessage(message)), [dispatch],
    );

    const clearMessagesCallback = useCallback(
        () => dispatch(clearMessages()),
        [dispatch],
    );

    return {
        messages,
        showMessage: showMessageCallback,
        addMessage: addMessageCallback,
        removeMessage: removeMessageCallback,
        clearMessages: clearMessagesCallback,
    };
};

export const mergeRememberedMessages = (messages, remembered) => {
    const merged = [];
    let i = 0;
    let j = 0;

    // if nothing is different from remembered, we'll return the same array
    let changed = false;

    while (i < messages.length || j < remembered.length) {
        const message = messages[i];
        const rememberedMessage = remembered[j];

        // easier this way as there's only one outcome that means it's unchanged
        let notChanged = false;

        if (message && rememberedMessage) {
            if (doMessagesMatch(message, rememberedMessage)) {
                // if they're the same, add it, show it
                const mergedMessage = { ...message, isHidden: false };
                merged.push(mergedMessage);
                i += 1;
                j += 1;
                if (isEqual(mergedMessage, rememberedMessage)) {
                    notChanged = true;
                }
            } else if (!doesContainMessage(remembered, message)) {
                // if the messages one is not remembered, add it, hide it
                merged.push({ ...message, isHidden: true });
                i += 1;
            } else if (!doesContainMessage(messages, rememberedMessage)) {
                // if the remembered one is not in messages, add it, hide it
                merged.push({ ...rememberedMessage, isHidden: true });
                j += 1;
            } else {
                // if messages are different but in different places in both lists,
                // add the one from messages, show it
                merged.push({ ...message, isHidden: false });
                i += 1;
                j += 1;
            }
        } else if (message) {
            // if there are more messages at the end, add them, hide them
            merged.push({ ...message, isHidden: true });
            i += 1;
        } else {
            // if there are more remembered messages at the end, add them, hide them
            merged.push({ ...rememberedMessage, isHidden: true });
            j += 1;
        }

        if (!notChanged) {
            changed = true;
        }
    }

    return changed ? merged : remembered;
};

export const useMessageTransitions = (messages, interval) => {
    const [rememberedMessages, setRememberedMessages] = useState(messages);

    // merge current messages with remembered ones, setting isHidden to true if they don't
    // show up in both lists
    const mergedMessages = mergeRememberedMessages(messages, rememberedMessages);

    // update remembered messages
    useEffect(() => { // eslint-disable-line consistent-return
        if (rememberedMessages !== mergedMessages) {
            setRememberedMessages(mergedMessages);

            const cleanupTask = setTimeout(() => {
                setRememberedMessages(mergedMessages.filter(
                    message => doesContainMessage(messages, message),
                ));
            }, interval);

            return () => {
                // reset the timeout for cleaning up
                clearTimeout(cleanupTask);
            };
        }
    }, [messages]);

    return mergedMessages;
};
