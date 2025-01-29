import React from 'react';

import {
  Box,
} from '../../index';
import { ListViewNextGen } from '../../styles/themes/next-gen/stories/ListViewNextGenComponent';

export default {
  title: 'Onyx Recipes/ListView',
};

export const Default = () => {
  return (
    <Box backgroundColor="background.base" p="lg">
      <ListViewNextGen />
    </Box>
  );
};
