import React, { useState } from 'react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { RockerButton, RockerButtonGroup } from '../../index';

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
};

export const Default = ({ ...args }) => (
  <RockerButtonGroup {...args}>
    <RockerButton name="and" key="and">And</RockerButton>
    <RockerButton name="or" key="or">Or</RockerButton>
    <RockerButton name="maybe" key="maybe">Maybe</RockerButton>
  </RockerButtonGroup>
);

export const Uncontrolled = () => (
  <RockerButtonGroup>
    <RockerButton name="and" key="and">And</RockerButton>
    <RockerButton name="or" key="or">Or</RockerButton>
    <RockerButton name="maybe" key="maybe">Maybe</RockerButton>
  </RockerButtonGroup>
);

export const Controlled = () => {
  const [currentTab, setCurrentTab] = useState('and');
  return (
    <RockerButtonGroup selectedKey={currentTab} onSelectionChange={setCurrentTab}>
      <RockerButton name="and" key="and">And</RockerButton>
      <RockerButton name="or" key="or">Or</RockerButton>
      <RockerButton name="maybe" key="maybe">Maybe</RockerButton>
    </RockerButtonGroup>
  );
};

export const withCustomSelectedColors = () => (
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
        bg: 'accent.30',
        color: 'yellow',
      }}
    >
      Maybe
    </RockerButton>
  </RockerButtonGroup>
);

export const DisabledSingleButton = () => (
  <RockerButtonGroup defaultSelectedKey="or" disabledKeys={['and']}>
    <RockerButton name="and" key="and">And</RockerButton>
    <RockerButton name="or" key="or">Or</RockerButton>
    <RockerButton name="maybe" key="maybe">Maybe</RockerButton>
  </RockerButtonGroup>
);
