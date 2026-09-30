import React, { forwardRef, useCallback, useState } from 'react';
import { mergeProps, useLabel } from 'react-aria';
import { v4 as uuid } from 'uuid';

import { Box, Button, FieldHelperText, Label, Text } from '../..';
import { ArrayFieldProps, FieldValue } from '../../types';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import statuses from '../../utils/devUtils/constants/statuses';
import { getAriaAttributeProps } from '../../utils/docUtils/ariaAttributes';

const ArrayField = forwardRef<HTMLDivElement, ArrayFieldProps>((props, ref) => {
  const {
    addButtonLabel,
    addButtonProps,
    defaultValue,
    fieldControlWrapperProps,
    value,
    label,
    helperText,
    status,
    onAdd,
    onChange,
    onDelete,
    renderField,
    labelProps,
    maxSize,
    maxSizeText,
    slots,
    ...others
  } = props;

  const valueRef = React.useRef(value);
  valueRef.current = value;

  // The helper and maximum feedback texts live outside the field list, so the
  // list needs explicit aria-describedby/labelledby references to them (part
  // of the UXE-8465 helper-text acceptance criteria). Aria attributes may
  // arrive from both the component props and fieldControlWrapperProps, so the
  // id lists are merged instead of overwritten.
  const arrayFieldId = React.useRef(uuid()).current;
  const helperTextId = `${arrayFieldId}-helper`;
  const maxSizeTextId = `${arrayFieldId}-max-size`;

  const onAddRef = React.useRef(onAdd);
  onAddRef.current = onAdd;

  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  const onDeleteRef = React.useRef(onDelete);
  onDeleteRef.current = onDelete;

  const isControlled = value !== undefined;

  const createEmptyField = useCallback(() => {
    return { id: uuid(), value: '' };
  }, []);

  const [fieldValues, setFieldValues] = useState<FieldValue[]>(
    defaultValue || [createEmptyField()],
  );

  const mapArrayFieldWithNewValue = useCallback(
    (arrValues, newValue, fieldId) => arrValues.map(fieldValue => {
      if (fieldValue.id === fieldId) {
        return { ...fieldValue, value: newValue };
      }
      return fieldValue;
    }),
    [],
  );

  const onFieldValueChange = useCallback(
    (event, fieldId) => {
      let tempValue = event;
      // Checks if value received is a key or event
      if (typeof event !== 'string') {
        tempValue = event.target.value;
      }
      if (isControlled && onChangeRef.current) {
        onChangeRef.current(mapArrayFieldWithNewValue(valueRef.current, tempValue, fieldId));
      } else {
        setFieldValues(oldValues => mapArrayFieldWithNewValue(oldValues, tempValue, fieldId));
      }
    },
    [isControlled, mapArrayFieldWithNewValue],
  );

  const onFieldDelete = useCallback(
    fieldId => {
      if (isControlled && onDeleteRef.current) {
        onDeleteRef.current(fieldId);
      } else {
        setFieldValues(oldValues => oldValues.filter(({ id }) => id !== fieldId),
        );
      }
    },
    [isControlled],
  );

  const onFieldAdd = useCallback(() => {
    if (isControlled) {
      return onAddRef.current && onAddRef.current();
    }

    return setFieldValues(oldValues => [...oldValues, createEmptyField()]);
  }, [createEmptyField, isControlled]);

  const {
    labelProps: raLabelProps,
  } = useLabel({ ...props });

  const isLimitReached = !!maxSize && (value || fieldValues).length >= maxSize;
  const isDisabled = (value || fieldValues).length === 1;

  // renders of the bottom bar if one or more of the components within it should render
  const shouldShowBottomBar = !isLimitReached || slots?.left || slots?.right;

  const renderedItem = useCallback(
    (id, fieldValue, otherFieldProps, onComponentRender, labelId) => {
      if (onComponentRender) {
        return onComponentRender(
          id,
          fieldValue,
          onFieldValueChange,
          onFieldDelete,
          isDisabled,
          labelId,
          otherFieldProps,
        );
      }
      if (renderField) {
        return renderField(
          id,
          fieldValue,
          onFieldValueChange,
          onFieldDelete,
          isDisabled,
          otherFieldProps,
        );
      }
      return null;
    }, [onFieldValueChange, onFieldDelete, renderField, isDisabled]);

  const { ariaProps, nonAriaProps } = getAriaAttributeProps(others);

  return (
    <Box
      {...getPendoID('ArrayField')}
      {...nonAriaProps}
      ref={ref}
    >
      <Label {...raLabelProps} {...mergeProps(labelProps, raLabelProps, { children: label })} />
      <Box as="ul" pl="0" {...ariaProps} {...fieldControlWrapperProps}>
        {(value || fieldValues).map(
          (
            {
              id,
              onComponentRender,
              value: rowValue,
              fieldValue: legacyFieldValue,
              ...otherFieldProps
            }: FieldValue,
          ) => {
            const normalizedValue = rowValue ?? legacyFieldValue ?? '';

            return (
              <Box as="li" variant="arrayField.listItem" key={id}>
                {renderedItem(
                  id,
                  normalizedValue,
                  otherFieldProps,
                  onComponentRender,
                  raLabelProps?.id,
                )}
              </Box>
            );
          })}
      </Box>
      {
        (helperText || isLimitReached)
        && (
          <Box variant="arrayField.helperTextContainer">
            {helperText
            && (
              <FieldHelperText status={status} id={helperTextId}>
                {helperText}
              </FieldHelperText>
            )}
            {isLimitReached
            && (
              <FieldHelperText status={statuses.DEFAULT} id={maxSizeTextId}>
                {maxSizeText || `Maximum ${maxSize} items.`}
              </FieldHelperText>
            )}
          </Box>
        )
      }
      {
        shouldShowBottomBar
        && (
        <Box isRow gap="md" variant="arrayField.bottomBar">
          {slots?.left
          && slots?.left}
          {!isLimitReached
        && (
          <Button
            aria-label="Add field"
            variant="link"
            onPress={onFieldAdd}
            sx={{ variant: 'variants.arrayField.addButton' }}
            {...addButtonProps}
          >
            <Text sx={{ variant: 'variants.arrayField.addButtonText' }}>
              {addButtonLabel}
            </Text>
          </Button>
        )}
          {slots?.right
          && slots?.right}
        </Box>
        )
      }
    </Box>
  );
});

ArrayField.defaultProps = {
  addButtonLabel: '+ Add',
  status: statuses.DEFAULT,
};

export default ArrayField;
