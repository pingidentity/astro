import messagesReducerCore from '@pingux/compass-core/lib/utils/reducers/messagesReducer';
import multiMessagesReducerCore from '@pingux/compass-core/lib/utils/reducers/multiMessagesReducer';

const messagesReducer = messagesReducerCore;
export const multiMessagesReducer = multiMessagesReducerCore;

const makeShowMessage = (variant, timeout) => message => messagesReducer.actions.showMessage(
    { message, variant },
    timeout,
);

const makeMultiShowMessage = (variant, timeout) => (container, message) => (
    multiMessagesReducer.actions.showMessage(
        container,
        { message, variant },
        timeout,
    )
);

messagesReducer.actions = {
    ...messagesReducer.actions,
    showSuccessMessage: makeShowMessage('success', 3000),
    showCriticalMessage: makeShowMessage('critical', -1),
    showWarningMessage: makeShowMessage('warning', -1),
};

multiMessagesReducer.actions = {
    ...multiMessagesReducer.actions,
    showSuccessMessage: makeMultiShowMessage('success', 3000),
    showCriticalMessage: makeMultiShowMessage('critical', -1),
    showWarningMessage: makeMultiShowMessage('warning', -1),
};

export default messagesReducer;
