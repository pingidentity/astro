import React, { useState, useRef } from 'react';
import { Item } from '@react-stately/collections';
import { useOverlayPanelState } from '../../hooks';
import OverlayPanel from './OverlayPanel';
import { OverlayProvider, Box, Text, List, ListItem, Separator, Messages, Button } from '../../index';
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
    isOpen: {
      control: 'none',
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
  const { state, onClose } = useOverlayPanelState();
  const triggerRef = useRef();

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay is open.
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
      <Button
        ref={triggerRef}
        onPress={state.open}
        aria-expanded={state.isOpen}
      >
        Open Panel
      </Button>
      { state.isOpen &&
        <OverlayPanel
          isOpen={state.isOpen}
          state={state}
          {...args}
          triggerRef={triggerRef}
        >
          <Box>
            <Button
              onPress={() => { onClose(state, triggerRef); }}
              aria-expanded={state.isOpen}
            >
              Close Panel
            </Button>
            <Text pt="md" >
              Children render here.
            </Text>
          </Box>
        </OverlayPanel>
      }
    </OverlayProvider>
  );
};

export const InnerPanel = ({ ...args }) => {
  const { state, onClose } = useOverlayPanelState();
  const { state: innerState, onClose: onCloseInner } = useOverlayPanelState();

  const outerTriggerRef = useRef();
  const innerTriggerRef = useRef();

  const [messagesOpen, setMessagesOpen] = useState(false);

  const toggleMessagesOpen = () => {
    setMessagesOpen(!messagesOpen);
  };

  const closeOuterPanel = () => {
    if (innerState.isOpen) {
      innerState.close();
    }
    onClose(state, outerTriggerRef);
  };

  const closeInnerPanel = () => {
    onCloseInner(innerState, innerTriggerRef);
  };

  const inner = (
    <>
      {
        innerState.isOpen &&
        <OverlayPanel
          variant="overlayPanel.overlayPanelInner" // applies higher z-index
          isOpen={innerState.isOpen}
          {...args}
          state={innerState}
          triggerRef={innerTriggerRef}
        >
          <Box>
            <Button onPress={closeInnerPanel}>Close Inner Panel</Button>
            <Text pt="md">
              Children render here.
            </Text>
          </Box>
        </OverlayPanel>
      }
    </>
  );

  const outer = (
    // should have higher z-index applied
    <>
      {
        state.isOpen &&
        <OverlayPanel
          isOpen={state.isOpen}
          sx={{ p: '0px' }}
          {...args}
          state={state}
          triggerRef={outerTriggerRef}
        >
          <Box sx={{ p: '12px' }}>
            <Button onPress={closeOuterPanel} aria-expanded={state.isOpen} >Close Panel</Button>
            <Text pt="md" mb="24px">
              Children render here.
            </Text>
            <List>
              <ListItem>
                <Text variant="itemTitle" alignSelf="center" mr="auto">Form 1</Text>
              </ListItem>
              <Separator margin="0" />
              <ListItem title="Form 2">
                <Text variant="itemTitle" alignSelf="center" mr="auto">Form 2</Text>
              </ListItem>
              <Separator margin="0" />
            </List>
            <br />
            <Button onPress={toggleMessagesOpen}>Toggle Messages</Button>
            <br />
            <Button
              ref={innerTriggerRef}
              onPress={innerState.open}
              aria-expanded={innerState.isOpen}
            >
              Open Inner Panel
            </Button>
            {inner}
          </Box>
        </OverlayPanel>
      }
    </>
  );

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <>
      <OverlayProvider>
        <Button
          ref={outerTriggerRef}
          onPress={state.open}
          aria-expanded={state.isOpen}
        >
          Open Panel
        </Button>
        {outer}
      </OverlayProvider>
      { messagesOpen &&
        <Messages sx={{ zIndex: 11 }} >
          <Item key="message2" status="success">Z Index higher than inner pannel</Item>
        </Messages>
      }
    </>
  );
};

export const CustomWidth = () => {
  const { state, onClose } = useOverlayPanelState();
  const triggerRef = useRef();

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
      <Button ref={triggerRef} onPress={state.open} aria-expanded={state.isOpen}>Open Panel</Button>
      { state.isOpen &&
        <OverlayPanel
          isOpen={state.isOpen}
          state={state}
          triggerRef={triggerRef}
          sx={{ width: '720px' }}
        >
          <Box>
            <Button
              onPress={() => { onClose(state, triggerRef); }}
              aria-expanded={state.isOpen}
            >
              Close Panel
            </Button>
            <Text pt="md" >
              Children render here.
            </Text>
          </Box>
        </OverlayPanel>
      }
    </OverlayProvider>
  );
};
