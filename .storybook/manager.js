import { addons } from '@storybook/addons';
import yourTheme from './AstroTheme';

// NOTE: Storybook 6.5 shows @emotion/react multiple instances warning in the console, this is a
// known issue - https://github.com/storybookjs/storybook/issues/18742

const CSS_TO_HIDE_CHROMATIC_ONLY_SECTION_FROM_SIDEBAR = `
*[data-item-id*="chromatic-only"], *[title*="Chromatic Only"] {
  display: none !important;
}`;

const head = document.head || document.getElementsByTagName('head')[0];
const style = document.createElement('style');
head.appendChild(style);
style.appendChild(document.createTextNode(CSS_TO_HIDE_CHROMATIC_ONLY_SECTION_FROM_SIDEBAR)); 

addons.setConfig({
  theme: yourTheme,
});
