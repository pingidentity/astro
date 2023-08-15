import React from 'react';

import { switchFieldPropTypes } from '../../../components/SwitchField/switchFieldAttributes';
import { ListViewItemSwitchField } from '../../../index';

/**
 * ListViewItemSwitchField is one of several styled control components that can be used as a child
 * nested inside of the [ListViewItem](./?path=/story/experimental-listviewitem--default).
 * Its a wrapper component around the [SwitchField](./?path=/story/form-switchfield--default),
 * intended to make matching specs easy. Most props available to the SwitchField are also
 * available to ListItemEditButton.
*/

const PanelHeaderSwitchField = props => {
  return <ListViewItemSwitchField {...props} />;
};

PanelHeaderSwitchField.propTypes = switchFieldPropTypes;

PanelHeaderSwitchField.displayName = 'PanelHeaderSwitchField';

export default PanelHeaderSwitchField;
