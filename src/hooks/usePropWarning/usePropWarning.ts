import { useEffect } from 'react';

const alreadyShown = new Set();

interface UsePropWarning {
  /**
   * Provides a development-only console warning for props that we don't want consumers to use
   * @param {Object} props - The whole props object
   * @param {String} propToWarn - Specify prop to warn not to use
   * @param {String} propToUse - Specify prop that should be used instead
   * @param {Boolean} [allowDuplicates] - If allow duplicate warning messages
   */
  (
    props: React.ComponentProps<React.ComponentType>,
    propToWarn: string,
    propToUse: string,
    allowDuplicates?: boolean
  ): void
}


const usePropWarning: UsePropWarning = (props, propToWarn, propToUse, allowDuplicates) => {
  useEffect(() => {
    if (!allowDuplicates && alreadyShown.has(propToWarn)) {
      return;
    }

    if (props[propToWarn] !== undefined && process.env.NODE_ENV === 'development') {
      alreadyShown.add(propToWarn);
      // eslint-disable-next-line no-console
      console.warn(
        `The prop ${propToWarn} should not be used, please use ${propToUse} instead`,
        '\n',
        '\n',
        'NOTE: This is a development-only warning and will not display in production.',
      );
    }
  }, []);
};

export default usePropWarning;
