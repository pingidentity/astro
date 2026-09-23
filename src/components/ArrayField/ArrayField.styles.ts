import { ThemeUICSSObject } from 'theme-ui';

// Spacing between field rows, expressed as a space scale key. The delete
// control layout stays a per-theme concern: legacy Astro positions it
// absolutely outside the input, so the field keeps its column layout here.
const listItem: ThemeUICSSObject = {
  mb: 'xs',
};

// Container for the array-level helper text and maximum feedback.
const helperTextContainer: ThemeUICSSObject = {};

// Bottom bar holding the left and right slots and the add control.
const bottomBar: ThemeUICSSObject = {};

// Add control at the end of the field list. Consumed through the `buttons`
// theme key because it is applied to a Button.
const addButton: ThemeUICSSObject = {
  width: 'fit-content',
  mt: 'xs',
};

// Label text inside the add control; resolves the shared label text variant.
// The add control is a link-style button, so the text takes the theme's
// active (link) color; the weight stays on the label variant's scale value.
const addButtonText: ThemeUICSSObject = {
  variant: 'text.label',
  color: 'active',
};

export default {
  listItem,
  helperTextContainer,
  bottomBar,
  addButton,
  addButtonText,
};
