import React, { useEffect, useState } from 'react';


const useTypeAnimationWrapper = props => {
  const {
    animationIndex,
    stateIndex,
    isTopLevel,
    shouldStartAnimation,
    children,
  } = props;
  const [shouldStart, setShouldStart] = useState(false);
  const [hasList, setHasList] = useState(false);

  useEffect(() => {
    const shouldSetShouldStart = (animationIndex === stateIndex && isTopLevel)
    || shouldStartAnimation === true;

    if (shouldSetShouldStart) {
      setShouldStart(true);
    } else {
      setShouldStart(false);
    }
  }, [animationIndex, stateIndex, isTopLevel, shouldStartAnimation]);

  useEffect(() => {
    if (!children || children.length < 0) return;

    for (let i = 0; i < children.length; i += 1) {
      if (children[i]?.props && (children[i].props.as === 'ul' || children[i].props.as === 'ol')) {
        setHasList(true);
      }
    }
  }, [children]);

  return {
    shouldStart,
    hasList,
  };
};


export default useTypeAnimationWrapper;
