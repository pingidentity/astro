import React, { useState } from 'react';
import EyeIcon from 'mdi-react/EyeOutlineIcon';
import EyeOffIcon from 'mdi-react/EyeOffOutlineIcon';
import { Box, Icon, IconButton, Text } from '../index';
import { useStatusClasses } from '../hooks';

export default {
  title: 'Recipes/MaskedValues',
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

export const Default = ({ dataTitle, secretData }) => {
  const [isMasked, setIsMasked] = useState(true);
  const { classNames } = useStatusClasses(null, {
    isMasked,
  });

  return (
    <Box>
      <Text variant="label">{dataTitle}</Text>
      <Box isRow alignItems="center">
        <Text variant="maskedValue" className={classNames}>
          {isMasked ? '•'.repeat(99) : secretData}
        </Text>
        <IconButton
          aria-label={isMasked ? 'Show content' : 'Hide content'}
          onPress={() => setIsMasked(!isMasked)}
          sx={{ width: 'fit-content', marginLeft: 10, alignSelf: 'auto' }}
        >
          <Icon icon={isMasked ? EyeOffIcon : EyeIcon} />
        </IconButton>
      </Box>
    </Box>
  );
};
