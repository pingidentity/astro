import React, {
  useCallback,
  useState,
} from 'react';
import TrashIcon from 'mdi-react/TrashIcon';
import { v4 as uuid } from 'uuid';
import { Box, Button, Icon, Text, TextField, IconButton } from '../index';

export default {
  title: 'Recipes/ArrayField',
};

export const Default = () => {
  const createEmptyField = useCallback(
    () => ({ id: uuid(), value: '', 'aria-label': 'array field input' }),
    [],
  );

  const [fieldValues, setFieldValues] = useState([createEmptyField()]);

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
    ({ target: { value: newValue } }, fieldId) => {
      setFieldValues(oldValues =>
        mapArrayFieldWithNewValue(oldValues, newValue, fieldId));
    },
    [],
  );

  const onFieldDelete = useCallback(
    (fieldId) => {
      setFieldValues(oldValues =>
        oldValues.filter(({ id }) => id !== fieldId),
      );
    },
    [],
  );

  const onFieldAdd = useCallback(() => {
    setFieldValues(oldValues => [...oldValues, createEmptyField()]);
  }, []);

  const DeleteButton = ({ id }) => (
    <IconButton
      onPress={() => onFieldDelete(id)}
      isDisabled={fieldValues.length === 1}
      sx={{ position: 'absolute', right: -30, top: 5 }}
      type="delete"
      title="Delete Field"
      variant="icon"
    >
      <Icon icon={TrashIcon} size={20} color="black" />
    </IconButton>
  );

  return (
    <Box>
      <Text variant="label">Redirected URIs</Text>
      {(fieldValues).map(
                ({ id, value, ...otherFieldProps }) => (
                  <Box isRow mb="sm" alignItems="center" key={id}>
                    <TextField
                      value={value}
                      onChange={e => onFieldValueChange(e, id)}
                      mr="xs"
                      slots={{ inContainer: <DeleteButton id={id} /> }}
                      title="Text Field"
                      {...otherFieldProps}
                    />
                  </Box>
                ),
            )}
      <Button
        variant="text"
        onPress={onFieldAdd}
        width="fit-content"
        role="button"
        title="Add Field Button"
      >
        <Text variant="label" color="active">
          + Add
        </Text>
      </Button>
    </Box>
  );
};
