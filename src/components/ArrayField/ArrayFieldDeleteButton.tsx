import React, { FC } from 'react';
import TrashIcon from '@pingux/mdi-react/TrashIcon';

import { useGetTheme } from '../../hooks';
import { ArrayFieldDeleteButtonProps } from '../../types';
import Icon from '../Icon';
import IconSymbol from '../Icon/IconSymbol';
import IconButton from '../IconButton';

const ArrayFieldDeleteButton: FC<ArrayFieldDeleteButtonProps> = ({ isDisabled, id, onDelete }) => {
  const { themeState } = useGetTheme();
  const isOnyxTheme = themeState.isOnyx;

  // The spec omits the delete control entirely when a field cannot be deleted
  // (e.g. the last remaining field) rather than rendering it disabled.
  if (isDisabled) {
    return null;
  }

  return (
    <IconButton
      onPress={() => onDelete && onDelete(id)}
      isDisabled={isDisabled}
      aria-label={isOnyxTheme ? 'Delete field' : 'delete-button'}
      variant="arrayField.deleteButton"
    >
      {isOnyxTheme
        ? (
          <IconSymbol
            icon="delete"
            size={20}
            sx={{ flexShrink: 0 }}
            title={{ name: 'Delete field' }}
          />
        )
        : <Icon icon={TrashIcon} size={20} color="neutral.40" title={{ name: 'Trash Icon' }} />}
    </IconButton>
  );
};

export default ArrayFieldDeleteButton;
