import React from 'react';
import CloseIcon from '@pingux/mdi-react/CloseIcon';
import PaperOutlineIcon from '@pingux/mdi-react/PaperOutlineIcon';

import { useStatusClasses } from '../../../hooks';
import { Box, Icon, IconButton, IconWrapper, Text } from '../../../index';
import { AttachmentProps } from '../../../types/promptInput';

import { fileTypeConfig } from './constants';

export const getFileExtension = (fullString: string) => {
  const fileExtensionPattern = /\.([0-9a-z]+)(?:[?#]|$)/i;

  const ext = fullString.match(fileExtensionPattern);
  if (ext) {
    return ext[1];
  }
  return 'unknown file type';
};

const Attachment = (props: AttachmentProps) => {
  const {
    title,
    fileType,
    removeFile,
    isFullScreen,
    className,
    id,
    containerProps,
    iconWrapperProps,
    deleteButtonProps,
  } = props;

  const { classNames } = useStatusClasses(className, { isFullScreen });

  const defaultIconProps = {
    icon: PaperOutlineIcon,
    color: 'lightBlue',
  };

  const iconProps = fileTypeConfig[fileType] || defaultIconProps;

  return (
    <Box
      variant="attachment.container"
      className={classNames}
      {...containerProps}
    >
      <Box isRow alignItems="center" px="lg" py="md">
        <IconWrapper
          isCircle
          title={{ name: `${fileType} File Icon` }}
          size="sm"
          wrapperProps={{
            size: '36px',
            minHeight: '36px',
            minWidth: '36px',
            p: '9px',
            ...iconWrapperProps,
          }}
          {...iconProps}
        />
        <Box sx={{ ml: 'md' }}>
          <Text
            as="h5"
            variant="attachmentTitle"
          >
            {title}
          </Text>
          <Text sx={{ textOverflow: 'ellipsis' }} variant="small">{fileType.toLocaleUpperCase()}</Text>
        </Box>
      </Box>
      <Box variant="attachment.iconWrapper">
        <IconButton
          aria-label="remove attachment"
          data-testid="remove-attachment"
          onPress={() => removeFile(id)}
          variant="deleteAttachment"
          {...deleteButtonProps}
        >
          <Icon title={{ name: 'Remove Attachment Icon' }} icon={CloseIcon} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Attachment;
