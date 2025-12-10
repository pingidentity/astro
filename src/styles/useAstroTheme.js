import React from 'react';

import { makeUseDefaultTheme } from '../utils/devUtils/styledSystemUtils';

import astroTheme from './theme';

const useAstroTheme = makeUseDefaultTheme(astroTheme);

export const withAstroTheme = Component => props => {
  const theme = useAstroTheme();

  return <Component theme={theme} {...props} />;
};

export default useAstroTheme;
