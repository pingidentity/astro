import React, { forwardRef } from 'react';

import { Box } from '../../index';
import { LabelValuePairsRowProps } from '../../types';

import PairValue from './LabelValuePairsValue';

const displayName = 'Pair';

const Pair = forwardRef<HTMLElement, LabelValuePairsRowProps>((props, ref) => {
  const { children, ...others } = props;

  const childrenArray = React.Children.toArray(children);

  const valueChild = childrenArray.find(
    child => React.isValidElement(child) && child.type === PairValue,
  ) as React.ReactElement<{ children?: React.ReactNode, isLoading?: boolean }> | undefined;

  const isLoading = valueChild?.props.isLoading;
  const hasValueContent = Boolean(valueChild?.props.children);

  if (!hasValueContent && !isLoading) {
    return null;
  }

  return (
    <Box
      ref={ref}
      variant="labelValuePairs.fieldItem"
      {...others}
    >
      {children}
    </Box>
  );
});

Pair.displayName = displayName;

export default Pair;
