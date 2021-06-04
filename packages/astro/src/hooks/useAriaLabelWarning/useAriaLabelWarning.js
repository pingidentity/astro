import { useEffect } from 'react';

/**
 * Provides a development-only console warning when a component
 * that needs an aria-label is mounted without one.
 *
 * e.g. "\`Component\` requires an aria-label."
*/
const useAriaLabelWarning = (component, ariaLabel) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !ariaLabel) {
      // eslint-disable-next-line no-console
      console.warn(
        `${component} requires an aria-label`,
        '\n',
        '\n',
        'NOTE: This is a development-only warning and will not display in production.',
      );
    }
  }, []);
};

export default useAriaLabelWarning;
