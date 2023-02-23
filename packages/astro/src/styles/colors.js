import chroma from 'chroma-js';

// SEMANTIC COLORS
export const active = '#4462ED';
export const critical = {
  bright: '#a31300',
  dark: '#a31300',
  light: '#ffebe7',
  primaryDark: chroma.mix('#a31300', '#000000', 0.2).hex(),
  secondaryDark: chroma.mix('#a31300', '#000000', 0.4).hex(),
};
export const success = {
  bright: '#00af18',
  dark: '#008512',
  light: '#e6ffe9',
};
export const warning = {
  bright: '#ffb91c',
  dark: '#b05b00',
  light: '#fff6e6',
};

// NEUTRAL COLORS
export const black = '#000';
export const white = '#fff';

const steps = 9;
const neutralScale = chroma.scale(['#253746', 'white']).mode('lab');

export const neutral = {
  10: neutralScale(0).hex(),
  20: neutralScale(1 / steps).hex(),
  30: neutralScale(2 / steps).hex(),
  40: neutralScale(3 / steps).hex(),
  50: neutralScale(4 / steps).hex(),
  60: neutralScale(5 / steps).hex(),
  70: neutralScale(6 / steps).hex(),
  80: neutralScale(7 / steps).hex(),
  90: neutralScale(8 / steps).hex(),
  95: neutralScale(8.5 / steps).hex(),
};

const accentBase = '303F5F';
const accentLight = 'F7F8FD';

const accentSteps = 8;
const accentScale = chroma.scale([accentBase, accentLight]).mode('hsl');

export const accent = {
  5: chroma(accentBase).darken(1).hex(),
  10: chroma(accentBase).darken(0.5).hex(),
  20: accentScale(0).hex(),
  30: accentScale(1 / accentSteps).hex(),
  40: accentScale(2 / accentSteps).hex(),
  50: accentScale(3 / accentSteps).hex(),
  60: accentScale(4 / accentSteps).hex(),
  70: accentScale(5 / accentSteps).hex(),
  80: accentScale(6 / accentSteps).hex(),
  90: accentScale(7 / accentSteps).hex(),
  95: accentScale(7.5 / accentSteps).hex(),
  99: accentScale(8 / accentSteps).hex(),
};

const [cHue, cSaturation, cLightness] = chroma('#D033FF').hsl();
const getDecorativeColor = (index, h = cHue, s = cSaturation, l = cLightness) => (index > 0
  ? getDecorativeColor(index - 1, (h + 100) % 360, s, l * 0.95)
  : chroma(h, s, l, 'hsl').hex());

export const decorative = Array(11).fill(0).map((_v, index) => (index !== 4 ? getDecorativeColor(index) : '#e30080'));
export const decorativeDark = decorative.map(
  color => chroma(color).darken(2).hex(),
);
export const decorativeLight = decorative.map(
  color => chroma(color).brighten(2).hex(),
);

// export const focus = chroma(accent[50]).alpha(0.75).hex();
export const focus = chroma('#D033FF').hex();

// COMPONENT COLORS
export const button = {
  primary: active,
  border: active,
  label: active,
  hoverBorder: accent,
  hoverLabel: accent,
  hoverBackground: accent[95],
  focus,
};

export const line = { regular: neutral[50], light: neutral[80], hairline: neutral[90] };

export const text = {
  primary: neutral[10],
  secondary: neutral[40],
  primaryLight: white,
  secondaryLight: neutral[95],
  button: button.label,
  active,
};

export const shadow = chroma(neutral[10]).alpha(0.25).hex();

const allColors = {
  black,
  white,
  neutral,
  accent,
  decorative,
  decorativeDark,
  decorativeLight,
  focus,
  active,
  critical,
  success,
  text,
  line,
  button,
  warning,
};

export default allColors;

function flattenColors(obj, prefix = '') {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return [`${prefix}${key}`, value];
      } else if (typeof value === 'object') {
        return flattenColors(value, `${prefix}${key}.`);
      }
      return [];
    })
    .reduce(
      (result, current) =>
        (typeof current[0] === 'string' ? [...result, current] : [...result, ...current]),
      [],
    );
}

/* used by Storybook's stories */
export const flatColorList = flattenColors(allColors);
