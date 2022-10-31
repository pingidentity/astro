import React, { forwardRef, useRef, useImperativeHandle, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLayoutEffect, useResizeObserver } from '@react-aria/utils';

import { Box, FieldHelperText, Label, TextArea } from '../../';
import { ariaAttributesBasePropTypes } from '../../utils/devUtils/props/ariaAttributes';
import { useColumnStyles, useField, useLabelHeight, usePropWarning } from '../../hooks';
import statuses from '../../utils/devUtils/constants/statuses';

/**
 * Combines a textarea, label, and helper text for a complete, form-ready solution.
 */
const TextAreaField = forwardRef((props, ref) => {
  const { helperText, isUnresizable, rows, status, slots } = props;
  const statusClasses = { isUnresizable };
  const {
    fieldContainerProps,
    fieldControlProps,
    fieldLabelProps,
  } = useField({ statusClasses, ...props });

  const containerRef = useRef();
  const inputContainerRef = useRef();
  const labelRef = useRef();
  const labelWrapperRef = useRef();
  const slotContainer = useRef();
  const textAreaRef = useRef();

  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => textAreaRef.current);

  /* istanbul ignore next */
  const resizeFloatLabel = () => {
    /* istanbul ignore next */
    labelRef.current.style.width = textAreaRef.current.style.width;
    labelWrapperRef.current.style.width = `${textAreaRef.current.clientWidth - 2}px`;
  };

  /* istanbul ignore next */
  const resizeSlotContainer = () => {
    inputContainerRef.current.style.width = textAreaRef.current.style.width;
  };

  const onResize = useCallback(() => {
    /* istanbul ignore next */
    if (slots?.inContainer) {
      resizeSlotContainer();
    }
  }, [slotContainer]);

  useResizeObserver({
    ref: textAreaRef,
    onResize,
  });

  useLayoutEffect(onResize, [onResize]);

  const { isLabelHigher } = useLabelHeight({ labelRef, inputRef: textAreaRef });
  const columnStyleProps = useColumnStyles({ labelMode: props.labelMode });

  useEffect(() => {
    const thisRef = textAreaRef.current;
    if (!props.isUnresizable && props.labelMode === 'float') {
      thisRef.addEventListener('mousemove', props.resizeCallback ? props.resizeCallback : resizeFloatLabel);
    }
    return () => {
      thisRef.removeEventListener('mousemove', props.resizeCallback ? props.resizeCallback : resizeFloatLabel);
    };
  }, [props.isUnresizable, props.labelMode, props.resizeCallback]);

  const labelNode = (
    <Label
      ref={labelRef}
      {...fieldLabelProps}
      sx={isLabelHigher && { gridRow: '1/5' }}
    />
  );

  const wrappedLabel = (
    <Box variant="forms.floatLabelWrapper" ref={labelWrapperRef}>
      {labelNode}
    </Box>
  );

  return (
    <Box variant="forms.input.wrapper" {...fieldContainerProps} sx={{ ...columnStyleProps?.sx, ...fieldContainerProps?.sx }} ref={containerRef} maxWidth="100%" >
      {props.labelMode === 'float' ? wrappedLabel : labelNode}
      <Box isRow variant="forms.input.container" className={fieldControlProps.className} minWidth="40px" maxWidth="100%" ref={inputContainerRef}>
        <TextArea ref={textAreaRef} rows={rows} {...fieldControlProps} sx={slots?.inContainer ? { paddingRight: '35px' } : { overflow: 'hidden' }} />
        {
          slots?.inContainer &&
            <Box variant="forms.textFieldInContainerSlot" ref={slotContainer} >
              {slots?.inContainer}
            </Box>
        }
      </Box>
      {helperText &&
        <FieldHelperText status={status}>
          {helperText}
        </FieldHelperText>}
    </Box>
  );
});

TextAreaField.propTypes = {
  /** The rendered label for the field. */
  label: PropTypes.node,
  /** Text rendered below the textarea. */
  helperText: PropTypes.node,
  /** If present this prop will cause a help hint to render in the label of the field. */
  hintText: PropTypes.string,
  /** The unique identifier for the textarea element. */
  id: PropTypes.string,
  /** A string designating whether or not the label is a float label. */
  labelMode: PropTypes.string,
  /** Whether the textarea is unable to be resized. */
  isUnresizable: PropTypes.bool,
  /** The name for the textarea element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-name). */
  name: PropTypes.string,
  /**
   * Callback fired when the value is changed on the textarea element.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /** The value for the textarea element (controlled). */
  value: PropTypes.string,
  /** How the input should handle autocompletion according to the browser. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete). The `autocomplete` prop is an alias for this. */
  autoComplete: PropTypes.string,
  /** @ignore Alias for `autoComplete` prop. Exists for backwards-compatibility. */
  autocomplete: PropTypes.string,
  /** A list of class names to apply to the textarea element. */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  /** The default value for the textarea element. */
  defaultValue: PropTypes.string,
  /** Whether the textarea element is automatically focused when loaded onto the page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-autofocus). */
  hasAutoFocus: PropTypes.bool,
  /** Whether the field has a status indicator. */
  hasNoStatusIndicator: PropTypes.bool,
  /** Whether the field is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether the input can be selected, but not changed by the user. */
  isReadOnly: PropTypes.bool,
  /** Whether the field is required. */
  isRequired: PropTypes.bool,
  /** Add max Length to input value */
  maxLength: PropTypes.number,
  /**
   * Callback fired when focus is lost on the textarea element.
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when focus is lost on the textarea element.
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when textfield is resized.
   */
  resizeCallback: PropTypes.func,
  /** The placeholder text to display in the textarea element. */
  placeholder: PropTypes.string,
  /** The number of rows to display for the textarea. Controls the default height. */
  rows: PropTypes.number,
  /** Determines the textarea status indicator and helper text styling. */
  status: PropTypes.oneOf(Object.values(statuses)),
  /** Props object that is spread directly into the root (top-level) element. */
  containerProps: PropTypes.shape({}),
  /** Props object that is spread directly into the input element. */
  controlProps: PropTypes.shape({}),
  /** Props object that is spread directly into the label element. */
  labelProps: PropTypes.shape({}),
  /** Provides a way to insert markup in specified places. */
  slots: PropTypes.shape({
    /** The given node will be inserted into the field container. */
    inContainer: PropTypes.node,
  }),
  ...ariaAttributesBasePropTypes,
};

TextAreaField.defaultProps = {
  hasAutoFocus: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  isUnresizable: false,
  rows: 4,
  status: statuses.DEFAULT,
};

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;
