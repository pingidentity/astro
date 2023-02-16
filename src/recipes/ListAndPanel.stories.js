import React, { useRef, useState } from 'react';
import { FocusScope } from '@react-aria/focus';
import { Item } from '@react-stately/collections';
import AccountIcon from 'mdi-react/AccountIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import MoreVertIcon from 'mdi-react/MoreVertIcon';
import PencilIcon from 'mdi-react/PencilIcon';
import PlusIcon from 'mdi-react/PlusIcon';

import { Box, Icon, IconButton, Link, ListView, Menu, OverlayPanel, PopoverMenu, SearchField, Separator, SwitchField, Tab, Tabs, Text } from '../index';

import { useOverlayPanelState } from '../hooks';

export default {
  title: 'Recipes/List with Panel',
};

const items = [
  {
    email: 'dburkitt5@columbia.edu',
    firstName: 'Nicola',
    lastName: 'Burkitt',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    email: 'idixie2@elegantthemes.com',
    firstName: 'Cacilia',
    lastName: 'Dixie',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    email: 'dfowler0@rambler.ru',
    firstName: 'Stavro',
    lastName: 'Fowler',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    email: 'jgolde8@jimdo.com',
    firstName: 'Celisse',
    lastName: 'Golde',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    email: 'shearst9@answers.com',
    firstName: 'Jeth',
    lastName: 'Hearst',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    email: 'ajinaa@mapquest.com',
    firstName: 'Kaycee',
    lastName: 'Jina',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    email: 'vmalster4@biblegateway.com',
    firstName: 'Lorry',
    lastName: 'Malster',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    email: 'yphipp6@yellowpages.com',
    firstName: 'Stanley',
    lastName: 'Phipp',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    email: 'mskilbeck3@bbc.co.uk',
    firstName: 'Gradey',
    lastName: 'Skilbeck',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    email: 'dstebbing1@msu.edu',
    firstName: 'Marnia',
    lastName: 'Stebbing',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    email: 'lsterley7@lulu.com',
    firstName: 'Joshua',
    lastName: 'Sterley',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    email: 'luttleyb@hugedomains.com',
    firstName: 'Jarrod',
    lastName: 'Uttley',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    email: 'lidelc@yelp.com',
    firstName: 'Andromache',
    lastName: 'Idel',
    hasIcon: true,
    avatar: AccountIcon,
  },
];


const sx = {
  wrapper: {
    px: 'lg',
    py: 'lg',
    bg: 'accent.99',
    height: '900px',
    overflowY: 'scroll',
  },
  searchField: {
    position: 'fixed',
    mb: 'sm',
    width: '400px',
  },
  listElementWrapper: {
    px: 'md',
    bg: 'accent.99',
    justifyContent: 'center',
  },
  separator: {
    bg: 'accent.90',
  },
  tabsWrapper: {
    px: 'lg',
    pt: 'xs',
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  itemLabel: {
    fontSize: 'sm',
    fontWeight: 3,
    lineHeight: '16px',
    mb: 'xs',
  },
  itemValue: {
    fontWeight: 0,
    lineHeight: '18px',
    variant: 'base',
    mb: 'md',
  },
  listElement: {
    wrapper: {
      minHeight: '60px',
    },
    iconWrapper: {
      mr: 'auto',
      alignItems: 'center',
    },
    icon: {
      mr: 'md',
      alignSelf: 'center',
      color: 'accent.40',
    },
    avatar: {
      width: '25px',
      height: '25px',
      mr: 'md',
    },
    title: {
      alignSelf: 'start',
      fontSize: 'md',
    },
    subtitle: {
      fontSize: 'sm',
      my: '1px',
      lineHeight: '16px',
      alignSelf: 'start',
    },
    menuWrapper: {
      alignSelf: 'center',
    },
  },
};


const ListElement = ({ item, onClosePanel }) => {
  return (
    <Box isRow sx={sx.listElement.wrapper}>
      <Box isRow sx={sx.listElement.iconWrapper}>
        <Icon icon={item.avatar} size="md" sx={sx.listElement.icon} />
        <Box>
          <Text variant="bodyStrong" sx={sx.listElement.title}>{item.lastName}, {item.firstName}</Text>
          <Text variant="subtitle" sx={sx.listElement.subtitle}>{item.email}</Text>
        </Box>
      </Box>
      <Box isRow sx={sx.listElement.menuWrapper}>
        <SwitchField aria-label="active user" isDefaultSelected alignSelf="center" mr="sm" />
        <PopoverMenu>
          <IconButton aria-label="more icon button" mr={onClosePanel ? 'sm' : 0}>
            <Icon icon={MoreVertIcon} size="md" />
          </IconButton>
          <Menu >
            <Item key="enable">Enable user</Item>
            <Item key="disable">Disable user</Item>
            <Item key="delete">Delete user</Item>
          </Menu>
        </PopoverMenu>
        {onClosePanel &&
          <IconButton
            aria-label="close icon button"
            onPress={onClosePanel}
          >
            <Icon size="sm" icon={CloseIcon} />
          </IconButton>
        }
      </Box>
    </Box>
  );
};

export const Default = () => {
  const [selectedItemId, setSelectedItemId] = useState();
  const [selectedKeys, setSelectedKeys] = useState();
  const { state: panelState, onClose: onPanelClose } = useOverlayPanelState();
  const panelTriggerRef = useRef();

  const heading = 'Users';
  const description = 'The description of the page. The description of the page. The description of the page. The description of the page. The description of the page. The description of the page. The description of the page. The description of the page. The description of the page.';

  const closePanelHandler = () => {
    onPanelClose(panelState, panelTriggerRef);
    setSelectedItemId(-1);
    setSelectedKeys([]);
  };

  const selectItemHandler = (e) => {
    if (e.size) {
      setSelectedItemId(items.findIndex(item => item.email === e.currentKey));
      setSelectedKeys([e.currentKey]);
      panelState.open();
    } else {
      closePanelHandler();
    }
  };

  return (
    <Box sx={sx.wrapper}>
      <Box>
        <Box
          align="center"
          isRow
          mb="xs"
          role="heading"
          aria-level="1"
        >
          <Text fontSize="xx" fontWeight={3} fontColor="text.primary">
            {heading}
          </Text>
          <IconButton aria-label="icon button" ml="sm" variant="inverted" >
            <Icon icon={PlusIcon} size="sm" />
          </IconButton>
        </Box>
        <Text fontSize="sm" color="text.secondary" fontWeight={0} width="800px">
          {description}
          <Link href="https://uilibrary.ping-eng.com/" sx={{ fontSize: '13px' }}> Learn more</Link>
        </Text>
      </Box>
      <SearchField position="fixed" mb="lg" mt="lg" width="400px" placeholder="Search" aria-label="search" />
      <Separator margin={0} />
      <ListView
        items={items}
        onSelectionChange={selectItemHandler}
        ref={panelTriggerRef}
        selectedKeys={selectedKeys}
      >
        {item => (
          <Item
            key={item.email}
            textValue={item.email}
            hasSeparator
            listItemProps={{ pl: 15, minHeight: 75 }}
          >
            <ListElement item={item} />
          </Item>
        )}
      </ListView>

      <OverlayPanel
        isOpen={panelState.isOpen}
        state={panelState}
        triggerRef={panelTriggerRef}
        p={0}
        size="large"
      >
        {panelState.isOpen &&
          <>
            <FocusScope contain restoreFocus autoFocus>
              <Box sx={sx.listElementWrapper}>
                <ListElement
                  item={selectedItemId >= 0 ? items[selectedItemId] : []}
                  onClosePanel={closePanelHandler}
                />
              </Box>
              <Separator margin={0} sx={sx.separator} />
              <Box sx={sx.tabsWrapper}>
                <Tabs tabListProps={{ justifyContent: 'center' }} tabPanelProps={{ sx: { position: 'relative' } }} >
                  <Tab title="Profile">
                    {selectedItemId >= 0 &&
                      <>
                        <IconButton variant="inverted" aria-label="pencil icon button" sx={sx.iconButton}>
                          <PencilIcon size={20} />
                        </IconButton>
                        <Text sx={sx.itemLabel} variant="base">Full Name</Text>
                        <Text sx={sx.itemValue} variant="base">{items[selectedItemId].firstName} {items[selectedItemId].lastName}</Text>
                        <Text sx={sx.itemLabel} variant="base">First Name</Text>
                        <Text sx={sx.itemValue} variant="base">{items[selectedItemId].firstName}</Text>
                        <Text sx={sx.itemLabel} variant="base">Last Name</Text>
                        <Text sx={sx.itemValue} variant="base">{items[selectedItemId].lastName}</Text>
                        <Text sx={sx.itemLabel} variant="base">Email</Text>
                        <Text sx={sx.itemValue} variant="base">{items[selectedItemId].email}</Text>
                      </>
                    }
                  </Tab>
                  <Tab title="Group Memberships">
                    <Text>
                      Group Memberships
                    </Text>
                  </Tab>
                  <Tab title="Account Info">
                    <Text>
                      Account Info
                    </Text>
                  </Tab>
                </Tabs>
              </Box>
            </FocusScope>
          </>
        }
      </OverlayPanel>
    </Box>
  );
};
