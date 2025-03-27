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
    as: asProp,
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
      sx={{ pl: 'md', listStyleType: 'disc', listStylePosition: 'inside' }}
    >
      {Children.map(children,
        (child: React.ReactNode, i) => React.cloneElement(child as React.ReactElement, {
          shouldStartAnimation: index === i,
          setAnimationIndex: setIndex,
          animationIndex: i,
          delay,
          isListItem: React.isValidElement(child) && child.props.as && child.props.as !== 'p',
          parentIndex: index,
          as: 'li',
        }),
      )}
    </Box>

  );
};

export default ResponseList;
