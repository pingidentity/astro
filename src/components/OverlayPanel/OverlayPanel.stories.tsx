import React, { useRef, useState } from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import ArrowCollapse from '@pingux/mdi-react/ArrowCollapseIcon';
import ArrowTopRightBottomLeft from '@pingux/mdi-react/ArrowTopRightBottomLeftIcon';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { useOverlayPanelState } from '../../hooks';
import {
  Box,
  Button,
  IconButton,
  OverlayPanel,
  OverlayProvider,
  PanelHeader,
  PanelHeaderCloseButton,
  Text,
} from '../../index';
import { OverlayPanelProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import { panelSizes } from '../../utils/devUtils/constants/panelSizes';

import OverlayPanelReadme from './OverlayPanel.mdx';

export default {
  title: 'Components/OverlayPanel',
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
    },
    isOpen: {
      control: 'none',
    },
  },
  args: {
    size: 'medium',
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <OverlayPanelReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
} as Meta;

export const Default: StoryFn<OverlayPanelProps> = ({ ...args }: OverlayPanelProps) => {
  const { state, onClose } = useOverlayPanelState();
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay is open.
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
        {(state.isOpen || state.isTransitioning)
        && (
          <OverlayPanel
            isOpen={state.isOpen}
            isTransitioning={state.isTransitioning}
            state={state}
            {...args}
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
              <Text>
                Children render here.
              </Text>
            </Box>
          </OverlayPanel>
        )}
      </Box>
    </OverlayProvider>
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.overlayPanel.default,
  },
};

export const Expandable: StoryFn = () => {
  const { state, onClose } = useOverlayPanelState();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const sx = {
    overlayPanel: {
      padding: 0,
      transition: 'width 500ms, right 500ms',
    },
  };

  const onCloseFunction = () => {
    onClose(state, triggerRef);
    setIsExpanded(false);
  };

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
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
        {(state.isOpen || state.isTransitioning)
        && (
          <OverlayPanel
            isTransitioning={state.isTransitioning}
            isOpen={state.isOpen}
            state={state}
            triggerRef={triggerRef}
            sx={sx.overlayPanel}
            size={isExpanded ? 'full' : 'medium'}
          >
            <PanelHeader
              data={{
                icon: AccountIcon,
                text: 'Fons Vernall',
                subtext: 'rad_developer@pingidentity.com',
              }}
            >
              <IconButton
                aria-label="expand-icon"
                size={20}
                onPress={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <ArrowCollapse /> : <ArrowTopRightBottomLeft />}
              </IconButton>
              <PanelHeaderCloseButton onPress={() => { onCloseFunction(); }} />
            </PanelHeader>
            <Box sx={{ p: 25 }}>
              <Text>
                Children render here
              </Text>
            </Box>
          </OverlayPanel>
        )}
      </Box>
    </OverlayProvider>
  );
};

export const InnerPanel: StoryFn<OverlayPanelProps> = ({ ...args }: OverlayPanelProps) => {
  const { state, onClose } = useOverlayPanelState();
  const { state: innerState, onClose: onCloseInner } = useOverlayPanelState();

  const outerTriggerRef = useRef<HTMLButtonElement>(null);
  const innerTriggerRef = useRef<HTMLButtonElement>(null);

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
    innerState.isOpen
    && (
      <OverlayPanel
        variant="overlayPanel.innerPanel" // applies higher z-index
        isOpen={innerState.isOpen}
        {...args}
        state={innerState}
        triggerRef={innerTriggerRef}
      >
        <Box>
          <Button onPress={closeInnerPanel}>Close Inner Panel</Button>
        </Box>
      </OverlayPanel>
    )
  );

  const outer = (
    // should have higher z-index applied
    (state.isOpen || state.isTransitioning)
    && (
      <OverlayPanel
        isOpen={state.isOpen}
        isTransitioning={state.isTransitioning}
        sx={{ p: '0px' }}
        {...args}
        state={state}
        triggerRef={outerTriggerRef}
      >
        <PanelHeader
          data={{
            icon: AccountIcon,
            text: 'Fons Vernall',
            subtext: 'rad_developer@pingidentity.com',
          }}
        >
          <PanelHeaderCloseButton onPress={() => { closeOuterPanel(); }} />
        </PanelHeader>
        <Box sx={{ p: '25px', gap: '25px' }}>
          <Text>
            Children render here.
          </Text>
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
    )
  );

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
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
          ref={outerTriggerRef}
          onPress={state.open}
          aria-expanded={state.isOpen}
          sx={{ maxWidth: 'fit-content' }}
        >
          Open Panel
        </Button>
        {outer}
      </Box>
    </OverlayProvider>
  );
};

export const Customization: StoryFn = () => {
  const { state, onClose } = useOverlayPanelState();
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
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
        {(state.isOpen || state.isTransitioning)
        && (
          <OverlayPanel
            isTransitioning={state.isTransitioning}
            isOpen={state.isOpen}
            state={state}
            triggerRef={triggerRef}
            sx={{ width: '720px', p: 0 }}
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
              <Text>
                Children render here.
              </Text>
            </Box>
          </OverlayPanel>
        )}
      </Box>
    </OverlayProvider>
  );
};
