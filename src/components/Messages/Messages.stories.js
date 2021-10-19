import React, { useEffect, useState } from 'react';
import { Item } from '@react-stately/collections';
import AccountIcon from 'mdi-react/AccountIcon';

import statuses from '../../utils/devUtils/constants/statuses';
import Messages from '.';
import Button from '../Button';

export default {
  title: 'Messages',
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
  <Messages {...args} items={messages}>
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
    <Item bg="neutral.90" color="active" icon={AccountIcon}>We have to take a look with this camera.</Item>
    <Item bg="neutral.90" color="active" icon={AccountIcon}>Who said that? SURE you can die! You want to die?! Oh yeah, good luck with that. Stop! Do not shoot fire stick in space canoe! Cause explosive decompression!</Item>
    <Item bg="neutral.90" color="active" icon={AccountIcon}>Oh God, what have I done?</Item>
  </Messages>
);
