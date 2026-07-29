import React, { forwardRef } from 'react';

import { Box, HelpHint, Text } from '../../index';
import { LabelValuePairsLabelProps } from '../../types';

const displayName = 'PairLabel';

const PairLabel = forwardRef<HTMLElement, LabelValuePairsLabelProps>((props, ref) => {
  const {
    children,
    helpHint,
    containerProps,
    textProps,
    helpHintProps,
    ...others
  } = props;

  const [label, icon] = React.Children.toArray(children);

  return (
    <Box ref={ref} isRow alignItems="center" gap="sm" {...others} {...containerProps}>
      <Text variant="h4" as="h4" {...textProps}>{label}</Text>
      {icon}
      {helpHint && (
        <HelpHint
          iconButtonProps={{
            'aria-label': `${label} help hint`,
          }}
          {...helpHintProps}
        >
          {helpHint}
        </HelpHint>
      )}
    </Box>
  );
});

PairLabel.displayName = displayName;

export default PairLabel;
