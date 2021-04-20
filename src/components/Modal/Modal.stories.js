import React from 'react';
import { useModalState } from '../../hooks';
import { OverlayProvider, Box, Button, Text, Modal } from '../../index';

export const Default = () => {
  const state = useModalState();

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <Button onPress={state.open}>Open Modal</Button>

      {
        state.isOpen &&
        <Modal
          title="Delete Group"
          isOpen={state.isOpen}
          onClose={state.close}
          isDismissable
          hasCloseButton
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
