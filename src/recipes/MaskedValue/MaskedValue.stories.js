import React, { useState } from 'react';
import EyeIcon from 'mdi-react/EyeOutlineIcon';
import EyeOffIcon from 'mdi-react/EyeOffOutlineIcon';
import { Box, Icon, IconButton, Text } from '../../index';
import { useStatusClasses } from '../../hooks';

export default {
  title: 'Recipes/Masked Values',
  argTypes: {
    dataTitle: {
      control: {
        type: 'text',
      },
      defaultValue: 'Clients Secret',
    },
    secretData: {
      control: {
        type: 'text',
      },
      defaultValue: 'A secret piece of text',
    },
  },
};

const sx = {
  showHideButton: {
    width: 'fit-content',
    marginLeft: 'sm',
    alignSelf: 'auto',
  },
};

export const Default = ({ dataTitle, secretData }) => {
  const [isMasked, setIsMasked] = useState(true);
  const { classNames } = useStatusClasses(null, {
    isMasked,
  });

  return (
    <Box>
      <Text variant="label">{dataTitle}</Text>
      <Box isRow alignItems="center">
        <Text variant="variants.maskedValue.maskedValue" className={classNames}>
          {isMasked ? '•'.repeat(99) : secretData}
        </Text>
        <IconButton
          aria-label={isMasked ? 'Show content' : 'Hide content'}
          onPress={() => setIsMasked(!isMasked)}
          sx={sx.showHideButton}
        >
          <Icon icon={isMasked ? EyeOffIcon : EyeIcon} />
        </IconButton>
      </Box>
    </Box>
  );
};
