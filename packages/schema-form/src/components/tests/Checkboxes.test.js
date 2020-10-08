import { fireEvent, screen } from '@testing-library/react';
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

test('it renders an array of checkboxes', () => {
  renderSchemaForm({ schema, uiSchema });
  const heading = screen.getByRole('heading');
  const checkboxes = screen.getAllByRole('checkbox');

  expect(heading).toHaveTextContent(uiSchema.interacted['ui:options'].label);
  expect(checkboxes).toHaveLength(schema.properties.interacted.items.enum.length);
});

test('it checks the checkboxes properly', () => {
  renderSchemaForm({ schema, uiSchema });
  const checkboxes = screen.getAllByRole('checkbox');

  expect(checkboxes[0]).not.toBeChecked();
  fireEvent.click(checkboxes[0]);
  expect(checkboxes[0]).toBeChecked();
  fireEvent.click(checkboxes[0]);
  expect(checkboxes[0]).not.toBeChecked();
});

test('it submits the checkboxes properly', () => {
  const handleSubmit = jest.fn();
  const onSubmit = jest.fn(({ formData }) => handleSubmit(formData));
  renderSchemaForm({ onSubmit, schema, uiSchema });
  const checkboxes = screen.getAllByRole('checkbox');
  const submitBtn = screen.getByRole('button');
  const expectedFormData = { interacted: [`${schema.properties.interacted.items.enum[0]}`] };

  expect(onSubmit).not.toHaveBeenCalled();
  fireEvent.click(checkboxes[0]);
  fireEvent.click(submitBtn);
  expect(handleSubmit).toHaveBeenNthCalledWith(1, expectedFormData);
});
