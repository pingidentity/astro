import React, { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FocusRing } from '@react-aria/focus';
import { PressResponder, useHover } from '@react-aria/interactions';
import MenuDown from 'mdi-react/MenuDownIcon';

import {
  Box,
  Button,
  Icon,
  TextField,
} from '../../index';
import statuses from '../../utils/devUtils/constants/statuses';
import loadingStates from '../../utils/devUtils/constants/loadingStates';
import { usePropWarning } from '../../hooks';
import Loader from '../Loader';

const ComboBoxInput = forwardRef((props, ref) => {
  const {
    controlProps,
    containerProps,
    hasAutoFocus,
    helperText,
    isDisabled,
    isReadOnly,
    isOpen,
    label,
    labelProps,
    loadingState,
    status,
    style,
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
    ...others,
    helperText,
    isDisabled,
    isReadOnly,
    label,
    labelProps,
    status,
    ...controlProps,
    ...inputProps,
  };
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

  const button = (
    <Box isRow variant="boxes.inputInContainerSlot">
      {
        // Render loader after delay if filtering or loading
        showLoading && (isOpen || menuTrigger === 'manual' || loadingState === loadingStates.LOADING) &&
        <Loader variant="loader.withinInput" />
      }
      <PressResponder preventFocusOnPress isPressed={isOpen}>
        <Button
          variant="comboBox"
          {...triggerProps}
          ref={triggerRef}
          isDisabled={isDisabled || isReadOnly}
          tabIndex={-1}
        >
          <Icon
            icon={MenuDown}
            sx={isOpen ? { transform: 'rotate(180deg)' } : null}
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
        ref={ref}
        isRow
        style={style}
        variant="forms.comboBox.container"
        {...hoverProps}
        {...wrapperProps}
      >
        <TextField
          {...containerProps}
          {...textFieldProps}
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
  controlProps: PropTypes.shape({}),
  containerProps: PropTypes.shape({}),
  wrapperProps: PropTypes.shape({}),
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  inputProps: PropTypes.shape({
    value: PropTypes.string,
  }),
  label: PropTypes.node,
  labelProps: PropTypes.shape({}),
  loadingState: PropTypes.oneOf(Object.values(loadingStates)),
  inputRef: PropTypes.shape({}),
  triggerProps: PropTypes.shape({}),
  triggerRef: PropTypes.shape({}),
  menuTrigger: PropTypes.oneOf(['focus', 'input', 'manual']),
  hasAutoFocus: PropTypes.bool,
  style: PropTypes.shape({}),
  isOpen: PropTypes.bool,
  helperText: PropTypes.node,
  status: PropTypes.oneOf(Object.values(statuses)),
  onInputChange: PropTypes.func,
  onLoadMore: PropTypes.func,
  onOpenChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
};

export default ComboBoxInput;
