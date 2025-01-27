import React, { useEffect, useRef } from 'react';
import CopyIcon from '@pingux/mdi-react/ContentCopyIcon';
import TextIcon from '@pingux/mdi-react/TextIcon';
import ThumbDownOutlineIcon from '@pingux/mdi-react/ThumbDownOutlineIcon';
import ThumbUpOutlineIcon from '@pingux/mdi-react/ThumbUpOutlineIcon';
import VolumeHighIcon from '@pingux/mdi-react/VolumeHighIcon';

import { useStatusClasses } from '../../../hooks';
import { Box, Icon, IconButton, IconButtonProps } from '../../../index';
import { ResponseToolbarProps } from '../../../types/response';

const ResponseToolbarIcon = (props: IconButtonProps) => {
  const {
    title,
    icon,
  } = props;
  return (
    <IconButton title={title}>
      <Icon icon={icon} title={{ name: title as string }} />
    </IconButton>
  );
};

const ResponseToolbar = (props: ResponseToolbarProps) => {
  const {
    parentIndex,
    setAnimationIndex,
    readButtonProps,
    copyButtonProps,
    goodButtonProps,
    badButtonProps,
    rephraseButtonProps,
    className,
    shouldStartAnimation,
    animationIndex,
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
  }, [setAnimationIndex, parentIndex, shouldStartAnimation, animationIndex]);

  const { classNames } = useStatusClasses(className, { isNotLoaded: !isLoaded.current });

  return (
    <Box isRow gap="sm" variant="response.toolbar" className={classNames} {...others}>
      {readButtonProps?.title && (
      <ResponseToolbarIcon
        icon={VolumeHighIcon}
        {...readButtonProps}
      />
      )}
      {copyButtonProps?.title && (
      <ResponseToolbarIcon
        icon={CopyIcon}
        {...copyButtonProps}
      />
      )}
      {goodButtonProps?.title && (
      <ResponseToolbarIcon
        icon={ThumbUpOutlineIcon}
        {...goodButtonProps}
      />
      )}
      {badButtonProps?.title && (
      <ResponseToolbarIcon
        icon={ThumbDownOutlineIcon}
        {...badButtonProps}
      />
      )}
      { rephraseButtonProps?.title && (
      <ResponseToolbarIcon
        icon={TextIcon}
        {...rephraseButtonProps}
      />
      )}
    </Box>
  );
};

export default ResponseToolbar;
