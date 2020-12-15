import { useCallback } from 'react';
import { useMessagesStore as coreUseMessagesStore } from '@pingux/compass-core/lib/utils/MessagesUtils';

/**
* @module MessagesUtils
* @desc A set of message util functions.
*/

/** Custom hook that creates a message store and returns the messages
 *  as well as action creators for `showSuccessMessage`, `showCriticalMessage`,
 *  `showWarningMessage`, `showMessage`, `removeMessage`, and `clearMessages`
 */
export const useMessagesStore = (initial) => {
    const props = coreUseMessagesStore(initial);

    const makeShowFn = (variant, timeout) => (
        message => props.showMessage({ message, variant }, timeout)
    );

    const showSuccessMessage = useCallback(makeShowFn('success', 3000), [props.showMessage]);
    const showCriticalMessage = useCallback(makeShowFn('critical', -1), [props.showMessage]);
    const showWarningMessage = useCallback(makeShowFn('warning', -1), [props.showMessage]);

    return {
        ...props,
        showSuccessMessage,
        showCriticalMessage,
        showWarningMessage,
    };
};
