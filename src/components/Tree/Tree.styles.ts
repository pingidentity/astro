import { ThemeUICSSObject } from 'theme-ui';

const tree: ThemeUICSSObject = {
  outline: 'none',
};

tree.container = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  outline: 'none',
  p: 'sm',
  borderRadius: '4px',
  '& .react-aria-DropIndicator': {
    height: '2px',
    '&::before': {
      content: '""',
      display: 'block',
      height: '2px',
      borderRadius: '2px',
      bg: 'transparent',
      margin: '0px',
    },
    '&[data-drop-target]::before': {
      bg: 'active',
    },
  },
};

tree.item = {
  outline: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
  '&.is-focused, &[data-focused]': {
    outline: '1px solid',
    outlineColor: 'focus',
    outlineOffset: '-1px',
    borderRadius: '4px',
    zIndex: 1,
  },
  // the drag handle / chevron carry their own focus treatment, so the
  // row-level outline is suppressed while either is focused
  '&:has(.astro-TreeDragButton:focus), &:has(.astro-TreeDragButton:focus-visible), &:has(.astro-TreeChevronButton:focus), &:has(.astro-TreeChevronButton:focus-visible)': {
    outline: 'none',
  },
  '&.is-focus-visible, &[data-focus-visible]': {
    outline: '2px solid',
    outlineColor: 'focus',
    outlineOffset: '-1px',
    borderRadius: '4px',
  },
  '&.is-selected, &[data-selected]': {
    bg: 'accent.95',
    '& *': {
      color: 'active',
    },
  },
  '&.is-disabled, &[data-disabled]': {
    opacity: 0.65,
    cursor: 'not-allowed',
  },
  '&.is-dragging, &[data-dragging]': {
    bg: 'accent.95',
    outline: '2px solid',
    outlineColor: 'active',
    outlineOffset: '-1px',
    borderRadius: '4px',
    '& *': {
      color: 'active',
    },
  },
  '&.is-drop-target, &[data-drop-target]': {
    outline: '2px dashed',
    outlineColor: 'active',
    outlineOffset: '-1px',
    borderRadius: '4px',
  },
};

tree.dragButton = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '26px',
  height: '26px',
  minWidth: '26px',
  padding: 0,
  background: 'transparent',
  border: 'none',
  cursor: 'grab',
  borderRadius: '4px',
  outline: 'none',
  color: 'inherit',
  transition: 'background-color 120ms ease, outline-color 120ms ease',
  path: {
    fill: 'neutral.40',
  },
  '&:hover': {
    bg: 'accent.95',
    '& svg': {
      fill: 'active',
    },
  },
  '&:focus, &:focus-visible': {
    outline: '1px solid',
    outlineColor: 'focus',
    outlineOffset: '2px',
    borderRadius: '4px',
  },
  '&:active, &[data-pressed]': {
    bg: 'active',
    cursor: 'grabbing',
    '& svg': {
      fill: 'white',
    },
  },
};

export const treeChevron: ThemeUICSSObject = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '18px',
  height: '18px',
  minWidth: '18px',
  minHeight: '18px',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  background: 'transparent',
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
  cursor: 'pointer',
  color: 'inherit',
  '& svg': {
    width: '18px',
    height: '18px',
  },
  '& > span': {
    width: '18px',
    height: '18px',
    minWidth: '18px',
    minHeight: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  path: {
    fill: 'neutral.40',
  },
  '&.is-hovered, &:hover, &.is-pressed, &:active': {
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    outline: 'none',
  },
  '&.is-focused': {
    outline: 'none',
  },
  '&:focus, &:focus-visible': {
    outline: '1px solid',
    outlineColor: 'focus',
    outlineOffset: '2px',
  },
  '&[data-disabled]': {
    cursor: 'not-allowed',
  },
};

tree.chevronButton = treeChevron;

tree.selectionCheckbox = {
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  cursor: 'pointer',
  outline: 'none',
  '&:focus-visible, [data-focus-visible]': {
    outline: '1px solid',
    outlineColor: 'focus',
    outlineOffset: '2px',
  },
};

tree.selectionCheckboxBox = {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '14px',
  height: '14px',
  flexShrink: 0,
  mr: 'xs',
  cursor: 'pointer',
  outline: 'none',
  border: '2px solid',
  borderColor: 'neutral.60',
  borderRadius: '2px',
  background: 'transparent',
  transition: 'background-color 120ms ease, border-color 120ms ease',
  '&::after': {
    content: '""',
    display: 'none',
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '4px',
    height: '8px',
    border: 'solid',
    borderColor: 'white',
    borderWidth: '0 2px 2px 0',
    transform: 'translate(-50%, -60%) rotate(45deg)',
  },
  '&[data-selected]': {
    borderColor: 'active',
    bg: 'active',
    '&::after': {
      display: 'block',
    },
  },
  '[data-hovered] &, [data-pressed] &': {
    borderColor: 'active',
  },
  '&[data-disabled]': {
    cursor: 'not-allowed',
    borderColor: 'neutral.80',
    background: 'neutral.95',
  },
};

tree.itemContent = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'nowrap',
  width: '100%',
  minHeight: '28px',
  height: '28px',
  fontSize: 'md',
  fontFamily: 'standard',
  pl: 'xs',
  '&:hover': {
    bg: 'accent.99',
    borderRadius: '4px',
  },
  '&.is-loading': {
    opacity: 0.7,
  },
  '& .astro-TreeDragButton': {
    ...(tree.dragButton as ThemeUICSSObject),
    mr: 'xs',
  },
  '& > .astro-TreeChevronSlot': {
    marginLeft: 'calc((var(--tree-item-level, 1) - 1) * 34px)',
  },
  '& .astro-TreeChevronButton': tree.chevronButton,
  '& .astro-TreeSelectionCheckbox': {
    ...(tree.selectionCheckbox as ThemeUICSSObject),
    mr: 'xs',
  },
  '& .astro-TreeSelectionCheckboxBox': tree.selectionCheckboxBox,
};

tree.labelSlot = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  minWidth: 0,
};

tree.iconSlot = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  minWidth: '24px',
  minHeight: '24px',
  p: '3px',
  boxSizing: 'border-box',
  borderRadius: '100px',
  bg: 'accent.99',
  color: 'text.primary',
  mr: 'xs',
  '& svg': {
    width: '18px',
    height: '18px',
    fill: 'currentColor',
  },
};

tree.chevronSlot = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '18px',
  minWidth: '18px',
  mr: 'sm',
};

tree.lockSlot = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  minWidth: '16px',
  ml: 'xs',
  flexShrink: 0,
  color: 'neutral.60',
  '& svg': {
    width: '16px',
    height: '16px',
    fill: 'currentColor',
  },
  '& > span': {
    width: '16px',
    height: '16px',
    minWidth: '16px',
    minHeight: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '&.is-unlocked': {
    opacity: 0.6,
  },
};

export default tree;
