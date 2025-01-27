import React, { useRef, useState } from 'react';
import AutoAwesomeIcon from '@pingux/mdi-react/AutoAwesomeOutlineIcon';
import DotsIcon from '@pingux/mdi-react/DotsHorizontalIcon';

import { useOverlayPanelState } from '../../../hooks';
import {
  Box,
  Button,
  Icon,
  IconButton,
  Item,
  Menu,
  PopoverMenu,
  Text,
} from '../../../index';

import AIPanel from './AIPanel';
import AIPanelHeader from './AIPanelHeader';

export default {
  component: AIPanel,
  title: 'AI Components/AI Panel',
};

const AIMenuPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PopoverMenu isOpen={isOpen} onOpenChange={setIsOpen}>
      <IconButton aria-label="more options">
        <Icon icon={DotsIcon} size="sm" title={{ name: 'Dots Vertical Icon' }} />
      </IconButton>
      <Menu>
        <Item key="edit">Edit</Item>
        <Item key="duplicate">Duplicate</Item>
        <Item key="delete" textValue="delete">
          <Text color="critical.bright">
            Delete
          </Text>
        </Item>
      </Menu>
    </PopoverMenu>
  );
};

export const Default = () => {
  const { state, onClose } = useOverlayPanelState({ transitionDuration: 1000 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const onPanelClose = () => {
    state.close();
    onClose();
  };

  const setIsPanelExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      sx={{
        maxWidth: state.isOpen ? 'calc(100% - 420px)' : '100%',
        transition: '.4s all ease',
      }}
    >
      <Button
        ref={triggerRef}
        onPress={state.open}
        aria-expanded={state.isOpen}
        variant="aiChat"
        title="open ai chat panel"
      >
        <Icon icon={AutoAwesomeIcon} />
        Open Panel
      </Button>
      <AIPanel
        state={state}
        triggerRef={triggerRef}
        isExpanded={isExpanded}
        setIsExpanded={setIsPanelExpanded}
        onPanelClose={onPanelClose}
      >
        <AIPanelHeader
          slots={{ menuSlot: <AIMenuPopover /> }}
          isExpanded={isExpanded}
          setIsExpanded={setIsPanelExpanded}
          onPanelClose={onPanelClose}
        />
        <Box gap="md" py="md" minHeight="100%" maxWidth="768px" alignSelf="center">

          AI Component Children will render here
        </Box>
      </AIPanel>
    </Box>
  );
};
