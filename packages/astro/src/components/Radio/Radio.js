import React, { forwardRef } from 'react';
import { Radio as RRadio } from '@rebass/forms';

/**
 * Basic radio input wrapped in a label.
 * Built on top of the [Radio from Rebass Forms](https://rebassjs.org/forms/radio) and uses the
 * available [props from Rebass](https://rebassjs.org/props/).
 *
 * **Note: Requires a label. It's recommended to use `RadioGroup` with `RadioField` for a**
 * **solution.**
 */
const Radio = forwardRef((props, ref) => (
  <RRadio
    ref={ref}
    {...props}
  />
));

Radio.displayName = 'Radio';

export default Radio;
