import { useEffect, useState } from 'react';

const useTypeAnimation = (
  { shouldStartAnimation, text, delay, setAnimationIndex, animationIndex }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (shouldStartAnimation && text && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
    if (text && currentIndex === text.length) {
      setAnimationIndex(animationIndex + 1);
    }
    return () => null;
  }, [currentIndex, delay, text, shouldStartAnimation, setAnimationIndex, animationIndex]);

  return {
    currentText,
  };
};

export default useTypeAnimation;
