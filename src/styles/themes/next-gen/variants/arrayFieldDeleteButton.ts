import { astroTokens } from '@pingux/onyx-tokens';
import { ThemeUICSSObject } from 'theme-ui';

// Onyx places the delete control inline after the field: 16px gap, 32x32 hit
// area, circular badge-style focus ring and hover background. The base
// Astro variant (merged underneath by the theme merge) positions the
// control absolutely outside the row for its own layout, so those
// properties are reset here to keep the control inside the flex row.
const deleteButton: ThemeUICSSObject = {
  position: 'static',
  right: 'auto',
  top: 'auto',
  ml: astroTokens.spacing.md,
  width: 32,
  height: 32,
  alignSelf: 'center',
  // '&&' out-specifies the base variant and the fieldControlWrapper
  // '> button' rule; the focus indicator is circular, which needs the
  // 28px radius kept as well.
  '&&': {
    border: 'none',
    borderRadius: '28px',
  },
  cursor: 'pointer',
  // This variant no longer extends the base icon button (the variant prop
  // replaces it), so it carries its own focus ring and hover treatment.
  '&.is-focused': {
    outline: '2px solid',
    outlineColor: 'active',
    outlineOffset: '2px',
  },
  '&.is-hovered': {
    backgroundColor: astroTokens.color.gray[100],
  },
};

export const arrayFieldDeleteButton = {
  deleteButton,
};

export default arrayFieldDeleteButton;
