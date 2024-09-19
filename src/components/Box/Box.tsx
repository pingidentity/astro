import React, { forwardRef, useMemo } from 'react';
import styled from '@emotion/styled';
import { toNumber } from 'lodash';
import { flexbox, layout, typography } from 'styled-system';
import { Box as ThemeUIBox } from 'theme-ui';

import { usePropWarning, useStatusClasses } from '../../hooks';
import { BoxProps } from '../../types';

const ExtendedBox = styled(ThemeUIBox)(
  layout,
  flexbox,
  typography,
);

const Box = forwardRef<HTMLElement, BoxProps>((props, ref) => {
  const {
    as = 'div',
    flexDirection,
    gap,
    isRow = false,
    isDisabled = false,
    className,
    fontSize,
    sx,
    ...others
  } = props;
  const fd = flexDirection || isRow ? 'row' : 'column';
  const custom = { ...sx };

  const { classNames } = useStatusClasses(className, { isDisabled });
  usePropWarning(props, 'disabled', 'isDisabled');

  if (gap) {
    custom['& > * + *:not(:first-of-type:not(style):not(:first-of-type ~ *))'] = {
      [fd === 'row' ? 'marginLeft' : 'marginTop']: gap,
    };
  }

  const customFontSize = useMemo(() => {
    const numericalFontSize = toNumber(fontSize);
    if (Number.isNaN(numericalFontSize)) {
      return fontSize;
    }
    return numericalFontSize;
  }, [fontSize]);

  return (
    <ExtendedBox
      className={classNames}
      ref={ref}
      display="flex"
      flexDirection={fd}
      variant="box.base"
      fontSize={customFontSize}
      as={as}
      {...others}
      sx={custom}
    />
  );
});

Box.displayName = 'Box';

export default Box;
