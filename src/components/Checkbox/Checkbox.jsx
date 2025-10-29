import React, { forwardRef } from 'react';

import CheckboxBase from './CheckboxBase';

/**
 * Basic checkbox input.
 * Built on top of the [Checkbox from Theme-UI](https://theme-ui.com/components/checkbox/).
 *
 * **Note: Requires a label. It's recommended to use `CheckboxField` for a complete solution.**
 */
const Checkbox = forwardRef((props, ref) => <CheckboxBase ref={ref} {...props} />);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
