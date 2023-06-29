import React from 'react';
import PlusIcon from '@pingux/mdi-react/PlusIcon';

import { Box, Icon, IconButton, Link, Text } from '../index';

export default {
  title: 'Recipes/Page Header',
};
export const Default = () => {
  return (
    <>
      <Box
        align="center"
        isRow
        mb="xs"
        role="heading"
        aria-level="1"
      >
        <Text fontSize="xx" fontWeight="3" fontColor="text.primary" as="h1">
          Title of the Page
        </Text>
        <IconButton aria-label="icon button" ml="sm" variant="inverted">
          <Icon icon={PlusIcon} size="sm" title={{ name: 'Plus Icon' }} />
        </IconButton>
      </Box>
      <Text fontSize="sm" color="text.secondary" fontWeight="0" width="800px">
        The description of the page. The description of the page. The description of the page.
        The description of the page.The description of the page. The description of the page.
        The description of the page. The description of the page. The description of the page.&nbsp;
        <Link href="https://uilibrary.ping-eng.com/" sx={{ fontSize: 'sm' }}>Learn more</Link>
      </Text>
    </>
  );
};
