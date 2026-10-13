import React, { forwardRef, useImperativeHandle } from 'react';
import type { AriaButtonProps } from 'react-aria';
import { FocusRing, mergeProps } from 'react-aria';
import { PressResponder, useHover } from '@react-aria/interactions';

import { Box, Button, Icon, Loader, TextField } from '../..';
import { useInputLoader, usePropWarning } from '../../hooks';
import useGetTheme from '../../hooks/useGetTheme';
import { ComboBoxInputProps } from '../../types';
import type { BoxProps } from '../../types/box';
import type { TextFieldProps } from '../../types/textField';
import loadingStates from '../../utils/devUtils/constants/loadingStates';

const ComboBoxInput = forwardRef<HTMLInputElement, ComboBoxInputProps>((props, ref) => {
  const {
    controlProps,
    containerProps,
    hasAutoFocus,
    isDisabled,
    isReadOnly,
    isOpen,
    loadingState,
    style,
    inputWrapperRef,
    inputRef,
    inputProps,
    triggerRef,
    triggerProps,
    menuTrigger,
    onInputChange,
    onLoadMore,
    onOpenChange,
    onSelectionChange,
    wrapperProps,
    ...others
  } = props;

  const { hoverProps, isHovered } = useHover({});

  const textFieldProps = {
    isDisabled,
    isReadOnly,
    containerProps,
    ...mergeProps(inputProps, others),
  } as TextFieldProps;

  const { icons, themeState: { isOnyx } } = useGetTheme();
  const { MenuDown } = icons;

  // istanbul ignore next
  useImperativeHandle(
    ref,
    () => (inputRef as React.RefObject<HTMLInputElement>).current as HTMLInputElement,
  );

  const { isLoading } = useInputLoader({
    loadingState: loadingState as string,
    // eslint-disable-next-line max-len
    inputValue: (inputProps as React.InputHTMLAttributes<HTMLInputElement> | undefined)?.value as string,
  });

  usePropWarning(props, 'disabled', 'isDisabled');

  const button = !isReadOnly && (
    <Box isRow variant="forms.comboBox.inputInContainerSlot">
      {
        // Render loader after delay if filtering or loading
        isLoading && (isOpen || menuTrigger === 'manual' || loadingState === loadingStates.LOADING)
        && <Loader variant="loader.withinInput" {...(isOnyx && { size: 'sm' })} />
      }
      <PressResponder preventFocusOnPress isPressed={isOpen}>
        <Button
          variant="forms.comboBox.button"
          {...triggerProps as AriaButtonProps}
          ref={triggerRef}
          isDisabled={isDisabled || isReadOnly}
          tabIndex={-1}
        >
          <Icon
            icon={MenuDown}
            size={isOnyx ? 'sm' : 'md'}
            sx={isOpen ? { transform: 'rotate(180deg)' } : undefined}
            title={{ name: '' }}
            aria-hidden="true"
          />
        </Button>
      </PressResponder>
    </Box>
  );

  return (
    <FocusRing
      within
      isTextInput
      focusClass="is-focused"
      focusRingClass="focus-ring"
      autoFocus={hasAutoFocus}
    >
      <Box
        isRow
        style={style}
        variant="forms.comboBox.container"
        {...hoverProps}
        {...(wrapperProps as BoxProps)}
      >
        <TextField
          {...textFieldProps}
          wrapperProps={{ ref: inputWrapperRef }}
          controlProps={{
            variant: 'forms.comboBox.input',
            ...controlProps,
          }}
          tabIndex={-1}
          statusClasses={{ isHovered }}
          ref={inputRef as React.Ref<HTMLInputElement>}
          slots={{
            inContainer: button,
          }}
        />
      </Box>
    </FocusRing>
  );
});

export default ComboBoxInput;
