import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { useModalState } from '../../hooks';
import {
  Box,
  Button,
  Modal,
  OverlayProvider,
  Text,
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
    title: 'Continue',
    hasCloseButton: true,
  },
} as Meta;

export const Default: StoryFn<ModalProps> = args => {
  const state = useModalState();

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <Button onPress={state.open} aria-label="Open modal">
        Open Modal
      </Button>
      {state.isOpen && (
        <Modal {...args} isOpen={state.isOpen} onClose={state.close}>
          <Text pt="lg">
            Do you want to continue with this action that you&lsquo;re performing?
          </Text>
          <Box isRow pt="lg" mr="auto">
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

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.modal.default,
  },
  a11y: {
    config: {
      rules: [
        {
          id: 'aria-hidden-focus',
          enabled: false,
        },
      ],
    },
  },
};
