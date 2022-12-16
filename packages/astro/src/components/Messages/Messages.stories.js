import React, { useEffect, useReducer, useState } from 'react';
import { Item } from '@react-stately/collections';
import AccountIcon from 'mdi-react/AccountIcon';

import statuses from '../../utils/devUtils/constants/statuses';
import { Box, Button, Messages } from '../..';
import { messagesReducerStory as messagesReducer, multiMessagesReducerStory as multiMessagesReducer } from './index';

export default {
  title: 'Components/Messages',
  component: Messages,
  argTypes: {
    items: {
      control: {
        type: 'none',
      },
    },
    onClose: {
      control: {
        type: 'none',
      },
    },
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

const messages = [
  {
    key: 'message1',
    text: 'Here\'s a very neutral thing',
  },
  {
    key: 'message2',
    text: 'Form saved successfully',
    status: 'success',
  },
  {
    key: 'message3',
    text: 'Something unexpected happened.',
    status: 'warning',
  },
  {
    key: 'message4',
    text: 'Not saved! We could not validate one of the fields. Please see inline message below.',
    status: 'error',
  },
];

const messageText = [
  'WINDMILLS DO NOT WORK THAT WAY! GOOD NIGHT! Oh yeah, good luck with that.',
  "Oh no! The professor will hit me! But if Zoidberg 'fixes' it… then perhaps gifts! You've killed me! Oh, you've killed me!",
  'Does anybody else feel jealous and aroused and worried?',
  "Stop it, stop it. It's fine. I will 'destroy' you! Um, is this the boring, peaceful kind of taking to the streets?",
  "She also liked to shut up! Fry! Stay back! He's too powerful!",
  "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel.",
];

export const Default = args => (
  <Messages {...args}>
    <Item key="message1" data-id="message1">Here is a very neutral thing</Item>
    <Item key="message2" data-id="message2" status="success">Form saved successfully</Item>
  </Messages>
);

export const DefaultDynamic = args => (
  // messages = [{...}]
  <Messages {...args} items={messages}>
    {item => <Item {...item}>{item.text}</Item>}
  </Messages>
);

export const Controlled = (args) => {
  // messages = [{...}]
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(messages);
  }, []);

  const removeMessage = (key) => {
    setItems(items.map(item => (item.key === key
      ? {
        ...item,
        isHidden: true,
      }
      : item
    )));

    setTimeout(() => setItems(items.filter(item => item.key !== key)), 200);
  };

  return (
    <Messages {...args} items={items} onClose={removeMessage}>
      {item => <Item {...item}>{item.text}</Item>}
    </Messages>
  );
};

export const ControlledWithButton = (args) => {
  const [items, setItems] = useState([]);

  const addMessage = () => {
    setItems([...items, {
      key: `message${items.length + 1}`,
      text: messageText[Math.floor(Math.random() * 6)],
      status: Object.values(statuses)[Math.floor(Math.random() * 4)],
    }]);
  };

  const removeMessage = (key) => {
    setItems(items.map(item => (item.key === key
      ? {
        ...item,
        isHidden: true,
      }
      : item
    )));

    setTimeout(() => setItems(items.filter(item => item.key !== key)), 200);
  };

  return (
    <>
      <Button onPress={addMessage}>Click me!</Button>
      <Messages {...args} items={items} onClose={removeMessage}>
        {item => <Item {...item}>{item.text}</Item>}
      </Messages>
    </>
  );
};

export const WithCustomColorsAndIcons = args => (
  <Messages {...args}>
    <Item bg="accent.99" color="active" icon={AccountIcon}>We have to take a look with this camera.</Item>
    <Item bg="accent.99" color="active" icon={AccountIcon}>Who said that? SURE you can die! You want to die?! Oh yeah, good luck with that. Stop! Do not shoot fire stick in space canoe! Cause explosive decompression!</Item>
    <Item bg="accent.99" color="active" icon={AccountIcon}>Oh God, what have I done?</Item>
  </Messages>
);

export const UseReducer = () => {
  // import { messagesReducer as messagesReducerCore } from '@pingux/astro';
  // const messagesReducer = messagesReducerCore;
  // const makeShowMessage = (status, timeout) => text => messagesReducer.actions.showMessage(
  //   { text, status },
  //   timeout,
  // );
  // messagesReducer.actions = {
  //   ...messagesReducer.actions,
  //   showSuccessMessage: makeShowMessage('success', 3000),
  //   showErrorMessage: makeShowMessage('error', -1),
  //   showWarningMessage: makeShowMessage('warning', -1),
  // };

  const [items, dispatch] = useReducer(messagesReducer);

  const showAMessage = () => {
    const actionFn = [
      messagesReducer.actions.showSuccessMessage,
      messagesReducer.actions.showErrorMessage,
      messagesReducer.actions.showWarningMessage,
    ][Math.floor(Math.random() * 3)];
    const message = messageText[Math.floor(Math.random() * 6)];
    actionFn(message)(dispatch);
  };

  const removeMessage = (key) => {
    dispatch(messagesReducer.actions.hideMessage(key));
    setTimeout(() => dispatch(messagesReducer.actions.removeMessage(key)), 200);
  };

  return (
    <>
      <Button onPress={showAMessage}>Add Message</Button>
      {
        items?.length > 0
        &&
        <Button
          mt="md"
          onPress={() => dispatch(messagesReducer.actions.clearMessages())}
        >
          Clear messages
        </Button>
      }
      <Messages
        items={items}
        onClose={removeMessage}
      >
        {item => <Item {...item}>{item.text}</Item>}
      </Messages>
    </>
  );
};

export const UseReducerWithMultipleContainers = () => {
  const [items, dispatch] = useReducer(multiMessagesReducer, {
    'container-one': [], 'container-two': [],
  });

  const showAMessage = (container) => {
    const actionFn = [
      multiMessagesReducer.actions.showSuccessMessage,
      multiMessagesReducer.actions.showCriticalMessage,
      multiMessagesReducer.actions.showWarningMessage,
    ][Math.floor(Math.random() * 3)];
    const message = messageText[Math.floor(Math.random() * 6)];
    actionFn(container, message)(dispatch);
  };

  const removeMessage = (key, container) => {
    dispatch(multiMessagesReducer.actions.hideMessage(container, key));
    setTimeout(() => dispatch(multiMessagesReducer.actions.removeMessage(container, key)), 200);
  };

  return (
    <>
      <Box isRow>
        <Button onPress={() => showAMessage('container-one')}>Add message to the left</Button>
        <Button ml="md" onPress={() => showAMessage('container-two')}>Add message to the right</Button>
      </Box>
      <Messages
        items={items['container-one']}
        onClose={key => removeMessage(key, 'container-one')}
        sx={{ width: '45%' }}
      >
        {item => <Item {...item}>{item.text}</Item>}
      </Messages>
      <Messages
        items={items['container-two']}
        onClose={key => removeMessage(key, 'container-two')}
        sx={{ left: '55%' }}
      >
        {item => <Item {...item}>{item.text}</Item>}
      </Messages>
    </>
  );
};

export const WithTextStyling = (args) => {
  const items = [
    {
      key: 'message1',
      node: <strong>Here is a very neutral thing</strong>,
    },
    {
      key: 'message2',
      text: 'Form saved successfully',
      status: 'success',
    },
    {
      key: 'message3',
      text: 'Something unexpected happened.',
      status: 'warning',
    },
    {
      key: 'message4',
      node: (
        <>
          <b>Not saved! </b>
          We could not validate one of the fields. Please see inline message below.
        </>
      ),
      status: 'error',
    },
  ];

  return (
    <Messages {...args} items={items}>
      {item => <Item {...item}>{item.node || item.text}</Item>}
    </Messages>
  );
};
