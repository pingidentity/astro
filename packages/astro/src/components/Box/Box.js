import React, { forwardRef, useMemo } from 'react';
import styled from '@emotion/styled';
import { propType as stylePropType } from '@styled-system/prop-types';
import { toNumber } from 'lodash';
import PropTypes from 'prop-types';
import { flexbox, layout, typography } from 'styled-system';
import { Box as ThemeUIBox } from 'theme-ui';

import { usePropWarning, useStatusClasses } from '../../hooks';

const ExtendedBox = styled(ThemeUIBox)(layout, flexbox, typography);

const Box = forwardRef((props, ref) => {
  const {
    flexDirection, // eslint-disable-line
    gap,
    isRow,
    isDisabled,
    className,
    fontSize,
    sx, // eslint-disable-line
    ...others
  } = props;
  const fd = flexDirection || isRow ? 'row' : 'column';
  const custom = { ...sx };

  const { classNames } = useStatusClasses(className, { isDisabled });
  usePropWarning(props, 'disabled', 'isDisabled');

  if (gap) {
    custom['& > * + *:not(:first-child) /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */'] = {
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
      {...others}
      sx={custom}
    />
  );
});

Box.propTypes = {
  /** The background color of the box. */
  bg: PropTypes.string,
  /** Whether the box is disabled. */
  isDisabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  /** The base HTML tag name or React component type to render */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  /** When true, display as a row rather than a column. */
  isRow: PropTypes.bool,
  /** Gap between items, whether in a row or column. */
  gap: stylePropType,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Box.defaultProps = {
  as: 'div',
  isRow: false,
  isDisabled: false,
};

Box.displayName = 'Box';

export default Box;
