import React from 'react';
import CloseIcon from '@pingux/mdi-react/CloseIcon';
import PaperOutlineIcon from '@pingux/mdi-react/PaperOutlineIcon';

import { useStatusClasses } from '../../../hooks';
import { Box, Icon, IconButton, IconWrapper, Text } from '../../../index';
import { AttachmentProps } from '../../../types/promptInput';

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
    icon,
    deleteButtonProps,
  } = props;

  const { classNames } = useStatusClasses(className, { isFullScreen });

  return (
    <Box
      variant="attachment.container"
      className={classNames}
      {...containerProps}
    >
      <Box isRow alignItems="center" px="lg" py="md">
        <IconWrapper
          isCircle
          title={{ name: 'File Icon' }}
          icon={icon}
          color="red"
          size="sm"
          wrapperProps={{
            size: '36px',
            minHeight: '36px',
            minWidth: '36px',
            p: '9px',
            ...iconWrapperProps,
          }}
        />
        <Box sx={{ ml: 'md' }}>
          <Text as="h5" sx={{ fontWeight: 2, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{title}</Text>
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

Attachment.defaultProps = {
  icon: PaperOutlineIcon,
};

export default Attachment;
