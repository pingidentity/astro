import React from 'react';
import AccountIcon from 'mdi-react/AccountIcon';
import MoreVertIcon from 'mdi-react/MoreVertIcon';
import ListItem from './ListItem';
import Box from '../Box';
import Icon from '../Icon';
import Text from '../Text';
import Button from '../Button';
import Separator from '../Separator';

export default {
  title: 'ListItem',
  component: ListItem,
};

export const Default = args => (
  <>
    <Separator margin={0} />
    <ListItem {...args}>
      <Box isRow mr="auto" alignSelf="center" >
        <Icon
          icon={AccountIcon}
          alignSelf="center"
          mr="sm"
          color="accent.40"
          size={32}
        />
        <Text variant="itemTitle" alignSelf="center">Fons Vernall</Text>
      </Box>
      <Box isRow alignSelf="center">
        <Button variant="icon">
          <Icon icon={MoreVertIcon} size={20} color="neutral.20" />
        </Button>
      </Box>
    </ListItem>
    <Separator margin={0} />
  </>
);

export const WithSubtitle = args => (
  <>
    <Separator margin={0} />
    <ListItem {...args}>
      <Box isRow mr="auto" alignSelf="center" >
        <Icon
          icon={AccountIcon}
          alignSelf="center"
          mr="sm"
          color="accent.40"
          size={32}
        />
        <Box>
          <Text variant="itemTitle">Fons Vernall</Text>
          <Text variant="itemSubtitle" mt={1}>fvernall0@google.it</Text>
        </Box>
      </Box>
      <Box isRow alignSelf="center">
        <Button variant="icon">
          <Icon icon={MoreVertIcon} size={20} color="neutral.20" />
        </Button>
      </Box>
    </ListItem>
    <Separator margin={0} />
  </>
);
