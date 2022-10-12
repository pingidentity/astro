import { addons } from '@storybook/addons';
import yourTheme from './AstroTheme';

// NOTE: Storybook 6.5 shows @emotion/react multiple instances warning in the console, this is a
// known issue - https://github.com/storybookjs/storybook/issues/18742

addons.setConfig({
  theme: yourTheme,
});