import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import { useLayoutEffect, useResizeObserver } from '@react-aria/utils';
import { v4 as uuid } from 'uuid';

import { Box, FieldHelperText, Label, TextArea } from '../..';
import { useColumnStyles, useField, useLabelHeight, useLocalOrForwardRef, usePropWarning } from '../../hooks';
import { TextAreaFieldProps } from '../../types/TextAreaField';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import { statusDefaultProp } from '../../utils/docUtils/statusProp';

const displayName = 'TextAreaField';

const TextAreaField = forwardRef<HTMLInputElement, TextAreaFieldProps>((props, ref) => {
  const { helperText, isUnresizable, rows, status, slots, resizeCallback, labelMode } = props;
  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = useField({ statusClasses: { isUnresizable: !!isUnresizable }, ...props });

  const containerRef = useRef<HTMLElement>();
  const fieldControlWrapperRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const labelWrapperRef = useRef<HTMLElement>(null);
  const slotContainer = useRef<HTMLElement>(null);

  const helperTextId = uuid();

  usePropWarning(props, 'disabled', 'isDisabled');

  /* istanbul ignore next */
  const textAreaRef = useLocalOrForwardRef<HTMLInputElement>(ref);

  /* istanbul ignore next */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resizeFloatLabel = () => {
    /* istanbul ignore next */
    if (labelRef.current) {
      labelRef.current.style.width = textAreaRef.current.style.width;
    }
    if (labelWrapperRef.current) {
      labelWrapperRef.current.style.width = `${textAreaRef.current.clientWidth - 2}px`;
    }
  };

  /* istanbul ignore next */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resizeSlotContainer = () => {
    if (fieldControlWrapperRef.current) {
      fieldControlWrapperRef.current.style.width = textAreaRef.current.style.width;
    }
  };

  const onResize = useCallback(() => {
    /* istanbul ignore next */
    if (slots?.inContainer) {
      resizeSlotContainer();
    }
  }, [resizeSlotContainer, slots?.inContainer]);

  useResizeObserver({
    ref: textAreaRef,
    onResize,
  });

  useLayoutEffect(onResize, [onResize]);

  const { isLabelHigher } = useLabelHeight({ labelRef, inputRef: textAreaRef });
  const columnStyleProps = useColumnStyles({ labelMode });

  useEffect(() => {
    const thisRef = textAreaRef.current;
    if (!isUnresizable && labelMode === 'float') {
      thisRef.addEventListener('mousemove', resizeCallback || resizeFloatLabel);
    }
    return () => {
      thisRef.removeEventListener('mousemove', resizeCallback || resizeFloatLabel);
    };
  }, [isUnresizable, labelMode, resizeCallback, resizeFloatLabel, textAreaRef]);

  const labelNode = (
    <Label
      ref={labelRef}
      {...fieldLabelProps}
      sx={isLabelHigher ? { gridRow: '1/5' } : {}}
    />
  );

  const wrappedLabel = (
    <Box variant="forms.textarea.floatLabelWrapper" ref={labelWrapperRef}>
      {labelNode}
    </Box>
  );

  return (
    <Box
      variant="forms.input.fieldContainer"
      {...getPendoID(displayName)}
      {...fieldContainerProps}
      sx={{ ...columnStyleProps?.sx, ...fieldContainerProps?.sx }}
      ref={containerRef}
      maxWidth="100%"
    >
      {labelMode === 'float' ? wrappedLabel : labelNode}
      <Box isRow variant="forms.input.fieldControlWrapper" minWidth="40px" maxWidth="100%" ref={fieldControlWrapperRef} {...fieldControlWrapperProps}>
        <TextArea
          ref={textAreaRef}
          rows={rows}
          variant="forms.textarea.baseField"
          {...fieldControlInputProps}
          // DO NOT put paddingRight and overflow into sx object.
          /// It will cause issue with resizing in Safari browser.
          paddingRight={slots?.inContainer && 35}
          aria-invalid={status === 'error' && true}
          aria-describedby={helperText && helperTextId}
        />
        {
          slots?.inContainer
          && (
            <Box variant="forms.textarea.containerSlot" ref={slotContainer}>
              {slots?.inContainer}
            </Box>
          )
        }
      </Box>
      {helperText
        && (
          <FieldHelperText status={status} id={helperTextId}>
            {helperText}
          </FieldHelperText>
        )}
    </Box>
  );
});

TextAreaField.defaultProps = {
  hasAutoFocus: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  isUnresizable: false,
  rows: 4,
  ...statusDefaultProp,
};

TextAreaField.displayName = displayName;

export default TextAreaField;
