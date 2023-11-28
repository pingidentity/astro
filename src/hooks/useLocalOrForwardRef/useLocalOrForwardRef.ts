import { useImperativeHandle, useRef } from 'react';

/**
 * Accepts a forwardRef as a parameter and combines it with a
 * local ref, incase the forwarded wasn't provided
 */
const useLocalOrForwardRef = <T>(forwardRef: React.Ref<T>) => {
  const localRef = useRef({} as T);
  useImperativeHandle(forwardRef, () => localRef.current as T);

  return localRef;
};

export default useLocalOrForwardRef;
