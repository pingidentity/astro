import React from 'react';

import { switchFieldPropTypes } from '../../../components/SwitchField/switchFieldAttributes';
import { SwitchField } from '../../../index';

/**
 * ListItemSwitchField is one of several styled control components that can be used as a child
 * nested inside of the [StyledListItem](./?path=/story/experimental-styledlistitem--default).
 * Its a wrapper component around the [SwitchField](./?path=/story/form-switchfield--default),
 * intended to make matching specs easy. Most props available to the SwitchField are also
 * available to ListItemEditButton.
*/

const ListItemSwitchField = props => {
  return (
    <SwitchField
      aria-label="active user"
      isDefaultSelected
      mr={0}
      {...props}
    />
  );
};

ListItemSwitchField.displayName = 'ListItemSwitchField';

ListItemSwitchField.propTypes = switchFieldPropTypes;

export default ListItemSwitchField;
