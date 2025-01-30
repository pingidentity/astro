import React from 'react';

import { Box } from '../../../..';

import { ListViewItemNextGen } from './ListViewItemNextGen';

export default {
  title: 'Onyx Recipes/ListViewItem',
};

const item = {
  key: 'test',
  id: 'test',
  name: 'JavaScript Array For Each',
  title: 'JavaScript Array For Each',
  category: 'Code Snippet',
  description: 'Sample code demonstrating how to iterate over a description',
};

export const Default = () => {
  return (
    <Box sx={{ border: '1px solid', borderColor: 'border.base' }}>
      <ListViewItemNextGen item={item} />
    </Box>
  );
};
