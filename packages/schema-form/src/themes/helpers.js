import { toEndUserInputProps } from './end-user';
import { toAstroInputProps } from './astro';

export const THEMES = {
  END_USER: 'end-user',
  ASTRO: 'astro',
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
