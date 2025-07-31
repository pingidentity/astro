import React, {
  forwardRef,
  useContext,
} from 'react';
import { FocusRing } from 'react-aria';
import { useToggleButtonGroupItem } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';

import { RockerContext } from '../../context/RockerButtonGroupContext';
import { useLocalOrForwardRef, usePropWarning, useStatusClasses } from '../../hooks';
import { Box } from '../../index';
import { accent, getBaseHexColor, getDarkerColor } from '../../styles/colors';
import { RockerButtonProps } from '../../types/rockerButton';

export const RockerButton = forwardRef<HTMLElement, RockerButtonProps>((props, ref) => {
  const {
    className,
    children,
    isDisabled,
    name,
    selectedStyles,
  } = props;
  const { state, disabledKeys } = useContext(RockerContext);

  const rockerButtonRef = useLocalOrForwardRef<HTMLElement>(ref);
  const { hoverProps, isHovered } = useHover({});

  const backgroundHexColor = selectedStyles?.bg
    ? getBaseHexColor(selectedStyles?.bg as string)
    : accent[20];

  usePropWarning(props, 'disabled', 'isDisabled');

  const id = name;

  const {
    buttonProps: rockerButtonProps,
    isSelected,
    isDisabled: raIsDisabled,
    isPressed,
  } = useToggleButtonGroupItem({ id,
    ...props,
    isDisabled: isDisabled || disabledKeys?.includes(id) }, state, rockerButtonRef);

  const { classNames } = useStatusClasses(className, {
    isHovered,
    isPressed,
    isDisabled: raIsDisabled,
    isSelected,
  });

  return (
    <FocusRing focusRingClass="is-focused">
      <Box
        as="button"
        isRow
        className={classNames}
        variant="variants.rockerButton.thumbSwitch"
        ref={rockerButtonRef}
        sx={{
          '&.is-selected': {
            ...selectedStyles,
          },
          '&.is-selected.is-hovered': {
            bg: getDarkerColor(backgroundHexColor as string, 0.2),
          },
          '&.is-pressed': {
            bg: getDarkerColor(backgroundHexColor as string, 0.4),
          },
        }}
        {...mergeProps(hoverProps, rockerButtonProps)}
      >
        {children || name}
      </Box>
    </FocusRing>
  );
});

export default RockerButton;
