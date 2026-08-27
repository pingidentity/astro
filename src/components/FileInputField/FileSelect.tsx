import React from 'react';

import { Button, Text } from '../..';
import { FileSelectProps } from '../../types';
import { getAriaAttributeProps } from '../../utils/docUtils/ariaAttributes';

const FileSelect: React.FC<FileSelectProps> = ({
  buttonText,
  handleFileSelect,
  isDisabled,
  textProps,
  ...others
}) => {
  const { ariaProps } = getAriaAttributeProps(others);

  return (
    <Button
      aria-label={buttonText}
      data-testid="file-input-field__file-select"
      isDisabled={isDisabled}
      mx={15}
      my={5}
      onPress={handleFileSelect}
      variant="forms.fileInputField.button"
      {...ariaProps}
    >
      <Text color="active" {...textProps}>
        {buttonText}
      </Text>
    </Button>
  );
};

export default FileSelect;
