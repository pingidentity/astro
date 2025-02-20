/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { mergeProps } from 'react-aria';
import AddIcon from '@pingux/mdi-react/AddIcon';

import { Box, ButtonProps, Icon, IconButton, IconProps } from '../../index';

interface FileSelectIconProps {
    handleFileSelect: () => void,
    iconContainerProps: object,
    buttonProps: ButtonProps,
    iconProps: IconProps,
}

const FileSelectIcon = (props: FileSelectIconProps) => {
  const {
    handleFileSelect,
    iconContainerProps,
    buttonProps,
    iconProps,
    ...others
  } = props;

  return (
    <Box {...iconContainerProps}>
      <IconButton onPress={handleFileSelect} {...mergeProps(buttonProps, others)}>
        <Icon title={{ name: 'Add File Icon' }} icon={AddIcon} sx={{ borderRadius: '50%', border: '2px solid', borderColor: 'gray-800' }} {...iconProps} />
      </IconButton>
    </Box>
  );
};

export default FileSelectIcon;
