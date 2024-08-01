import React, { useEffect, useReducer, useState } from 'react';
import { Item } from 'react-stately';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Button,
  Link,
  Messages,
} from '../../index';
import { MessageItem, Status } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
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

const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

const messages = [
  {
    key: 'message1',
    text: loremText,
  },
  {
    key: 'message2',
    text: loremText,
    status: statuses.SUCCESS,
  },
  {
    key: 'message3',
    text: loremText,
    status: statuses.WARNING,
  },
  {
    key: 'message4',
    text: loremText,
    status: statuses.ERROR,
  },
];

export const Default = args => (
  <Messages {...args}>
    <Item key="message1" data-id="message1" status={statuses.SUCCESS}>{loremText}</Item>
    <Item key="message2" data-id="message2" status={statuses.WARNING}>{loremText}</Item>
    <Item key="message2" data-id="message3" status={statuses.ERROR}>{loremText}</Item>
    <Item key="message2" data-id="message4">{loremText}</Item>
  </Messages>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.messages.default,
  },
};

export const DefaultDynamic = args => (
  <Messages {...args} items={messages}>
    {item => <Item {...item}>{item.text}</Item>}
  </Messages>
);

// Added to bypass color contrast in safari
DefaultDynamic.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const Controlled = args => {
  const [items, setItems] = useState<MessageItem[]>([]);

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

// Added to bypass color contrast in safari
Controlled.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const ControlledWithButton = args => {
  const [items, setItems] = useState<MessageItem[]>([]);

  const addMessage = () => {
    setItems([...items, {
      key: `message${items.length + 1}`,
      text: loremText,
      status: Object.values(statuses)[Math.floor(Math.random() * 4)] as Status,
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

// Added to bypass color contrast in safari
ControlledWithButton.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

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

  const [items, dispatch] = useReducer(messagesReducer, []);

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

// Added to bypass color contrast in safari
UseReducer.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
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

// Added to bypass color contrast in safari
UseReducerWithMultipleContainers.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const WithTextStyling = args => {
  const items = [
    {
      key: 'message1',
      node: <strong>{loremText}</strong>,
    },
    {
      key: 'message2',
      node: (
        <>
          <b>Lorem Ipsum! </b>
          dolor sit amet, consectetur adipiscing elit
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

// Added to bypass color contrast in safari
WithTextStyling.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.messages.withTextStyling,
  },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const WithLink = args => {
  return (
    <Messages {...args}>
      <Item key="message1">
        {loremText}
        {' '}
        <Link href="https://lorem.ipsum">Learn More</Link>
      </Item>
    </Messages>
  );
};

// Added to bypass color contrast in safari
WithLink.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.messages.withLink,
  },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const Customization = args => (
  <Messages {...args}>
    <Item bg="accent.99" color="active" icon={AccountIcon}>{loremText}</Item>
  </Messages>
);

// Added to bypass color contrast in safari
Customization.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};
