import * as buttons from './endUserButton';
import * as text from './endUserText';
import * as forms from './forms/endUserForms';
import * as colors from './endUserColors';
import * as popoverMenu from './endUserPopoverMenu';
import * as listBox from './endUserListBox';
import * as link from './endUserLink';

const base = 10;
const space = {
  xs: base * 0.5, // 5
  sm: base, // 10
  md: base * 1.5, // 15
  lg: base * 2.5, // 25
  xl: base * 4, // 40
  xx: base * 6.5, // 65
};

const fontSizes = {
  xs: '11px',
  sm: '13px',
  md: '15px',
  lg: '22px',
  xl: '28px',
  xx: '36px',
};

const fontWeights = {
  regular: 400,
  light: 300,
  semibold: 600,
  bold: 700,
};

const card = {
  bg: 'cardBg',
  boxShadow: 'overlay',
  boxSizing: 'border-box',
  margin: '0 auto',
  maxWidth: 400,
  minHeight: 200,
  position: 'relative',
  width: '100%',
  p: 'xl',
};

const shadows = {
  overlay: '0 1px 4px 1px rgba(121, 128, 135, 0.35)',
  standard: '0 1px 3px rgba(121, 128, 135, 0.35)',
  row: '0 0 9px rgba(121, 128, 135, 0.35)',
  focus: '0 0 5px rgba(121, 128, 135, 0.35)',
};

const endUserTheme = {
  name: 'End User',
  fonts: {
    standard: '"proxima-nova", "helvetica", "arial", sans-serif',
  },
  space,
  shadows,
  colors: colors.default,
  buttons: buttons.default,
  fontSizes,
  fontWeights,
  text: text.default,
  forms: forms.default,
  variants: {
    card,
    listBox: listBox.default,
    popoverMenu: popoverMenu.default,
    link: link.default,
  },
};

export default endUserTheme;
