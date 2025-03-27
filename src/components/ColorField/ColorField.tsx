import React, {
  forwardRef,
  useCallback,
  useRef,
} from 'react';
import { FocusScope, mergeProps, useOverlayPosition, useOverlayTrigger, useVisuallyHidden } from 'react-aria';
import { SketchPicker } from 'react-color';
import { useOverlayTriggerState } from 'react-stately';
import { useColorField } from '@react-aria/color';
import { useColorFieldState } from '@react-stately/color';

import { Box, Button, FieldHelperText, Input, Label, Text } from '../..';
import { useLocalOrForwardRef } from '../../hooks';
import useField from '../../hooks/useField';
import { FieldControlInputProps, UseFieldProps } from '../../hooks/useField/useField';
import { ColorFieldProps, CustomColorProps, Placement } from '../../types';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import { getAriaAttributeProps } from '../../utils/docUtils/ariaAttributes';
import PopoverContainer from '../PopoverContainer';

import ColorFieldPreviewButton from './ColorFieldPreviewButton';

const displayName = 'ColorField';

const ColorField = forwardRef<HTMLInputElement, ColorFieldProps>((props, ref) => {
  const {
    align = 'middle',
    buttonProps,
    controlProps,
    direction = 'bottom',
    helperText,
    label,
    labelProps,
    onChange: imperativeOnChange,
    status,
    mode,
  } = props;
  const { ariaProps, nonAriaProps } = getAriaAttributeProps(props);

  const colorRef = useLocalOrForwardRef<HTMLInputElement>(ref);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const state = useColorFieldState(nonAriaProps);
  const popoverState = useOverlayTriggerState({});

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    popoverState,
    triggerRef,
  );

  const { labelProps: raLabelProps, inputProps: raInputProps } = useColorField(
    nonAriaProps,
    state,
    colorRef,
  );

  const isDetailedMode = mode === 'detailed-button-preview';

  const sizeValues = isDetailedMode
    ? { offset: 0, width: 220 } : { offset: 15, width: undefined };

  const { visuallyHiddenProps } = useVisuallyHidden();

  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = useField({
    ...nonAriaProps,
    labelProps: {
      ...labelProps,
      ...raLabelProps,
    },
    controlProps: {
      ...controlProps,
      ...raInputProps,
    },
  } as UseFieldProps<ColorFieldProps>);

  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: `${direction} ${align}` as Placement,
    offset: sizeValues.offset,
    isOpen: popoverState.isOpen,
    onClose: popoverState.close,
    shouldUpdatePosition: true,
  });

  /* istanbul ignore next */
  const handleButtonPress = useCallback(() => popoverState.open(), [
    popoverState,
  ]);

  const handleColorChange = useCallback(
    (color: CustomColorProps, event: React.ChangeEvent<HTMLInputElement>) => {
      if (imperativeOnChange) {
        imperativeOnChange(color, event);
      }
    }, [imperativeOnChange]);

  const getRgbaFromState = useCallback(({ colorValue }) => {
    return `rgba(${colorValue?.red}, ${colorValue?.green}, ${colorValue?.blue}, ${colorValue?.alpha})`;
  }, []);

  const defaultButtonProps = {
    'aria-label': 'Select color',
    bg: getRgbaFromState(state),
    onPress: handleButtonPress,
    ref: triggerRef,
  };

  return (
    <Box {...getPendoID(displayName)} {...fieldContainerProps}>
      {isDetailedMode
        ? (
          <ColorFieldPreviewButton
            isOpen={popoverState.isOpen}
            colorValue={state.colorValue?.toString('hex')}
            label={label}
            {...mergeProps(defaultButtonProps, buttonProps, ariaProps, triggerProps)}
          />
        ) : (
          <>
            {label && <Label {...fieldLabelProps} />}
            <Button
              aria-label="Select color"
              bg={getRgbaFromState(state)}
              onPress={handleButtonPress}
              ref={triggerRef}
              variant="forms.colorField.container"
              {...mergeProps(buttonProps, ariaProps, triggerProps)}
            />
          </>
        )}
      <Box {...fieldControlWrapperProps}>
        <Input
          {...visuallyHiddenProps}
          {...fieldControlInputProps as Omit<FieldControlInputProps, 'onChange'>}
          role="textbox"
          ref={colorRef}
          sx={{ display: 'none' }}
        />
      </Box>
      {helperText && (
        <FieldHelperText status={status}>{helperText}</FieldHelperText>
      )}
      <PopoverContainer
        hasNoArrow
        isDismissable
        isNonModal
        isNotClosedOnBlur
        isOpen={popoverState.isOpen}
        onClose={popoverState.close}
        ref={overlayRef}
        {...overlayProps}
        {...positionProps}
        role="presentation"
      >
        <FocusScope restoreFocus contain autoFocus>
          <SketchPicker
            width={sizeValues.width}
            color={getRgbaFromState(state)}
            onChange={handleColorChange}
          />
        </FocusScope>
      </PopoverContainer>
    </Box>
  );
});

ColorField.displayName = displayName;

export default ColorField;
