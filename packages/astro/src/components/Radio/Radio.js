import React, { forwardRef } from 'react';
import { Radio as ThemeUIRadio } from 'theme-ui';

/**
 * Basic radio input wrapped in a label.
 * Built on top of the [Radio from Theme-UI](https://theme-ui.com/components/radio/o) and uses the
 * available [props from Rebass](https://rebassjs.org/props/).
 *
 * **Note: Requires a label. It's recommended to use `RadioGroupField` with `RadioField` for a**
 * **solution.**
 */
const Radio = forwardRef((props, ref) => (
  <ThemeUIRadio
    ref={ref}
    {...props}
  />
));

Radio.displayName = 'Radio';

export default Radio;
