import PropTypes from 'prop-types';

const iconSizes = ['xxs', 'xs', 'sm', 'md'] as const;

export const sizeArgTypes = {
  size: {
    control: { type: 'select' },
    options: iconSizes,
    description: 'The size of the icon. Accepts a t-shirt size ("xxs", "xs", "sm", "md") or a number value in pixels. Rendered pixel size may vary by theme.',
    table: {
      type: { summary: iconSizes.map(k => `"${k}"`).join(' | ') },
    },
  },
};

export const sizePropTypes = {
  size: PropTypes.oneOf([...iconSizes]),
};
