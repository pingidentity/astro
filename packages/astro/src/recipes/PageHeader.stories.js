import React from 'react';
import PlusIcon from 'mdi-react/PlusIcon';
import { Box, Button, IconButton, Icon, Text } from '../index';

export default {
  title: 'Recipes/Page Header',
};
export const Default = () => {
  const heading = 'Title of the Page';
  const description = 'The description of the page. The description of the page. The description of the page. The description of the page. The description of the page. The description of the page. The description of the page. The description of the page. The description of the page.';

  return (
    <Box >
      <Box>
        <Box
          align="center"
          isRow
          mb="xs"
          role="heading"
          aria-level="1"
        >
          <Text variant="title" fontWeight={3}>
            {heading}
          </Text>
          <Button variant="inlinePrimary" ml="sm" >
            <Icon
              icon={PlusIcon}
              color="white"
              size={13}
              mr="4px"
            />
            {'\u00a0'}
            Add
          </Button>
        </Box>
        <Text variant="bodyWeak">
          {description}
        </Text>
      </Box>

      <Box mt="xl">
        <Box
          align="center"
          isRow
          mb="xs"
          role="heading"
          aria-level="1"
        >
          <Text variant="title" fontWeight={3}>
            {heading}
          </Text>
          <IconButton aria-label="icon button" ml="sm" mt="3px" variant="inverted" >
            <Icon icon={PlusIcon} color="white" size="xs" />
          </IconButton>
        </Box>
        <Text variant="bodyWeak">
          {description}
        </Text>
      </Box>
    </Box>

  );
};
