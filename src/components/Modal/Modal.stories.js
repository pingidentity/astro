import React from 'react';
import { useModalState } from '../../hooks';
import Modal, { OverlayProvider } from '.';
import { Box, Button, Text } from '../../';

export const Default = () => {
  const state = useModalState();

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when a modal opens.
    <OverlayProvider>
      <Button onPress={state.open}>Open Modal</Button>

      {
        state.isOpen &&
        <Modal
          title="Question"
          isOpen={state.isOpen}
          onClose={state.close}
          isDismissable
          hasCloseButton
        >
          <Text variant="subtitle">Would you ever really just click a button?</Text>
          <Box isRow paddingTop="lg" marginLeft="auto">
            <Button marginRight="sm" onPress={state.close}>Maybe</Button>
            <Button variant="critical" onPress={state.close}>No</Button>
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
          <Text variant="subtitle" color="white">Would you ever really just click a button?</Text>
          <Box isRow paddingTop="lg" marginLeft="auto">
            <Button variant="text" marginRight="sm" onPress={state.close}>Cancel</Button>
            <Button variant="primary" onPress={state.close}>Yes</Button>
          </Box>
        </Modal>
      }
    </OverlayProvider>
  );
};
