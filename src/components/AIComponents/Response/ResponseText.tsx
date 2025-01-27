import React from 'react';

import { useStatusClasses } from '../../../hooks';
import useTypeAnimation from '../../../hooks/useTypeAnimation/useTypeAnimation';
import { Text } from '../../../index';
import { ResponseTextProps } from '../../../types/response';

const ResponseText = (props: ResponseTextProps) => {
  const {
    delay,
    text,
    shouldStartAnimation,
    setAnimationIndex,
    animationIndex,
    isListItem,
    className,
    ...others
  } = props;
  const animationProps = {
    delay, text, setAnimationIndex, animationIndex, shouldStartAnimation,
  };
  const currentText = useTypeAnimation(animationProps);

  const hasBullet = isListItem && currentText.length > 0;

  const { classNames } = useStatusClasses(className, { hasBullet });

  return (
    <Text {...others} role={isListItem ? 'listitem' : ''} variant="response" className={classNames}>{currentText}</Text>
  );
};

export default ResponseText;
