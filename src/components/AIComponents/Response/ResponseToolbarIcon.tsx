import React, { useEffect, useRef } from 'react';

import { useStatusClasses } from '../../../hooks';
import { Icon, IconButton } from '../../../index';
import { ResponseToolbarIconProps } from '../../../types/response';

const ResponseToolbarIcon = (props: ResponseToolbarIconProps) => {
  const {
    title,
    icon,
    className,
    parentIndex,
    animationIndex,
    setAnimationIndex,
    delay,
    iconProps,
    ...others
  } = props;

  const isLoaded = useRef(false);

  useEffect(() => {
    if (parentIndex === animationIndex && setAnimationIndex && parentIndex !== undefined) {
      setTimeout(() => {
        isLoaded.current = true;
        setAnimationIndex(parentIndex + 1);
      }, delay);
    }
  }, [parentIndex, animationIndex, setAnimationIndex, delay]);

  const { classNames } = useStatusClasses(className, { isNotLoaded: !isLoaded.current });

  return (
    <IconButton title={title} className={classNames} variant="responseToolbar" {...others}>
      <Icon icon={icon} title={{ name: title as string }} {...iconProps} />
    </IconButton>
  );
};

export default ResponseToolbarIcon;
