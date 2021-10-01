import { act, fireEvent, screen } from '@testing-library/react';
import { renderSchemaForm } from './utils';

const schema = {
  type: 'object',
  properties: {
    interacted: {
      type: 'string',
      enum: [
        'A',
        'B',
        'C',
        'D',
      ],
      uniqueItems: true,
    },
  },
  $schema: 'http://json-schema.org/draft-04/schema#',
};
const uiSchema = {
  interacted: {
    'ui:widget': 'radiogroup',
    'ui:options': {
      label: 'Label',
    },
  },
};

test('it renders a radio group field', async () => {
  // React will warn about unhandled state changes if we don't wait for this promise on change.
  // The currentData has no visual update directly tied to it so we must work around it for now
  // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#an-alternative-waiting-for-the-mocked-promise
  const promise = Promise.resolve();
  const onChange = jest.fn(() => promise);
  renderSchemaForm({
    onChange,
    schema,
    uiSchema,
  });
  const label = screen.getByLabelText(uiSchema.interacted['ui:options'].label);
  const radiogroup = screen.getByRole('radiogroup');
  const radios = screen.getAllByRole('radio');

  expect(label).toBeInTheDocument();
  expect(radiogroup).toBeInTheDocument();
  expect(radios).toHaveLength(schema.properties.interacted.enum.length);
  await act(() => promise);
});

test('radios can be selected', async () => {
  // React will warn about unhandled state changes if we don't wait for this promise on change.
  // The currentData has no visual update directly tied to it so we must work around it for now
  // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#an-alternative-waiting-for-the-mocked-promise
  const promise = Promise.resolve();
  const onChange = jest.fn();
  renderSchemaForm({
    onChange,
    schema,
    uiSchema,
  });
  const radios = screen.getAllByRole('radio');

  fireEvent.click(radios[0]);
  radios.forEach((radio, index) => {
    if (index === 0) expect(radio).toBeChecked();
    else expect(radio).not.toBeChecked();
  });

  fireEvent.click(radios[1]);
  radios.forEach((radio, index) => {
    if (index === 1) expect(radio).toBeChecked();
    else expect(radio).not.toBeChecked();
  });
  await act(() => promise);
});

test('it submits the radio group properly', async () => {
  // React will warn about unhandled state changes if we don't wait for this promise on change.
  // The currentData has no visual update directly tied to it so we must work around it for now
  // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning#an-alternative-waiting-for-the-mocked-promise
  const promise = Promise.resolve();
  const handleSubmit = jest.fn();
  const onSubmit = jest.fn(({ formData }) => handleSubmit(formData));
  const onChange = jest.fn();
  renderSchemaForm({
    onChange,
    onSubmit,
    schema,
    uiSchema,
  });
  const radios = screen.getAllByRole('radio');
  const submitBtn = screen.getByRole('button');
  const expectedFormData = { interacted: `${schema.properties.interacted.enum[0]}` };

  fireEvent.click(radios[0]);
  expect(onSubmit).not.toHaveBeenCalled();
  fireEvent.click(submitBtn);
  expect(handleSubmit).toHaveBeenNthCalledWith(1, expectedFormData);
  await act(() => promise);
});
