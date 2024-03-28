import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { flexbox, layout, typography } from 'styled-system';
import { Input as ThemeUIInput } from 'theme-ui';

import { InputProps } from '../../types';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
/**
 * Base input component.
 *
 * Accepts relevant styling props from [styled-system](https://styled-system.com/table).
 * Built on top of [Input from Theme-UI](https://theme-ui.com/components/input/).
 *
 * **Note**: This component does not supply all of the accessibility assistance on its own.
 * We instead encourage developers to utilize our Field components wherever possible.
 * If this component is used, accessibility is left to the developer.
 */

const displayName = 'Input';

const ExtendedInput = styled(ThemeUIInput)(
  layout,
  flexbox,
  typography,
);

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { name, placeholder, maxLength, ...others } = props;

  return (
    <ExtendedInput
      ref={ref}
      name={name}
      placeholder={placeholder}
      maxLength={maxLength && maxLength}
      {...getPendoID(displayName)}
      {...others}
    />
  );
});

Input.displayName = displayName;

export default Input;
