import React from 'react';
import { useModalState } from '../../hooks';
import { OverlayProvider, Box, Button, Text, Modal } from '../../index';

export default {
  title: 'Modal',
  component: Modal,
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
      defaultValue: 'Delete Group',
    },
    role: {},
    id: {
      control: {
        type: 'text',
      },
    },
    hasCloseButton: {},
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
      <Button onPress={state.open}>Open Modal</Button>
      {
        state.isOpen &&
        <Modal
          {...args}
          isOpen={state.isOpen}
          onClose={state.close}
        >
          <Text pt="lg">Are you sure you want to delete this group?</Text>
          <Box isRow pt="lg" mr="auto">
            <Button variant="critical" onPress={state.close} mr="md">Delete</Button>
            <Button onPress={state.close}>Cancel</Button>
          </Box>
        </Modal>
      }
    </OverlayProvider>
  );
};

export const DarkVariant = () => {
  const state = useModalState();

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when a modal opens.
    <OverlayProvider>
      <Button onPress={state.open}>Open Modal</Button>

      {
        state.isOpen &&
        <Modal
          variant="modal.dark"
          title="Question"
          isOpen={state.isOpen}
          onClose={state.close}
          isDismissable
          hasCloseButton
        >
          <Text variant="subtitle" color="white" pt="lg">Would you ever really just click a button?</Text>
          <Box isRow pt="lg" mr="auto">
            <Button variant="primary" mr="md" onPress={state.close}>Yes</Button>
            <Button variant="text" onPress={state.close}>Cancel</Button>
          </Box>
        </Modal>
      }
    </OverlayProvider>
  );
};
