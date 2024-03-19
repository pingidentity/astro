import React, { forwardRef } from 'react';
import ContentCopy from '@pingux/mdi-react/ContentCopyIcon';

import { CopyButtonProps } from '../../types';
import Icon from '../Icon';
import IconButton from '../IconButton';

const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>((props, ref) => {
  const { iconProps, ...others } = props;
  return (
    <IconButton ref={ref} aria-label="copy to clipboard" variant="copyButton" {...others}>
      <Icon icon={ContentCopy} size="xs" color="text.secondary" title={{ name: 'Content Copy Icon' }} {...iconProps} />
    </IconButton>
  );
});

export default CopyButton;
