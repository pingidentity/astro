import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from '../../index';

const FileSelect = (props) => {
  const { buttonText, handleFileSelect, isDisabled, textProps } = props;

  return (
    <Button
      aria-label={buttonText}
      data-testid="file-input-field__file-select"
      isDisabled={isDisabled}
      mx={15}
      my={5}
      onPress={handleFileSelect}
      variant="fileInputField"
    >
      <Text color="active" {...textProps}>
        {buttonText}
      </Text>
    </Button>
  );
};

export default FileSelect;

FileSelect.propTypes = {
  buttonText: PropTypes.string,
  handleFileSelect: PropTypes.func,
  isDisabled: PropTypes.bool,
  textProps: PropTypes.shape({}),
};
