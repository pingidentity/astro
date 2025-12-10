import React, { FC } from 'react';
import TrashIcon from '@pingux/mdi-react/TrashIcon';

import { ArrayFieldDeleteButtonProps } from '../../types';
import Icon from '../Icon';
import IconButton from '../IconButton';

const ArrayFieldDeleteButton: FC<ArrayFieldDeleteButtonProps> = ({ isDisabled, id, onDelete }) => (
  <IconButton
    onPress={() => onDelete && onDelete(id)}
    isDisabled={isDisabled}
    aria-label="delete-button"
    sx={{
      position: 'absolute',
      right: -35,
      width: 32,
      height: 32,
      top: 5,
      cursor: 'pointer',
    }}
  >
    <Icon icon={TrashIcon} size={20} color="neutral.40" title={{ name: 'Trash Icon' }} />
  </IconButton>
);

export default ArrayFieldDeleteButton;
