import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Label, SliderField } from '../../index';
import { NumberOrNumberPair } from '../../types/sliderField';

import SliderFieldReadme from './SliderField.mdx';

export default {
  title: 'Form/SliderField',
  component: SliderField,
  parameters: {
    docs: {
      page: () => (
        <>
          <SliderFieldReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    defaultValue: {
      control: {
        type: 'number',
      },
    },
    orientation: {
      control: {
        type: 'select',
        options: ['vertical', 'horizontal'],
      },
    },
    step: {
      control: {
        type: 'number',
      },
    },
    minValue: {
      control: {
        type: 'number',
      },
    },
    maxValue: {
      control: {
        type: 'number',
      },
    },
    helperText: {
      control: {
        type: 'text',
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    defaultValue: 40,
    step: 10,
    minValue: 0,
    maxValue: 100,
    label: 'Lorem ipsum',
    helperText: 'Lorem ipsum...',
  },
} as Meta;

const loremText = 'Lorem ipsum';


export const Default = ({ ...args }) => {
  return (
    <SliderField label={loremText} {...args} />
  );
};

export const Controlled = ({ ...args }) => {
  const [value, setValue] = useState<NumberOrNumberPair>(75);
  return (
    <SliderField
      {...args}
      value={value}
      onChange={setValue}
      displayValue={`(${value}px)`}
      label={loremText}
    />
  );
};

export const Vertical = () => {
  return (
    <SliderField label={loremText} orientation="vertical" size="150px" />
  );
};

export const MultiThumb = () => {
  return (
    <SliderField
      label={loremText}
      isMultiThumb
      defaultValue={[100, 180]}
      maxValue={540}
      minValue={40}
    />
  );
};

export const ControlledMultiThumb = () => {
  const [value, setValue] = useState<NumberOrNumberPair>([0, 50]);
  return (
    <SliderField
      label={loremText}
      isMultiThumb
      onChange={setValue}
      value={value}
    />
  );
};

export const CustomProps = () => {
  const CustomLabel = () => {
    return (
      <Label
        hintText={loremText}
      >
        {loremText}
      </Label>
    );
  };
  return (
    <SliderField
      size="1000px"
      label={<CustomLabel />}
      thumbProps={{ bg: 'orange' }}
      activeTrackProps={{ bg: 'cyan' }}
      trackProps={{ bg: 'magenta' }}
      helperText="Helper text"
    />
  );
};
