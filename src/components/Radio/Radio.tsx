import React, { forwardRef } from 'react';
import { Radio as ThemeUIRadio } from 'theme-ui';

import { RadioProps } from '../../types/radio';
/**
 * Basic radio input wrapped in a label.
 * Built on top of the [Radio from Theme-UI](https://theme-ui.com/components/radio/) and uses the
 * available [props from Theme-UI](https://theme-ui.com/sx-prop).
 *
 * **Note: Requires a label. It's recommended to use `RadioGroupField` with `RadioField` for a**
 * **solution.**
 */
const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => (
  <ThemeUIRadio
    ref={ref}
    {...props}
  />
));

Radio.displayName = 'Radio';

export default Radio;
