import React from 'react';
import PropTypes from 'prop-types';
import { noop, partial } from 'underscore';
import { useMessageTransitions } from '@pingux/compass-core/lib/utils/MessagesUtils';
import { Portal } from 'react-portal';
import Box from '../Box';
import Message, { variants } from './Message';
import { useMessagesContext } from './MessagesProvider';

// don't want to set a defaultProp for messages, but I also don't want to
// generate a new empty array on every render because useMessageTransitions
// checks if messages has changed
const noMessages = [];

/** Component for displaying feedback to the user.
 */
const Messages = (props) => {
    const {
        children,
        hasNoPortal,
        messages = noMessages,
        onClose = noop,
        removeMessage = onClose, // eslint-disable-line react/prop-types
        addMessage, // eslint-disable-line react/prop-types
        clearMessages, // eslint-disable-line react/prop-types
        showMessage, // eslint-disable-line react/prop-types
        showSuccessMessage, // eslint-disable-line react/prop-types
        showCriticalMessage, // eslint-disable-line react/prop-types
        showWarningMessage, // eslint-disable-line react/prop-types
        ...others
    } = { ...useMessagesContext(), ...props };

    const messagesChildren = useMessageTransitions(messages, 200).map(
        ({ id, message, variant, isHidden }) => (
            <Message
                variant={variant}
                key={id || message}
                onClose={partial(removeMessage, { id, message })}
                isHidden={isHidden}
            >
                {message}
            </Message>
        ),
    );

    const content = (
        <Box position="absolute" right="lg" bottom="lg" maxWidth="column" zIndex={100} {...others}>
            {[...messagesChildren, ...children].map(child => child)}
        </Box>
    );

    return hasNoPortal ? content : <Portal>{content}</Portal>;
};

Messages.propTypes = {
    /** Set true to render the messages in the same part of the DOM
     *  rather than in a portal.
     */
    hasNoPortal: PropTypes.bool,
    /** List of objects that defines messages */
    messages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        message: PropTypes.node,
        variant: PropTypes.oneOf(Object.keys(variants)),
    })),
    /** Callback for closing a message
     *  @param {string} messageId
     */
    onClose: PropTypes.func,
};

Messages.defaultProps = {
    hasNoPortal: false,
};

export default Messages;
