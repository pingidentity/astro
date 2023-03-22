import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderSchemaForm } from './utils';

const name = 'password';
const schema = {
  type: 'object',
  properties: {
    [name]: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-04/schema#',
};
const uiSchema = {
  [name]: {
    'ui:widget': 'passwordWithRequirements',
    'ui:options': {
      requirements: [
        { name: 'A', status: 'default' },
        { name: 'B', status: 'success' },
        { name: 'C', status: 'warning' },
        { name: 'D', status: 'error' },
      ],
    },
  },
};

test('it renders a password with requirements popover', async () => {
  renderSchemaForm({ schema, uiSchema });
  const label = screen.queryByText(name);
  const input = screen.queryByLabelText(name);

  expect(label).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(screen.queryByRole('presentation')).not.toBeInTheDocument();

  // Ensure the popover is inserted into the document and displays when the input is focused
  await waitFor(() => userEvent.tab());
  expect(screen.queryByRole('presentation')).toBeInTheDocument();
  expect(screen.queryByRole('presentation')).toBeVisible();

  // Ensure the popover is hidden again when the input is blurred
  await waitFor(() => userEvent.tab());
  await waitFor(() => userEvent.tab());
  expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
});

test('it fires onchange event', async () => {
  const onChange = jest.fn();

  renderSchemaForm({ onChange, schema, uiSchema });
  const input = screen.getByLabelText(name);
  expect(input).toBeInTheDocument();
  expect(input).toBeInstanceOf(HTMLInputElement);

  await waitFor(() => userEvent.type(input, 'Hello'));
  expect(input.value).toBe('Hello');
  expect(onChange).toHaveBeenCalled();
});

test('it fires validate requirements events', async () => {
  const newUISchema = JSON.parse(JSON.stringify(uiSchema)); // make deep copy
  const validateRequirements = jest.fn();
  newUISchema.password['ui:options'].validateRequirements = validateRequirements;
  renderSchemaForm({ schema, uiSchema: newUISchema });
  const input = screen.queryByLabelText(name);
  expect(input).toBeInTheDocument();

  await waitFor(() => userEvent.type(input, 'Hello'));
  expect(input.value).toBe('Hello');
  expect(validateRequirements).toHaveBeenCalledTimes('Hello'.length);
});

test('it sets autocomplete attribute correctly', () => {
  const newUISchema = JSON.parse(JSON.stringify(uiSchema)); // make deep copy
  newUISchema.password['ui:options'].autoComplete = 'new-password';
  renderSchemaForm({ schema, uiSchema: newUISchema });
  const input = screen.queryByLabelText(name);
  expect(input).toHaveAttribute('autocomplete', 'new-password');
});

test('it passes requirementsListProps correctly', async () => {
  const newUISchema = JSON.parse(JSON.stringify(uiSchema)); // make deep copy
  newUISchema.password['ui:options'].requirementsListProps = { 'data-testid': 'test-password' };
  renderSchemaForm({ schema, uiSchema: newUISchema });
  expect(screen.queryByTestId('test-password')).not.toBeInTheDocument();

  // Ensure the popover is inserted into the document and displays when the input is focused
  await waitFor(() => userEvent.tab());
  expect(screen.queryByTestId('test-password')).toBeInTheDocument();
});
