import React, { useEffect, useReducer, useState } from 'react';
import { Item } from 'react-stately';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Button,
  Messages,
} from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.ts';
import statuses from '../../utils/devUtils/constants/statuses';

import {
  messagesReducerStory as messagesReducer,
  multiMessagesReducerStory as multiMessagesReducer,
} from './index';
import MessagesReadme from './Messages.mdx';

export default {
  title: 'Components/Messages',
  component: Messages,
  decorators: [withDesign],
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
      page: () => (
        <>
          <MessagesReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
};

const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const messages = [
  {
    key: 'message1',
    text: loremText,
  },
  {
    key: 'message2',
    text: loremText,
    status: 'success',
  },
  {
    key: 'message3',
    text: loremText,
    status: 'warning',
  },
  {
    key: 'message4',
    text: loremText,
    status: 'error',
  },
];

export const Default = args => (
  <Messages {...args}>
    <Item key="message1" data-id="message1">{loremText}</Item>
    <Item key="message2" data-id="message2" status="success">{loremText}</Item>
  </Messages>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.messages.default,
  },
};

export const DefaultDynamic = args => (
  // messages = [{...}]
  <Messages {...args} items={messages}>
    {item => <Item {...item}>{item.text}</Item>}
  </Messages>
);

export const Controlled = args => {
  // messages = [{...}]
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(messages);
  }, []);

  const removeMessage = key => {
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

export const ControlledWithButton = args => {
  const [items, setItems] = useState([]);

  const addMessage = () => {
    setItems([...items, {
      key: `message${items.length + 1}`,
      text: loremText,
      status: Object.values(statuses)[Math.floor(Math.random() * 4)],
    }]);
  };

  const removeMessage = key => {
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
    <Item bg="accent.99" color="active" icon={AccountIcon}>{loremText}</Item>
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
    actionFn(loremText)(dispatch);
  };

  const removeMessage = key => {
    dispatch(messagesReducer.actions.hideMessage(key));
    setTimeout(() => dispatch(messagesReducer.actions.removeMessage(key)), 200);
  };

  return (
    <>
      <Button onPress={showAMessage}>Add Message</Button>
      {
        items?.length > 0
        && (
          <Button
            mt="md"
            onPress={() => dispatch(messagesReducer.actions.clearMessages())}
          >
            Clear messages
          </Button>
        )
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

  const showAMessage = container => {
    const actionFn = [
      multiMessagesReducer.actions.showSuccessMessage,
      multiMessagesReducer.actions.showCriticalMessage,
      multiMessagesReducer.actions.showWarningMessage,
    ][Math.floor(Math.random() * 3)];
    actionFn(container, loremText)(dispatch);
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

export const WithTextStyling = args => {
  const items = [
    {
      key: 'message1',
      node: <strong>{loremText}</strong>,
    },
    {
      key: 'message2',
      text: loremText,
      status: 'success',
    },
    {
      key: 'message3',
      text: loremText,
      status: 'warning',
    },
    {
      key: 'message4',
      node: (
        <>
          <b>Lorem Ipsum! </b>
          {loremText}
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
