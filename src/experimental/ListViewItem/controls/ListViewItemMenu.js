import React from 'react';
import MoreVertIcon from '@pingux/mdi-react/MoreVertIcon';

import { menuPropTypes } from '../../../components/Menu/menuAttributes';
import { Icon, IconButton, Menu, PopoverMenu } from '../../../index';

/**
 * ListViewItemEditButton is one of several styled control components that can be used as a child
 * nested inside of the [ListViewItem](./?path=/story/experimental-listviewitem--default).
 * Its a wrapper component around the [PopoverMenu](./?path=/story/components-popovermenu--default)
 * and [Menu](./?path=/docs/components-menu--default) component, intended to make matching
 * specs easy. Most props available to the Menu component are available to ListItemMenu.
*/

const ListViewItemMenu = ({ children, ...others }) => (
  <PopoverMenu>
    <IconButton aria-label="more">
      <Icon icon={MoreVertIcon} size="md" />
    </IconButton>
    <Menu {...others}>
      {children}
    </Menu>
  </PopoverMenu>
);

ListViewItemMenu.propTypes = menuPropTypes;

ListViewItemMenu.displayName = 'ListViewItemMenu';

export default ListViewItemMenu;
