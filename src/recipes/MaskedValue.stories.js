import React, { useState } from 'react';
import EyeOffIcon from '@pingux/mdi-react/EyeOffOutlineIcon';
import EyeIcon from '@pingux/mdi-react/EyeOutlineIcon';

import { useStatusClasses } from '../hooks';
import {
  Box,
  Icon,
  IconButton,
  Text,
} from '../index';
import { FIGMA_LINKS } from '../utils/designUtils/figmaLinks.ts';

export default {
  title: 'Recipes/Masked Values',
  argTypes: {
    dataTitle: {
      control: {
        type: 'text',
      },
    },
    secretData: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    dataTitle: 'Clients Secret',
    secretData: 'A secret piece of text',
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
          <Icon icon={isMasked ? EyeOffIcon : EyeIcon} size="sm" title={{ name: isMasked ? 'Eye Off Icon' : 'Eye Icon' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.maskedValue.default,
  },
};
