import React from 'react';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import { Item } from 'react-stately';
import { action } from '@storybook/addon-actions';

import Breadcrumbs from './Breadcrumbs';

export default {
  title: 'Components/Breadcrumbs',
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

export const Default = (args) => {
  const onAction = key => action(`onPress ${key}`);

  return (
    <Breadcrumbs onAction={onAction} {...args} >
      <Item key="home" aria-label="home" variant="buttons.link" data-id="home" href="https://www.pingidentity.com">
        Home
      </Item>
      <Item key="trendy" aria-label="trendy" variant="buttons.link" data-id="trendy" href="https://www.pingidentity.com">
        Trendy
      </Item>
      <Item key="march 2020 assets" aria-label="march-2020-assets" variant="buttons.link" data-id="march" href="https://www.pingidentity.com">
        March 2020 Assets
      </Item>
    </Breadcrumbs>
  );
};

export const WithSpan = () => (
  <Breadcrumbs icon={ChevronRightIcon}>
    <Item key="Parent" aria-label="parent" elementType="span">
      Parent
    </Item>
    <Item key="FonsVernall" aria-label="fons-vernall" elementType="span">
      Fons Vernall
    </Item>
  </Breadcrumbs>
);
