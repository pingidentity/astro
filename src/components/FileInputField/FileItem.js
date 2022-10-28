import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from 'mdi-react/DeleteIcon';
import ErrorIcon from 'mdi-react/ErrorIcon';
import InsertDriveFileIcon from 'mdi-react/InsertDriveFileIcon';
import { useVisuallyHidden } from 'react-aria';

import { Box, Button, IconButton, Icon, Text } from '../../index';
import statuses from '../../utils/devUtils/constants/statuses';

const FileItem = (props) => {
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
  const downloadRef = useRef();

  const getFileIconProps = useCallback(() => {
    switch (status) {
      case statuses.ERROR:
        return {
          icon: ErrorIcon,
          color: 'critical.dark',
          'data-testid': 'file-uploaded__file-icon--is-error',
        };
      default:
        return {
          icon: InsertDriveFileIcon,
          color: 'neutral.10',
        };
    }
  }, [status]);

  const handleDownloadPress = () => {
    downloadRef.current.click();
  };

  return (
    <Box isRow alignItems="center" mx={15} my={5}>
      <Icon
        size={15}
        data-testid="file-uploaded__file-icon"
        {...getFileIconProps()}
        isDisabled={isDisabled}
      />
      <Button
        variant="variants.fileInputField.button"
        mx={5}
        isDisabled={isDisabled}
        aria-label={name}
        data-testid="file-uploaded__download-file-button"
        onPress={handleDownloadPress}
      >
        <Text color="active" {...textProps}>
          {name}
        </Text>
      </Button>
      <IconButton
        aria-label={`Delete ${name} file icon`}
        data-testid="file-uploaded__delete-file-button"
        isDisabled={isDisabled}
        onPress={handleDeleteButtonPress}
        sx={{ alignSelf: 'auto' }}
      >
        <Icon icon={DeleteIcon} size={15} isDisabled={isDisabled} />
      </IconButton>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a
        href={downloadLink}
        {...visuallyHiddenProps}
        download
        ref={downloadRef}
        aria-label="download"
        data-testid="file-uploaded__download-link"
        tabIndex={-1}
      />
    </Box>
  );
};

export default FileItem;

FileItem.propTypes = {
  downloadLink: PropTypes.string,
  handleFileDelete: PropTypes.func,
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  name: PropTypes.string,
  status: PropTypes.oneOf(Object.values(statuses)),
  textProps: PropTypes.shape({}),
};
