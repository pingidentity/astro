import React, { Children, useEffect, useRef, useState } from 'react';

import { useStatusClasses } from '../../../hooks';
import { Box } from '../../../index';
import { ResponseToolbarProps } from '../../../types/response';

const ResponseToolbar = (props: ResponseToolbarProps) => {
  const {
    parentIndex,
    setAnimationIndex,
    children,
    className,
    shouldStartAnimation,
    animationIndex,
    delay,
    ...others
  } = props;


  const isLoaded = useRef(false);

  const [index, setIndex] = useState(-1);

  useEffect(() => {
    if (index === children?.length && animationIndex !== undefined && setAnimationIndex) {
      setAnimationIndex(animationIndex + 1);
    }
  }, [setAnimationIndex, index, shouldStartAnimation, animationIndex, children?.length]);

  useEffect(() => {
    if (
      shouldStartAnimation && setAnimationIndex
      && animationIndex !== undefined && isLoaded.current === false) {
      isLoaded.current = true;
      setIndex(0);
    }
  }, [setAnimationIndex, parentIndex, shouldStartAnimation, animationIndex]);

  const { classNames } = useStatusClasses(className, { isNotLoaded: !isLoaded.current });

  return (
    <Box isRow gap="sm" variant="response.toolbar" className={classNames} {...others}>
      {
        Children.map(children, (child: React.ReactNode, i) => (
          <>
            {React.cloneElement(child as React.ReactElement, {
              setAnimationIndex: setIndex,
              animationIndex: i,
              parentIndex: index,
              delay,
            }) }
          </>
        ))
          }
    </Box>
  );
};

export default ResponseToolbar;
