import React from 'react';

import { menuPropTypes } from '../../../components/Menu/menuAttributes';
import { ListViewItemMenu } from '../../../index';

/**
 * PanelHeaderMenu is one of several styled control components that can be used as a child
 * nested inside of the [PanelHeader](./?path=/story/experimental-panelheader--default).
 * Its a wrapper component around the [PopoverMenu](./?path=/story/components-popovermenu--default)
 * and [Menu](./?path=/docs/components-menu--default) component, intended to make matching
 * specs easy. Most props available to the Menu component are available to PanelHeaderMenu.
*/

const PanelHeaderMenu = props => {
  return <ListViewItemMenu {...props} />;
};

PanelHeaderMenu.propTypes = menuPropTypes;

PanelHeaderMenu.displayName = 'PanelHeaderMenu';

export default PanelHeaderMenu;
