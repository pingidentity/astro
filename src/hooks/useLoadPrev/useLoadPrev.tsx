import { useCallback, useLayoutEffect, useRef } from 'react';
import { useEvent } from '@react-aria/utils';

const useLoadPrev = (props, ref) => {
  const { isLoading, onLoadPrev, items } = props;

  const isLoadingRef = useRef(isLoading);
  const prevProps = useRef(props);

  const onScroll = useCallback(() => {
    if (ref.current && !isLoadingRef.current && onLoadPrev) {
      const rc = ref.current;
      const shouldLoadPrev = rc.scrollTop === 0;

      if (shouldLoadPrev) {
        isLoadingRef.current = true;
        onLoadPrev();
      }
    }
  }, [onLoadPrev, ref]);

  useLayoutEffect(() => {
    if (props !== prevProps.current) {
      isLoadingRef.current = isLoading;
      prevProps.current = props;
    }
  }, [isLoading, onLoadPrev, props, ref, items]);

  useEvent(ref, 'scroll', onScroll);
};

export default useLoadPrev;
