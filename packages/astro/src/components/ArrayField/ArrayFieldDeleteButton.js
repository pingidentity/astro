import React from 'react';
import TrashIcon from '@pingux/mdi-react/TrashIcon';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import IconButton from '../IconButton';

const ArrayFieldDeleteButton = ({ isDisabled, id, onDelete }) => (
  <IconButton
    onPress={() => onDelete(id)}
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

ArrayFieldDeleteButton.propTypes = {
  id: PropTypes.number,
  isDisabled: PropTypes.bool,
  onDelete: PropTypes.func,
};

export default ArrayFieldDeleteButton;
