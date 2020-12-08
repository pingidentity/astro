import React from 'react';
import theme from './theme';

export default () => (
  <pre>
    {JSON.stringify(theme, null, '    ')}
  </pre>
);
