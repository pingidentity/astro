import React from 'react';
import ArrayField from './ArrayField';
import ArrayFieldDeleteButton from './ArrayFieldDeleteButton';
import TextField from '../TextField';
import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';

jest.mock('uuid', () => ({ v4: () => 'testid' }));

const defaultData = [
  {
    id: '1', value: 'Hello',
  },
  {
    id: '2', value: 'World',
  },
];

const defaultProps = {
  defaultValue: defaultData,
};

const getComponent = (props = {}) => render((
  <ArrayField {...defaultProps} {...props} />
));

const renderField = (id, value, onFieldValueChange, onFieldDelete, otherFieldProps) => {
  return (
    <TextField
      label="Text field"
      value={value}
      onChange={e => onFieldValueChange(e, id)}
      mr="xs"
      slots={
      { inContainer:
  <ArrayFieldDeleteButton isDisabled={false} onDelete={() => onFieldDelete(id)} /> }}
      {...otherFieldProps}
    />
  );
};

test('displays multiple text fields', () => {
  const onChange = jest.fn();

  getComponent({ onChange, renderField });

  expect(screen.getAllByLabelText('Text field')).toHaveLength(2);
});

test('adds one text field and new empty field is added', () => {
  getComponent({ renderField });

  fireEvent.click(screen.getByText('+ Add'));
  expect(screen.getAllByLabelText('Text field')).toHaveLength(3);
});

test('onAdd callback is fired when adding field', () => {
  const onAdd = jest.fn();

  getComponent({ onAdd, renderField });

  fireEvent.click(screen.getByText('+ Add'));
  expect(onAdd).toHaveBeenCalled();
});

test('deletes one text field and only one field is left', () => {
  getComponent({ renderField });

  fireEvent.click(screen.getAllByRole('button')[0]);
  expect(screen.getByLabelText('Text field')).toBeInTheDocument();
});

test('onDelete callback is fired when deleting field', () => {
  const onDelete = jest.fn();
  const value = defaultData;
  const defaultValue = null;
  getComponent({ value, defaultValue, onDelete, renderField });

  fireEvent.click(screen.getAllByRole('button')[0]);
  expect(onDelete).toHaveBeenCalled();
});

test('Values are changed in text field', () => {
  getComponent({ renderField });

  fireEvent.change(screen.getAllByLabelText('Text field')[0], { target: { value: '123' } });
  expect(screen.getByDisplayValue('123')).toBeInTheDocument();
});

test('onChange gets called when field values are changed', () => {
  const onChange = jest.fn();
  const value = defaultData;
  const defaultValue = null;
  getComponent({ value, onChange, renderField, defaultValue });

  fireEvent.change(screen.getAllByLabelText('Text field')[0], { target: { value: '123' } });
  expect(onChange).toHaveBeenNthCalledWith(1, [{ id: '1', value: '123' }, { id: '2', value: 'World' }]);
});

test('onComponentRender displays fields correctly', () => {
  const onChange = jest.fn();

  const componentRenderData = [
    {
      id: '1',
      value: 'Hello',
      onComponentRender: (id, value, onFieldValueChange, onFieldDelete, otherFieldProps) => (
        <TextField
          label="Text field"
          value={value}
          onChange={e => onFieldValueChange(e, id)}
          mr="xs"
          slots={
      { inContainer:
  <ArrayFieldDeleteButton isDisabled={false} onDelete={() => onFieldDelete(id)} /> }}
          {...otherFieldProps}
        />),
    },
    {
      id: '2',
      value: 'World',
      onComponentRender: (id, value, onFieldValueChange, onFieldDelete, otherFieldProps) => (
        <TextField
          label="Text field 2"
          value={value}
          onChange={e => onFieldValueChange(e, id)}
          mr="xs"
          slots={
      { inContainer:
  <ArrayFieldDeleteButton isDisabled={false} onDelete={() => onFieldDelete(id)} /> }}
          {...otherFieldProps}
        />),
    },
  ];

  render(<ArrayField defaultValue={componentRenderData} onChange={onChange} />);

  expect(screen.getByLabelText('Text field')).toBeInTheDocument();
  expect(screen.getByLabelText('Text field 2')).toBeInTheDocument();
});


test('creates empty field when no data passed', () => {
  render(<ArrayField renderField={renderField} />);

  expect(screen.getByLabelText('Text field')).toBeInTheDocument();
});
