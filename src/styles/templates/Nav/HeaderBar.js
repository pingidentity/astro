import React, { useState } from 'react';
import ExploreIcon from '@pingux/mdi-react/CompassOutlineIcon';
import HelpCircleOutlineIcon from '@pingux/mdi-react/HelpCircleOutlineIcon';
import MenuDownIcon from '@pingux/mdi-react/MenuDownIcon';

import { Default as EnvironmentBreadcrumb } from '../../../components/EnvironmentBreadcrumb/EnvironmentBreadcrumb.stories';
import {
  Box,
  Icon,
  IconButton,
  Item,
  Menu,
  OverlayProvider,
  PopoverMenu,
  Text,
} from '../../../index';

import { PersonIcon } from './NavData';

const CustomPopoverMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <OverlayProvider>
      <PopoverMenu onOpenChange={setIsOpen}>
        <IconButton aria-label="default icon button">
          <Icon
            icon={MenuDownIcon}
            size="xs"
            color="neutral.30"
            sx={isOpen ? { transform: 'rotate(180deg)' } : null}
            title={{ name: 'Menu Down Icon' }}
          />
        </IconButton>
        <Menu>
          <Item key="option1">First Option</Item>
          <Item key="option2">Second Option</Item>
          <Item key="option3">Third Option</Item>
        </Menu>
      </PopoverMenu>
    </OverlayProvider>
  );
};

const HeaderBar = () => {
  const Rectangle = () => (
    <Box width="1px" height={30} bg="neutral.80" mx={25} />
  );

  return (
    <Box
      ml={230}
      px={15}
      bg="white"
      height="40px"
      isRow
      alignItems="center"
      justifyContent="space-between"
    >
      <EnvironmentBreadcrumb />
      <Box isRow>
        <Box isRow alignItems="center">
          <Icon icon={HelpCircleOutlineIcon} size={20} color="neutral.30" title={{ name: 'Help Circle Outline Icon' }} />
          <CustomPopoverMenu />
        </Box>
        <Rectangle />
        <Box isRow color="neutral.30" alignItems="center">
          <Icon icon={ExploreIcon} size={20} title={{ name: 'Explore Icon' }} />
          <Text color="neutral.30" fontSize="md" fontWeight={1} mx={7} variant="textEllipsis">
            Explore
          </Text>
          <CustomPopoverMenu />
        </Box>
        <Rectangle />
        <Box isRow color="neutral.30" alignItems="center">
          <Icon icon={PersonIcon} size={20} />
          <Text color="neutral.30" fontSize="md" fontWeight={1} mx={7} variant="textEllipsis">
            Alyssa Chambers
          </Text>
          <CustomPopoverMenu />
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderBar;
