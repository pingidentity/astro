import React from 'react';
import { useModalState } from '../../hooks';
import {
  OverlayProvider,
  Box,
  Button,
  Text,
  Modal,
} from '../../index';

export default {
  title: 'Modal',
  component: Modal,
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
      defaultValue: 'Continue',
    },
    role: {},
    id: {
      control: {
        type: 'text',
      },
    },
    hasCloseButton: {
      defaultValue: true,
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
};

export const Default = (args) => {
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
