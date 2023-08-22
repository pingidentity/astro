import React, { forwardRef } from 'react';

import { useTShirtSize } from '../../hooks';
import { IconProps, ReactRef } from '../../types';
import Box from '../Box';


const Icon = forwardRef((props: IconProps, ref: ReactRef) => {
  const {
    color,
    icon: IconComponent,
    sx,
  } = props;

  const { sizeProps } = useTShirtSize(props);

  const title = props.title || (typeof IconComponent === 'object' && 'type' in IconComponent
    ? { name: IconComponent.type.name }
    : null
  );

  return (
    <Box
      as={IconComponent}
      ref={ref}
      title={title}
      {...props}
      size={sizeProps.size}
      role="img"
      sx={{
        fill: color,
        minWidth: sizeProps.size,
        ...sx,
      }}
    />
  );
});

Icon.defaultProps = {
  size: 20,
};
Icon.displayName = 'Icon';

export default Icon;
