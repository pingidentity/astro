import React, { useState } from 'react';
import EyeIcon from 'mdi-react/EyeIcon';
import EyeOffIcon from 'mdi-react/EyeOffIcon';
import { Box, Icon, IconButton, Text } from '../index';

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
      defaultValue: 'very-secret-information.?1234512345',
    },
  },
};

export const Default = ({ dataTitle, secretData }) => {
  const [isMasked, setIsMasked] = useState(true);

  return (
    <Box>
      <Text variant="bodyStrong">{dataTitle}</Text>
      <Box isRow alignItems="center">
        <Text sx={{ width: 255, wordBreak: 'break-all' }}>
          {isMasked ? '*'.repeat(secretData?.length) : secretData}
        </Text>
        <IconButton
          onPress={() => setIsMasked(!isMasked)}
          sx={{ width: 'fit-content', marginLeft: 10, alignSelf: 'auto' }}
        >
          <Icon icon={isMasked ? EyeIcon : EyeOffIcon} />
        </IconButton>
      </Box>
    </Box>
  );
};
