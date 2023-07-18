import { useMemo } from 'react';

/**
 * Returns integer or absolute value for screen reader announcement.
*/

const useHiddenNumberFieldValue = ({ numberValue, isCurrency }) => useMemo(() => {
  if (!numberValue) return '';

  if (!isCurrency) return numberValue;

  return Math.abs(numberValue);
}, [numberValue, isCurrency]);

export default useHiddenNumberFieldValue;
