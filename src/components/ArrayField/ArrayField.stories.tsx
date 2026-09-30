import React from 'react';
import { OverlayProvider } from 'react-aria';
import { Meta, StoryFn } from '@storybook/react-vite';
import { v4 as uuid } from 'uuid';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  ArrayField,
  ArrayFieldDeleteButton,
  Box,
  Button,
  Item,
  SelectField,
  Text,
  TextField,
} from '../../index';
import { ArrayFieldProps } from '../../types';

import ArrayFieldReadme from './ArrayField.mdx';
import { arrayFieldArgTypes } from './arrayFieldAttributes';

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
    },
  },
  argTypes: { ...arrayFieldArgTypes },
  args: {
    label: 'Array Field Label',
    helperText: 'Helper text info...',
    addButtonLabel: '+ Add Field',
  },
} as Meta;

const defaultData = [
  {
    id: uuid(), value: 'Hello',
  },
  {
    id: uuid(), value: 'World',
  },
];

export const Uncontrolled: StoryFn<ArrayFieldProps> = ({ ...args }) => {
  return (
    <ArrayField
      defaultValue={defaultData}
      label="Array Field Label"
      helperText="Helper text info..."
      addButtonLabel="+ Add Field"
      labelProps={{
        hintText: 'Example Hint',
        isRequired: true,
        helpHintProps: {
          direction: 'top',
        },
      }}
      renderField={
        (
          id, fieldValue, onFieldValueChange, onFieldDelete, isDisabled, otherFieldProps,
        ) => (
          <TextField
            aria-label="Text Field"
            value={fieldValue}
            onChange={(e: React.ChangeEvent) => onFieldValueChange(e, id)}
            slots={
              {
                inContainer: (
                  <ArrayFieldDeleteButton
                    isDisabled={isDisabled}
                    onDelete={() => onFieldDelete(id)}
                  />
                ),
              }
            }
            {...otherFieldProps}
          />
        )
      }
      sx={{ width: '400px' }}
    />
  );
};

export const Controlled: StoryFn<ArrayFieldProps> = ({ ...args }) => {
  const defaultDataSelectField = [
    {
      id: uuid(),
      value: 'The value of the input',
      onComponentRender: (
        id, fieldValue, onFieldValueChange, onFieldDelete, isDisabled, labelId, otherFieldProps,
      ) => (
        <TextField
          aria-label="Text Field"
          value={fieldValue}
          onChange={e => onFieldValueChange(e, id)}
          width="100%"
          slots={{
            inContainer: (
              <ArrayFieldDeleteButton
                isDisabled={isDisabled}
                onDelete={() => onFieldDelete(id)}
              />
            ),
          }}
          {...otherFieldProps}
        />
      ),
    },
    {
      id: uuid(),
      value: 'red',
      onComponentRender: (
        id, fieldValue, onFieldValueChange, onFieldDelete, isDisabled, labelId, otherFieldProps,
      ) => (
        <OverlayProvider>
          <SelectField
            aria-label="Select Field"
            selectedKey={fieldValue}
            onSelectionChange={key => onFieldValueChange(key, id)}
            width="100%"
            slots={{
              inContainer: (
                <ArrayFieldDeleteButton
                  isDisabled={isDisabled}
                  onDelete={() => onFieldDelete(id)}
                />
              ),
            }}
            {...otherFieldProps}
            listBoxProps={{ 'aria-labelledby': labelId }}
          >
            <Item key="red">Red</Item>
            <Item key="blue">Blue</Item>
            <Item key="yellow">Yellow</Item>
          </SelectField>
        </OverlayProvider>
      ),
    },
  ];

  const defaultEmptyField = () => ({
    id: uuid(),
    value: 'blue',
    onComponentRender: (
      id, fieldValue, onFieldValueChange, onFieldDelete, isDisabled, labelId, otherFieldProps,
    ) => (
      <OverlayProvider>
        <SelectField
          aria-label="Select Field"
          selectedKey={fieldValue}
          onSelectionChange={key => onFieldValueChange(key, id)}
          width="100%"
          slots={{
            inContainer: (
              <ArrayFieldDeleteButton isDisabled={isDisabled} onDelete={() => onFieldDelete(id)} />
            ),
          }}
          {...otherFieldProps}
          listBoxProps={{ 'aria-labelledby': labelId }}
        >
          <Item key="blue">Blue</Item>
          <Item key="teal">Teal</Item>
          <Item key="turquoise">Turquoise</Item>
        </SelectField>
      </OverlayProvider>
    ),
  });

  const [fieldValues, setFieldValues] = React.useState(defaultDataSelectField);

  const handleOnChange = values => {
    setFieldValues(values);
  };

  const handleOnAdd = () => {
    setFieldValues(oldValues => [...oldValues, defaultEmptyField()]);
  };

  const handleOnDelete = fieldId => {
    setFieldValues(oldValues => oldValues.filter(({ id }) => id !== fieldId),
    );
  };

  return (
    <ArrayField
      value={fieldValues}
      onAdd={handleOnAdd}
      onChange={handleOnChange}
      onDelete={handleOnDelete}
      sx={{ width: '400px' }}
      label="Array Field Label"
      addButtonLabel="+ Add Field"
    />
  );
};

export const WithLimitedItemsNumber: StoryFn<ArrayFieldProps> = () => {
  return (
    <ArrayField
      defaultValue={defaultData}
      renderField={
        (id, fieldValue, onFieldValueChange, onFieldDelete, isDisabled, otherFieldProps) => (
          <TextField
            aria-label="Text Field"
            value={fieldValue}
            onChange={e => onFieldValueChange(e, id)}
            slots={
              {
                inContainer: (
                  <ArrayFieldDeleteButton
                    isDisabled={isDisabled}
                    onDelete={() => onFieldDelete(id)}
                  />
                ),
              }
            }
            {...otherFieldProps}
          />
        )
      }
      sx={{ width: '400px' }}
      maxSize={2}
      label="Array Field Label"
      helperText="Helper text info..."
      addButtonLabel="+ Add Field"
    />
  );
};

export const Error: StoryFn<ArrayFieldProps> = ({ status, helperText, ...args }) => {
  return (
    <ArrayField
      {...args}
      defaultValue={defaultData}
      status={status}
      helperText={helperText}
      label="Array Field Label"
      addButtonLabel="+ Add Field"
      labelProps={{
        hintText: 'Example Hint',
        isRequired: true,
        helpHintProps: {
          direction: 'top',
        },
      }}
      renderField={
        (
          id, fieldValue, onFieldValueChange, onFieldDelete, isDisabled, otherFieldProps,
        ) => (
          <TextField
            aria-label="Text Field"
            status={status}
            value={fieldValue}
            onChange={(e: React.ChangeEvent) => onFieldValueChange(e, id)}
            slots={
              {
                inContainer: (
                  <ArrayFieldDeleteButton
                    isDisabled={isDisabled}
                    onDelete={() => onFieldDelete(id)}
                  />
                ),
              }
            }
            {...otherFieldProps}
          />
        )
      }
      sx={{ width: '400px' }}
    />
  );
};

Error.args = {
  status: 'error',
  helperText: 'Helper text info...',
};

export const Customizations = () => {
  return (
    <ArrayField
      fieldControlWrapperProps={{ overflowY: 'scroll', maxHeight: '150px' }}
      defaultValue={defaultData}
      sx={{ width: '450px' }}
      labelProps={{
        hintText: 'Example Hint',
        isRequired: true,
        helpHintProps: { direction: 'top' },
      }}
      renderField={
        (id, fieldValue, onFieldValueChange, onFieldDelete, isDisabled, otherFieldProps) => (
          <Box width="400px">
            <TextField
              aria-label="Text Field"
              value={fieldValue}
              onChange={e => onFieldValueChange(e, id)}
              slots={{
                inContainer: (
                  <ArrayFieldDeleteButton
                    isDisabled={isDisabled}
                    onDelete={() => onFieldDelete(id)}
                  />
                ),
              }}
              {...otherFieldProps}
            />
          </Box>
        )
      }
      label="Array Field Label"
      helperText="Helper text info..."
      addButtonLabel="+ Add Field"
    />
  );
};

export const WithBothSlots = () => {
  const LeftSlot = (
    <Button
      aria-label="Left Slot"
      variant="link"
      sx={{ width: 'fit-content' }}
    >
      <Text sx={{ variant: 'variants.arrayField.addButtonText' }}>
        Left Slot
      </Text>
    </Button>
  );

  const RightSlot = (
    <Button
      aria-label="Right Slot"
      variant="link"
      sx={{ width: 'fit-content' }}
    >
      <Text sx={{ variant: 'variants.arrayField.addButtonText' }}>
        Right Slot
      </Text>
    </Button>
  );
  return (
    <ArrayField
      defaultValue={defaultData}
      sx={{ width: '450px' }}
      labelProps={{
        hintText: 'Example Hint',
        isRequired: true,
        helpHintProps: { direction: 'top' },
      }}
      slots={{
        left: LeftSlot,
        right: RightSlot,
      }}
      renderField={
        (id, fieldValue, onFieldValueChange, onFieldDelete, isDisabled, otherFieldProps) => (
          <Box width="400px">
            <TextField
              aria-label="Text Field"
              value={fieldValue}
              onChange={e => onFieldValueChange(e, id)}
              slots={{
                inContainer: (
                  <ArrayFieldDeleteButton
                    isDisabled={isDisabled}
                    onDelete={() => onFieldDelete(id)}
                  />
                ),
              }}
              {...otherFieldProps}
            />
          </Box>
        )
      }
      label="Array Field Label"
      helperText="Helper text info..."
      addButtonLabel="+ Add Field"
    />
  );
};
