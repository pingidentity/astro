import React, { forwardRef } from 'react';

import { ListViewItemMenu } from '../../../index';
import { menuPropTypes } from '../../Menu/menuAttributes';

/**
 * PanelHeaderMenu is one of several styled control components that can be used as a child
 * nested inside of the [PanelHeader](./?path=/docs/components-panelheader--docs).
 * Its a wrapper component around the [PopoverMenu](./?path=/story/components-popovermenu--docs)
 * and [Menu](./?path=/docs/components-menu--docs) component, intended to make matching
 * specs easy. Most props available to the Menu component are available to PanelHeaderMenu.
*/

const PanelHeaderMenu = forwardRef((props, ref) => {
  return <ListViewItemMenu ref={ref} {...props} />;
});

PanelHeaderMenu.propTypes = menuPropTypes;

PanelHeaderMenu.displayName = 'PanelHeaderMenu';

export default PanelHeaderMenu;
