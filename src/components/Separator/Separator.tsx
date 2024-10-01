import React, { forwardRef } from 'react';
import { useSeparator } from 'react-aria';

import { useStatusClasses } from '../../hooks';
import { SeparatorProps } from '../../types';
import ORIENTATION from '../../utils/devUtils/constants/orientation';
import Box from '../Box/Box';

const Separator = forwardRef<HTMLElement, SeparatorProps>((props, ref) => {
  const { className, orientation, ...others } = props;
  const { separatorProps } = useSeparator(props);
  const { classNames } = useStatusClasses(className, {
    'is-vertical': orientation === ORIENTATION.VERTICAL,
    'is-horizontal': orientation === ORIENTATION.HORIZONTAL,
  });

  return (
    <Box
      ref={ref}
      className={classNames}
      variant="separator.base"
      {...others}
      {...separatorProps}
    />
  );
});

Separator.defaultProps = {
  orientation: 'horizontal',
};

Separator.displayName = 'Separator';

export default Separator;
