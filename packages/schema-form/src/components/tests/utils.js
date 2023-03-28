import React from 'react';
import { render } from '@testing-library/react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import SchemaForm from '../SchemaForm';

// This is needed to avoid the Emotion warning which otherwise fails the tests
const emotionCache = createCache({ key: 'password-field-test' });
emotionCache.compat = true;

export const generateSchema = custom => ({
  title: 'Test',
  description: 'This is an example description',
  type: 'object',
  $schema: 'http://json-schema.org/draft-04/schema#',
  ...custom,
});
export const renderSchemaForm = props => render((
  <CacheProvider value={emotionCache}>
    <SchemaForm {...props} />
  </CacheProvider>
));

export default {
  generateSchema,
  renderSchemaForm,
};
