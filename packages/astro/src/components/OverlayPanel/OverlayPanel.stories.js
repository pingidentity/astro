import React from 'react';
import { useOverlayPanelState } from '../../hooks';
import Button from '../Button/Button';
import OverlayPanel from './OverlayPanel';
import { OverlayProvider } from '../../index';
import Box from '../Box';
import Text from '../Text';
import { panelSizes } from '../../utils/devUtils/constants/panelSizes';

export default {
  title: 'OverlayPanel',
  component: OverlayPanel,
  argTypes: {
    children: {
      description: 'Overlay panel content.',
      control: 'none',
    },
    size: {
      control: {
        type: 'select',
        options: panelSizes,
      },
      defaultValue: 'medium',
    },
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

export const Default = ({ ...args }) => {
  const state = useOverlayPanelState();
  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
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
      <OverlayPanel {...args} isOpen={state.isOpen} >
        <Box>
          <Button
            onPress={state.close}
          >
            Close Panel
          </Button>
          <Text pt="md" >
            Children render here.
          </Text>
        </Box>
      </OverlayPanel>
    </OverlayProvider>
  );
};
