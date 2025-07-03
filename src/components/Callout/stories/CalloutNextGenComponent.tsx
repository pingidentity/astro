import React from 'react';
import LightbulbOutlineIcon from '@pingux/mdi-react/LightbulbOutlineIcon';

import {
  Box,
  Callout,
  Icon,
  Text,
} from '../../..';
import statuses from '../../../utils/devUtils/constants/statuses';

export const CalloutNextGenComponent = () => {
  return (
    <Box gap="md">
      <Callout>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Quisque vitae lacinia diam, nec ullamcorper neque.
          In egestas dui vel dolor tincidunt, sit amet ullamcorper leo consequat.
        </Text>
      </Callout>

      <Callout status={statuses.SUCCESS}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Quisque vitae lacinia diam, nec ullamcorper neque.
          In egestas dui vel dolor tincidunt, sit amet ullamcorper leo consequat.
        </Text>
      </Callout>

      <Callout status={statuses.WARNING}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Quisque vitae lacinia diam, nec ullamcorper neque.
          In egestas dui vel dolor tincidunt, sit amet ullamcorper leo consequat.
        </Text>
      </Callout>

      <Callout status={statuses.ERROR}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Quisque vitae lacinia diam, nec ullamcorper neque.
          In egestas dui vel dolor tincidunt, sit amet ullamcorper leo consequat.
        </Text>
      </Callout>

      <Callout
        status={statuses.SUCCESS}
        icon={(
          <Icon
            icon={LightbulbOutlineIcon}
            size="sm"
            color="success.bright"
            mr="md"
          />
      )}
      >
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Quisque vitae lacinia diam, nec ullamcorper neque.
          In egestas dui vel dolor tincidunt, sit amet ullamcorper leo consequat.
        </Text>
      </Callout>
    </Box>
  );
};
