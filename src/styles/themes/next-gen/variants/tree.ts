import { astroTokens } from '@pingux/onyx-tokens';

import treeSource from '../../../../components/Tree/Tree.styles';

// The base styles file builds its object imperatively (tree.item = {...}), so its
// inferred type has possibly-undefined members; treat it as a complete object here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tree = treeSource as Record<string, any>;

/**
 * Onyx (next-gen) theme overrides for the Tree component, derived from
 * @pingux/onyx-tokens. Deep-merged onto the base Astro tree styles, so only
 * differences from the Astro values are specified here.
 */
const onyxTree = {
  ...tree,
  item: {
    ...tree.item,
    '&.is-focused, &[data-focused]': {
      boxShadow: `inset 0 0 0 2px ${astroTokens.color.primary}`,
      // the base Astro theme draws focus with outline: 2px solid; the Onyx
      // treatment is a single inset shadow (matching ListView/DataTable), so
      // the outline must be reset or both stack and the ring reads ~4px thick
      outline: 'none',
      borderRadius: '4px',
      zIndex: 1,
    },
    // the drag handle / chevron carry their own focus treatment, so the
    // row-level focus treatment is suppressed while either is focused
    '&:has(.astro-TreeDragButton:focus), &:has(.astro-TreeDragButton:focus-visible), &:has(.astro-TreeChevronButton:focus), &:has(.astro-TreeChevronButton:focus-visible)': {
      boxShadow: 'none',
      outline: 'none',
    },
    '&.is-focus-visible, &[data-focus-visible]': {
      boxShadow: `inset 0 0 0 2px ${astroTokens.color.primary}`,
      outline: 'none',
      borderRadius: '4px',
    },
    '&.is-selected, &[data-selected]': {
      bg: astroTokens.color['nav-bar-item'].selected.bg,
      '& *': {
        color: astroTokens.color.gray[900],
      },
    },
    '&.is-disabled, &[data-disabled]': {
      opacity: 0.65,
      cursor: 'not-allowed',
    },
    '&.is-dragging, &[data-dragging]': {
      bg: astroTokens.color['nav-bar-item'].hover.bg,
      boxShadow: `inset 0 0 0 2px ${astroTokens.color.primary}`,
      borderRadius: '4px',
      '& *': {
        color: astroTokens.color['nav-bar-item'].selected.text,
      },
    },
    '&.is-drop-target, &[data-drop-target]': {
      boxShadow: `inset 0 0 0 2px ${astroTokens.color.primary}`,
      borderRadius: '4px',
    },
    '&:hover': {
      bg: astroTokens.color['nav-bar-item'].hover.bg,
      borderRadius: '4px',
    },
  },
  itemContent: {
    ...tree.itemContent,
    color: astroTokens.color.gray[900],
    '&:hover': {
      bg: 'transparent',
    },
  },
  dragButton: {
    ...tree.dragButton,
    path: {
      fill: astroTokens.color.gray[500],
    },
    '&:hover': {
      bg: astroTokens.color['nav-bar-item'].hover.bg,
      '& svg': {
        fill: astroTokens.color['nav-bar-item'].selected.text,
      },
    },
    '&:focus, &:focus-visible': {
      boxShadow: `0 0 0 2px ${astroTokens.color.primary}`,
      borderRadius: '4px',
    },
    '&:active, &[data-pressed]': {
      bg: astroTokens.color['primary-light'],
      cursor: 'grabbing',
      '& svg': {
        fill: astroTokens.color['primary-dark'],
      },
    },
  },
  // the visible checkbox box is drawn by tree.selectionCheckboxBox on the
  // inner RAC CheckboxButton label; Onyx re-colors it from tokens
  selectionCheckbox: {
    ...tree.selectionCheckbox,
    '&:focus-visible, [data-focus-visible]': {
      boxShadow: `0 0 0 2px ${astroTokens.color.primary}`,
    },
  },
  selectionCheckboxBox: {
    ...tree.selectionCheckboxBox,
    borderColor: astroTokens.color.gray[500],
    '&[data-selected]': {
      ...tree.selectionCheckboxBox['&[data-selected]'],
      borderColor: astroTokens.color.primary,
      bg: astroTokens.color.primary,
    },
    '[data-hovered] &, [data-pressed] &': {
      borderColor: astroTokens.color.primary,
    },
    '&[data-disabled]': {
      ...tree.selectionCheckboxBox['&[data-disabled]'],
      borderColor: astroTokens.color.border,
      background: astroTokens.color.gray[100],
    },
  },
  // blue circle with a blue.600 folder glyph for expandable nodes; the file
  // (indigo) variant is applied per-item in TreeItemContent via is-leaf
  iconSlot: {
    ...tree.iconSlot,
    bg: astroTokens.color.avatar.blue.bg,
    color: astroTokens.color.avatar.blue.text,
    '&.is-leaf': {
      bg: astroTokens.color.avatar.indigo.bg,
      color: astroTokens.color.avatar.indigo.text,
    },
  },
  lockSlot: {
    ...tree.lockSlot,
    color: '#5F6DA7',
  },
  container: {
    ...tree.container,
    '& .react-aria-DropIndicator': {
      ...tree.container['& .react-aria-DropIndicator'],
      '&::before': {
        ...tree.container['& .react-aria-DropIndicator']['&::before'],
        bg: 'transparent',
      },
      '&[data-drop-target]::before': {
        bg: astroTokens.color.primary,
      },
    },
  },
};

export default onyxTree;
