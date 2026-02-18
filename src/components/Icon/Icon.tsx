import React, { forwardRef } from 'react';

import { IconProps } from '../../types';

import IconDefault from './IconDefault';
import IconSymbol from './IconSymbol';

const Icon = forwardRef<HTMLElement, IconProps>((props, ref) => {
  const { icon } = props;

  if (typeof icon === 'string') {
    return (<IconSymbol {...props} ref={ref} />);
  }

  return <IconDefault {...props} ref={ref} />;
});


export default Icon;
