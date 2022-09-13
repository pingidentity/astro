import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import { v4 as uuid } from 'uuid';
import { ArrayField, ArrayFieldDeleteButton, Item, SelectField, TextField } from '../../index';

export default {
  title: 'Form/ArrayField',
  component: ArrayField,
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    label: {
      defaultValue: 'Array field label',
      control: {
        type: 'text',
      },
    },
    helperText: {
      defaultValue: 'Helper text info...',
      control: {
        type: 'text',
      },
    },
    addButtonLabel: {
      defaultValue: '+ Add field',
      control: {
        type: 'text',
      },
    },
    maxSize: {
      control: {
        type: 'number',
      },
    },
    maxSizeText: {
      control: {
        type: 'text',
      },
    },
  },
};

const defaultData = [
  {
    id: uuid(), value: 'Hello',
  },
  {
    id: uuid(), value: 'World',
  },
];


export const Uncontrolled = ({ ...args }) => {
  return (
    <ArrayField
      defaultValue={defaultData}
      labelProps={{
        hintText: 'Example Hint',
        isRequired: true,
        helpHintProps: {
          tooltipProps: { direction: 'top' },
        },
      }}
      renderField={
        (id, fieldValue, onFieldValueChange, onFieldDelete, isDisabled, otherFieldProps) =>
          (<TextField
            aria-label="Text field"
            value={fieldValue}
            onChange={e => onFieldValueChange(e, id)}
            mr="xs"
            slots={
              { inContainer:
  <ArrayFieldDeleteButton isDisabled={isDisabled} onDelete={() => onFieldDelete(id)} /> }}
            {...otherFieldProps}
          />)
      }
      sx={{ width: '400px' }}
      {...args}
    />
  );
};

export const Controlled = () => {
  const defaultDataSelectField = [
    {
      id: uuid(),
      fieldValue: 'red',
      onComponentRender: (id, fieldValue, onFieldValueChange,
        onFieldDelete, isDisabled, otherFieldProps) => (
          <OverlayProvider>
            <SelectField
              defaultSelectedKey={fieldValue}
              onSelectionChange={e => onFieldValueChange(e, id)}
              width="100%"
              slots={{ inContainer:
  <ArrayFieldDeleteButton isDisabled={isDisabled} onDelete={() => onFieldDelete(id)} /> }}
              {...otherFieldProps}
            >
              <Item key="red">Red</Item>
              <Item key="blue">Blue</Item>
              <Item key="yellow">Yellow</Item>
            </SelectField>
          </OverlayProvider>
      ),
    },
    {
      id: uuid(),
      fieldValue: 'black',
      onComponentRender: (id, fieldValue, onFieldValueChange,
        onFieldDelete, isDisabled, otherFieldProps) => (
          <OverlayProvider>
            <SelectField
              defaultSelectedKey={fieldValue}
              onSelectionChange={key => onFieldValueChange(key, id)}
              width="100%"
              slots={{ inContainer:
  <ArrayFieldDeleteButton isDisabled={isDisabled} onDelete={() => onFieldDelete(id)} /> }}
              {...otherFieldProps}
            >
              <Item key="orange">Orange</Item>
              <Item key="purple">Purple</Item>
              <Item key="black">Black</Item>
            </SelectField>
          </OverlayProvider>
      ),
    },
  ];

  const defaultEmptyField = {
    id: uuid(),
    fieldValue: 'blue',
    onComponentRender: (id, fieldValue, onFieldValueChange,
      onFieldDelete, isDisabled, otherFieldProps) => (
        <OverlayProvider>
          <SelectField
            defaultSelectedKey={fieldValue}
            onSelectionChange={e => onFieldValueChange(e, id)}
            width="100%"
            slots={{ inContainer:
  <ArrayFieldDeleteButton isDisabled={isDisabled} onDelete={() => onFieldDelete(id)} /> }}
            {...otherFieldProps}
          >
            <Item key="blue">Blue</Item>
            <Item key="teal">Teal</Item>
            <Item key="turquoise">Turquoise</Item>
          </SelectField>
        </OverlayProvider>
    ),
  };

  const [fieldValues, setFieldValues] = React.useState(defaultDataSelectField);

  const handleOnChange = (values) => {
    setFieldValues(values);
  };

  const handleOnAdd = () => {
    setFieldValues(oldValues => [...oldValues, defaultEmptyField]);
  };

  const handleOnDelete = (fieldId) => {
    setFieldValues(oldValues =>
      oldValues.filter(({ id }) => id !== fieldId),
    );
  };

  return (
    <ArrayField
      value={fieldValues}
      helperText="Here is some helpful text..."
      onAdd={handleOnAdd}
      onChange={handleOnChange}
      onDelete={handleOnDelete}
      sx={{ width: '400px' }}
    />
  );
};

export const WithLimitedItemsNumber = ({ ...args }) => {
  return (
    <ArrayField
      defaultValue={defaultData}
      renderField={
        (id, fieldValue, onFieldValueChange, onFieldDelete, isDisabled, otherFieldProps) =>
          (<TextField
            aria-label="Text field"
            value={fieldValue}
            onChange={e => onFieldValueChange(e, id)}
            mr="xs"
            slots={
              { inContainer:
  <ArrayFieldDeleteButton isDisabled={isDisabled} onDelete={() => onFieldDelete(id)} /> }}
            {...otherFieldProps}
          />)
      }
      sx={{ width: '400px' }}
      maxSize={3}
      {...args}
    />
  );
};
