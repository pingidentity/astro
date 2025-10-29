import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { TimeField } from '../../index';
import { TimeFieldProps } from '../../types';

import TimeFieldReadme from './TimeField.mdx';

export default {
  title: 'Experimental/TimeField',
  component: TimeField,
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
    docs: {
      page: () => (
        <>
          <TimeFieldReadme />
          <DocsLayout />
        </>
      ),
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: false,
          },
        ],
      },
    },
  },
  argTypes: {},
} as Meta;

export const Default: StoryFn<TimeFieldProps> = (args: TimeFieldProps) => (
  <TimeField {...args} aria-label="timefield-default" />
);

export const DefaultValue: StoryFn<TimeFieldProps> = (args: TimeFieldProps) => (
  <TimeField {...args} aria-label="timefield-default" defaultValue="12:30" />
);

export const Controlled: StoryFn<TimeFieldProps> = () => {
  const [time, setTime] = useState('12:30');

  const onChangeHandler = value => setTime(value.toString());

  return <TimeField aria-label="timefield-default" value={time} onChange={onChangeHandler} />;
};

export const Disabled: StoryFn<TimeFieldProps> = (args: TimeFieldProps) => (
  <TimeField {...args} aria-label="timefield-default" isDisabled />
);

export const ReadOnly: StoryFn<TimeFieldProps> = (args: TimeFieldProps) => (
  <TimeField {...args} aria-label="timefield-default" isReadOnly />
);

export const Required: StoryFn<TimeFieldProps> = (args: TimeFieldProps) => (
  <TimeField {...args} aria-label="timefield-default" isRequired label="Lorem Ipsum" />
);

export const WithLabel: StoryFn<TimeFieldProps> = (args: TimeFieldProps) => (
  <TimeField {...args} label="Lorem Ipsum" aria-label="timefield-default" />
);

export const Invalid: StoryFn<TimeFieldProps> = () => {
  const [time, setTime] = useState('02:30');

  const onChangeHandler = value => setTime(value.toString());

  return <TimeField aria-label="timefield-default" value={time} onChange={onChangeHandler} isInvalid />;
};
