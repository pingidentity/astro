import { button, neutral, white, active } from './colors';

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

const weights = {
    [-1]: 300,
    0: 400,
    1: 500,
    2: 600,
    3: 700,
};

export const textColors = {
    primary: neutral[10],
    secondary: neutral[40],
    primaryLight: white,
    secondaryLight: neutral[95],
    button: button.label,
    active,
};

export const allCapsStyle = ({ isAllCaps }) => (
    isAllCaps ? `
        text-transform: uppercase;
        letter-spacing: 0.03ch;
    ` : '');

export const textProps = ({
    size = 'md',
    weight = 0,
    color,
    isAllCaps,
} = {}) => ({
    color: `text.${color}`,
    fontFamily: 'standard',
    fontSize: size,
    lineHeight: '1.4em',
    fontWeight: weights[weight],
    isAllCaps,
});
