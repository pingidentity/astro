import { useMemo } from 'react';

import tShirtSizes from '../../styles/themes/astro/customProperties/tShirtSizes';
import { IconSize } from '../../types';

/**
 * A custom hook which returns the pixel value of a tShirtSize.
 * @param {Object} [props] The props object
 * @param {String | Number} [props.size] The size of the svg container
 * @returns {Object} `{ sizeProps: Object }`
 */

interface UseTShirtSizeProps {
  size?: string | number;
  sizes?: Record<string, string | number>;
}

interface SizeProps {
  size: IconSize
}

const useTShirtSize = ({ size, sizes = tShirtSizes }: UseTShirtSizeProps) => {
  const value = useMemo(() => {
    if (size === undefined) {
      // eslint-disable-next-line no-console
      console.warn('useTShirtSize hook requires a size prop.');
      return undefined;
    }
    return sizes?.[size];
  }, [size, sizes]);

  if (typeof value === 'string' && (value.includes('px') || value.includes('em') || value.includes('rem'))) {
    return { sizeProps: { size: value || size } as SizeProps };
  }

  return { sizeProps: { size: value ? `${value}px` : size } as SizeProps };
};

export default useTShirtSize;
