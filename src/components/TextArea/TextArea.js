import React, { forwardRef } from 'react';
import { Textarea as ThemeUITextArea } from 'theme-ui';
/**
 * Basic textarea input.
 * Built on top of the [TextArea from Theme-UI Forms](https://theme-ui.com/components/textarea and
 * uses the available [props from Theme-UI](https://theme-ui.com/sx-prop).
 *
 * **Note: Requires a label. It's recommended to use `TextAreaField` for a complete solution.**
 */

const TextArea = forwardRef((props, ref) => (

  <ThemeUITextArea
    ref={ref}
    // this requires to fix safari resizing issue (UIP-4995)
    sx={{ position: 'relative' }}
    {...props}
  />
));


TextArea.displayName = 'TextArea';

export default TextArea;
