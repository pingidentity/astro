import React from 'react';
import { action } from '@storybook/addon-actions';
import { Item } from '@react-stately/collections';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import Breadcrumbs from './Breadcrumbs';
import DocsLayout from '../../../.storybook/storybookDocsLayout';
import BreadcrumbsReadme from './Breadcrumbs.mdx';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
      page: () => (
        <>
          <BreadcrumbsReadme />
          <DocsLayout />
        </>
      ),
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
