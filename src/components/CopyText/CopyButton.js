import React, { forwardRef } from 'react';
import ContentCopy from 'mdi-react/ContentCopyIcon';

import Icon from '../Icon';
import IconButton from '../IconButton';

const CopyButton = forwardRef((props, ref) => (
  <IconButton ref={ref} aria-label="copy" variant="buttons.copy" {...props}>
    <Icon icon={ContentCopy} size={15} />
  </IconButton>
));

export default CopyButton;
