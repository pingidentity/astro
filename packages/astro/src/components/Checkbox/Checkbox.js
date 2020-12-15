import React, { forwardRef } from 'react';
import { Checkbox as RCheckbox } from '@rebass/forms';

/**
 * Basic checkbox input.
 * Built on top of the [Checkbox from Rebass Forms](https://rebassjs.org/forms/checkbox) and
 * uses the available [props from Rebass](https://rebassjs.org/props/).
 *
 * **Note: Requires a label. It's recommended to use `CheckboxField` for a complete solution.**
 */
const Checkbox = forwardRef((props, ref) => (
  <RCheckbox
    ref={ref}
    __css={{ top: 0, left: 0 }}
    {...props}
  />
));

Checkbox.displayName = 'Checkbox';

export default Checkbox;
