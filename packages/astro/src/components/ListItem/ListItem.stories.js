import React from 'react';
import AccountIcon from 'mdi-react/AccountIcon';
import MoreVertIcon from 'mdi-react/MoreVertIcon';
import ListItem from './ListItem';
import Box from '../Box';
import Icon from '../Icon';
import IconButton from '../IconButton';
import Text from '../Text';
import Separator from '../Separator';

export default {
  title: 'Components/ListItem',
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
        <IconButton >
          <Icon icon={MoreVertIcon} size="sm" color="neutral.20" />
        </IconButton>
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
        <IconButton >
          <Icon icon={MoreVertIcon} size="sm" color="neutral.20" />
        </IconButton>
      </Box>
    </ListItem>
    <Separator margin={0} />
  </>
);
