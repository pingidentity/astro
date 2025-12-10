import React, { forwardRef } from 'react';

import { SwitchField } from '../../..';
// import { switchFieldPropTypes } from '../../SwitchField/switchFieldAttributes';

/**
 * ListViewItemSwitchField is one of several styled control components that can be used as a child
 * nested inside of the [ListViewItem](./?path=/docs/components-listviewitem--docs).
 * Its a wrapper component around the [SwitchField](./?path=/docs/form-switchfield--docs),
 * intended to make matching specs easy. Most props available to the SwitchField are also
 * available to ListItemEditButton.
*/

const ListViewItemSwitchField = forwardRef((props, ref) => {
  return (
    <SwitchField
      ref={ref}
      role="group"
      aria-label="active user"
      isDefaultSelected
      mr={0}
      {...props}
    />
  );
});

ListViewItemSwitchField.displayName = 'ListViewItemSwitchField';

// ListViewItemSwitchField.propTypes = switchFieldPropTypes;

export default ListViewItemSwitchField;
