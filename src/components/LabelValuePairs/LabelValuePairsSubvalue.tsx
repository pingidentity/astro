import React, { forwardRef } from 'react';

import { Text } from '../../index';
import { LabelValuePairsSubvalueProps } from '../../types';

const displayName = 'PairSubvalue';

const PairSubvalue = forwardRef<HTMLDivElement, LabelValuePairsSubvalueProps>((props, ref) => {
  const { children, ...others } = props;

  return (
    <Text ref={ref} variant="variants.labelValuePairs.subLabel" {...others}>
      {children}
    </Text>
  );
});

PairSubvalue.displayName = displayName;

export default PairSubvalue;
