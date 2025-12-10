import React, { forwardRef } from 'react';
import PencilIcon from '@pingux/mdi-react/PencilIcon';
import PropTypes from 'prop-types';

import { Box, Icon, IconButton } from '../../index';
import { iconButtonPropTypes } from '../IconButton/iconButtonAttributes';

export const IconSize = {
  sm: 10,
  md: 15,
  lg: 20,
};

const EditButton = forwardRef((props, ref) => {
  const { size, ...other } = props;

  return (
    <Box ref={ref}>
      <IconButton
        aria-label="Edit"
        variant="inverted"
        {...other}
      >
        <Icon
          icon={PencilIcon}
          size={IconSize[size] || size}
          title={{ name: 'Pencil Icon' }}
        />
      </IconButton>
    </Box>
  );
});

EditButton.propTypes = {
  ...iconButtonPropTypes,
  /**  Determines the icon size */
  size: PropTypes.string,
};

EditButton.defaultProps = {
  size: 'md',
};

EditButton.displayName = 'EditButton';
export default EditButton;
