import React, { useState } from 'react';

import {
  Box,
  Button,
  Item,
  Messages,
} from '../index';

export default {
  title: 'Design Patterns/Messages',
};

export const Default = () => {
  const messages = {
    neutral: {
      text: 'Here is a very neutral thing',
    },
    success: {
      text: 'Form saved successfully',
      status: 'success',
    },
    warning: {
      text: 'Something unexpected happened.',
      status: 'warning',
    },
    error: {
      text: 'Not saved! We could not validate one of the fields. Please see inline message below.',
      status: 'error',
    },
  };

  const sx = {
    mainContentBox: {
      p: 'xx',
    },
  };

  const [messageState, setMessageState] = useState(null);

  const handleUpdateMessage = message => {
    setMessageState(message);
    setTimeout(() => setMessageState(null), 3000);
  };

  return (
    <>
      <Box isRow gap="lg" sx={sx.mainContentBox}>
        <Button onPress={() => handleUpdateMessage(messages.neutral)}>Neutral</Button>
        <Button onPress={() => handleUpdateMessage(messages.success)}>Success</Button>
        <Button onPress={() => handleUpdateMessage(messages.warning)}>Warning</Button>
        <Button onPress={() => handleUpdateMessage(messages.error)}>Error</Button>
      </Box>
      <Box>
        <Messages>
          {messageState
          && <Item status={messageState.status}>{messageState.text}</Item>}
        </Messages>
      </Box>
    </>
  );
};
