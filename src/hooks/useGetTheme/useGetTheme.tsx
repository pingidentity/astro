/* eslint-disable no-else-return */
import { useEffect, useState } from 'react';
import { Theme, useTheme } from '@emotion/react';

import { nextGenDarkThemeValues } from '../../styles/themeOverrides/nextGenDarkMode/customProperties';
import { astroThemeValues } from '../../styles/themes/astro/customProperties';
import { nextGenThemeValues } from '../../styles/themes/next-gen/customProperties';
import { themes } from '../../utils/devUtils/constants/themes';

interface CustomTheme extends Theme {
    name: string
}

export const baseState = {
  isOnyx: false,
  isAstro: false,
  isOnyxDark: false,
  isCustom: false,
};

const astroState = {
  name: themes.ASTRO,
  themeState: {
    ...baseState, isAstro: true,
  },
  ...astroThemeValues,
};

const onyxState = {
  themeState: {
    ...baseState, isOnyx: true,
  },
  name: themes.NEXT_GEN,
  ...nextGenThemeValues,
};

const onyxDarkState = {
  name: themes.NEXT_GEN_DARK,
  themeState: { ...baseState, isOnyx: true, isOnyxDark: true },
  ...nextGenDarkThemeValues,
};

const customThemeState = {
  themeState: {
    ...baseState, isCustom: true,
  },
  name: 'custom',
  ...astroThemeValues,
};

const getTheme = theme => {
  if (theme === themes.NEXT_GEN) {
    return { ...onyxState };
  }
  if (theme === themes.ASTRO) {
    return { ...astroState };
  }
  if (theme === themes.NEXT_GEN_DARK) {
    return { ...onyxDarkState };
  }
  return {
    ...customThemeState,
  };
};

const useGetTheme = () => {
  const theme = useTheme() as CustomTheme;
  const [themeObject, setThemeObject] = useState(getTheme(theme.name));

  useEffect(() => {
    setThemeObject(getTheme(theme.name));
  }, [theme.name]);

  return themeObject;
};

export default useGetTheme;
