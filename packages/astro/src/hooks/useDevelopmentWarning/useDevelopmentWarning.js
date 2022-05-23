import { useMemo } from 'react';

/**
 * Provides a development-only console warning.
*/
const useDevelopmentWarning = ({ message, shouldTrigger }) => {
  useMemo(() => {
    if (process.env.NODE_ENV === 'development' && shouldTrigger) {
      // eslint-disable-next-line no-console
      console.warn(
        `${message}`,
        '\n',
        '\n',
        'NOTE: This is a development-only warning and will not display in production.',
      );
    }
  }, [message, shouldTrigger]);
};

export default useDevelopmentWarning;
