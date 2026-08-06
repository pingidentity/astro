import React, { forwardRef } from 'react';

import { useGetTheme } from '../../hooks';
import { Box, HelpHint, Text } from '../../index';
import { LabelValuePairsLabelProps } from '../../types';

const displayName = 'PairLabel';

const H4 = 'h4';
const H5 = 'h5';

const PairLabel = forwardRef<HTMLElement, LabelValuePairsLabelProps>((props, ref) => {
  const {
    children,
    helpHint,
    containerProps,
    textProps,
    helpHintProps,
    ...others
  } = props;
  const { themeState: { isOnyx } } = useGetTheme();
  const [label, icon] = React.Children.toArray(children);

  const defaultTextProps = isOnyx ? { variant: H5, as: H5 } : { variant: H4, as: H4 };
  return (
    <Box ref={ref} isRow alignItems="center" gap="sm" {...others} {...containerProps}>
      <Text {...defaultTextProps} {...textProps}>{label}</Text>
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
