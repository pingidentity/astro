const baseSize = 15;
const majorMultiplier = 1.15;
const getFontSize = major => Math.round(
  baseSize * (majorMultiplier ** major),
);
export const fontSizes = {
  'xs': getFontSize(-2),
  'sm': getFontSize(-1),
  'md': getFontSize(0),
  'lg': getFontSize(1),
  'xl': getFontSize(2),
  'xx': getFontSize(3),
};

export const fontWeights = {
  [-1]: 400,
  0: 400,
  1: 400,
  2: 600,
  3: 600,
};
