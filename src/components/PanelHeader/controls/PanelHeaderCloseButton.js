import React, { forwardRef } from 'react';
import CloseIcon from '@pingux/mdi-react/CloseIcon';

import { Box, Icon, IconButton } from '../../../index';
import { iconButtonPropTypes } from '../../IconButton/iconButtonAttributes';

/**
 * PanelHeaderCloseButton is one of several styled control components that can be used as a child
 * nested inside of the [PanelHeader](./?path=/docs/components-panelheader--docs).
 * Its a wrapper component around the [IconButton](./?path=/docs/components-iconbutton--docs),
 * intended to make matching specs easy. Most props available to the IconButton are also available
 * to PanelHeaderCloseButton.
*/

const PanelHeaderCloseButton = forwardRef((props, ref) => {
  return (
    <Box>
      <IconButton ref={ref} aria-label="close-icon" {...props}>
        <Icon icon={CloseIcon} size="md" />
      </IconButton>
    </Box>
  );
});

PanelHeaderCloseButton.propTypes = iconButtonPropTypes;

PanelHeaderCloseButton.displayName = 'PanelHeaderCloseButton';

export default PanelHeaderCloseButton;
