import React from 'react';
import { action } from '@storybook/addon-actions';
import { Item } from '@react-stately/collections';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import Breadcrumbs from './Breadcrumbs';

export default {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    icon: {
      control: {
        type: 'none',
      },
      defaultValue: ChevronRightIcon,
      description:
        'The icon to render. List of icons at https://materialdesignicons.com/',
    },
    iconProps: {
      control: {
        type: 'none',
      },
    },
  },
};

const foldersArr = ['Folder 1', 'Folder 2', 'Folder 3'];

export const Default = (args) => {
  const onAction = key => action(`onPress ${key}`);

  return (
    <Breadcrumbs onAction={onAction} {...args}>
      <Item key="home" variant="text" data-id="home">
        Home
      </Item>
      <Item key="trendy" variant="text" data-id="trendy">
        Trendy
      </Item>
      <Item key="march 2020 assets" variant="text" data-id="march">
        March 2020 Assets
      </Item>
    </Breadcrumbs>
  );
};

export const WithOnAction = () => {
  // eslint-disable-next-line no-alert
  const onAction = key => alert(key);

  return (
    <Breadcrumbs onAction={onAction} icon={ChevronRightIcon}>
      <Item key="home">Home</Item>
      <Item key="trendy">Trendy</Item>
      <Item key="march 2020 assets">March 2020 Assets</Item>
    </Breadcrumbs>
  );
};

export const WithSpan = () => (
  <Breadcrumbs icon={ChevronRightIcon}>
    <Item key="Parent" elementType="span">
      Parent
    </Item>
    <Item key="FonsVernall" elementType="span">
      Fons Vernall
    </Item>
  </Breadcrumbs>
);

export const WithIsCurrentItemClass = (args) => {
  const styles = {
    color: 'blue',
    '&.isCurrent': {
      color: 'red',
    },
  };
  return (
    <Breadcrumbs {...args}>
      <Item key="home" sx={styles}>
        Home
      </Item>
      <Item key="trendy" sx={styles}>
        Trendy
      </Item>
      <Item key="march 2020 assets" isCurrent sx={styles}>
        March 2020 Assets
      </Item>
    </Breadcrumbs>
  );
};

export const WithDisabledLastItem = args => (
  <Breadcrumbs {...args}>
    <Item key="home" elementType="Button">
      Home
    </Item>
    <Item key="trendy" elementType="Button">
      Trendy
    </Item>
    <Item key="march 2020 assets" elementType="Button" isDisabled>
      March 2020 Assets
    </Item>
  </Breadcrumbs>
);

export const WithHrefA = args => (
  <Breadcrumbs {...args}>
    {foldersArr.map(folder => (
      <Item
        elementType="a"
        href="#"
        key={folder}
        style={{
          whiteSpace: 'nowrap',
        }}
      >
        {folder}
      </Item>
    ))}
  </Breadcrumbs>
);
