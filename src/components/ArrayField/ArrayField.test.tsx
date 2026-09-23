import React from 'react';

import onyxTheme from '../../styles/themes/next-gen';
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

const renderField = (
  id,
  value,
  onFieldValueChange,
  onFieldDelete,
  isDisabled,
  otherFieldProps,
) => {
  return (
    <TextField
      aria-label={`Text field ${id}`}
      label={null}
      value={value}
      onChange={e => onFieldValueChange(e, id)}
      slots={{
        inContainer: (
          <ArrayFieldDeleteButton isDisabled={isDisabled} onDelete={() => onFieldDelete(id)} />
        ),
      }}
      {...otherFieldProps}
    />
  );
};

const getTextFields = () => screen.getAllByRole('textbox', { name: /Text field/ });
const getDeleteButtons = () => screen.getAllByRole('button', { name: /delete/i });

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (<ArrayField renderField={renderField} {...defaultProps} {...props} />),
});

test('displays multiple text fields with programmatic names', () => {
  const onChange = jest.fn();

  getComponent({ onChange, renderField });

  expect(getTextFields()).toHaveLength(2);
  expect(getTextFields()[0]).toHaveAccessibleName('Text field 1');
  expect(getTextFields()[1]).toHaveAccessibleName('Text field 2');
});

test('adds one text field and new empty field is added', () => {
  getComponent({ renderField });

  fireEvent.click(screen.getByRole('button', { name: 'Add field' }));
  expect(getTextFields()).toHaveLength(3);
});

test('onAdd callback is fired when adding field', () => {
  const onAdd = jest.fn();
  const value = defaultData;
  const defaultValue = null;
  getComponent({ value, defaultValue, onAdd, renderField });

  fireEvent.click(screen.getByRole('button', { name: 'Add field' }));
  expect(onAdd).toHaveBeenCalled();
});

test('deletes one text field and only one field is left', () => {
  getComponent({ renderField });

  fireEvent.click(getDeleteButtons()[0]);
  expect(getTextFields()).toHaveLength(1);
});

test('onDelete callback is fired when deleting field', () => {
  const onDelete = jest.fn();
  const value = defaultData;
  const defaultValue = null;
  getComponent({ value, defaultValue, onDelete, renderField });

  fireEvent.click(getDeleteButtons()[0]);
  expect(onDelete).toHaveBeenCalled();
});

test('renders rows from the canonical value property', () => {
  getComponent({
    value: [{ id: '1', value: 'Canonical value' }],
    renderField,
  });

  expect(screen.getByDisplayValue('Canonical value')).toBeInTheDocument();
});

test('preserves legacy fieldValue rows when rendering', () => {
  const onComponentRender = (id, fieldValue, onFieldValueChange) => (
    <TextField
      aria-label="Legacy text field"
      label={null}
      value={fieldValue}
      onChange={event => onFieldValueChange(event, id)}
    />
  );

  getComponent({
    value: [{ id: '1', fieldValue: 'Legacy value', onComponentRender }],
  });

  expect(screen.getByDisplayValue('Legacy value')).toBeInTheDocument();
});

test('renders controlled row updates after onChange', () => {
  const ControlledArrayField = () => {
    const [values, setValues] = React.useState([
      { id: '1', fieldValue: 'Initial value' },
    ]);

    return (
      <ArrayField
        label="test-label"
        value={values}
        onChange={setValues}
        renderField={renderField}
      />
    );
  };

  render(<ControlledArrayField />);

  fireEvent.change(getTextFields()[0], { target: { value: 'Updated value' } });

  expect(screen.getByDisplayValue('Updated value')).toBeInTheDocument();
  expect(screen.queryByDisplayValue('Initial value')).not.toBeInTheDocument();
});

test('Values are changed in text field', () => {
  getComponent({ renderField });

  fireEvent.change(getTextFields()[0], { target: { value: '123' } });
  expect(screen.getByDisplayValue('123')).toBeInTheDocument();
});

test('onChange gets called when field values are changed', () => {
  const onChange = jest.fn();
  const value = defaultData;
  const defaultValue = null;
  getComponent({ value, onChange, renderField, defaultValue });

  fireEvent.change(getTextFields()[0], { target: { value: '123' } });
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
      onComponentRender: (
        id, value, onFieldValueChange, onFieldDelete, isDisabled, labelId, otherFieldProps,
      ) => (
        <TextField
          aria-label="Text field"
          label={null}
          value={value}
          onChange={e => onFieldValueChange(e, id)}
          slots={{
            inContainer: (
              <ArrayFieldDeleteButton isDisabled={isDisabled} onDelete={() => onFieldDelete(id)} />
            ),
          }}
          {...otherFieldProps}
        />
      ),
    },
    {
      id: '2',
      value: 'World',
      onComponentRender: (
        id, value, onFieldValueChange, onFieldDelete, isDisabled, labelId, otherFieldProps,
      ) => (
        <TextField
          aria-label="Text field 2"
          label={null}
          value={value}
          onChange={e => onFieldValueChange(e, id)}
          slots={{
            inContainer: (
              <ArrayFieldDeleteButton isDisabled={isDisabled} onDelete={() => onFieldDelete(id)} />
            ),
          }}
          {...otherFieldProps}
        />
      ),
    },
  ];

  render(<ArrayField label="test-label" defaultValue={componentRenderData} onChange={onChange} />);

  expect(getTextFields()).toHaveLength(2);
  expect(screen.getByRole('textbox', { name: 'Text field' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Text field 2' })).toBeInTheDocument();
});

test('creates empty field when no data passed', () => {
  render(<ArrayField label="test-label" renderField={renderField} />);

  expect(getTextFields()).toHaveLength(1);
});

test('uses the specified delete action semantics', () => {
  render(
    <ArrayField renderField={renderField} {...defaultProps} />,
    { providerTheme: onyxTheme },
  );

  expect(getDeleteButtons()).toHaveLength(2);
  expect(getDeleteButtons()[0]).toHaveAccessibleName(/delete/i);
});

test('keeps the legacy delete action semantics under the Astro theme', () => {
  getComponent({ renderField });

  expect(getDeleteButtons()).toHaveLength(2);
  expect(getDeleteButtons()[0]).toHaveAccessibleName(/delete/i);
});

test('omits the delete action when a single field remains and does not call onDelete', () => {
  const onDelete = jest.fn();

  render(
    <ArrayField
      label="Array Field Label"
      value={[{ id: '1', value: 'Hello' }]}
      onDelete={onDelete}
      renderField={renderField}
    />,
  );

  expect(screen.queryAllByRole('button', { name: /delete/i })).toHaveLength(0);
  expect(getTextFields()).toHaveLength(1);
  expect(onDelete).not.toHaveBeenCalled();
});

test('orders and associates array-level helper text before Add Field', () => {
  render(
    <ArrayField
      label="Array Field Label"
      defaultValue={defaultData}
      helperText="Helper text info..."
      renderField={renderField}
    />,
  );

  const arrayLabel = screen.getByText('Array Field Label');
  const list = screen.getByRole('list');
  const helperText = screen.getByText('Helper text info...');
  const addButton = screen.getByRole('button', { name: 'Add field' });

  expect(arrayLabel.compareDocumentPosition(list)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(list.compareDocumentPosition(helperText)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(helperText.compareDocumentPosition(addButton)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(helperText).toHaveAttribute('id');
});

test('keeps maximum feedback adjacent to helper text and omits Add Field at limit', () => {
  render(
    <ArrayField
      label="Array Field Label"
      defaultValue={defaultData}
      helperText="Helper text info..."
      maxSize={2}
      maxSizeText="Maximum 2 items."
      renderField={renderField}
    />,
  );

  const helperText = screen.getByText('Helper text info...');
  const maximumText = screen.getByText('Maximum 2 items.');

  expect(helperText.nextElementSibling).toBe(maximumText);
  expect(helperText).toHaveAttribute('id');
  expect(maximumText).toHaveAttribute('id');
  expect(screen.queryByRole('button', { name: 'Add field' })).not.toBeInTheDocument();
});

test('associates maximum feedback when helper text is absent', () => {
  render(
    <ArrayField
      label="Array Field Label"
      defaultValue={defaultData}
      maxSize={2}
      maxSizeText="Maximum 2 items."
      renderField={renderField}
    />,
  );

  const maximumText = screen.getByText('Maximum 2 items.');
  expect(maximumText).toHaveAttribute('id');
});

test('does not add an array description reference when helper and maximum feedback are absent', () => {
  render(<ArrayField label="Array Field Label" defaultValue={defaultData} renderField={renderField} />);

  expect(screen.getByRole('list')).not.toHaveAttribute('aria-describedby');
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

  expect(getTextFields()).toHaveLength(2);

  fireEvent.click(screen.getByRole('button', { name: 'Add field' }));
  expect(getTextFields()).toHaveLength(3);
  expect(screen.queryByRole('button', { name: 'Add field' })).not.toBeInTheDocument();
  expect(screen.getByText('Maximum 3 items.')).toBeInTheDocument();
});

test('displays max size label if provided', () => {
  const maxSizeText = 'Too many fields';
  getComponent({ renderField, maxSize: 1, maxSizeText });

  expect(screen.queryByRole('button', { name: 'Add field' })).not.toBeInTheDocument();
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

test('tooltipTrigger applies nested props correctly', () => {
  getComponent({ addButtonProps: { 'aria-label': 'add a new field' } });

  expect(screen.queryByRole('button')).toHaveAttribute('aria-label', 'add a new field');
});
