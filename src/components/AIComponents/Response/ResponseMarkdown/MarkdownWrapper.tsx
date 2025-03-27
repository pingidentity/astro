import React, { useEffect, useRef } from 'react';

import { useStatusClasses } from '../../../../hooks';
import { Box } from '../../../../index';
import { MarkdownWrapperProps } from '../../../../types/response';

const MarkdownWrapper = (props: MarkdownWrapperProps) => {
  const {
    setAnimationIndex,
    parentIndex,
    className,
    animationIndex,
    shouldStartAnimation,
    ...others
  } = props;

  const isLoaded = useRef(false);

  useEffect(() => {
    if (
      shouldStartAnimation && setAnimationIndex
      && animationIndex !== undefined && isLoaded.current === false) {
      isLoaded.current = true;
      setAnimationIndex(animationIndex + 1);
    }
  }, [setAnimationIndex, parentIndex, animationIndex, shouldStartAnimation]);

  const { classNames } = useStatusClasses(className, { isNotLoaded: !isLoaded.current });

  return (
    <Box {...others} className={classNames} variant="response.markupComplexContainer">
      {props.children}
    </Box>
  );
};

export default MarkdownWrapper;
