import { useEffect, useRef, useState } from 'react';

import loadingStates from '../../utils/devUtils/constants/loadingStates';

interface UseInputLoaderProps {
  loadingState: string; // Should match the type of `loadingStates` keys
  inputValue: string; // The current value of the input field
}

interface UseInputLoaderReturn {
  isLoading: boolean; // Indicates whether the loading indicator should be shown
}

const useInputLoader = ({
  loadingState,
  inputValue,
}: UseInputLoaderProps): UseInputLoaderReturn => {
  // START - minimum delay time for loading indicator = 500ms
  const [isLoadingState, setIsLoading] = useState(false);
  const isLoading = loadingState === loadingStates.LOADING
    || loadingState === loadingStates.FILTERING;

  const lastInputValue = useRef<string>(inputValue);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading && !isLoadingState) {
      if (timeout.current === null) {
        timeout.current = setTimeout(() => {
          setIsLoading(true);
        }, 500);
      }

      // If user is typing, clear the timer and restart since it is a new request
      if (inputValue !== lastInputValue.current) {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          setIsLoading(true);
        }, 500);
      }
    } else if (!isLoading) {
      // If loading is no longer happening, clear any timers and hide the loader
      setIsLoading(false);
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    }

    lastInputValue.current = inputValue;
  }, [isLoading, isLoadingState, inputValue]);

  return {
    isLoading: isLoadingState,
  };
  // END - minimum delay time for loading indicator = 500ms
};

export default useInputLoader;
