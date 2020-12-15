import { act, fireEvent, screen } from '@testing-library/react';
import { renderSchemaForm } from './utils';

const schema = {
  type: 'object',
  properties: {
    interacted: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'string',
        enum: [
          'A',
          'B',
          'C',
          'D',
        ],
      },
      uniqueItems: true,
    },
  },
  $schema: 'http://json-schema.org/draft-04/schema#',
};
const uiSchema = {
  interacted: {
    'ui:widget': 'checkboxes',
    'ui:options': {
      label: 'Label',
    },
  },
};

test('it renders an array of checkboxes', async () => {
  // React will warn about unhandled state changes if we don't wait for this promise on change.
  // The currentData has no visual update directly tied to it so we must work around it for now
  // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#an-alternative-waiting-for-the-mocked-promise
  const promise = Promise.resolve();
  const onChange = jest.fn(() => promise);
  renderSchemaForm({ onChange, schema, uiSchema });
  const heading = screen.getByRole('heading');
  const checkboxes = screen.getAllByRole('checkbox');

  expect(heading).toHaveTextContent(uiSchema.interacted['ui:options'].label);
  expect(checkboxes).toHaveLength(schema.properties.interacted.items.enum.length);
  await act(() => promise);
});

test('it checks the checkboxes properly', async () => {
  // React will warn about unhandled state changes if we don't wait for this promise on change.
  // The currentData has no visual update directly tied to it so we must work around it for now
  // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#an-alternative-waiting-for-the-mocked-promise
  const promise = Promise.resolve();
  const onChange = jest.fn(() => promise);
  renderSchemaForm({ onChange, schema, uiSchema });
  const checkboxes = screen.getAllByRole('checkbox');

  expect(checkboxes[0]).not.toBeChecked();
  fireEvent.click(checkboxes[0]);
  expect(checkboxes[0]).toBeChecked();
  fireEvent.click(checkboxes[0]);
  expect(checkboxes[0]).not.toBeChecked();
  await act(() => promise);
});

test('it submits the checkboxes properly', async () => {
  // React will warn about unhandled state changes if we don't wait for this promise on change.
  // The currentData has no visual update directly tied to it so we must work around it for now
  // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#an-alternative-waiting-for-the-mocked-promise
  const promise = Promise.resolve();
  const onChange = jest.fn(() => promise);
  const handleSubmit = jest.fn();
  const onSubmit = jest.fn(({ formData }) => handleSubmit(formData));
  renderSchemaForm({
    onChange, onSubmit, schema, uiSchema,
  });
  const checkboxes = screen.getAllByRole('checkbox');
  const submitBtn = screen.getByRole('button');
  const expectedFormData = { interacted: [`${schema.properties.interacted.items.enum[0]}`] };

  expect(onSubmit).not.toHaveBeenCalled();
  fireEvent.click(checkboxes[0]);
  fireEvent.click(submitBtn);
  expect(handleSubmit).toHaveBeenNthCalledWith(1, expectedFormData);
  await act(() => promise);
});
