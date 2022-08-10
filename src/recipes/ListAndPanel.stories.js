import React, { useRef, useState } from 'react';
import { FocusScope } from '@react-aria/focus';
import { Item } from '@react-stately/collections';
import CloseIcon from 'mdi-react/CloseIcon';
import MoreVertIcon from 'mdi-react/MoreVertIcon';
import PencilIcon from 'mdi-react/PencilIcon';

import { Avatar, Box, IconButton, ListView, Menu, OverlayPanel, PopoverMenu, SearchField, Separator, SwitchField, Tab, Tabs, Text } from '../index';

import { useOverlayPanelState } from '../hooks';
import { pingImg } from '../utils/devUtils/constants/images';

export default {
  title: 'Recipes/List with Panel',
};

const items = [
  {
    email: 'dburkitt5@columbia.edu',
    firstName: 'Nicola',
    lastName: 'Burkitt',
    avatar: pingImg,
  },
  {
    email: 'idixie2@elegantthemes.com',
    firstName: 'Cacilia',
    lastName: 'Dixie',
    avatar: pingImg,
  },
  {
    email: 'dfowler0@rambler.ru',
    firstName: 'Stavro',
    lastName: 'Fowler',
    avatar: pingImg,
  },
  {
    email: 'jgolde8@jimdo.com',
    firstName: 'Celisse',
    lastName: 'Golde',
    avatar: pingImg,
  },
  {
    email: 'shearst9@answers.com',
    firstName: 'Jeth',
    lastName: 'Hearst',
    avatar: pingImg,
  },
  {
    email: 'ajinaa@mapquest.com',
    firstName: 'Kaycee',
    lastName: 'Jina',
    avatar: pingImg,
  },
  {
    email: 'vmalster4@biblegateway.com',
    firstName: 'Lorry',
    lastName: 'Malster',
    avatar: pingImg,
  },
  {
    email: 'yphipp6@yellowpages.com',
    firstName: 'Stanley',
    lastName: 'Phipp',
    avatar: pingImg,
  },
  {
    email: 'mskilbeck3@bbc.co.uk',
    firstName: 'Gradey',
    lastName: 'Skilbeck',
    avatar: pingImg,
  },
  {
    email: 'dstebbing1@msu.edu',
    firstName: 'Marnia',
    lastName: 'Stebbing',
    avatar: pingImg,
  },
  {
    email: 'lsterley7@lulu.com',
    firstName: 'Joshua',
    lastName: 'Sterley',
    avatar: pingImg,
  },
  {
    email: 'luttleyb@hugedomains.com',
    firstName: 'Jarrod',
    lastName: 'Uttley',
    avatar: pingImg,
  },
  {
    email: 'lidelc@yelp.com',
    firstName: 'Andromache',
    lastName: 'Idel',
    avatar: pingImg,
    hasSeparator: false,
  },
];

const ListElement = ({ item, onClosePanel }) => {
  return (
    <Box isRow minHeight="60px">
      <Box isRow mr="auto" alignItems="center" >
        <Avatar mr="md" sx={{ width: '25px', height: '25px' }} src={item.avatar} />
        <Box>
          <Text variant="bodyStrong" alignSelf="start">{item.lastName}, {item.firstName}</Text>
          <Text sx={{ fontSize: 'sm', my: '1px', lineHeight: '16px' }}variant="subtitle" alignSelf="start">{item.email}</Text>
        </Box>
      </Box>
      <Box isRow alignSelf="center">
        <SwitchField aria-label="active user" isDefaultSelected alignSelf="center" mr="sm" />
        <PopoverMenu>
          <IconButton aria-label="more icon button" mr={onClosePanel ? 'sm' : 0}><MoreVertIcon /></IconButton>
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
        ><CloseIcon />
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
    <Box px="lg" py="lg" bg="accent.99">
      <SearchField mb="sm" width="400px" placeholder="Search" aria-label="search" />
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
            hasSeparator={item.hasSeparator}
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
      >
        {panelState.isOpen &&
          <>
            <FocusScope contain restoreFocus autoFocus>
              <Box px="md" bg="accent.99" justifyContent="center">
                <ListElement
                  item={selectedItemId >= 0 ? items[selectedItemId] : []}
                  onClosePanel={closePanelHandler}
                />
              </Box>

              <Separator margin={0} bg="accent.90" />

              <Box px="lg" pt="xs">
                <Tabs tabListProps={{ justifyContent: 'center' }} tabPanelProps={{ sx: { position: 'relative' } }} >
                  <Tab title="Profile">
                    {selectedItemId >= 0 &&
                      <>
                        <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} ><PencilIcon size={20} /></IconButton>
                        <Text sx={{ fontSize: 'sm', fontWeight: 3, lineHeight: '16px' }} variant="base" mb="xs">Full Name</Text>
                        <Text sx={{ fontWeight: 0, lineHeight: '18px' }} variant="base" mb="md">{items[selectedItemId].firstName} {items[selectedItemId].lastName}</Text>
                        <Text sx={{ fontSize: 'sm', fontWeight: 3, lineHeight: '16px' }} variant="base" mb="xs">First Name</Text>
                        <Text sx={{ fontWeight: 0, lineHeight: '18px' }} variant="base" mb="md">{items[selectedItemId].firstName}</Text>
                        <Text sx={{ fontSize: 'sm', fontWeight: 3, lineHeight: '16px' }} variant="base" mb="xs">Last Name</Text>
                        <Text sx={{ fontWeight: 0, lineHeight: '18px' }} variant="base" mb="md">{items[selectedItemId].lastName}</Text>
                        <Text sx={{ fontSize: 'sm', fontWeight: 3, lineHeight: '16px' }} variant="base" mb="xs">Email</Text>
                        <Text sx={{ fontWeight: 0, lineHeight: '18px' }} variant="base" mb="md">{items[selectedItemId].email}</Text>
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
