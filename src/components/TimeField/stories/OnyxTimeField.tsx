import React from 'react';

import { Box, TimeField } from '../../..';

const OnyxTimeField = () => {
  return (
    <Box gap="md" p="md">
      <TimeField aria-label="timeField-default" />
      <TimeField aria-label="timeField-default" defaultValue="12:30" hourCycle={12} granularity="second" />
      <TimeField aria-label="timeField-default" isDisabled />
      <TimeField aria-label="timeField-default" isReadOnly />
      <TimeField aria-label="timeField-default" isRequired label="Lorem Ipsum" />
      <TimeField aria-label="timeField-default" defaultValue="12:30" isInvalid />
    </Box>
  );
};

export default OnyxTimeField;
