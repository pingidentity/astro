import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderSchemaForm } from './utils';

const schema = {
  type: 'object',
  properties: {
    value: {
      type: 'string',
      minLength: 3,
    },
  },
  $schema: 'http://json-schema.org/draft-04/schema#',
};
const uiSchema = {
  value: {
    'ui:options': {
      label: 'Label',
    },
    'ui:widget': 'textarea',
  },
};
const error = 'test error';
const extraErrors = { _form: { __errors: [error] } };
const onServerError = jest.fn(() => extraErrors);
const onServerSuccess = jest.fn();

const defaultResponse = new Response(new Blob([JSON.stringify({
  status: 200,
})], {
  type: 'application/json',
}));

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve(defaultResponse));
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('it displays but does not persist async errors when validation fails', async () => {
  global.fetch.mockImplementation(() => new Response(null, { status: 400 }));

  renderSchemaForm({
    endpoint: 'test',
    onServerError,
    schema,
    uiSchema,
  });
  const input = screen.getByRole('textbox');
  const submitButton = screen.getByRole('button');

  // Ensure validation passes, length = 3
  fireEvent.change(input, { target: { value: '123' } });
  fireEvent.click(submitButton);

  // Expect async error to be rendered
  await screen.findByText(error);

  // Ensure validation fails, length = 2
  fireEvent.change(input, { target: { value: '12' } });
  fireEvent.click(submitButton);

  // Expect async error to be cleared
  expect(screen.queryByText(error)).not.toBeInTheDocument();
});

test('it displays and clears client errors when async errors come through', async () => {
  const validationErrorText = 'Should not be shorter than 3 characters';
  global.fetch.mockImplementation(() => new Response(null, { status: 400 }));

  renderSchemaForm({
    endpoint: 'test',
    onServerError,
    schema,
    uiSchema,
  });
  const input = screen.getByRole('textbox');
  const submitButton = screen.getByRole('button');

  // Ensure validation fails, length = 2
  fireEvent.change(input, { target: { value: '12' } });
  fireEvent.click(submitButton);

  // Expect validation error
  const validationError = await screen.findByRole('status');
  expect(validationError).toHaveTextContent(validationErrorText);

  // Ensure validation succeeds, length = 3
  fireEvent.change(input, { target: { value: '123' } });
  fireEvent.click(submitButton);

  // Expect async error to be rendered
  await screen.findByText(error);

  // Expect async error to be cleared
  expect(screen.queryByText(validationErrorText)).not.toBeInTheDocument();
});

test('it allows custom onSubmit and subsequent error or success handling', async () => {
  const formSuccessMessage = 'Success!';
  const errorValue = '123';
  const successValue = 'abc';
  const onSubmit = ({ formData }, _event, handleServerError, handleServerSuccess) => {
    if (formData.value === errorValue) {
      handleServerError();
    } else {
      handleServerSuccess();
    }
  };
  renderSchemaForm({
    formSuccessMessage,
    onSubmit,
    onServerError,
    schema,
    uiSchema,
  });
  const input = screen.getByRole('textbox');
  const submitButton = screen.getByRole('button');
  expect(screen.queryByText(formSuccessMessage)).not.toBeInTheDocument();
  expect(screen.queryByText(error)).not.toBeInTheDocument();

  fireEvent.change(input, { target: { value: errorValue } });
  fireEvent.click(submitButton);

  // Expect async error to be rendered
  await screen.findByText(error);

  // Need to wait for all async state changes to happen
  await waitFor(() => fireEvent.change(input, { target: { value: successValue } }));
  fireEvent.click(submitButton);

  // Expect async success message to be rendered
  await screen.findByText(formSuccessMessage);
});

test('successful submission when given an endpoint', async () => {
  // Will fail initial fetch, but second one will be the default above and will succeed
  global.fetch.mockImplementationOnce(() => Promise.resolve(new Response(new Blob(), {
    status: 400,
  })));
  const formSuccessMessage = 'Success!';
  const errorValue = '123';
  const successValue = 'abc';
  renderSchemaForm({
    endpoint: 'test',
    formSuccessMessage,
    onServerError,
    onServerSuccess,
    schema,
    uiSchema,
  });
  const input = screen.getByRole('textbox');
  const submitButton = screen.getByRole('button');
  expect(screen.queryByText(formSuccessMessage)).not.toBeInTheDocument();
  expect(screen.queryByText(error)).not.toBeInTheDocument();

  fireEvent.change(input, { target: { value: errorValue } });
  fireEvent.click(submitButton);

  // Expect async error to be rendered
  await screen.findByText(error);

  // Need to wait for all async state changes to happen
  await waitFor(() => fireEvent.change(input, { target: { value: successValue } }));
  fireEvent.click(submitButton);

  // Expect async success message to be rendered
  await screen.findByText(formSuccessMessage);
});
