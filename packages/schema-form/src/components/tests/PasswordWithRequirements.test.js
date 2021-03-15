import { fireEvent, screen, act } from '@testing-library/react';
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
      requirementsTitle: 'Password Requirements',
      requirementsData: [
        { name: 'A', status: 'yes' },
        { name: 'B', status: 'no' },
        { name: 'C', status: 'error' },
      ],
    },
  },
};

test('it renders a password with requirements popover', () => {
  renderSchemaForm({ schema, uiSchema });
  const label = screen.queryByText(name);
  const input = screen.queryByLabelText(name);

  expect(label).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

  // Ensure the popover is inserted into the document and displays when the input is focused
  fireEvent.focus(input);
  expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  expect(screen.queryByRole('tooltip')).toBeVisible();

  // Ensure the popover is hidden again when the input is blurred
  fireEvent.blur(input);
  expect(screen.queryByRole('tooltip')).not.toBeVisible();
});

test('it fires onchange event', async () => {
  const onChange = jest.fn();

  renderSchemaForm({ onChange, schema, uiSchema });
  const input = screen.queryByLabelText(name);
  expect(input).toBeInTheDocument();

  await act(async () => fireEvent.change(input, { target: { value: 'Hello' } }));
  expect(input.value).toBe('Hello');
  expect(onChange).toHaveBeenCalled();
});
