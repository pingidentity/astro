import React from 'react';

import { useModalState } from '../../hooks';
import {
  Box,
  Button,
  Modal,
  OverlayProvider,
  Text,
} from '../../index';

export default {
  title: 'Onyx Recipes/Modal',
};

export const Default = () => {
  const state = useModalState();
  return (
    <OverlayProvider>
      <Button onPress={state.open} aria-label="Open modal">
        Open Modal
      </Button>
      {(state.isOpen || state.isTransitioning) && (
        <Modal
          isOpen={state.isOpen}
          onClose={state.close}
          state={state}
          hasCloseButton
          contentProps={{ sx: { p: '0px !important' } }}
        >
          <Box
            sx={{
              p: '1rem 1.5rem',
              borderBottom: '1px solid',
              borderBottomColor: 'border.base',
              bg: 'background.base',
            }}
          >
            <Text variant="modalTitle">Modal Title</Text>
          </Box>
          <Box p="1.5rem 1.5rem">
            <Text color="text.primary">
              Do you want to continue with this action that you&lsquo;re performing?
            </Text>
          </Box>
          <Box
            isRow
            sx={{
              borderTop: '1px solid',
              borderTopColor: 'border.base',
              p: '1rem 1.5rem',
            }}
          >
            <Box isRow mr="auto">
              <Button
                variant="link"
                onPress={state.close}
                aria-label="Continue"
              >
                Previous
              </Button>
            </Box>
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
                ml=".25rem"
                aria-label="Continue"
                isDisabled
              >
                Next
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </OverlayProvider>
  );
};
