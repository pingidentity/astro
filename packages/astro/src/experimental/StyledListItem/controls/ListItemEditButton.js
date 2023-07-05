import React from 'react';
import CreateIcon from '@pingux/mdi-react/CreateIcon';

import { iconButtonPropTypes } from '../../../components/IconButton/iconButtonAttributes';
import { Box, Icon, IconButton } from '../../../index';

/**
 * ListItemEditButton is one of several styled control components that can be used as a child
 * nested inside of the [StyledListItem](./?path=/story/experimental-styledlistitem--default).
 * Its a wrapper component around the [IconButton](./?path=/story/components-iconbutton--default),
 * intended to make matching specs easy. Most props available to the IconButton are also available
 * to ListItemEditButton.
*/

const ListItemEditButton = props => {
  return (
    <Box>
      <IconButton aria-label="edit-icon" {...props}>
        <Icon icon={CreateIcon} size="sm" />
      </IconButton>
    </Box>
  );
};

ListItemEditButton.propTypes = iconButtonPropTypes;


ListItemEditButton.displayName = 'ListItemEditButton';

export default ListItemEditButton;
