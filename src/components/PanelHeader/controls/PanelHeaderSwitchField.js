import React, { forwardRef } from 'react';

import { ListViewItemSwitchField } from '../../../index';
// import { switchFieldPropTypes } from '../../SwitchField/switchFieldAttributes';

/**
 * PanelHeaderSwitchField is one of several styled control components that can be used as a child
 * nested inside of the [PanelHeader](./?path=/docs/components-panelheader--docs).
 * Its a wrapper component around the [SwitchField](./?path=/story/form-switchfield--docs),
 * intended to make matching specs easy. Most props available to the SwitchField are also
 * available to ListItemEditButton.
*/

const PanelHeaderSwitchField = forwardRef((props, ref) => {
  return <ListViewItemSwitchField {...props} ref={ref} />;
});

// PanelHeaderSwitchField.propTypes = switchFieldPropTypes;

PanelHeaderSwitchField.displayName = 'PanelHeaderSwitchField';

export default PanelHeaderSwitchField;
