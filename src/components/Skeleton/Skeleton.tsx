import React, { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useResizeObserver } from '@react-aria/utils';

import { useLocalOrForwardRef, useStatusClasses } from '../../hooks';
import { SkeletonProps } from '../../types';
import Box from '../Box/Box';

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
  const { children, className, variant, fontSize, sx, animation, ...others } = props;

  const skeletonRef = useLocalOrForwardRef<HTMLDivElement>(ref);
  const childrenRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const hasChildren = React.Children.count(children) > 0;

  const onResize = useCallback(() => {
    if (childrenRef.current) {
      const { offsetWidth, offsetHeight } = childrenRef.current;
      if (offsetWidth > 0 && offsetHeight > 0) {
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    }
  }, []);

  useResizeObserver({
    ref: childrenRef,
    onResize,
  });

  useLayoutEffect(onResize, [onResize]);

  useEffect(() => {
    if (childrenRef.current) {
      const { offsetWidth, offsetHeight } = childrenRef.current;
      setDimensions({
        width: offsetWidth,
        height: offsetHeight,
      });
    }
  }, []);

  const { classNames } = useStatusClasses(className, {
    isPulsate: animation === 'pulsate',
  });

  const inferrerDimensions = hasChildren ? {
    width: dimensions.width > 0 ? `${dimensions.width}px` : 'auto',
    height: dimensions.height > 0 ? `${dimensions.height}px` : 'auto',
  } : {};

  const styleObj = {
    ...sx,
    height: variant === 'text' && fontSize ? fontSize : undefined,
    ...inferrerDimensions,
  };

  const renderedChildren = () => {
    if (hasChildren) {
      const childProps = {
        ref: childrenRef,
        style: { visibility: 'hidden' },
      };

      const childWithRefProp = (child: React.ReactElement) => React.cloneElement(child, childProps);

      return React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return childWithRefProp(child);
        }
        return child;
      });
    }
    return undefined;
  };

  return (
    <Box
      ref={skeletonRef}
      className={classNames}
      variant={variant && `skeleton.${variant}`}
      sx={styleObj}
      {...others}
    >
      {renderedChildren()}
    </Box>
  );
});

Skeleton.defaultProps = {
  variant: 'text',
  animation: 'pulsate',
};

Skeleton.displayName = 'Skeleton';

export default Skeleton;
