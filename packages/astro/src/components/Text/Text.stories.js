import React from 'react';
import { Divider } from 'theme-ui';
import Text from './Text';
import { textVariants } from '../../utils/devUtils/constants/variants.js';
import { flatColorList } from '../../styles/colors.js';
import { Box } from '../../index';

export default {
  title: 'Text',
  component: Text,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: Object.values(textVariants),
      },
      description: 'Text variant.',
      defaultValue: Object.values(textVariants)[0],
    },
    children: {
      control: {
        type: 'text',
      },
      table: {
        type: {
          summary: 'string',
        },
      },
      description: 'Text value.',
      defaultValue: 'Hi, this is some text!',
    },
    color: {
      control: {
        type: 'select',
        options: [undefined, ...flatColorList.map(([colorName]) => colorName)],
      },
      table: {
        type: {
          summary: 'string',
        },
      },
      description: 'Text color.',
      defaultValue: undefined,
    },
    bg: {
      control: {
        type: 'select',
        options: flatColorList.map(([colorName]) => colorName),
      },
      table: {
        type: {
          summary: 'string',
        },
      },
      description: 'Background color.',
      defaultValue: 'white',
    },
  },
};

export const Default = ({ children, bg, ...args }) => (
  <Text bg={bg} {...args} p="xl">
    {children}
  </Text>
);

export const WithCustomWidth = () => (
  <Box width={200}>
    <Text p="xl">
      superlongtextinonelinewithnowhitespacessoitcanbelongerthatanywidth
    </Text>
  </Box>
);

export const TypographyStyleProps = () => {
  const textProps = {
    fontFamily: 'times',
    fontSize: 'md',
    fontWeight: 900,
    lineHeight: '2em',
    letterSpacing: '5px',
    textAlign: 'right',
    fontStyle: 'italic',
  };

  const loremText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.';

  return (
    <Box p="xx" gap="md">
      <Text variant="title">
        The Text component allows typography style props to be passed in
        directly.
      </Text>
      <Text {...textProps}>{loremText}</Text>
      <Divider />
      <Text variant="title">
        Typography styles can also be passed in through the sx prop for the same
        result.
      </Text>
      <Text sx={textProps}>{loremText}</Text>
    </Box>
  );
};

TypographyStyleProps.argTypes = {
  variant: {
    control: {
      type: 'none',
    },
  },
  children: {
    control: {
      type: 'none',
    },
  },
  color: {
    control: {
      type: 'none',
    },
  },
  bg: {
    control: {
      type: 'none',
    },
  },
  tabPanelProps: {
    control: {
      type: 'none',
    },
  },
};
