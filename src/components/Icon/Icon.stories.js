import React from 'react';
import SearchIcon from 'mdi-react/SearchIcon';
import Icon from '.';
import { flatColorList } from '../../styles/colors';

export default {
  title: 'Icon',
  component: Icon,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    icon: {
      control: {
        type: 'none',
      },
      defaultValue: SearchIcon,
      description: 'The icon to render. List of icons at https://materialdesignicons.com/',
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'The size of the icon container. If given a number value, it will be converted to pixels. ' +
          'Standard icon sizes are 15, 22, and 40. ' +
          'Numeric value and/or paired with a unit. https://www.w3schools.com/cssref/css_units.asp',
    },
    color: {
      control: {
        type: 'select',
        options: flatColorList.map(([colorName]) => colorName),
      },
      defaultValue: 'active',
    },
  },
};

export const Default = args => (
  <Icon {...args} />
);

export const SVGIcons = () => {
  // SVGR can used to convert .svg files to components instead of doing this manually
  const SVGComponent = props => (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
    </svg>
  );
  return <Icon icon={SVGComponent} color="active" size={40} />;
};
