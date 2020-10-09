import React from 'react';
import Box from '../Box';
import Panel from '.';

export default {
  title: 'Panel',
  component: Panel,
};

export const Default = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <Box>
      <Box isRow>
        <Box flexGrow={1}>
          <Box onClick={() => setVisible(!visible)}>Click to reveal Panel</Box>
        </Box>
        <Panel isVisible={visible} width="33%">
          Panel content goes here.
        </Panel>
      </Box>
    </Box>
  );
};
