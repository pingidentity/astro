import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { flexbox, layout } from 'styled-system';
import { Label as ThemeUILabel } from 'theme-ui';

import { usePropWarning, useStatusClasses } from '../../hooks';
import { LabelModeProps, LabelProps } from '../../types';
import { modes } from '../../utils/devUtils/constants/labelModes';
import Box from '../Box';
import HelpHint from '../HelpHint';

const ExtendedLabel = styled(ThemeUILabel)(layout, flexbox);

const defaultIndicator = (
  <Box variant="forms.label.indicator">
    *
  </Box>
);

/**
 * Base label for an input.
 *
 * Accepts most of the styling props from [styled-system](https://styled-system.com/table).
 * Built on top of the [Label from Theme-UI](https://theme-ui.com/components/label).
 *
 * **NOTE**: Specialized field components contain built-in support for labels. It's
 * recommended to use those instead of a standalone `Label`.
 */

const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const {
    children,
    className,
    isDisabled,
    isRequired,
    mode = modes.DEFAULT as LabelModeProps,
    requiredIndicator,
    hintText,
    helpHintProps,
    ...others
  } = props;

  usePropWarning(props, 'disabled', 'isDisabled');

  const { classNames } = useStatusClasses(className, {
    isDisabled,
    isRequired,
    isFloatLabel: mode === modes.FLOAT,
    isLeftLabel: mode === modes.LEFT,
  });

  return (
    <ExtendedLabel
      ref={ref}
      display="flex"
      className={classNames}
      {...others}
    >
      {children}
      {
        isRequired
        && (requiredIndicator || defaultIndicator)
      }
      {
        hintText
        && <HelpHint {...helpHintProps}>{hintText}</HelpHint>
      }
    </ExtendedLabel>
  );
});

Label.displayName = 'Label';
export default Label;
