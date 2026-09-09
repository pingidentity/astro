import React, { forwardRef } from 'react';
import ContentCopy from '@pingux/mdi-react/ContentCopyIcon';

import { useGetTheme } from '../../hooks';
import { CopyButtonProps } from '../../types';
import Icon from '../Icon';
import IconButton from '../IconButton';

const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>((props, ref) => {
  /* istanbul ignore next */
  const { iconProps, variant = 'default', ...others } = props;
  const { copyButtonSize, themeState } = useGetTheme();
  /* istanbul ignore next */
  const themeVariant = !themeState.isOnyxDark ? 'copyButton' : `copyButton.${variant}`;

  return (
    <IconButton
      ref={ref}
      aria-label="copy to clipboard"
      variant={themeVariant}
      {...others}
    >
      <Icon icon={ContentCopy} size={copyButtonSize} title={{ name: 'Content Copy Icon' }} {...iconProps} />
    </IconButton>
  );
});

export default CopyButton;
