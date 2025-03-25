import React, { useEffect, useRef } from 'react';
import FileTableOutlineIcon from '@pingux/mdi-react/FileTableOutlineIcon';

import { useStatusClasses } from '../../../hooks';
import { Box, Icon, Text } from '../../../index';
import { ResponseAttachmentProps } from '../../../types/response';

const ResponseAttachment = (props: ResponseAttachmentProps) => {
  const {
    setAnimationIndex,
    parentIndex,
    wrapperProps,
    textProps,
    iconProps,
    className,
    animationIndex,
    shouldStartAnimation,
    text,
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
    <Box isRow {...wrapperProps} className={classNames} variant="response.attachmentWrapper">
      <Icon color="green" icon={FileTableOutlineIcon} title={{ name: 'attachment icon' }} {...iconProps} />
      <Text {...textProps}>{text}</Text>
    </Box>
  );
};

export default ResponseAttachment;
