import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { useModalState } from '../../hooks';
import {
  Box,
  Button,
  Item,
  Modal,
  OverlayProvider,
  RadioField,
  RadioGroupField,
  SelectField,
  Text,
  TextField,
} from '../../index';
import { ModalProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import { modalSizes } from '../../utils/devUtils/constants/modalSizes';

import ModalReadme from './Modal.mdx';

export default {
  title: 'Components/Modal',
  component: Modal,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: () => (
        <>
          <ModalReadme />
          <DocsLayout />
        </>
      ),
    },
    codesandbox: false,
  },
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
    },
    role: {},
    id: {
      control: {
        type: 'text',
      },
    },
    size: {
      control: {
        type: 'select',
        options: modalSizes,
      },
    },
    hasCloseButton: {
    },
    isClosedOnBlur: {},
    isDismissable: {},
    isKeyboardDismissDisabled: {},
    'aria-label': {
      control: {
        type: 'text',
      },
    },
    'aria-labelledby': {
      control: {
        type: 'text',
      },
    },
    'aria-describedby': {
      control: {
        type: 'text',
      },
    },
    'aria-details': {
      control: {
        type: 'text',
      },
    },
    closeButton: {
      control: {
        type: 'none',
      },
    },
    isOpen: {
      control: {
        type: 'none',
      },
    },
    contentProps: {
      control: {
        type: 'none',
      },
    },
    containerProps: {
      control: {
        type: 'none',
      },
    },
  },
  args: {
    hasCloseButton: true,
  },
} as Meta;

export const Default: StoryFn<ModalProps> = args => {
  const state = useModalState();

  const ModalBodyContent = (
    <Box gap="lg">
      <Text>
        Do you want to continue with this action that you&lsquo;re performing?
      </Text>
      <Box isRow pt="lg" mr="auto" variant="modal.buttonsContainer">
        <Button
          variant="primary"
          onPress={state.close}
          mr="md"
          aria-label="Continue"
        >
          Continue
        </Button>
        <Button
          variant="link"
          onPress={state.close}
          aria-label="Cancel"
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <Button onPress={state.open} aria-label="Open modal" tabIndex={state.isOpen ? -1 : 0}>
        Open Modal
      </Button>
      {
        (state.isOpen || state.isTransitioning) && (
          <Modal
            {...args}
            isOpen={state.isOpen}
            onClose={state.close}
            state={state}
            title="Continue"
          >
            {ModalBodyContent}
          </Modal>
        )
      }
    </OverlayProvider>
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.modal.default,
  },
};

export const LargeContent: StoryFn<ModalProps> = args => {
  const state = useModalState();

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <Button onPress={state.open} aria-label="Open modal" tabIndex={state.isOpen ? -1 : 0}>
        Open Modal
      </Button>
      {state.isOpen && (
        <Modal
          {...args}
          isOpen={state.isOpen}
          onClose={state.close}
          title="Lorem Ipsum"
        >
          <Box gap="lg">
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <Text>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <Text>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </Text>
            <Text>
              Nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Text>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
            </Text>
            <Text>
              Eu fugiat nulla pariatur.
            </Text>
            <Text>
              Excepteur sint occaecat cupidatat non proident.
            </Text>
            <Text>
              Sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <Text>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <Text>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </Text>
            <Text>
              Nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Text>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
            </Text>
            <Text>
              Eu fugiat nulla pariatur.
            </Text>
            <Text>
              Excepteur sint occaecat cupidatat non proident.
            </Text>
            <Text>
              Sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <Text>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <Text>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </Text>
            <Text>
              Nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Text>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
            </Text>
          </Box>
          <Box isRow variant="modal.buttonsContainer">
            <Button
              variant="primary"
              onPress={state.close}
              mr="md"
              aria-label="Continue"
            >
              Continue
            </Button>
            <Button
              variant="link"
              onPress={state.close}
              aria-label="Cancel"
            >
              Cancel
            </Button>
          </Box>
        </Modal>
      )}
    </OverlayProvider>
  );
};

export const WithInputField: StoryFn<ModalProps> = () => {
  const state = useModalState();
  return (
    <OverlayProvider>
      <Button onPress={state.open} aria-label="Open modal">
        Open Modal
      </Button>
      {state.isOpen && (
        <Modal
          isOpen={state.isOpen}
          onClose={state.close}
        >
          <Box gap="lg">
            <Text>Lorem ipsum dolor sit amet consectetur</Text>
            <SelectField label="Select an option">
              <Item>Red</Item>
              <Item>Green</Item>
              <Item>Blue</Item>
            </SelectField>
            <RadioGroupField label="Pick an option" name="options" defaultValue="option1">
              <RadioField
                label="Option 1"
                value="option1"
                data-testid="option1"
              />
              <RadioField
                label="Option 2"
                value="option2"
                data-testid="option2"
              />
              <RadioField
                label="Option 3"
                value="option3"
                data-testid="option3"
              />
            </RadioGroupField>
            <Box isRow variant="modal.buttonsContainer">
              <Button
                variant="primary"
                onPress={state.close}
                mr="md"
                aria-label="Continue"
              >
                Continue
              </Button>
              <Button
                variant="link"
                onPress={state.close}
                aria-label="Cancel"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </OverlayProvider>
  );
};

WithInputField.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'aria-hidden-focus', enabled: false }],
    },
  },
};
