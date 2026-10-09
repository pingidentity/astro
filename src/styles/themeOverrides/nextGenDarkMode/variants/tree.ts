import { astroTokensDark } from '@pingux/onyx-tokens';

import treeSource from '../../../../components/Tree/Tree.styles';

// The base styles file builds its object imperatively (tree.item = {...}), so its
// inferred type has possibly-undefined members; treat it as a complete object here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tree = treeSource as Record<string, any>;

/**
 * Onyx dark theme overrides for the Tree component, derived from the dark token set.
 * Deep-merged over the Onyx light tree variant, so only differences that matter in
 * dark mode are specified here.
 */
const onyxDarkTree = {
  ...tree,
  item: {
    ...tree.item,
    '&.is-focused, &[data-focused]': {
      outline: 'none',
      boxShadow: `inset 0 0 0 2px ${astroTokensDark.color.primary}`,
      borderRadius: '4px',
      zIndex: 1,
    },
    // the drag handle / chevron carry their own focus treatment, so the
    // row-level focus treatment is suppressed while either is focused
    '&:has(.astro-TreeDragButton:focus), &:has(.astro-TreeDragButton:focus-visible), &:has(.astro-TreeChevronButton:focus), &:has(.astro-TreeChevronButton:focus-visible)': {
      outline: 'none',
      boxShadow: 'none',
    },
    '&.is-focus-visible, &[data-focus-visible]': {
      outline: 'none',
      boxShadow: `inset 0 0 0 2px ${astroTokensDark.color.primary}`,
      borderRadius: '4px',
    },
    '&.is-selected, &[data-selected]': {
      bg: 'background.hover',
      '& *': {
        color: astroTokensDark.color.gray[100],
      },
      '& .astro-TreeIconSlot': {
        color: 'iconOnPrimary',
        '& svg': {
          fill: 'iconOnPrimary',
        },
      },
      '& .astro-TreeLabelSlot': {
        bg: 'transparent',
      },
    },
    '&.is-disabled, &[data-disabled]': {
      opacity: 0.65,
      cursor: 'not-allowed',
    },
    '&.is-dragging, &[data-dragging]': {
      bg: 'background.hover',
      outline: '1px solid #ffffff',
      outlineOffset: '-1px',
      boxShadow: `inset 0 0 0 2px ${astroTokensDark.color.primary}`,
      borderRadius: '4px',
      '& *': {
        color: astroTokensDark.color.common.menu.item.selected.text,
      },
    },
    '&.is-drop-target, &[data-drop-target]': {
      outline: '1px solid #ffffff',
      outlineOffset: '-1px',
      boxShadow: `inset 0 0 0 2px ${astroTokensDark.color.primary}`,
      borderRadius: '4px',
    },
    '&:hover': {
      bg: astroTokensDark.color['nav-bar-item'].hover.bg,
      borderRadius: '4px',
    },
  },
  itemContent: {
    ...tree.itemContent,
    color: astroTokensDark.color.gray[100],
    '&:hover': {
      bg: 'transparent',
    },
  },
  dragButton: {
    ...tree.dragButton,
    path: {
      fill: astroTokensDark.color.common.menu.item.text,
    },
    '&:hover': {
      bg: 'background.hover',
      '& svg': {
        fill: astroTokensDark.color.common.menu.item.hover.text,
      },
    },
    '&:focus, &:focus-visible': {
      boxShadow: `0 0 0 2px ${astroTokensDark.color.primary}`,
      borderRadius: '4px',
    },
    '&:active, &[data-pressed]': {
      bg: astroTokensDark.color.blue[500],
      cursor: 'grabbing',
      '& svg': {
        fill: astroTokensDark.color.font.base,
      },
    },
  },
  selectionCheckbox: {
    ...tree.selectionCheckbox,
    '&:focus-visible, [data-focus-visible]': {
      boxShadow: `0 0 0 2px ${astroTokensDark.color.primary}`,
    },
  },
  // the visible checkbox box (drawn by tree.selectionCheckboxBox's CSS on the
  // inner RAC CheckboxButton label) re-colored from dark tokens
  selectionCheckboxBox: {
    ...tree.selectionCheckboxBox,
    borderColor: astroTokensDark.color.border,
    '&[data-selected]': {
      ...tree.selectionCheckboxBox['&[data-selected]'],
      borderColor: astroTokensDark.color.primary,
      bg: astroTokensDark.color.primary,
    },
    '[data-hovered] &, [data-pressed] &': {
      borderColor: astroTokensDark.color.primary,
    },
    '&[data-disabled]': {
      ...tree.selectionCheckboxBox['&[data-disabled]'],
      borderColor: astroTokensDark.color.border,
      background: astroTokensDark.color.common.bg.secondary,
    },
  },
  // dark Onyx: solid blue circle with a black folder glyph via the dark avatar
  // tokens; the file variant stays violet
  iconSlot: {
    ...tree.iconSlot,
    bg: astroTokensDark.color.avatar.blue.bg,
    color: astroTokensDark.color.avatar.blue.text,
    '&.is-leaf': {
      bg: astroTokensDark.color.avatar.indigo.bg,
      color: astroTokensDark.color.avatar.indigo.text,
    },
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
        bg: astroTokensDark.color.primary,
      },
    },
  },
};

export default onyxDarkTree;
