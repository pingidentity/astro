import React from 'react';
import CloseIcon from '@pingux/mdi-react/CloseIcon';

import { iconButtonPropTypes } from '../../../components/IconButton/iconButtonAttributes';
import { Box, Icon, IconButton } from '../../../index';

/**
 * PanelHeaderCloseButton is one of several styled control components that can be used as a child
 * nested inside of the [PanelHeader](./?path=/story/experimental-panelheader--default).
 * Its a wrapper component around the [IconButton](./?path=/story/components-iconbutton--default),
 * intended to make matching specs easy. Most props available to the IconButton are also available
 * to PanelHeaderCloseButton.
*/

const PanelHeaderCloseButton = props => {
  return (
    <Box>
      <IconButton aria-label="close-icon" {...props}>
        <Icon icon={CloseIcon} size="md" />
      </IconButton>
    </Box>
  );
};

PanelHeaderCloseButton.propTypes = iconButtonPropTypes;

PanelHeaderCloseButton.displayName = 'PanelHeaderCloseButton';

export default PanelHeaderCloseButton;
