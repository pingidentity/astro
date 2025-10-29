import { useEffect, useState } from 'react';


interface UseMountTransition {
  /**
   * Allows for css transitions to be applied to components, while mounting or unmounting.
   * @param {Object} [props] Properties provided to the state
   *
   * `props.isMounted`: boolean - Whether the component has been mounted.
   * `props.unmountDelay`: number -  Number value of the length of the transition in ms.
   *
   * @returns {Boolean} `isTransitioning`
   */

  (isMounted: boolean,
  unmountDelay: number,
  ): boolean
}

const useMountTransition : UseMountTransition = (isMounted, unmountDelay) => {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

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
