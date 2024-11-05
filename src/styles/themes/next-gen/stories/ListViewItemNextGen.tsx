import React, { Key } from 'react';
import TrashCanOutlineIcon from '@pingux/mdi-react/TrashCanOutlineIcon';
import { ThemeUICSSObject } from 'theme-ui';

import { Badge, Box, Icon, IconTypeExtended, IconWrapper, Item, ListViewItem, ListViewItemMenu, Text } from '../../../../index';

const textSlotContainerStyle = {
  ml: 'md',
  gap: '2px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  flexShrink: '4',
  'div:has > div': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    flexGrow: 4,
  },
} as ThemeUICSSObject;

export interface CustomItemProps {
    iconData?: {
        sx?: {
            color?: string,
            fill?: string,
            backgroundColor?: string,
        }
        icon?: IconTypeExtended
    },
    category?: string,
    title?: string,
    description?: string,
    textValue?: string
    key: Key,
    name: string,
    subtext?: string,
    id: string | number,
    hasSeparator?: boolean,
}

export const TextSlot = (props: {title?: string, category?: string, description?: string}) => {
  const {
    title,
    category,
    description,
  } = props;
  return (
    <Box sx={{ ...textSlotContainerStyle }}>
      <Text textOverflow="ellipsis" fontWeight="2" color="text.secondary">{title}</Text>
      <Text textOverflow="ellipsis">{description}</Text>
      <Badge variant="secondary" label={category} />
    </Box>
  );
};

export const ListViewItemNextGen = (props:{ item: CustomItemProps }) => {
  const { item } = props;
  return (
    <ListViewItem
      {...item}
      data={{
        icon: null,
      }}
      slots={{
        leftOfData: <IconWrapper color="purple" icon={TrashCanOutlineIcon} size="md" title={{ name: 'trash can' }} isCircle />,
        rightOfData: <TextSlot {...item} />,
      }}
      hasSeparator={false}
    >
      <ListViewItemMenu>
        <Item key="enable">
          <Box isRow gap="sm" px="sm" py="xs">
            <Icon icon={TrashCanOutlineIcon} />
            <Text>Delete</Text>
          </Box>
        </Item>
      </ListViewItemMenu>
    </ListViewItem>
  );
};
