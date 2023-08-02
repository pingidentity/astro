import React, { useState } from 'react';
import { Item } from 'react-stately';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Stepper, Text } from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.js';

import StepperReadme from './Stepper.mdx';

export default {
  title: 'Components/Stepper',
  component: Stepper,
  decorators: [withDesign],
  argTypes: {
    activeStep: {
      control: {
        type: 'number',
        min: 0,
        step: 1,
      },
      description: 'The number of the current step (using one-based indexing)',
      table: {
        type: { summary: 'number' },
      },
    },
    onStepChange: {
      control: {
        type: 'none',
      },
    },
    items: {
      control: {
        type: 'none',
      },
    },
  },
  args: {
    activeStep: 1,
    table: { summary: 1 },
    items: undefined,
    onStepChange: undefined,
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <StepperReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
};

const steps = [
  { label: 'Label 1', children: 'This is content for step 1', name: 'step1' },
  { label: 'Label 2', children: 'This is content for step 2', name: 'step2' },
  { label: 'Label 3', children: 'This is content for step 3', name: 'step3' },
];

export const Default = args => (
  <Stepper {...args}>
    <Item key="step1" textValue="Step 1">
      <Text pt="lg">This is content for step 1</Text>
    </Item>
    <Item key="step2" textValue="Step 2">
      <Text pt="lg">This is content for step 2</Text>
    </Item>
  </Stepper>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.stepper.default,
  },
};

export const ControlledStepper = () => {
  const [activeStep, setActiveStep] = useState(2);

  // steps = [
  // { label: 'Label 1', children: 'This is content for step 1', name: 'step1' },
  // { label: 'Label 2', children: 'This is content for step 2', name: 'step2' },
  // { label: 'Label 3', children: 'This is content for step 3', name: 'step3' },
  // ];
  return (
    <Stepper
      items={steps}
      activeStep={activeStep}
      onStepChange={setActiveStep}
    >
      {item => (
        <Item key={item.name} textValue={item.name}>
          <Text pt="lg">{item.children}</Text>
        </Item>
      )}
    </Stepper>
  );
};

export const WithoutContent = () => (
  <Stepper>
    <Item key="step1" textValue="Step 1" />
    <Item key="step2" textValue="Step 2" />
    <Item key="step3" textValue="Step 3" />
  </Stepper>
);
