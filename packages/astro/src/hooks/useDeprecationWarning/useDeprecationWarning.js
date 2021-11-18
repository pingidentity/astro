import { useEffect } from 'react';

const alreadyShown = new Set();

/**
 * Provides a development-only console warning on component mount.
 * @param {String} text - The deprecation warning text. It should describe what is being deprecated,
 * when it is being deprecated (what lib version usually), and what to use instead.
 * @param {object} options
 * @param {boolean} options.isActive - whether warning should be shown
 * @param {boolean} options.onlyOnce - if true then warning will be globally shown just once
 * e.g. "\`MyField\` will be deprecated in Astro-UI 1.0.0, use \`MyOtherField\` instead."
 */
const useDeprecationWarning = (text = '', { onlyOnce = true, isActive = true } = {}) => {
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
