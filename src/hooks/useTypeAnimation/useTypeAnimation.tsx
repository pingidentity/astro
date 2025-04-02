import React, { useEffect, useState } from 'react';

const useTypeAnimation = (
  { shouldStartAnimation, text, delay, setAnimationIndex, animationIndex }) => {
  const [splitText, setSplitText] = useState(text.split(' '));
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (shouldStartAnimation && currentIndex < 0) {
      setCurrentIndex(0);
    }
  }, [shouldStartAnimation, currentIndex]);


  useEffect(() => {
    if (shouldStartAnimation && text && currentIndex < splitText.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
    if (splitText && currentIndex === splitText.length) {
      setAnimationIndex(animationIndex + 1);
    }
    return () => null;
  }, [currentIndex, delay, text, shouldStartAnimation, setAnimationIndex, animationIndex]);

  useEffect(() => {
    if (splitText.length > 0 && currentIndex > 0 && currentIndex < splitText.length) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [splitText, text, currentIndex]);

  const indexOrNothing = Math.max(currentIndex, 0);

  return {
    currentText: splitText.slice(0, indexOrNothing).join(' '),
    isLoading,
  };
};

export default useTypeAnimation;
