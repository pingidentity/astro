import React, { forwardRef } from 'react';

import { useGetTheme, useLocalOrForwardRef } from '../../hooks';
import { Box, Button, ColorFieldPreviewButtonProps, Icon, Text } from '../../index';

const ColorFieldPreviewButton = forwardRef<HTMLButtonElement, ColorFieldPreviewButtonProps>((
  props, ref) => {
  const {
    isOpen,
    bg,
    label,
    colorValue,
    ...others
  } = props;
  const { icons } = useGetTheme();
  const {
    MenuUp,
    MenuDown,
  } = icons;

  const buttonRef = useLocalOrForwardRef<HTMLButtonElement>(ref);

  return (
    <Button {...others} ref={buttonRef} variant="forms.colorField.detailedPreviewButton">
      <Box isRow alignItems="center" gap="md" minWidth="100%" flexGrow="1">
        <Box bg={bg} variant="forms.colorField.detailedColorView" />
        <Box textAlign="left" gap="xs">
          <Text variant="colorFieldButtonLabel">{label}</Text>
          <Text variant="colorFieldButtonColor">{colorValue}</Text>
        </Box>
        <Box sx={{ ml: 'auto' }} flexGrow="1">
          <Icon ml="auto" title={{ name: isOpen ? 'menu-up' : 'menu-down' }} icon={isOpen ? MenuUp : MenuDown} />
        </Box>
      </Box>
    </Button>
  );
});

export default ColorFieldPreviewButton;
