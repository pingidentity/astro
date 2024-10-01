import React from 'react';
import ChevronDownIcon from '@pingux/mdi-react/ChevronDownIcon';
import LogoutVariantIcon from '@pingux/mdi-react/LogoutVariantIcon';

import { Avatar, Box, Button, Icon, Item, Link, Menu, OverlayProvider, PopoverMenu, Separator, Text } from '../..';
import { AvatarProps } from '../../types';

import { userDataProps } from './NavigationHeader.stories';

interface HeaderAccountMenuProps {
  userData?: userDataProps
  avatarProps?: AvatarProps
}

const HeaderAccountMenu = (props: HeaderAccountMenuProps) => {
  const { userData, avatarProps } = props;

  return (
    <OverlayProvider>
      <PopoverMenu>
        <Button variant="navigationHeader.accountButton">
          <Box isRow alignItems="center" gap="xs">
            <Avatar src={userData?.image} alt="Avatar" aria-label="Avatar" {...avatarProps} />
            <Icon icon={ChevronDownIcon} size="16px" color="gray-800" />
          </Box>
        </Button>
        <Menu variant="navigationHeader.dropdownMenu">
          <Item key="profile">
            <Link href="#" variant="navigationHeader.dropdownMenuItem">
              <Box isRow alignItems="center" gap="md">
                <Avatar src={userData?.image} alt="Avatar" aria-label="Avatar" {...avatarProps} />
                <Box ml="0">
                  <Text as="h5" variant="h5" mb="0">
                    {userData?.firstName}
                    {' '}
                    { userData?.lastName}
                  </Text>
                  <Text color="gray-500" fontSize="sm">{ userData?.email }</Text>
                </Box>
              </Box>
            </Link>
          </Item>
          <Item isSeparator textValue="-" my="sm"><Separator /></Item>
          <Item key="signOut">
            <Link color="gray-700" variant="navigationHeader.dropdownMenuItem">
              <Box isRow alignItems="center">
                <Icon icon={LogoutVariantIcon} size="18px" mr="sm" />
                <Text>Sign Out</Text>
              </Box>
            </Link>
          </Item>
        </Menu>
      </PopoverMenu>
    </OverlayProvider>
  );
};

export default HeaderAccountMenu;
