import React, { forwardRef } from 'react';
import { Textarea as RTextArea } from '@rebass/forms';

/**
 * Basic textarea input.
 * Built on top of the [TextArea from Rebass Forms](https://rebassjs.org/forms/textarea) and
 * uses the available [props from Rebass](https://rebassjs.org/props/).
 *
 * **Note: Requires a label. It's recommended to use `TextAreaField` for a complete solution.**
 */

const TextArea = forwardRef((props, ref) => (
  <RTextArea
    ref={ref}
    {...props}
  />
));

TextArea.displayName = 'TextArea';

export default TextArea;
