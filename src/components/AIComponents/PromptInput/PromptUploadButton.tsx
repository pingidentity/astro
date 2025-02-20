import React from 'react';
import ArrowUpIcon from '@pingux/mdi-react/ArrowUpIcon';
import StopIcon from '@pingux/mdi-react/StopIcon';

import { Box, Icon, IconButton } from '../../../index';
import { PromptUploadButtonProps } from '../../../types/promptInput';

const PromptUploadButton = (props: PromptUploadButtonProps) => {
  const {
    isLoading,
    onCancel,
    onSubmit,
    value,
    uploadButtonContainerProps,
    ...others
  } = props;

  const onPress = e => {
    if (isLoading && onCancel) {
      onCancel(e);
    } else if (onSubmit) {
      onSubmit(e);
    }
  };
  return (
    <Box {...uploadButtonContainerProps}>
      <IconButton
        aria-label="upload chat"
        isDisabled={!isLoading && value.length === 0}
        variant="inverted"
        sx={{ size: '24px' }}
        onPress={onPress}
        {...others}
      >
        <Icon size="xs" icon={isLoading ? StopIcon : ArrowUpIcon} />
      </IconButton>
    </Box>
  );
};

export default PromptUploadButton;
