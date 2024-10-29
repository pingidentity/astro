import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FocusRing, mergeProps } from 'react-aria';
import { PressResponder, useHover } from '@react-aria/interactions';
import PropTypes from 'prop-types';

import { Box, Button, Icon, Loader, TextField } from '../..';
import { usePropWarning } from '../../hooks';
import useGetTheme from '../../hooks/useGetTheme';
import loadingStates from '../../utils/devUtils/constants/loadingStates';
import { ariaAttributesBasePropTypes } from '../../utils/docUtils/ariaAttributes';
import { statusPropTypes } from '../../utils/docUtils/statusProp';

const ComboBoxInput = forwardRef((props, ref) => {
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

  const textFieldProps = {
    isDisabled,
    isReadOnly,
    containerProps,
    ...mergeProps(inputProps, others),
  };

  const { icons } = useGetTheme();
  const { MenuDown } = icons;

  // istanbul ignore next
  useImperativeHandle(ref, () => inputRef.current);

  const { hoverProps, isHovered } = useHover({});

  // START - minimum delay time for loading indicator = 500ms
  const [showLoading, setShowLoading] = useState(false);
  const isLoading = loadingState === loadingStates.LOADING
    || loadingState === loadingStates.FILTERING;
  const inputValue = inputProps.value;
  const lastInputValue = useRef(inputValue);
  const timeout = useRef(null);
  useEffect(() => {
    if (isLoading && !showLoading) {
      if (timeout.current === null) {
        timeout.current = setTimeout(() => {
          setShowLoading(true);
        }, 500);
      }

      // If user is typing, clear the timer and restart since it is a new request
      if (inputValue !== lastInputValue.current) {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          setShowLoading(true);
        }, 500);
      }
    } else if (!isLoading) {
      // If loading is no longer happening, clear any timers and hide the loader
      setShowLoading(false);
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    lastInputValue.current = inputValue;
  }, [isLoading, showLoading, inputValue]);
  // END - minimum delay time for loading indicator = 500ms

  usePropWarning(props, 'disabled', 'isDisabled');

  const button = !isReadOnly && (
    <Box isRow variant="forms.comboBox.inputInContainerSlot">
      {
        // Render loader after delay if filtering or loading
        showLoading && (isOpen || menuTrigger === 'manual' || loadingState === loadingStates.LOADING)
        && <Loader variant="loader.withinInput" />
      }
      <PressResponder preventFocusOnPress isPressed={isOpen}>
        <Button
          variant="forms.comboBox.button"
          {...triggerProps}
          ref={triggerRef}
          isDisabled={isDisabled || isReadOnly}
          tabIndex={-1}
        >
          <Icon
            icon={MenuDown}
            size="md"
            sx={isOpen ? { transform: 'rotate(180deg)' } : null}
            title={{ name: 'Menu Down' }}
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
        {...wrapperProps}
      >
        <TextField
          {...textFieldProps}
          wrapperProps={{ ref: inputWrapperRef }}
          controlProps={{
            variant: 'forms.comboBox.input',
            ...controlProps,
          }}
          statusClasses={{ isHovered }}
          ref={inputRef}
          slots={{
            inContainer: button,
          }}
        />
      </Box>
    </FocusRing>
  );
});

ComboBoxInput.propTypes = {
  containerProps: PropTypes.shape({}),
  controlProps: PropTypes.shape({}),
  hasAutoFocus: PropTypes.bool,
  helperText: PropTypes.node,
  inputProps: PropTypes.shape({ value: PropTypes.string }),
  inputRef: PropTypes.shape({}),
  inputWrapperRef: PropTypes.shape({}),
  isDisabled: PropTypes.bool,
  isOpen: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  label: PropTypes.node,
  labelProps: PropTypes.shape({}),
  loadingState: PropTypes.oneOf(Object.values(loadingStates)),
  menuTrigger: PropTypes.oneOf(['focus', 'input', 'manual']),
  onInputChange: PropTypes.func,
  onLoadMore: PropTypes.func,
  onOpenChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
  style: PropTypes.shape({}),
  triggerProps: PropTypes.shape({}),
  triggerRef: PropTypes.shape({}),
  wrapperProps: PropTypes.shape({}),
  ...statusPropTypes,
  ...ariaAttributesBasePropTypes,
};

export default ComboBoxInput;
