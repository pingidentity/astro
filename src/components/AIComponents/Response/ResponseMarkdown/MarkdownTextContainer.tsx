import React, { Children, useEffect, useState } from 'react';

import { useStatusClasses } from '../../../../hooks';
import { MarkdownTextContainerProps } from '../../../../types/response';
import Box from '../../../Box';
import ResponseText from '../ResponseText';

export const checkForJSXChild = children => {
  for (let i = 0; i < children.length; i += 1) {
    if (typeof (children[i]) !== 'string') { return true; }
  }
  return false;
};

const MarkdownTextContainer = (props: MarkdownTextContainerProps) => {
  const [index, setIndex] = useState(-1);
  const {
    children,
    parentIndex,
    setAnimationIndex,
    shouldStartAnimation,
    delay,
    className,
    isListItem,
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

  const hasBullet = index >= 0 && isListItem === true;

  // this is to force the bullets to render correctly in safari.
  const hasRendered = index !== 1 && isListItem === true;
  const hasBlock = index === -1;

  const { classNames } = useStatusClasses(className, { hasBullet, hasRendered, hasBlock });

  const markdownTextChildren = Children.toArray(children);

  const hasNonStringChild = checkForJSXChild(markdownTextChildren);

  return (
    <Box
      className={classNames}
      variant="response.textWrapper"
      as={(hasNonStringChild && as === 'p') ? 'div' : as}
    >
      <Box isRow>
        {Children.map(markdownTextChildren.slice(0, index + 1),
          (child, i) => {
            if (typeof (child) === 'string') {
              return (
                <ResponseText
                  text={child}
                  shouldStartAnimation={index === i}
                  setAnimationIndex={setIndex}
                  animationIndex={i}
                  delay={delay}
                  parentIndex={index}
                />
              );
            }
            return (
              React.cloneElement(child as React.ReactElement, {
                shouldStartAnimation: index === i,
                setAnimationIndex: setIndex,
                animationIndex: i,
                delay,
                parentIndex: index,
              })
            );
          },
        )}
      </Box>
    </Box>

  );
};

export default MarkdownTextContainer;
