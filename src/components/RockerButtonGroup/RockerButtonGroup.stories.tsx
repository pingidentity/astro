import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { RockerButton, RockerButtonGroup } from '../..';
import { RockerButtonGroupProps } from '../../types';

import RockerButtonGroupReadme from './RockerButtonGroup.mdx';

export default {
  title: 'Components/RockerButtonGroup',
  component: RockerButtonGroup,
  parameters: {
    docs: {
      page: () => (
        <>
          <RockerButtonGroupReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    isDisabled: {},
    defaultSelectedKey: {},
    selectedKey: {
      control: false,
    },
  },
  args: {
    isDisabled: false,
  },
} as Meta;

export const Default: StoryFn<RockerButtonGroupProps> = ({ ...args }: RockerButtonGroupProps) => (
  <RockerButtonGroup {...args} defaultSelectedKeys={['and']}>
    <RockerButton name="and" key="and">And</RockerButton>
    <RockerButton name="or" key="or">Or</RockerButton>
    <RockerButton name="maybe" key="maybe">Maybe</RockerButton>
  </RockerButtonGroup>
);

export const Uncontrolled: StoryFn = () => (
  <RockerButtonGroup>
    <RockerButton name="and" key="and">And</RockerButton>
    <RockerButton name="or" key="or">Or</RockerButton>
    <RockerButton name="maybe" key="maybe">Maybe</RockerButton>
  </RockerButtonGroup>
);

export const Controlled: StoryFn = () => {
  const [currentTab, setCurrentTab] = useState(['and']);

  const onSelectionChange = e => {
    setCurrentTab(e);
  };

  return (
    <RockerButtonGroup selectedKeys={currentTab} onSelectionChange={onSelectionChange}>
      <RockerButton name="and" key="and">And</RockerButton>
      <RockerButton name="or" key="or">Or</RockerButton>
      <RockerButton name="maybe" key="maybe">Maybe</RockerButton>
    </RockerButtonGroup>
  );
};

export const DisabledSingleButton: StoryFn = () => (
  <RockerButtonGroup defaultSelectedKey="or" disabledKeys={['and']}>
    <RockerButton name="and" key="and">And</RockerButton>
    <RockerButton name="or" key="or">Or</RockerButton>
    <RockerButton name="maybe" key="maybe">Maybe</RockerButton>
  </RockerButtonGroup>
);

export const customColors: StoryFn = () => (
  <RockerButtonGroup>
    <RockerButton
      name="and"
      key="and"
      selectedStyles={{
        bg: '#640099 !important',
      }}
    >
      And
    </RockerButton>
    <RockerButton
      name="or"
      key="or"
      selectedStyles={{
        bg: '#4660A2 !important',
      }}
    >
      Or
    </RockerButton>
    <RockerButton
      name="maybe"
      key="maybe"
      selectedStyles={{
        bg: '#e30080 !important',
      }}
    >
      Maybe
    </RockerButton>
  </RockerButtonGroup>
);
