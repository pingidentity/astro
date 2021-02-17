import { useMemo } from 'react';
import endUserStyles from '@pingux/end-user/end-user.css';
import { THEMES } from '../../themes/utils';

/**
 * Controls which theme style is returned, only recalculated when a new theme is passed in
 * @param {string} theme - Must be one of the available themes
 */
function useThemedStyles(theme) {
  const themeStyles = useMemo(() => {
    switch (theme) {
      case THEMES.END_USER:
        return endUserStyles;
      case THEMES.ASTRO:
        return null;
      default:
        return endUserStyles;
    }
  }, [theme]);

  return themeStyles;
}

export default useThemedStyles;
