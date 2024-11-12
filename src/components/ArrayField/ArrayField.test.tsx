import React from 'react';

import { fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';
import TextField from '../TextField';

import ArrayField from './ArrayField';
import ArrayFieldDeleteButton from './ArrayFieldDeleteButton';

jest.mock('uuid', () => ({ v4: () => 'testid' }));

const defaultData = [
  {
    id: '1',
    value: 'Hello',
  },
  {
    id: '2',
    value: 'World',
  },
];

const defaultProps = {
  defaultValue: defaultData,
  label: 'test-label',
};

const getComponent = (props = {}) => render(<ArrayField {...defaultProps} {...props} />);

const renderField = (id, value, onFieldValueChange, onFieldDelete, otherFieldProps) => {
  return (
    <TextField
      label="Text field"
      value={value}
      onChange={e => onFieldValueChange(e, id)}
      mr="xs"
      slots={{
        inContainer: (
          <ArrayFieldDeleteButton isDisabled={false} onDelete={() => onFieldDelete(id)} />
        ),
      }}
      {...otherFieldProps}
    />
  );
};

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (<ArrayField renderField={renderField} {...defaultProps} {...props} />),
});

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
  const value = defaultData;
  const defaultValue = null;
  getComponent({ value, defaultValue, onAdd, renderField });

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
  expect(onChange).toHaveBeenNthCalledWith(1, [
    { id: '1', value: '123' },
    { id: '2', value: 'World' },
  ]);
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
          slots={{
            inContainer: (
              <ArrayFieldDeleteButton isDisabled={false} onDelete={() => onFieldDelete(id)} />
            ),
          }}
          {...otherFieldProps}
        />
      ),
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
          slots={{
            inContainer: (
              <ArrayFieldDeleteButton isDisabled={false} onDelete={() => onFieldDelete(id)} />
            ),
          }}
          {...otherFieldProps}
        />
      ),
    },
  ];

  render(<ArrayField label="test-label" defaultValue={componentRenderData} onChange={onChange} />);

  expect(screen.getByLabelText('Text field')).toBeInTheDocument();
  expect(screen.getByLabelText('Text field 2')).toBeInTheDocument();
});

test('creates empty field when no data passed', () => {
  render(<ArrayField label="test-label" renderField={renderField} />);

  expect(screen.getByLabelText('Text field')).toBeInTheDocument();
});

test('check if tooltip on delete button renders on hover', () => {
  render(<ArrayFieldDeleteButton />);
  const button = screen.getByRole('button');
  fireEvent.mouseMove(button);
  fireEvent.mouseEnter(button);
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});

test('removes add button if max number of fields is reached', () => {
  getComponent({ renderField, maxSize: 3 });

  expect(screen.getAllByLabelText('Text field')).toHaveLength(2);

  fireEvent.click(screen.getByText('+ Add'));
  expect(screen.getAllByLabelText('Text field')).toHaveLength(3);
  expect(screen.queryByText('+ Add')).not.toBeInTheDocument();
  expect(screen.getByText('Maximum 3 items.')).toBeInTheDocument();
});

test('displays max size label if provided', () => {
  const maxSizeText = 'Too many fields';
  getComponent({ renderField, maxSize: 1, maxSizeText });

  expect(screen.queryByText('+ Add')).not.toBeInTheDocument();
  expect(screen.getByText(maxSizeText)).toBeInTheDocument();
});

test('renders left slot content', () => {
  const leftSlotContent = <div data-testid="left-slot">Left Slot Content</div>;
  getComponent({ slots: { left: leftSlotContent } });
  const leftSlot = screen.getByTestId('left-slot');
  expect(leftSlot).toBeInTheDocument();
  expect(leftSlot).toHaveTextContent('Left Slot Content');
});

test('renders right slot content', () => {
  const rightSlotContent = <div data-testid="right-slot">Right Slot Content</div>;
  getComponent({ slots: { right: rightSlotContent } });
  const rightSlot = screen.getByTestId('right-slot');
  expect(rightSlot).toBeInTheDocument();
  expect(rightSlot).toHaveTextContent('Right Slot Content');
});
