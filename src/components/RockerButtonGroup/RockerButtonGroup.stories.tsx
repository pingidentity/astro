import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { RockerButton, RockerButtonGroup } from '../../index';
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
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    isDisabled: {},
    defaultSelectedKey: {},
    selectedKey: {
      control: {
        type: 'none',
      },
    },
  },
  args: {
    isDisabled: false,
  },
} as Meta;

export const Default: StoryFn<RockerButtonGroupProps> = ({ ...args }: RockerButtonGroupProps) => (
  <RockerButtonGroup {...args}>
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
  const [currentTab, setCurrentTab] = useState('and');
  return (
    <RockerButtonGroup selectedKey={currentTab} onSelectionChange={setCurrentTab}>
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
        bg: '#640099',
      }}
    >
      And
    </RockerButton>
    <RockerButton
      name="or"
      key="or"
      selectedStyles={{
        bg: '#4660A2',
      }}
    >
      Or
    </RockerButton>
    <RockerButton
      name="maybe"
      key="maybe"
      selectedStyles={{
        bg: 'decorative.4',
      }}
    >
      Maybe
    </RockerButton>
  </RockerButtonGroup>
);
