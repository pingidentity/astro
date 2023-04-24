import { useEffect, useState } from 'react';

/**
 * Allows for css transitions to be applied to components, while mounting or unmounting.
 * @param {Object} [props] Properties provided to the state
 * @param {Boolean} [props.isMounted] Whether the component has been mounted.
 * @param {Number} [props.unmountDelay] Number value of the length of the transition in ms.
 * `(isOpen: boolean) => void`
 * @returns {Boolean} `isTransitioning`
 */

const useMountTransition = (isMounted, unmountDelay) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isMounted && !isTransitioning) {
      setIsTransitioning(true);
    } else if (
      /* istanbul ignore next */
      !isMounted && isTransitioning
    ) {
      /* istanbul ignore next */
      timeoutId = setTimeout(() => setIsTransitioning(false), unmountDelay);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [unmountDelay, isMounted, isTransitioning]);

  return isTransitioning;
};

export default useMountTransition;
