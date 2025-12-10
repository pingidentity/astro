import { useEffect } from 'react';

const alreadyShown: Set<string> = new Set();

interface Options {
  onlyOnce?: boolean,
  isActive?: boolean,
}

interface UseDeprecationWarning {
  /**
   * Provides a development-only console warning on component mount.
   *
   * `text:`The deprecation warning text. It should describe what is being deprecated,
   * when it is being deprecated (what lib version usually), and what to use instead.
   *
   * `options: { onlyOnce?: boolean, isActive?: boolean }`
   * - `onlyOnce`: whether the warning will be shown just once
   * - `isActive`: whether the warning should be shown
   *
   * e.g. "\`MyField\` will be deprecated in Astro-UI 1.0.0, use \`MyOtherField\` instead."
   */
  (text: string, options?: Options): void;
}

const useDeprecationWarning: UseDeprecationWarning = (
  text = '',
  { onlyOnce = true, isActive = true } = {},
) => {
  useEffect(() => {
    if (!isActive) {
      return;
    }
    if (onlyOnce && alreadyShown.has(text)) {
      return;
    }
    if (process.env.NODE_ENV === 'development') {
      alreadyShown.add(text);
      // eslint-disable-next-line no-console
      console.warn(
        `${text}`,
        '\n',
        '\n',
        'NOTE: This is a development-only warning and will not display in production.',
      );
    }
  }, [isActive]);
};

export default useDeprecationWarning;
