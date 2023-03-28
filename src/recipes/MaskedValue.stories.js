import React, { useState } from 'react';
import EyeOffIcon from 'mdi-react/EyeOffOutlineIcon';
import EyeIcon from 'mdi-react/EyeOutlineIcon';

import { useStatusClasses } from '../hooks';
import {
  Box,
  Icon,
  IconButton,
  Text,
} from '../index';

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
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

const sx = {
  showHideButton: {
    width: 'fit-content',
    marginLeft: 'sm',
    alignSelf: 'auto',
  },
  maskedItem: {
    color: 'black',
    fontSize: '16px',
    width: 252,
    wordBreak: 'break-all',
    '&.is-masked': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      fontWeight: 3,
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
        <Text sx={sx.maskedItem} className={classNames}>
          {isMasked ? '•'.repeat(99) : secretData}
        </Text>
        <IconButton
          aria-label={isMasked ? 'Show content' : 'Hide content'}
          onPress={() => setIsMasked(!isMasked)}
          sx={sx.showHideButton}
        >
          <Icon icon={isMasked ? EyeOffIcon : EyeIcon} size="sm" />
        </IconButton>
      </Box>
    </Box>
  );
};
