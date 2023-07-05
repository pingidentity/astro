import React from 'react';
import MoreVertIcon from '@pingux/mdi-react/MoreVertIcon';

import { menuPropTypes } from '../../../components/Menu/menuAttributes';
import { Icon, IconButton, Menu, PopoverMenu } from '../../../index';

/**
 * ListItemMenu is one of several styled control components that can be used as a child
 * nested inside of the [StyledListItem](./?path=/story/experimental-styledlistitem--default).
 * Its a wrapper component around the [PopoverMenu](./?path=/story/components-popovermenu--default)
 * and [Menu](./?path=/docs/components-menu--default) component, intended to make matching
 * specs easy. Most props available to the Menu component are available to ListItemMenu.
*/

const ListItemMenu = ({ children, ...others }) => (
  <PopoverMenu>
    <IconButton aria-label="more">
      <Icon icon={MoreVertIcon} size="md" />
    </IconButton>
    <Menu {...others}>
      {children}
    </Menu>
  </PopoverMenu>
);

ListItemMenu.propTypes = menuPropTypes;

ListItemMenu.displayName = 'ListItemMenu';

export default ListItemMenu;
