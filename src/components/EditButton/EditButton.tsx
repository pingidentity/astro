import React, { forwardRef } from 'react';
import PencilIcon from '@pingux/mdi-react/PencilIcon';

import { Box, Icon, IconButton } from '../../index';
import { EditButtonProps } from '../../types';

export const IconSize = {
  sm: 10,
  md: 15,
  lg: 20,
} as const;

const EditButton = forwardRef<HTMLElement, EditButtonProps>((props, ref) => {
  const { size = 'md', ...other } = props;

  return (
    <Box ref={ref}>
      <IconButton
        aria-label="Edit"
        variant="inverted"
        {...other}
      >
        <Icon
          icon={PencilIcon}
          size={IconSize[size as keyof typeof IconSize] || size}
          title={{ name: 'Pencil Icon' }}
        />
      </IconButton>
    </Box>
  );
});

EditButton.displayName = 'EditButton';
export default EditButton;
