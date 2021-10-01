import endUserText from '../endUserText';

const endUserInput = {
  ...endUserText.input,
  position: 'relative',
  background: 'white',
  borderColor: 'neutral.40',
  borderWidth: '1px !important',
  borderStyle: 'solid',
  borderRadius: 2,
  display: 'block',
  boxSizing: 'border-box',
  width: '100%',
  px: 10,
  paddingTop: 10,
  paddingBottom: 10,
  color: 'neutral.30',
  outline: 'none',
  '&:focus': {
    borderColor: 'activeHover',
  },
  '&:after': {
    display: 'none',
  },
};

export const slateInput = {
  borderTop: 0,
  borderLeft: 0,
  borderRight: 0,
  borderRadius: 0,
  outline: 0,
  paddingTop: 15,
  paddingBottom: 10,
  background: 'transparent',
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
};

export const templateOverrides = {
  slate: slateInput,
};

export const defaultThemeOverrides = defaultTheme => ({
  borderColor: defaultTheme.configuration.buttonColor,
});

export default endUserInput;
