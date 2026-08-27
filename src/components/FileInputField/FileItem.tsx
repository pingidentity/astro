import React, { useCallback, useRef } from 'react';
import { useVisuallyHidden } from 'react-aria';
import ErrorIcon from '@pingux/mdi-react/AlertCircleIcon';
import DeleteIcon from '@pingux/mdi-react/DeleteIcon';
import InsertDriveFileIcon from '@pingux/mdi-react/InsertDriveFileIcon';

import { Box, Button, Icon, IconButton, Text } from '../../index';
import { FileItemProps, IconProps } from '../../types';
import statuses from '../../utils/devUtils/constants/statuses';

type IconPropsWithDisabled = Partial<IconProps> & { isDisabled?: boolean };

const FileItem: React.FC<FileItemProps> = props => {
  const {
    downloadLink,
    handleFileDelete,
    id,
    isDisabled,
    name,
    status,
    textProps,
  } = props;
  const handleDeleteButtonPress = useCallback(e => handleFileDelete(e, id), [
    id,
    handleFileDelete,
  ]);
  const { visuallyHiddenProps } = useVisuallyHidden();
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const getFileIconProps = useCallback(() => {
    switch (status) {
      case statuses.ERROR:
        return {
          icon: ErrorIcon,
          title: { name: 'Error Icon' },
          color: 'critical.dark',
          'data-testid': 'file-uploaded__file-icon--is-error',
        };
      default:
        return {
          icon: InsertDriveFileIcon,
          title: { name: 'Insert Drive File Icon' },
          color: 'neutral.10',
        };
    }
  }, [status]);

  const handleDownloadPress = () => {
    if (downloadRef.current) {
      downloadRef.current.click();
    }
  };

  return (
    <Box isRow alignItems="center" mx={15} my={5}>
      <Icon
        size={15}
        data-testid="file-uploaded__file-icon"
        {...({ ...getFileIconProps(), isDisabled } as IconPropsWithDisabled)}
      />
      <Button
        variant="forms.fileInputField.button"
        mx={5}
        isDisabled={isDisabled}
        aria-label={name}
        data-testid="file-uploaded__download-file-button"
        onPress={handleDownloadPress}
        aria-describedby={`file-uploaded__download-link-${id}`}
        aria-live="polite"
      >
        <Text color="active" {...textProps}>
          {name}
        </Text>
      </Button>
      <IconButton
        aria-label={`Delete ${name}`}
        data-testid="file-uploaded__delete-file-button"
        isDisabled={isDisabled}
        onPress={handleDeleteButtonPress}
        sx={{ alignSelf: 'auto' }}
      >
        <Icon
          {...({ icon: DeleteIcon, size: 15, isDisabled, title: { name: 'Delete Icon' } } as IconPropsWithDisabled)}
        />
      </IconButton>
      <a
        href={downloadLink}
        {...visuallyHiddenProps}
        download
        ref={downloadRef}
        aria-label={`download ${name}`}
        data-testid="file-uploaded__download-link"
        tabIndex={-1}
        id={`file-uploaded__download-link-${id}`}
      />
    </Box>
  );
};

export default FileItem;
