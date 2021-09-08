import { useEffect } from 'react';

const alreadyShown = new Set();

/**
 * Provides a development-only console warning on component mount.
 * @param {String} text - The deprecation warning text. It should describe what is being deprecated,
 * when it is being deprecated (what lib version usually), and what to use instead.
 *
 * e.g. "\`MyField\` will be deprecated in Astro-UI 1.0.0, use \`MyOtherField\` instead."
 */
const useDeprecationWarning = (text, allowDuplicates) => {
  useEffect(() => {
    if (!allowDuplicates && alreadyShown.has(text)) {
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
  }, []);
};

export default useDeprecationWarning;
