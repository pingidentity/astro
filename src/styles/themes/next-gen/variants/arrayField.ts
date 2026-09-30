import { astroTokens } from '@pingux/onyx-tokens';
import { ThemeUICSSObject } from 'theme-ui';

// Onyx spec: 8px between rows.
const listItem: ThemeUICSSObject = {
  mb: astroTokens.spacing.sm,
  // The blocks below the list (helper text container and bottom bar) carry
  // their own 8px top margin, so the last row drops its bottom margin to keep
  // the spec's 8px gap instead of doubling it to 16px.
  '&:last-of-type': {
    mb: 0,
  },
  // Row fields get their accessible name from aria-label, so their built-in
  // label renders empty; the Onyx label variant's margin on that empty
  // element would otherwise double the row spacing.
  '& label.field-label:empty': {
    mb: 0,
  },
  // The delete control sits inline after the input per the Onyx spec, so the
  // field's own control wrapper lays out horizontally with a centered
  // alignment. The input flexes to fill the space left of the control
  // (32px control + 16px gap) and spans the full row width when the control
  // is absent ("cannot delete last item" state).
  '& .field-control-wrapper': {
    flexDirection: 'row',
    alignItems: 'center',
    '& .field-control-input': {
      height: '50px',
      width: '100%',
      flex: '1 1 auto',
      minWidth: 0,
    },
  },
};

const helperTextContainer: ThemeUICSSObject = {
  mt: astroTokens.spacing.sm,
  lineHeight: 'body',
  '& > *': {
    mt: '0px !important',
    pt: '0px !important',
  },
  // 4px between the helper text and the maximum feedback, from the Onyx spec.
  '& > * + *': {
    mt: `${astroTokens.spacing.xs}px !important`,
  },
};

const bottomBar: ThemeUICSSObject = {
  mt: astroTokens.spacing.sm,
};

const addButton: ThemeUICSSObject = {
  width: 'fit-content',
  fontWeight: 0,
};

const addButtonText: ThemeUICSSObject = {
  variant: 'text.label',
  color: 'font.link',
  fontWeight: 0,
};

export const arrayField = {
  listItem,
  helperTextContainer,
  bottomBar,
  addButton,
  addButtonText,
};

export default arrayField;
