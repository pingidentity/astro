import React, { useRef } from 'react';

import { useOverlayPanelState } from '../hooks';
import {
  Box,
  Button,
  OverlayPanel,
  OverlayProvider,
  ScrollBox,
  TextField,
} from '../index';
import { DummyText } from '../utils/devUtils/constants/text';

export default {
  title: 'Design Patterns/Save Bar',
};

const sx = {
  mainContentBox: {
    p: 'xl',
    justifyContent: 'center',
  },
  overlayPanelStyle: {
    width: '720px',
    height: '100%',
  },
  overlayPanelMainBox: {
    height: '100%',
  },
  overlayPanelInnerBox: {
    p: 'sm',
  },
  scrollboxStyle: {
    m: 'sm',
  },
  saveButtonStyle: {
    p: '10px 15px',
    width: '65px',
    height: '38px',
    lineHeight: '18.31px',
  },
  cancelButtonStyle: {
    m: 'sm',
    lineHeight: '18.31px',
  },
};

export const Default = () => {
  const { state, onClose } = useOverlayPanelState();
  const triggerRef = useRef();
  return (
    <Box sx={sx.mainContentBox}>
      <OverlayProvider>
        <Button ref={triggerRef} onPress={state.open}>
          Open Panel
        </Button>

        {state.isOpen && (
          <OverlayPanel
            isOpen={state.isOpen}
            state={state}
            triggerRef={triggerRef}
            sx={sx.overlayPanelStyle}
          >
            <Box sx={sx.overlayPanelMainBox}>
              <Box sx={sx.overlayPanelInnerBox} gap="lg">
                <TextField label="Placeholder" />
                <TextField label="Placeholder" />
                <TextField label="Placeholder" />
              </Box>
              <ScrollBox sx={sx.scrollboxStyle}>
                <p>{DummyText}</p>
              </ScrollBox>
              <Box isRow position="fixed">
                <Button
                  sx={sx.saveButtonStyle}
                  variant="primary"
                >
                  Save
                </Button>
                <Button
                  sx={sx.cancelButtonStyle}
                  variant="link"
                  onPress={() => {
                    onClose(state, triggerRef);
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </OverlayPanel>
        )}
      </OverlayProvider>
    </Box>
  );
};
