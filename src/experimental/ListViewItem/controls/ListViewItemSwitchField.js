import React from 'react';

import { switchFieldPropTypes } from '../../../components/SwitchField/switchFieldAttributes';
import { SwitchField } from '../../../index';

/**
 * ListViewItemSwitchField is one of several styled control components that can be used as a child
 * nested inside of the [ListViewItem](./?path=/story/experimental-listviewitem--default)..
 * Its a wrapper component around the [SwitchField](./?path=/story/form-switchfield--default),
 * intended to make matching specs easy. Most props available to the SwitchField are also
 * available to ListItemEditButton.
*/

const ListViewItemSwitchField = props => {
  return (
    <SwitchField
      role="group"
      aria-label="active user"
      isDefaultSelected
      mr={0}
      {...props}
    />
  );
};

ListViewItemSwitchField.displayName = 'ListViewItemSwitchField';

ListViewItemSwitchField.propTypes = switchFieldPropTypes;

export default ListViewItemSwitchField;
