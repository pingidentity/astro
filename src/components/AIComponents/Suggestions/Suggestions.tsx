import React, { Children } from 'react';

import { useStatusClasses } from '../../../hooks';
import { Box } from '../../../index';
import { SuggestionsProps } from '../../../types/suggestions';

const Suggestions = (props: SuggestionsProps) => {
  const {
    children,
    isFullScreen,
    className,
    ...others
  } = props;

  const { classNames } = useStatusClasses(className, { isFullScreen });
  return (
    <Box {...others} className={classNames} isRow={isFullScreen} variant="suggestions">
      {Children.map(children, (child: React.ReactNode) => (
        <>
          {React.cloneElement(child as React.ReactElement, {
            isFullScreen,
          })}
        </>
      ))}
    </Box>
  );
};

export default Suggestions;
