import React, { Children, useEffect, useState } from 'react';

import { useStatusClasses } from '../../../hooks';
import { Box } from '../../../index';
import { ResponseListProps } from '../../../types/response';

const ResponseList = (props: ResponseListProps) => {
  const [index, setIndex] = useState(-1);
  const {
    children,
    parentIndex,
    setAnimationIndex,
    shouldStartAnimation,
    delay,
    as: asProp = 'ul',
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

  const isNumeric = asProp === 'ol';

  const { classNames } = useStatusClasses('', {
    isNumeric,
  });

  return (
    <Box
      as={asProp}
      variant="response.list"
      className={classNames}
    >
      {Children.map(children,
        (child: React.ReactNode, i) => React.cloneElement(child as React.ReactElement, {
          shouldStartAnimation: index === i,
          setAnimationIndex: setIndex,
          animationIndex: i,
          delay,
          isListItem: React.isValidElement(child) && child.props.as && (child.props.as !== 'p' || child.props.as !== 'span'),
          parentIndex: index,
          as: 'li',
        }),
      )}
    </Box>

  );
};

export default ResponseList;
