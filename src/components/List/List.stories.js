import React from 'react';
import List from '.';
import ListItem from '../ListItem';
import Text from '../Text';
import Separator from '../Separator';
import withDeprecationWarning from '../../utils/devUtils/decorators/withDeprecationWarning';

export default {
  title: 'Deprecated/List',
  component: [List, ListItem],
  decorators: [
    (Story, context) => withDeprecationWarning(Story, context, 'The `List` component will be deprecated in Astro-UI 2.0.0, use `ListView` instead.'),
  ],
};

export const Default = () => (
  <>
    <Text variant="itemTitle" mb="md" color="text.secondary">Registration Forms</Text>
    <List>
      <ListItem>
        <Text variant="itemTitle" alignSelf="center" mr="auto">Form 1</Text>
      </ListItem>
      <Separator margin="0" />
      <ListItem title="Form 2">
        <Text variant="itemTitle" alignSelf="center" mr="auto">Form 2</Text>
      </ListItem>
      <Separator margin="0" />
      <ListItem title="Form 3">
        <Text variant="itemTitle" alignSelf="center" mr="auto">Form 3</Text>
      </ListItem>
      <Separator margin="0" />
    </List>
  </>
);
