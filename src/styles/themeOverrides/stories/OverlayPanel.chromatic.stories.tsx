import React, { useRef } from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';

import { useOverlayPanelState } from '../../../hooks';
import { Box,
  Button,
  OverlayPanel,
  OverlayProvider,
  PanelHeader,
  PanelHeaderCloseButton,
  Text } from '../../../index';

export default {
  title: 'Chromatic Only OverlayPanel',
  component: OverlayPanel,
};

export const Default = () => {
  const { state, onClose } = useOverlayPanelState({ isDefaultOpen: true });
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <OverlayProvider>
      <Box sx={{ gap: '25px' }}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Text>
        <Button
          ref={triggerRef}
          onPress={state.open}
          aria-expanded={state.isOpen}
          sx={{ maxWidth: 'fit-content' }}
        >
          Open Panel
        </Button>
        <OverlayPanel
          isOpen
          isTransitioning={state.isTransitioning}
          state={state}
          triggerRef={triggerRef}
          sx={{
            p: 0,
          }}
        >
          <PanelHeader
            data={{
              icon: AccountIcon,
              text: 'Fons Vernall',
              subtext: 'rad_developer@pingidentity.com',
            }}
          >
            <PanelHeaderCloseButton onPress={() => { onClose(state, triggerRef); }} />
          </PanelHeader>
          <Box sx={{ p: 25 }}>
            <Text pt="md">
              Children render here.
            </Text>
          </Box>
        </OverlayPanel>
      </Box>
    </OverlayProvider>
  );
};
