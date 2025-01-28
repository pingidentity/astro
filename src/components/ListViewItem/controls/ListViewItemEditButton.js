import React, { forwardRef } from 'react';
import CreateIcon from '@pingux/mdi-react/CreateIcon';

import { Box, Icon, IconButton } from '../../..';
import { iconButtonPropTypes } from '../../IconButton/iconButtonAttributes';

/**
 * ListViewItemEditButton is one of several styled control components that can be used as a child
 * nested inside of the [ListViewItem](./?path=/docs/components-listviewitem--docs).
 * Its a wrapper component around the [IconButton](./?path=/docs/components-iconbutton--docs),
 * intended to make matching specs easy. Most props available to the IconButton are also available
 * to ListItemEditButton.
*/

const ListViewItemEditButton = forwardRef((props, ref) => {
  return (
    <Box ref={ref} ml="sm">
      <IconButton {...props}>
        <Icon icon={CreateIcon} size="md" />
      </IconButton>
    </Box>
  );
});

ListViewItemEditButton.propTypes = iconButtonPropTypes;


ListViewItemEditButton.displayName = 'ListViewItemEditButton';

export default ListViewItemEditButton;
