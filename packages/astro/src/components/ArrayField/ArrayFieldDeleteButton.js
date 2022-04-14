import React from 'react';
import PropTypes from 'prop-types';
import TrashIcon from 'mdi-react/TrashIcon';
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
    <Icon icon={TrashIcon} size={20} color="neutral.40" />
  </IconButton>
);

ArrayFieldDeleteButton.propTypes = {
  id: PropTypes.number,
  isDisabled: PropTypes.bool,
  onDelete: PropTypes.func,
};

export default ArrayFieldDeleteButton;
