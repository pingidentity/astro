import React, { forwardRef, Key, useCallback, useEffect, useState } from 'react';
import { Node } from 'react-stately';
import { CollectionFactory, useCollection } from '@react-stately/collections';
import { ListCollection } from '@react-stately/list';

import { CollectionOptions, MessageItem, MessagesProps } from '../../types';
import Box from '../Box';

import Message from './Message';

const Messages = forwardRef<HTMLDivElement, MessagesProps<MessageItem>>((props, ref) => {
  const { onClose, ...others } = props;
  const [messages, setMessages] = useState<MessageItem[]>([]);

  const factory = useCallback(nodes => new ListCollection(
    nodes as Iterable<Node<MessageItem>>,
  ), []);

  const collection = useCollection<MessageItem, ListCollection<MessageItem>>(
    props as CollectionOptions<MessageItem, ListCollection<MessageItem>>,
    factory as CollectionFactory<MessageItem, ListCollection<MessageItem>>);

  useEffect(() => {
    setMessages(Array.from(collection));
  }, [collection]);

  const removeMessage = (key: Key) => {
    setMessages(messages.map(item => (item.key === key
      ? {
        ...item,
        props: {
          ...item.props,
          isHidden: true,
        },
      }
      : item
    )));

    setTimeout(() => setMessages(messages.filter(item => item.key !== key)), 200);
  };

  const onCloseHandler = key => {
    if (onClose) {
      onClose(key);
    }
    removeMessage(key);
  };

  return (
    <Box
      ref={ref}
      variant="message.wrapper"
      {...others}
    >
      {messages.map(item => (
        <Message
          key={item.key}
          item={item}
          onClose={onCloseHandler}
        />
      ))}
    </Box>
  );
});

Messages.defaultProps = {
  items: [],
};

export default Messages;
