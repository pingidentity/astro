import React from 'react';
import useOverlayPanelState from '../../hooks/useOverlayPanelState';
import Button from '../Button/Button';
import OverlayPanel from './OverlayPanel';
import { OverlayProvider } from '../../index';
import Box from '../Box';
import Text from '../Text';

export default {
  title: 'OverlayPanel',
  component: OverlayPanel,
};

export const Default = ({ ...args }) => {
  const state = useOverlayPanelState();
  return (
    <OverlayProvider>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </Text>
      <br />
      <Button onPress={state.open}>Open Panel</Button>
      {
        state.isOpen &&
        <OverlayPanel {...args}>
          <Box>
            <Button onPress={state.close}>Close Panel</Button>
            <Text pt="md">
              Children render here.
            </Text>
          </Box>
        </OverlayPanel>
      }
    </OverlayProvider>
  );
};
