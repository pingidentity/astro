import React from 'react';

import theme from '../../styles/theme';

export default () => (
  <pre>
    {JSON.stringify(theme, null, '    ')}
  </pre>
);
