import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { mergeProps } from '@react-aria/utils';
import { v4 as uuid } from 'uuid';
import { useLabel } from '@react-aria/label';
import Box from '../Box';
import Button from '../Button';
import FieldHelperText from '../FieldHelperText';
import Text from '../Text';
import Label from '../Label';
import statuses from '../../utils/devUtils/constants/statuses';
import isValidPositiveInt from '../../utils/devUtils/props/isValidPositiveInt';

/**
 * Displays array collections providing useful functions and
 * optimizations for arrays.
 */

const ArrayField = (props) => {
  const {
    addButtonLabel,
    defaultValue,
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
    ...others
  } = props;

  const isControlled = value !== undefined;

  const createEmptyField = useCallback(() => {
    return { id: uuid(), value: '' };
  }, []);

  const [fieldValues, setFieldValues] = useState(defaultValue || [createEmptyField()]);

  const mapArrayFieldWithNewValue = useCallback(
    (arrValues, newValue, fieldId) =>
      arrValues.map((fieldValue) => {
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
      if (isControlled) {
        onChange(mapArrayFieldWithNewValue(value, tempValue, fieldId));
      } else {
        setFieldValues(oldValues =>
          mapArrayFieldWithNewValue(oldValues, tempValue, fieldId));
      }
    },
    [isControlled, mapArrayFieldWithNewValue, onChange, value],
  );

  const onFieldDelete = useCallback(
    (fieldId) => {
      if (isControlled) {
        onDelete(fieldId);
      } else {
        setFieldValues(oldValues =>
          oldValues.filter(({ id }) => id !== fieldId),
        );
      }
    },
    [isControlled, onDelete],
  );

  const onFieldAdd = useCallback(() => {
    if (onAdd) {
      return onAdd();
    }

    return setFieldValues(oldValues => [...oldValues, createEmptyField()]);
  }, [createEmptyField, onAdd]);

  const {
    labelProps: raLabelProps,
  } = useLabel({ ...props });

  const isLimitReached = !!maxSize && (value || fieldValues).length >= maxSize;

  return (
    <Box {...others}>
      <Label {...raLabelProps} {...mergeProps(labelProps, raLabelProps, { children: label })} />
      <Box as="ul" pl="0">
        {(value || fieldValues).map(
          ({ id, onComponentRender, fieldValue, ...otherFieldProps }) => {
            const isDisabled = (value || fieldValues).length === 1;
            return (
              <Box as="li" mb="xs" key={id}>
                {onComponentRender ?
                  onComponentRender(id, fieldValue, onFieldValueChange,
                    onFieldDelete, isDisabled, otherFieldProps)
                  : renderField(id, fieldValue, onFieldValueChange,
                    onFieldDelete, isDisabled, otherFieldProps)}
              </Box>
            );
          })
        }
      </Box>
      {
        helperText &&
        <FieldHelperText status={status}>
          {helperText}
        </FieldHelperText>
      }
      {
        isLimitReached &&
        <FieldHelperText status={statuses.DEFAULT}>
          {maxSizeText || `Maximum ${maxSize} items.`}
        </FieldHelperText>
      }
      {!isLimitReached &&
        <Button
          aria-label="Add field"
          variant="text"
          onPress={onFieldAdd}
          sx={{ width: 'fit-content', mt: 'xs' }}
        >
          <Text variant="label" color="active">
            {addButtonLabel}
          </Text>
        </Button>
      }
    </Box>
  );
};

ArrayField.propTypes = {
  /** Label for add button */
  addButtonLabel: PropTypes.string,
  /** The default value for the array input field (uncontrolled). */
  defaultValue: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  /** The default value of the array input field (controlled). */
  value: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  /** The rendered label for the field. */
  label: PropTypes.node,
  /** Props object that is spread directly into the label element. */
  labelProps: PropTypes.shape({}),
  /** Text to display before add button. Useful for errors or other info. */
  helperText: PropTypes.node,
  /** Callback for changing array field data  */
  onChange: PropTypes.func,
  /** Callback for adding new empty field */
  onAdd: PropTypes.func,
  /** Callback for deleting a field */
  onDelete: PropTypes.func,
  /** Render prop to display an input field */
  renderField: PropTypes.func,
  /** Determines the helper text styling. */
  status: PropTypes.oneOf(Object.values(statuses)),
  /** Determines the maximum number of items */
  maxSize: isValidPositiveInt,
  /** Text to display when the maximum number of items is reached */
  maxSizeText: PropTypes.node,
};

ArrayField.defaultProps = {
  addButtonLabel: '+ Add',
};

export default ArrayField;
