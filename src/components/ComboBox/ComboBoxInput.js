import React, { forwardRef } from 'react';
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

const ComboBoxInput = forwardRef((props, ref) => {
  const {
    controlProps,
    hasAutoFocus,
    helperText,
    isDisabled,
    isReadOnly,
    isOpen,
    label,
    labelProps,
    status,
    style,
    inputRef,
    inputProps,
    triggerRef,
    triggerProps,
    onInputChange,
    onOpenChange,
    onSelectionChange,
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

  const button = (
    <PressResponder preventFocusOnPress isPressed={isOpen}>
      <Button
        variant="comboBox"
        {...triggerProps}
        ref={triggerRef}
        isDisabled={isDisabled || isReadOnly}
      >
        <Icon icon={MenuDown} />
      </Button>
    </PressResponder>
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
      >
        <TextField
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
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  inputProps: PropTypes.shape({}),
  label: PropTypes.node,
  labelProps: PropTypes.shape({}),
  inputRef: PropTypes.shape({}),
  triggerProps: PropTypes.shape({}),
  triggerRef: PropTypes.shape({}),
  hasAutoFocus: PropTypes.bool,
  style: PropTypes.shape({}),
  isOpen: PropTypes.bool,
  helperText: PropTypes.node,
  status: PropTypes.oneOf(Object.values(statuses)),
  onInputChange: PropTypes.func,
  onOpenChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
};

export default ComboBoxInput;
