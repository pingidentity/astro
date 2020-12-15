import React, { createContext, useContext } from 'react';
import { useMessagesStore } from './Messages.util';

const MessagesContext = createContext({
    messages: [],
});

const MessagesProvider = (props) => {
    const messagesProps = useMessagesStore();
    return <MessagesContext.Provider {...props} value={messagesProps} />;
};

export const useMessagesContext = () => useContext(MessagesContext);

export default MessagesProvider;
