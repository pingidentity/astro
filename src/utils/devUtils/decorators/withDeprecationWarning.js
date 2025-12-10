import React from 'react';

import Text from '../../../components/Text';

const withDeprecationWarning = (Story, context, text = 'This component will be deprecated') => {
  // Display warning on the Canvas page
  if (context.viewMode === 'story') {
    return (
      <>
        <Text mb="lg">
          WARNING:
          {text}
        </Text>
        <Story {...context} />
      </>
    );
  }
  return <Story {...context} />;
};

export default withDeprecationWarning;
