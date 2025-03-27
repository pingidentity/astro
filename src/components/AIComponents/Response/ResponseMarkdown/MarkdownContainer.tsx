import React, { Children, useContext } from 'react';

import { MarkdownContainerProps } from '../../../../types/response';
import Box from '../../../Box';

import MarkdownTextWrapper from './MarkdownTextWrapper';
import { ResponseMarkdownContext } from './ResponseMarkdown';

const blockElements = [
  'div',
  'ul',
  'ol',
];

const checkContainsBlocks = containerChildren => {
  for (let i = 0; i < containerChildren.length; i += 1) {
    if (blockElements.includes(containerChildren[i]?.props?.as)) {
      return true;
    }
  }
  return false;
};

const MarkdownContainer = (props: MarkdownContainerProps) => {
  const {
    children,
    ...others
  } = props;

  const {
    setAnimationIndex,
    stateIndex,
    delay,
  } = useContext(ResponseMarkdownContext);

  const containerChildren = Children.toArray(children);

  const containsBlocks = checkContainsBlocks(containerChildren);

  if (containsBlocks) {
    return (
      <Box {...others}>
        {Children.map(containerChildren,
          (child: React.ReactNode, i) => {
            return (
              React.cloneElement(child as React.ReactElement, {
                animationIndex: i,
                isTopLevel: true,
                isListItem: false,
                parentIndex: stateIndex,
                stateIndex,
              })
            );
          },
        )}
      </Box>
    );
  }

  return (
    <Box {...others}>
      <MarkdownTextWrapper
        animationIndex={0}
        isTopLevel
        delay={delay}
        setAnimationIndex={setAnimationIndex}
        parentIndex={stateIndex}
        stateIndex={stateIndex}
        isListItem={false}
      >
        {containerChildren}
      </MarkdownTextWrapper>
    </Box>
  );
};

export default MarkdownContainer;
