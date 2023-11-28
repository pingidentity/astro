import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { useCollection } from '@react-stately/collections';
import { ListCollection } from '@react-stately/list';
import PropTypes from 'prop-types';

import { statusPropTypes } from '../../utils/docUtils/statusProp';
import Box from '../Box';

import Message from './Message';

const Messages = forwardRef((props, ref) => {
  const { items, onClose, ...others } = props;
  const [messages, setMessages] = useState([]);

  const factory = useCallback(nodes => new ListCollection(nodes), []);
  const collection = useCollection(props, factory);

  useEffect(() => {
    setMessages(Array.from(collection));
  }, [collection]);

  const removeMessage = key => {
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

Messages.propTypes = {
  /* For use with [dynamic collections](https://react-spectrum.adobe.com/react-stately/collections.html#dynamic-collections). */
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    text: PropTypes.string,
    node: PropTypes.node,
    ...statusPropTypes,
  })),
  /* Callback for clicking the message's close button */
  onClose: PropTypes.func,
};

Messages.defaultProps = {
  items: [],
};

export default Messages;
