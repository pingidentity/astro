// eslint-disable-next-line
import { EndUserComponents, toEndUserInputProps } from './end-user';
// eslint-disable-next-line
import { AstroComponents, toAstroInputProps } from './astro';

export const THEMES = {
  END_USER: 'end-user',
  ASTRO: 'astro',
};

export const getThemedComponent = (theme, componentType) => {
  switch (theme) {
    case THEMES.END_USER:
      return EndUserComponents[componentType];
    case THEMES.ASTRO:
      return AstroComponents[componentType];
    default:
      return EndUserComponents[componentType];
  }
};

export const getThemedProps = (theme, props) => {
  switch (theme) {
    case THEMES.END_USER:
      return toEndUserInputProps(props);
    case THEMES.ASTRO:
      return toAstroInputProps(props);
    /* istanbul ignore next */
    default:
      return toEndUserInputProps(props);
  }
};
