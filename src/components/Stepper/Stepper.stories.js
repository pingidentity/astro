import React, { useRef, useState } from 'react';
import { Item } from 'react-stately';
import CreationOutlineIcon from '@pingux/mdi-react/CreationOutlineIcon';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { useOverlayPanelState } from '../../hooks';
import { Box, Button, OverlayPanel, OverlayProvider, PanelHeader, PanelHeaderCloseButton,
  Stepper, Text } from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.ts';

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
  { label: 'Duis Aute', children: 'Quis autem vel eum iure reprehenderit qui in ea voluptate', title: 'Duis Aute', name: 'step1' },
  { label: 'Lorem Ipsum', children: 'Sed ut perspiciatis unde omnis', title: 'Lorem Ipsum', name: 'step2' },
  { label: 'Excepteur Sint', children: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam', title: 'Excepteur Sint', name: 'step3' },
];

const sx = {
  overlayPanel: {
    padding: '0px',
    transition: 'width 500ms, right 500ms',
  },
  stepperContainer: {
    padding: 'lg',
  },
  contentContainer: {
    marginTop: 'lg',
    gap: 'sm',
  },
  buttonStyle: {
    margin: '50px 0px',
  },
};

export const Default = args => (
  <Stepper {...args}>
    <Item key="step1" textValue="Duis Aute">
      <Box sx={sx.contentContainer}>
        <Text fontSize="lg" fontWeight="3">Duis Aute</Text>
        <Text fontSize="md">Quis autem vel eum iure reprehenderit qui in ea voluptate</Text>
      </Box>
    </Item>
    <Item key="step2" textValue="Lorem Ipsum">
      <Box sx={sx.contentContainer}>
        <Text fontSize="lg" fontWeight="3">Lorem Ipsum</Text>
        <Text fontSize="md">Sed ut perspiciatis unde omnis</Text>
      </Box>
    </Item>
    <Item key="step3" textValue="Excepteur Sint">
      <Box sx={sx.contentContainer}>
        <Text fontSize="lg" fontWeight="3">Excepteur Sint</Text>
        <Text fontSize="md">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam</Text>
      </Box>
    </Item>
  </Stepper>
);

export const DisabledToolTips = args => (
  <Stepper {...args} mode="tooltipIsDisabled">
    <Item key="step1" textValue="Duis Aute">
      <Box sx={sx.contentContainer}>
        <Text fontSize="lg" fontWeight="3">Duis Aute</Text>
        <Text fontSize="md">Quis autem vel eum iure reprehenderit qui in ea voluptate</Text>
      </Box>
    </Item>
    <Item key="step2" textValue="Lorem Ipsum">
      <Box sx={sx.contentContainer}>
        <Text fontSize="lg" fontWeight="3">Lorem Ipsum</Text>
        <Text fontSize="md">Sed ut perspiciatis unde omnis</Text>
      </Box>
    </Item>
    <Item key="step3" textValue="Excepteur Sint">
      <Box sx={sx.contentContainer}>
        <Text fontSize="lg" fontWeight="3">Excepteur Sint</Text>
        <Text fontSize="md">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam</Text>
      </Box>
    </Item>
  </Stepper>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.stepper.default,
  },
};

export const WithCustomTooltip = args => (
  <Stepper
    {...args}
    items={steps}
    tooltipProps={{ direction: 'left', offset: 15 }}
  >
    <Item key="step1" textValue="Duis Aute">
      <Box sx={sx.contentContainer}>
        <Text fontSize="lg" fontWeight="3">Duis Aute</Text>
        <Text fontSize="md">Quis autem vel eum iure reprehenderit qui in ea voluptate</Text>
      </Box>
    </Item>
    <Item key="step2" textValue="Lorem Ipsum">
      <Box sx={sx.contentContainer}>
        <Text fontSize="lg" fontWeight="3">Lorem Ipsum</Text>
        <Text fontSize="md">Sed ut perspiciatis unde omnis</Text>
      </Box>
    </Item>
    <Item key="step3" textValue="Excepteur Sint">
      <Box sx={sx.contentContainer}>
        <Text fontSize="lg" fontWeight="3">Excepteur Sint</Text>
        <Text fontSize="md">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam</Text>
      </Box>
    </Item>
  </Stepper>
);

export const ControlledStepper = () => {
  const [activeStep, setActiveStep] = useState(2);
  return (
    <Stepper
      items={steps}
      activeStep={activeStep}
      onStepChange={setActiveStep}
    >
      {item => (
        <Item key={item.name} textValue={item.title}>
          <Box sx={sx.contentContainer}>
            <Text fontSize="lg" fontWeight="3">{item.title}</Text>
            <Text fontSize="md">{item.children}</Text>
          </Box>
        </Item>
      )}
    </Stepper>
  );
};

export const Panel = () => {
  const [activeStep, setActiveStep] = useState(1);

  const { state, onClose } = useOverlayPanelState();
  const triggerRef = useRef < HTMLButtonElement > (null);

  const onCloseHandler = () => onClose(state, triggerRef);

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <Button
        onPress={state.open}
        aria-expanded={state.isOpen}
        sx={sx.buttonStyle}
      >
        Open Panel
      </Button>
      {(state.isOpen || state.isTransitioning)
        && (
        <OverlayPanel
          isTransitioning={state.isTransitioning}
          isOpen={state.isOpen}
          state={state}
          triggerRef={triggerRef}
          sx={sx.overlayPanel}
          size="full"
        >
          <PanelHeader
            data={{
              icon: CreationOutlineIcon,
              text: 'Sed Ut Perspiciatis',
            }}
          >
            <PanelHeaderCloseButton
              onPress={onCloseHandler}
            />
          </PanelHeader>
          <Stepper
            items={steps}
            activeStep={activeStep}
            onStepChange={setActiveStep}
            sx={sx.stepperContainer}
          >
            {item => (
              <Item
                key={item.name}
                textValue={item.title}
              >
                <Box sx={sx.contentContainer}>
                  <Text fontSize="lg" fontWeight="3">{item.title}</Text>
                  <Text fontSize="md">{item.children}</Text>
                </Box>
              </Item>
            )}
          </Stepper>
        </OverlayPanel>
        )}
    </OverlayProvider>
  );
};
