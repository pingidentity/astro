import React, { Children, useState } from 'react';
import AutoAwesomeIcon from '@pingux/mdi-react/AutoAwesomeOutlineIcon';

import { Box, Icon } from '../../../index';
import { ResponseProps } from '../../../types/response';

const Response = (props: ResponseProps) => {
  const {
    children,
    containerProps,
    iconProps,
    iconWrapperProps,
    delay = 10,
  } = props;
  const [index, setIndex] = useState(0);

  return (
    <Box isRow gap="md" {...containerProps}>
      <Box {...iconWrapperProps} variant="response.iconWrapper">
        <Icon
          icon={AutoAwesomeIcon}
          {...iconProps}
        />
      </Box>
      <Box gap="md">
        {
        Children.map(children, (child: React.ReactNode, i) => (
          <>
            {React.cloneElement(child as React.ReactElement, {
              shouldStartAnimation: index === i,
              setAnimationIndex: setIndex,
              animationIndex: i,
              parentIndex: index,
              delay,
            }) }
          </>
        ))
          }
      </Box>
    </Box>
  );
};

export default Response;
