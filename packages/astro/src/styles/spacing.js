const base = 10;

const scale = {
  xs: base * 0.5, // 5
  sm: base * 1, // 10
  md: base * 1.5, // 15
  lg: base * 2.5, // 25
  xl: base * 4, // 40
  xx: base * 6.5, // 65
};

export const button = {
  vPadding: scale.xs,
  hPadding: scale.md,
};

export default scale;
