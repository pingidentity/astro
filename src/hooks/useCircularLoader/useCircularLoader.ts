import { LoaderSize } from '../../types';
import useTShirtSize from '../useTShirtSize';

interface UseCircularLoaderProps {
   size?: LoaderSize;
   mode?: string,
   progress?: number,
   isAstro: boolean,
   defaultLoaderSize: number,
}

export const circularSizes = {
  'sm': 16,
  'md': 24,
  'lg': 32,
};

const useCircularLoader = (props: UseCircularLoaderProps) => {
  const { mode, size, isAstro, defaultLoaderSize, progress = 75, ...others } = props;
  const { sizeProps } = useTShirtSize({ size: size || defaultLoaderSize, sizes: circularSizes });

  if (mode === 'dots' || isAstro) {
    return {
      size: size || defaultLoaderSize,
      isCircle: false,
      radius: 0,
      center: 0,
      strokeWidth: 0,
      dashLength: 0,
      gapLength: 0,
      ...others,
    };
  }

  const parsedSize = parseInt(sizeProps.size as string, 10);
  const actualSize = parsedSize * (10 / 12);

  const strokeWidth = (parsedSize - actualSize) / 2;

  // Calculate the radius, considering the strokeWidth to fit within the given size
  const radius = (actualSize - strokeWidth) / 2;

  // Center of the circle
  const center = actualSize / 2;

  // Calculate the circumference
  const circumference = 2 * Math.PI * radius;

  // Calculate the dash and gap lengths for the progress
  const dashLength = (progress / 100) * circumference;
  const gapLength = circumference;

  return {
    center,
    isCircle: true,
    radius,
    strokeWidth,
    dashLength,
    gapLength,
    size: actualSize,
    ...others,
  };
};

export default useCircularLoader;
