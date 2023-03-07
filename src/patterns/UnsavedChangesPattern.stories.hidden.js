import React, { useState } from 'react';

import { useModalState } from '../hooks';
import {
  Box,
  Button,
  Item,
  Link,
  Messages,
  Modal,
  OverlayProvider,
  Text,
  TextField,
} from '../index';

export default {
  title: 'Design Patterns/Unsaved Changes',
};

export const Default = () => {
  const state = useModalState();
  const [value, setValue] = useState('');
  const [isShowingNeutral, setIsShowingNeutral] = useState(false);
  const [isShowingSuccess, setIsShowingSuccess] = useState(null);

  const closeModalAndClearInput = () => {
    setValue('');
    state.close();
    setIsShowingNeutral(true);
    setTimeout(() => setIsShowingNeutral(false), 3000);
  };

  const closeModalAndShowSuccess = () => {
    setValue('');
    state.close();
    setIsShowingSuccess(true);
    setTimeout(() => setIsShowingSuccess(null), 3000);
  };

  const sx = {
    mainContentBox: {
      p: 'xx',
    },
    textFieldBoxStyle: {
      p: 'sm',
    },
    modalTextSaveChanges: {
      mb: 'lg',
      fontWeight: '0',
      fontSize: 'xx',
      lineHeight: '23px',
    },
    modalTextSaveOrDiscard: {
      mb: 'lg',
      fontSize: 'md',
      lineHeight: '17.89px',
      fontWeight: '0',
    },
  };

  return (
    <OverlayProvider>
      <Box sx={sx.mainContentBox} gap="lg">
        <Box sx={sx.textFieldBoxStyle} gap="lg">
          <TextField
            label="Place Holder"
            onChange={e => setValue(e.target.value)}
            value={value}
          />
        </Box>
        <Link onPress={state.open} aria-label="Open modal">
          Go Somewhere Else
        </Link>
      </Box>
      {state.isOpen && (
        <Modal isOpen={state.isOpen} onClose={state.close} hasCloseButton>
          <Text sx={sx.modalTextSaveChanges} variant="Bold">
            Save Changes?
          </Text>
          <Text sx={sx.modalTextSaveOrDiscard}>
            Save or discard your changes before leaving this page.
          </Text>
          <Box isRow gap="md">
            <Button variant="primary" onPress={closeModalAndShowSuccess}>
              Save
            </Button>
            <Button onPress={closeModalAndClearInput}>Discard Changes</Button>
            <Button variant="link" onPress={state.close}>
              Cancel
            </Button>
          </Box>
        </Modal>
      )}
      <Messages>
        {isShowingNeutral && <Item>Changes have been Discarded.</Item>}
        {isShowingSuccess && (
          <Item status="success">Form has been saved successfully.</Item>
        )}
      </Messages>
    </OverlayProvider>
  );
};
