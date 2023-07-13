import React from 'react';
import CreateIcon from '@pingux/mdi-react/CreateIcon';

import { iconButtonPropTypes } from '../../../components/IconButton/iconButtonAttributes';
import { Box, Icon, IconButton } from '../../../index';

/**
 * ListViewItemEditButton is one of several styled control components that can be used as a child
 * nested inside of the [ListViewItem](./?path=/story/experimental-listviewitem--default).
 * Its a wrapper component around the [IconButton](./?path=/story/components-iconbutton--default),
 * intended to make matching specs easy. Most props available to the IconButton are also available
 * to ListItemEditButton.
*/

const ListViewItemEditButton = props => {
  return (
    <Box>
      <IconButton aria-label="edit-icon" {...props}>
        <Icon icon={CreateIcon} size="sm" />
      </IconButton>
    </Box>
  );
};

ListViewItemEditButton.propTypes = iconButtonPropTypes;


ListViewItemEditButton.displayName = 'ListViewItemEditButton';

export default ListViewItemEditButton;
