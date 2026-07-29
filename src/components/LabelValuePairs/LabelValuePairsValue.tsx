import React, { forwardRef, useState } from 'react';
import EyeOffIcon from '@pingux/mdi-react/EyeOffOutlineIcon';
import EyeIcon from '@pingux/mdi-react/EyeOutlineIcon';

import {
  Box,
  CopyText,
  Icon,
  IconButton,
  Skeleton,
  Text,
} from '../../index';
import { LabelValuePairsValueProps } from '../../types';

import { ValueTypes } from './constants';

const displayName = 'PairValue';

const MASKED_ARIA_LABELS = {
  SHOW: 'Show content',
  HIDE: 'Hide content',
} as const;

interface MaskedValueProps {
  value: string;
  containerProps?: LabelValuePairsValueProps['containerProps'];
  textProps?: LabelValuePairsValueProps['textProps'];
  iconProps?: LabelValuePairsValueProps['iconProps'];
  iconButtonProps?: LabelValuePairsValueProps['iconButtonProps'];
}

const ValueText = ({ children, ...others }) => (
  <Text variant="variants.labelValuePairs.value" {...others}>{children}</Text>
);

const MaskedValue = ({
  value, containerProps, textProps, iconProps, iconButtonProps,
}: MaskedValueProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const bullets = '•'.repeat(value.length);

  return (
    <Box isRow alignItems="center" gap="sm" {...containerProps}>
      <ValueText
        sx={isRevealed ? undefined : { letterSpacing: '0.25em' }}
        {...textProps}
      >
        {isRevealed ? value : bullets}
      </ValueText>
      <IconButton
        aria-label={isRevealed ? MASKED_ARIA_LABELS.HIDE : MASKED_ARIA_LABELS.SHOW}
        onPress={() => setIsRevealed(prev => !prev)}
        sx={{ width: 'fit-content', marginLeft: 'sm', alignSelf: 'auto' }}
        {...iconButtonProps}
      >
        <Icon
          aria-hidden="true"
          title={{ name: isRevealed ? 'Eye Icon' : 'Eye Off Icon' }}
          icon={isRevealed ? EyeIcon : EyeOffIcon}
          size="sm"
          {...iconProps}
        />
      </IconButton>
    </Box>
  );
};

const PairValue = forwardRef<HTMLDivElement, LabelValuePairsValueProps>((props, ref) => {
  const {
    children,
    valueType,
    isLoading,
    containerProps,
    textProps,
    iconProps,
    iconButtonProps,
    skeletonProps,
    ...others
  } = props;

  if (isLoading) {
    return (
      <Box ref={ref} role="alert" aria-live="assertive" aria-label="Loading" {...others} {...containerProps}>
        <Skeleton variant="text" {...skeletonProps} />
      </Box>
    );
  }

  switch (valueType) {
    case ValueTypes.COPYABLE:
      return (
        <CopyText ref={ref} {...others} {...containerProps}>
          <ValueText {...textProps}>{children}</ValueText>
        </CopyText>
      );
    case ValueTypes.MASKED:
      return (
        <MaskedValue
          value={String(children)}
          containerProps={containerProps}
          textProps={textProps}
          iconProps={iconProps}
          iconButtonProps={iconButtonProps}
        />
      );
    case ValueTypes.ELEMENT:
      return children;
    default:
      return <ValueText ref={ref} {...others} {...textProps}>{children}</ValueText>;
  }
});

PairValue.displayName = displayName;

export default PairValue;
