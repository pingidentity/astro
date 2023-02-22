import { useMemo } from 'react';

import { tShirtSizes } from '../../utils/devUtils/constants/tShirtSizes';

/**
 * A custom hook which returns the pixel value of a tShirtSize.
 * @param {Object} [props] The props object
 * @param {String} [props.size] The size of the svg container
 * @returns {Object} `{ sizeProps: Object }`
 */

const useTShirtSize = ({ size }) => {
  const value = useMemo(() => {
    if (size === undefined) {
      // eslint-disable-next-line no-console
      console.warn('useTShirtSize hook requires a size prop.');
      return undefined;
    }
    return tShirtSizes?.[size];
  }, [size]);

  const sizeProps = { size: value ? `${value}px` : size };
  return { sizeProps };
};

export default useTShirtSize;
