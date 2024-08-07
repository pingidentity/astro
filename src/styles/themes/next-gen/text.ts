const baseSize = 15;
const majorMultiplier = 1.15;
const getFontSize = major => Math.round(
  baseSize * (majorMultiplier ** major),
);
export const fontSizes = {
  'xs': getFontSize(-2),
  'sm': getFontSize(-1),
  'md': '15px',
  'lg': '18.75px',
  'xl': '22.5px',
  'xx': '26.25px',
  'xxx': '33.75px',
};

export const fontWeights = {
  [-1]: 400,
  0: 400,
  1: 400,
  2: 600,
  3: 600,
};
