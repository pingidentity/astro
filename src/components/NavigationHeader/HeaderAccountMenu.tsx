import React from 'react';
import LogoutVariantIcon from '@pingux/mdi-react/LogoutVariantIcon';

import { Avatar, Box, Button, Icon, Item, Menu, OverlayProvider, PopoverMenu, Section, Text } from '../..';
import useGetTheme from '../../hooks/useGetTheme';
import { AvatarProps, ButtonProps } from '../../types';

import { userDataProps } from './NavigationHeader.stories';

interface HeaderAccountMenuProps {
  userData?: userDataProps
  avatarProps?: AvatarProps
  buttonProps?: ButtonProps
}

const HeaderAccountMenu = (props: HeaderAccountMenuProps) => {
  const { userData, avatarProps, buttonProps } = props;
  const { image, firstName, lastName, email } = userData || {};

  const { icons } = useGetTheme();
  const { MenuDown } = icons;

  return (
    <OverlayProvider>
      <PopoverMenu>
        <Button variant="navigationHeader.accountButton" {...buttonProps}>
          <Box isRow alignItems="center" gap="xs">
            <Avatar src={image} alt="Avatar" aria-label="Avatar" {...avatarProps} />
            <Icon icon={MenuDown} size="16px" title={{ name: 'Menu Up Icon' }} color="text.primary" />
          </Box>
        </Button>
        <Menu p="sm" gap="sm" minWidth="270px">
          <Section key="profile-section">
            <Item key="profile" textValue="profile">
              <Box isRow alignItems="center" gap="md" px="sm" py="xs">
                <Avatar src={image} alt="Avatar" aria-label="Avatar" {...avatarProps} />
                <Box ml="0">
                  <Text as="h5" mb="0" fontWeight="2" color="text.primary">
                    {firstName}
                    {' '}
                    {lastName}
                  </Text>
                  <Text color="text.secondary" fontSize="sm">{email}</Text>
                </Box>
              </Box>
            </Item>
          </Section>
          <Section key="signOut-section">
            <Item key="signOut" textValue="signOut">
              <Box isRow alignItems="center" px="sm" py="xs">
                <Icon icon={LogoutVariantIcon} size="18px" title={{ name: 'Sign Out Icon' }} mr="sm" color="text.primary" />
                <Text color="text.primary">Sign Out</Text>
              </Box>
            </Item>
          </Section>
        </Menu>
      </PopoverMenu>
    </OverlayProvider>
  );
};

export default HeaderAccountMenu;
