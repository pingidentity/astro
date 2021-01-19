import {
  act,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import { FORM_MODE } from '../../utils/constants';
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
  },
};
const error = 'Test error';
const extraErrors = { value: { __errors: [error] } };
const onServerError = jest.fn(() => extraErrors);
const onServerSuccess = jest.fn();
const validationErrorText = 'Should not be shorter than 3 characters';

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
  user.click(submitButton);

  // Expect async error to be rendered
  await screen.findByText(error);

  // Ensure validation fails, length = 2
  await waitFor(() => fireEvent.change(input, { target: { value: '12' } }));
  user.click(submitButton);

  // Expect async error to be cleared
  expect(screen.queryByText(error)).not.toBeInTheDocument();
});

test('it displays and clears client errors when async errors come through', async () => {
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
  user.click(submitButton);

  // Expect validation error
  const validationError = await screen.findByRole('status');
  expect(validationError).toHaveTextContent(validationErrorText);

  // Ensure validation succeeds, length = 3
  fireEvent.change(input, { target: { value: '123' } });
  user.click(submitButton);

  // Expect async error to be rendered
  await screen.findByText(new RegExp(error));
  expect(screen.queryByText(new RegExp(validationErrorText))).not.toBeInTheDocument();

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
  user.click(submitButton);

  // Expect async error to be rendered
  await screen.findByText(error);

  // Need to wait for all async state changes to happen
  await waitFor(() => fireEvent.change(input, { target: { value: successValue } }));
  user.click(submitButton);

  // Expect async success message to be rendered
  await screen.findByText(formSuccessMessage);
});

test('successful submission when given an endpoint', async () => {
  const promise = Promise.resolve();
  const onChange = jest.fn(() => promise);
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
    onChange,
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
  user.click(submitButton);

  // Expect async error to be rendered
  await screen.findByText(error);

  // Need to wait for all async state changes to happen
  await waitFor(() => fireEvent.change(input, { target: { value: successValue } }));
  user.click(submitButton);

  // Expect async success message to be rendered
  await screen.findByText(formSuccessMessage);
});

test('turns on live validation after initial submit if option is given', async () => {
  // React will warn about unhandled state changes if we don't wait for this promise on change.
  // The currentData has no visual update directly tied to it so we must work around it for now
  // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#an-alternative-waiting-for-the-mocked-promise
  const promise = Promise.resolve();
  const onChange = jest.fn(() => promise);
  renderSchemaForm({
    liveValidate: 'postSubmit',
    onChange,
    schema,
    uiSchema,
  });
  const input = screen.getByRole('textbox');
  const submitButton = screen.getByRole('button');

  // Ensure validation fails, length = 2
  fireEvent.change(input, { target: { value: '12' } });
  // Ensure live validation is not happening yet
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  user.click(submitButton);

  // Expect validation error
  const validationError = await screen.findByRole('status');
  expect(validationError).toHaveTextContent(validationErrorText);

  // Expect live validation to happen after initial submit (no need to submit again)
  fireEvent.change(input, { target: { value: '123' } });
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  await act(() => promise);
});

test('live validation happens all of the time if option is given', async () => {
  // React will warn about unhandled state changes if we don't wait for this promise on change.
  // The currentData has no visual update directly tied to it so we must work around it for now
  // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#an-alternative-waiting-for-the-mocked-promise
  const promise = Promise.resolve();
  const onChange = jest.fn(() => promise);
  // Will fail initial fetch, but second one will be the default above and will succeed
  renderSchemaForm({
    liveValidate: true,
    onChange,
    schema,
    uiSchema,
  });
  const input = screen.getByRole('textbox');

  // Ensure validation fails, length = 2
  fireEvent.change(input, { target: { value: '12' } });
  // Ensure live validation is happening already
  expect(screen.queryByRole('status')).toBeInTheDocument();

  // Expect validation error
  const validationError = await screen.findByRole('status');
  expect(validationError).toHaveTextContent(validationErrorText);

  // Expect live validation to keep happening
  fireEvent.change(input, { target: { value: '123' } });
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  await act(() => promise);
});

test('it clears async errors on change when live validation is enabled post submit', async () => {
  // When dealing with live validation, we must check differences in form data, but that means
  // React will warn about unhandled state changes if we don't wait for this promise on change.
  // The currentData has no visual update directly tied to it so we must work around it for now
  // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#an-alternative-waiting-for-the-mocked-promise
  const promise = Promise.resolve();
  const onChange = jest.fn(() => promise);
  global.fetch.mockImplementation(() => new Response(null, { status: 400 }));

  renderSchemaForm({
    endpoint: 'test',
    liveValidate: 'postSubmit',
    onChange,
    onServerError,
    schema,
    uiSchema,
  });
  const input = screen.getByRole('textbox');
  const submitButton = screen.getByRole('button');

  // Ensure validation passes, length = 3
  fireEvent.change(input, { target: { value: '123' } });
  user.click(submitButton);

  // Expect async error to be rendered
  await screen.findByText(error);

  // Ensure validation fails, length = 2
  await waitFor(() => fireEvent.change(input, { target: { value: '12' } }));
  // Expect validation error to be present
  expect(screen.getByRole('status')).toBeInTheDocument();
  // Expect async error to be cleared
  expect(screen.queryByText(error)).not.toBeInTheDocument();
  await act(() => promise);
});

test('simplified form mode renders', () => {
  renderSchemaForm({
    mode: FORM_MODE.SIMPLIFIED,
    schema,
    uiSchema,
  });

  expect(document.querySelector('form')).toBeInTheDocument();
  expect(screen.getByLabelText(uiSchema.value['ui:options'].label)).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});
