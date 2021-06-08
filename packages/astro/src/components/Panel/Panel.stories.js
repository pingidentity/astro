import React from 'react';
import Box from '../Box';
import Text from '../Text';
import Panel from '.';


export default {
  title: 'Panel',
  component: Panel,
  argTypes: {
    isVisible: {
      defaultValue: false,
      description: 'Toggle panel.',
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'Width of panel.',
    },
  },
};

export const Default = ({ ...args }) => {
  return (
    <Box>
      <Box isRow>
        <Box flexGrow={1}>
          <Text>Reveal panel with toggle below.</Text>
        </Box>
        <Panel {...args}>
          Panel content goes here.
        </Panel>
      </Box>
    </Box>
  );
};
