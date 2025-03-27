import React, { Children, useEffect, useState } from 'react';

import { Box } from '../../../../index';
import { ResponseListItemProps } from '../../../../types/response';

const ResponseListItem = (props: ResponseListItemProps) => {
  const [index, setIndex] = useState(-1);
  const {
    children,
    parentIndex,
    setAnimationIndex,
    shouldStartAnimation,
    delay,
    as,
  } = props;

  useEffect(() => {
    if (children && setAnimationIndex && index === children.length && parentIndex !== undefined) {
      setAnimationIndex(parentIndex + 1);
    }
  }, [index]);

  useEffect(() => {
    if (shouldStartAnimation) {
      setIndex(0);
    }
  }, [shouldStartAnimation]);

  return (
    <Box as={as}>
      {Children.map(children.slice(0, 1),
        (child: React.ReactNode, i) => React.cloneElement(child as React.ReactElement, {
          shouldStartAnimation: index === i,
          setAnimationIndex: setIndex,
          animationIndex: i,
          delay,
          isListItem: true,
          parentIndex: index,
        }),
      )}
      {Children.map(children.slice(1, children.length),
        (child: React.ReactNode, i) => React.cloneElement(child as React.ReactElement, {
          shouldStartAnimation: index === i + 1,
          setAnimationIndex: setIndex,
          animationIndex: i + 1,
          delay,
          isListItem: true,
          parentIndex: index,
        }),
      )}
    </Box>
  );
};

export default ResponseListItem;
