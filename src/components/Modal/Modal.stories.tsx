import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { useGetTheme, useModalState } from '../../hooks';
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

  const { themeState: { isOnyx } } = useGetTheme();

  let ModalBodyContent;
  if (isOnyx) {
    ModalBodyContent = (
      <>
        <Box p="lg">
          <Text color="text.primary">
            Do you want to continue with this action that you&lsquo;re performing?
          </Text>
        </Box>
        <Box
          isRow
          variant="modal.footer"
        >
          <Box isRow ml="auto">
            <Button
              variant="link"
              onPress={state.close}
              aria-label="Cancel"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onPress={state.close}
              ml="sm"
              aria-label="Save"
            >
              Save
            </Button>
          </Box>
        </Box>
      </>
    );
  } else {
    ModalBodyContent = (
      <>
        <Text pt="lg">
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
      </>
    );
  }

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <Button onPress={state.open} aria-label="Open modal">
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

export const LargeContent: StoryFn<ModalProps> = args => {
  const state = useModalState();
  const { themeState: { isOnyx } } = useGetTheme();

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <Button onPress={state.open} aria-label="Open modal">
        Open Modal
      </Button>
      {state.isOpen && (
        <Modal
          {...args}
          isOpen={state.isOpen}
          onClose={state.close}
        >
          <Text pt="lg" px={isOnyx && 'lg'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Nisi ut aliquip ex ea commodo consequat.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Eu fugiat nulla pariatur.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Excepteur sint occaecat cupidatat non proident.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Nisi ut aliquip ex ea commodo consequat.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Eu fugiat nulla pariatur.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Excepteur sint occaecat cupidatat non proident.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Nisi ut aliquip ex ea commodo consequat.
          </Text>
          <Text pt="lg" px={isOnyx && 'lg'}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
          </Text>
          <Box isRow variant="modal.buttonsContainer" px={isOnyx && 'lg'}>
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
