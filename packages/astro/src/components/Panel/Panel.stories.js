import React from 'react';
import Box from '../Box';
import Text from '../Text';
import Panel from '.';
import withDeprecationWarning from '../../utils/devUtils/decorators/withDeprecationWarning';

export default {
  title: 'Deprecated/Panel',
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
  decorators: [
    (Story, context) => withDeprecationWarning(Story, context, '`Panel` will be deprecated in Astro-UI 1.0.0, use `OverlayPanel` instead.'),
  ],
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
