import { EndUserComponents, toEndUserInputProps } from './end-user';

export const THEMES = {
  END_USER: 'end-user',
};

export const getThemedComponent = (theme, componentType) => {
  switch (theme) {
    case THEMES.END_USER:
    default:
      return EndUserComponents[componentType];
  }
};

export const getThemedProps = (theme, props) => {
  switch (theme) {
    case THEMES.END_USER:
    default:
      return toEndUserInputProps(props);
  }
};
