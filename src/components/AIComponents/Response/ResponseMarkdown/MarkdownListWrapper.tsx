import React from 'react';

import useTypeAnimationWrapper from '../../../../hooks/useTypeAnimationWrapper/useTypeAnimationWrapper';
import { MarkdownListWrapperProps } from '../../../../types/response';
import ResponseList from '../ResponseList';

const MarkdownListWrapper = (props: MarkdownListWrapperProps) => {
  const {
    isTopLevel,
    stateIndex,
    parentIndex,
    children,
  } = props;

  const {
    shouldStart,
  } = useTypeAnimationWrapper({ ...props });

  return (
    <ResponseList
      {...props}
      parentIndex={isTopLevel ? stateIndex : parentIndex}
      shouldStartAnimation={shouldStart}
    >
      {children}
    </ResponseList>
  );
};

export default MarkdownListWrapper;
