import React, { Children, useEffect, useState } from 'react';
import AutoAwesomeIcon from '@pingux/mdi-react/AutoAwesomeOutlineIcon';

import { Box, Icon } from '../../../index';
import { ResponseProps } from '../../../types/response';

const Response = (props: ResponseProps) => {
  const {
    children,
    containerProps,
    iconProps,
    iconWrapperProps,
    delay,
  } = props;
  const [index, setIndex] = useState(0);

  const responseChildren = Children.toArray(children);

  return (
    <Box isRow gap="md" {...containerProps}>
      <Box {...iconWrapperProps} variant="response.iconWrapper">
        <Icon
          icon={AutoAwesomeIcon}
          color="text.primary"
          {...iconProps}
        />
      </Box>
      <Box gap="md">
        { Children.map(responseChildren, (child: React.ReactNode, i) => (
          <>
            {React.cloneElement(child as React.ReactElement, {
              shouldStartAnimation: index === i,
              setAnimationIndex: setIndex,
              animationIndex: i,
              parentIndex: index,
              delay,
            }) }
          </>
        ))}
      </Box>
    </Box>
  );
};

export default Response;
