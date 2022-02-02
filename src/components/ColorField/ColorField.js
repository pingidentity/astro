import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import { FocusScope } from '@react-aria/focus';
import { useVisuallyHidden } from '@react-aria/visually-hidden';
import { useColorField } from '@react-aria/color';
import { useColorFieldState } from '@react-stately/color';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { useOverlayPosition, useOverlayTrigger } from '@react-aria/overlays';
import { Box, Button, Input, FieldHelperText, Label } from '../../index';
import useField from '../../hooks/useField';
import statuses from '../../utils/devUtils/constants/statuses';
import PopoverContainer from '../PopoverContainer';

/**
 * The Color Field component allows the user to pick a color and displays the chosen color.
 *
 * Utilizes [useColorField](https://react-spectrum.adobe.com/react-aria/useColorField.html) from React Aria and
 * [useColorFieldState](https://react-spectrum.adobe.com/react-stately/useColorFieldState.html) from React Stately.
 *
 * Using [React Color](https://casesandberg.github.io/react-color/) as a color picker.
 */

const ColorField = forwardRef((props, ref) => {
  const {
    align,
    buttonProps,
    controlProps,
    direction,
    helperText,
    label,
    labelProps,
    onChange: imperativeOnChange,
    status,
  } = props;

  const colorRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => colorRef.current);

  const triggerRef = React.useRef();
  const overlayRef = React.useRef();

  const state = useColorFieldState(props);
  const popoverState = useOverlayTriggerState({});

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    popoverState,
    triggerRef,
  );

  const { labelProps: raLabelProps, inputProps: raInputProps } = useColorField(
    props,
    state,
    colorRef,
  );

  const { visuallyHiddenProps } = useVisuallyHidden();

  const { fieldContainerProps, fieldControlProps, fieldLabelProps } = useField({
    ...props,
    labelProps: {
      ...labelProps,
      ...raLabelProps,
    },
    controlProps: {
      ...controlProps,
      ...raInputProps,
    },
  });

  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: `${direction} ${align}`,
    offset: 15,
    isOpen: popoverState.isOpen,
    onClose: popoverState.close,
    shouldUpdatePosition: true,
  });

  const handleButtonPress = useCallback(() => popoverState.open(), [
    triggerRef,
  ]);

  const handleColorChange = useCallback(
    (color, event) => {
      if (imperativeOnChange) {
        imperativeOnChange(color, event);
      }
    },
    [imperativeOnChange],
  );

  const getRgbaFromState = useCallback(({ colorValue }) => {
    return `rgba(${colorValue?.red}, ${colorValue?.green}, ${colorValue?.blue}, ${colorValue?.alpha})`;
  }, []);

  return (
    <Box {...fieldContainerProps}>
      {label && <Label {...fieldLabelProps} />}
      <Button
        aria-label="Select color"
        bg={getRgbaFromState(state)}
        onPress={handleButtonPress}
        ref={triggerRef}
        variant="colorField"
        {...triggerProps}
        {...buttonProps}
      />
      <Input {...visuallyHiddenProps} {...fieldControlProps} ref={colorRef} />
      {helperText && (
        <FieldHelperText status={status}>{helperText}</FieldHelperText>
      )}
      <PopoverContainer
        {...overlayProps}
        {...positionProps}
        ref={overlayRef}
        isOpen={popoverState.isOpen}
        onClose={popoverState.close}
        hasNoArrow
        isDismissable
      >
        <FocusScope restoreFocus contain autoFocus>
          <ChromePicker
            color={getRgbaFromState(state)}
            onChange={handleColorChange}
          />
        </FocusScope>
      </PopoverContainer>
    </Box>
  );
});

ColorField.propTypes = {
  /** Alignment of the popover menu relative to the trigger. */
  align: PropTypes.oneOf(['start', 'end', 'middle']),
  /** Where the popover menu opens relative to its trigger. */
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** Text to display after the Color Field button. Useful for errors or other info. */
  helperText: PropTypes.node,
  /** The content to display as the label. */
  label: PropTypes.node,
  /** Pass a function to call every time the color is changed. [React Color onChange](https://casesandberg.github.io/react-color/#api-onChange)
   *
   * (color, event) => void;
   */
  onChange: PropTypes.func,
  /** Determines the helper text styling. */
  status: PropTypes.oneOf(Object.values(statuses)),
  /** Color controls what color is active on the color picker. */
  value: PropTypes.string,
  /** Props object that is spread into the Button element. */
  buttonProps: PropTypes.shape({}),
  /** Props object that is spread directly into the root (top-level) Box component. */
  containerProps: PropTypes.shape({}),
  /** Props object that is spread into the input element. */
  controlProps: PropTypes.shape({}),
  /** Props object that is spread into the label element. */
  labelProps: PropTypes.shape({}),
};

ColorField.defaultProps = {
  align: 'middle',
  direction: 'bottom',
};

ColorField.displayName = 'ColorField';

export default ColorField;
