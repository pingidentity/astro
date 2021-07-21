import React, { useState } from 'react';

import { Stepper, Step, Text } from '../../index';

export default {
  title: 'Stepper',
  component: Stepper,
  args: {
    items: undefined,
    onStepChange: undefined,
  },
  argTypes: {
    activeStep: {
      control: {
        type: 'number',
        min: 0,
        step: 1,
      },
      defaultValue: 1,
      description: 'The number of the current step (using one-based indexing)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 1 },
      },
    },
    onStepChange: {
      control: {
        type: 'none',
      },
    },
    items: {
      defaultValue: undefined,
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

const steps = [
  { label: 'Label 1', children: 'This is content for step 1', name: 'step1' },
  { label: 'Label 2', children: 'This is content for step 2', name: 'step2' },
  { label: 'Label 3', children: 'This is content for step 3', name: 'step3' },
];

export const Default = args => (
  <Stepper {...args}>
    <Step key="step1" textValue="Step 1">
      <Text pt="lg">This is content for step 1</Text>
    </Step>
    <Step key="step2" textValue="Step 2">
      <Text pt="lg">This is content for step 2</Text>
    </Step>
  </Stepper>
);

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
        <Step key={item.name} textValue={item.name}>
          <Text pt="lg">{item.children}</Text>
        </Step>
      )}
    </Stepper>
  );
};

export const WithoutContent = () => (
  <Stepper>
    <Step key="step1" textValue="Step 1" />
    <Step key="step2" textValue="Step 2" />
    <Step key="step3" textValue="Step 3" />
  </Stepper>
);
