import React, { forwardRef } from 'react';
import MoreVertIcon from '@pingux/mdi-react/MoreVertIcon';

import { Icon, IconButton, Menu, PopoverMenu } from '../../..';
import { menuPropTypes } from '../../Menu/menuAttributes';

/**
 * ListViewItemEditButton is one of several styled control components that can be used as a child
 * nested inside of the [ListViewItem](./?path=/docs/components-listviewitem--docs).
 * Its a wrapper component around the [PopoverMenu](./?path=/docs/components-popovermenu--docs)
 * and [Menu](./?path=/docs/components-menu--docs) component, intended to make matching
 * specs easy. Most props available to the Menu component are available to ListItemMenu.
*/

const ListViewItemMenu = forwardRef(({ children, iconButtonProps, ...others }, ref) => (
  <PopoverMenu>
    <IconButton aria-label="more" ref={ref} {...iconButtonProps}>
      <Icon icon={MoreVertIcon} size="md" />
    </IconButton>
    <Menu {...others}>
      {children}
    </Menu>
  </PopoverMenu>
));

ListViewItemMenu.propTypes = menuPropTypes;

ListViewItemMenu.displayName = 'ListViewItemMenu';

export default ListViewItemMenu;
