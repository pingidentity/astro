import React from 'react';

import useTypeAnimationWrapper from '../../../../hooks/useTypeAnimationWrapper';
import { MarkdownTextWrapperProps } from '../../../../types/response';
import ResponseText from '../ResponseText';

import MarkdownTextContainer from './MarkdownTextContainer';
import ResponseListItem from './ResponseListItem';

const MarkdownTextWrapper = (props: MarkdownTextWrapperProps) => {
  const {
    as,
    children,
    isTopLevel,
    stateIndex,
    isListItem,
    parentIndex,
    ...others
  } = props;

  const {
    shouldStart,
    hasList,
  } = useTypeAnimationWrapper({ ...props });

  if (hasList) {
    return (<ResponseListItem {...props} shouldStartAnimation={shouldStart} />);
  }

  if (children && children.length > 1) {
    return (
      <MarkdownTextContainer
        {...props}
        shouldStartAnimation={shouldStart}
        parentIndex={isTopLevel ? stateIndex : parentIndex}
        setAnimationIndex={props.setAnimationIndex}
      >
        {children}
      </MarkdownTextContainer>
    );
  }
  if (typeof (children[0]) === 'string') {
    return (
      <ResponseText
        {...others}
        as={as}
        isListItem={isListItem}
        shouldStartAnimation={shouldStart}
        parentIndex={isTopLevel ? stateIndex : parentIndex}
        text={children[0]}
      />
    );
  }
  return null;
};

export default MarkdownTextWrapper;
