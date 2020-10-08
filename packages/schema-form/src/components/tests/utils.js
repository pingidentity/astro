import React from 'react';
import { render } from '@testing-library/react';
import SchemaForm from '../SchemaForm';

export const generateSchema = (custom) => ({
  title: 'Test',
  description: 'This is an example description',
  type: 'object',
  $schema: 'http://json-schema.org/draft-04/schema#',
  ...custom,
});
export const renderSchemaForm = (props) => render(<SchemaForm {...props} />);

export default {
  generateSchema,
  renderSchemaForm,
};
