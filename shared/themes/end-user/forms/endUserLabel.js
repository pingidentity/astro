import endUserText from '../endUserText';

const activeFloatLabel = {
  fontWeight: '400 !important',
  fontSize: '13px',
  transform: 'translate(0px, -9px) scale(0.75)',
  textTransform: 'uppercase !important',
  transition: 'all 0.05s',
};

const radioLabel = {
  ...endUserText.base,
  div: {
    flexShrink: 0,
  },
  alignItems: 'center',
};

const checkboxLabel = {
  ...endUserText.base,
  div: {
    flexShrink: 0,
  },
  alignItems: 'center',
};

const focusFloatLabel = {
  color: 'text.active',
};

const endUserLabel = {
  ...endUserText.label,
  display: 'block',
  mb: 'xs',
  alignItems: 'center',
  lineHeight: '1em',
  '&.is-float-label': {
    position: 'absolute',
    zIndex: 1,
    top: '17px',
    left: '10px',
    mb: 0,
    transformOrigin: 'top left',
    transition: 'all 0.2s ease-out',
    pointerEvents: 'none',
    // Add 20px padding to the inputs in order to fit the float label
    '& + div > input': {
      paddingTop: 20,
    },
  },
  radio: radioLabel,
  checkbox: checkboxLabel,
  '.is-float-label-active &.is-float-label': {
    ...activeFloatLabel,
  },
  '.has-focus-within &.is-float-label': {
    ...focusFloatLabel,
  },
};

const slateLabel = {
  '&.is-float-label': {
    zIndex: 1,
    top: '15px',
    left: '10px',
    // Add 15px padding to the inputs in order to fit the float label
    '& + div > input': {
      paddingTop: 15,
    },
  },
  '.is-float-label-active &.is-float-label': {
    transform: 'translate(0px, -13px) scale(0.75)',
  },
};

export const templateOverrides = {
  slate: slateLabel,
};

export const defaultThemeOverrides = defaultTheme => ({
  radio: {
    color: defaultTheme.configuration.bodyTextColor,
  },
  checkbox: {
    color: defaultTheme.configuration.bodyTextColor,
  },
});

export default endUserLabel;
