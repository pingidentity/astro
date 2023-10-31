import React from 'react';
import { OverlayProvider } from 'react-aria';
import { v4 as uuid } from 'uuid';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  ArrayField,
  ArrayFieldDeleteButton,
  Item,
  SelectField,
  TextField,
} from '../../index';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';

import ArrayFieldReadme from './ArrayField.mdx';

export default {
  title: 'Form/ArrayField',
  component: ArrayField,
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
    docs: {
      page: () => (
        <>
          <ArrayFieldReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    helperText: {
      control: {
        type: 'text',
      },
    },
    addButtonLabel: {
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
    ...ariaAttributeBaseArgTypes,
  },
  args: {
    label: 'Array field label',
    helperText: 'Helper text info...',
    addButtonLabel: '+ Add field',
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
          direction: 'top',
        },
      }}
      renderField={
        (id, fieldValue, onFieldValueChange, onFieldDelete, isDisabled, otherFieldProps) => (
          <TextField
            aria-label="Text field"
            value={fieldValue}
            onChange={e => onFieldValueChange(e, id)}
            mr="xs"
            slots={
              { inContainer:
  <ArrayFieldDeleteButton isDisabled={isDisabled} onDelete={() => onFieldDelete(id)} /> }
}
            {...otherFieldProps}
          />
        )
      }
      sx={{ width: '400px' }}
      {...args}
    />
  );
};

export const Controlled = ({ ...args }) => {
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
              listBoxProps={{ 'aria-labelledby': otherFieldProps }}
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
              listBoxProps={{ 'aria-labelledby': otherFieldProps }}
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
            listBoxProps={{ 'aria-labelledby': otherFieldProps }}
          >
            <Item key="blue">Blue</Item>
            <Item key="teal">Teal</Item>
            <Item key="turquoise">Turquoise</Item>
          </SelectField>
        </OverlayProvider>
    ),
  };

  const [fieldValues, setFieldValues] = React.useState(defaultDataSelectField);

  const handleOnChange = values => {
    setFieldValues(values);
  };

  const handleOnAdd = () => {
    setFieldValues(oldValues => [...oldValues, defaultEmptyField]);
  };

  const handleOnDelete = fieldId => {
    setFieldValues(oldValues => oldValues.filter(({ id }) => id !== fieldId),
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
      label={args.label}
    />
  );
};

export const WithLimitedItemsNumber = ({ ...args }) => {
  return (
    <ArrayField
      defaultValue={defaultData}
      renderField={
        (id, fieldValue, onFieldValueChange, onFieldDelete, isDisabled, otherFieldProps) => (
          <TextField
            aria-label="Text field"
            value={fieldValue}
            onChange={e => onFieldValueChange(e, id)}
            mr="xs"
            slots={
              { inContainer:
  <ArrayFieldDeleteButton isDisabled={isDisabled} onDelete={() => onFieldDelete(id)} /> }
}
            {...otherFieldProps}
          />
        )
      }
      sx={{ width: '400px' }}
      maxSize={3}
      {...args}
    />
  );
};
