import React, { forwardRef } from 'react';
import { Checkbox as ThemeUICheckbox } from 'theme-ui';

/**
 * Basic checkbox input.
 * Built on top of the [Checkbox from Theme-UI](hhttps://theme-ui.com/components/checkbox/).
 *
 * **Note: Requires a label. It's recommended to use `CheckboxField` for a complete solution.**
 */
const Checkbox = forwardRef((props, ref) => (
  <ThemeUICheckbox
    ref={ref}
    __css={{ top: 0, left: 0 }}
    {...props}
  />
));

Checkbox.displayName = 'Checkbox';

export default Checkbox;
