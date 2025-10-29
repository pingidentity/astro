import React, { useEffect } from 'react';
import CollapseIcon from '@pingux/mdi-react/ArrowCollapseIcon';
import OpenIcon from '@pingux/mdi-react/ArrowTopRightBottomLeftIcon';
import CloseIcon from '@pingux/mdi-react/CloseIcon';

import { Box, Icon, IconButton, Text } from '../../../index';
import { AIPanelHeaderProps } from '../../../types/aiPanel';

const AIPanelHeader = (props: AIPanelHeaderProps) => {
  const {
    setIsExpanded,
    isExpanded,
    onPanelClose,
    slots,
    expandButtonProps,
    closeButtonProps,
  } = props;

  const toggleExpanded = () => {
    if (setIsExpanded) {
      setIsExpanded(!isExpanded);
    }
  };
  return (
    <Box isRow alignItems="center">
      <Text variant="aiPanelHeader">AI Assistant</Text>
      <Box sx={{ ml: 'auto', mr: '0px' }} isRow alignItems="center" gap="xs">
        {slots?.menuSlot && slots.menuSlot}
        <IconButton
          onPress={toggleExpanded}
          data-testid="expand-button"
          title="toggle panel expansion"
          {...expandButtonProps}
        >
          <Icon icon={isExpanded ? CollapseIcon : OpenIcon} />
        </IconButton>
        <IconButton
          onPress={onPanelClose}
          title="close panel"
          data-testid="close-button"
          {...closeButtonProps}
        >
          <Icon icon={CloseIcon} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AIPanelHeader;
