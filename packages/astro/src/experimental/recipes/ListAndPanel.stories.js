import React, { useRef, useState } from 'react';
import { FocusScope } from 'react-aria';
import { Item } from 'react-stately';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import CloseIcon from '@pingux/mdi-react/CloseIcon';
import MoreVertIcon from '@pingux/mdi-react/MoreVertIcon';
import PencilIcon from '@pingux/mdi-react/PencilIcon';
import PlusIcon from '@pingux/mdi-react/PlusIcon';

import { useOverlayPanelState } from '../../hooks';
import useOverlappingMenuHoverState from '../../hooks/useOverlappingMenuHoverState';
import {
  Box,
  Icon,
  IconButton,
  Link,
  ListItemMenu,
  ListItemSwitchField,
  ListView,
  Menu,
  OverlayPanel,
  PopoverMenu,
  SearchField,
  Separator,
  StyledListItem,
  SwitchField,
  Tab,
  Tabs,
  Text,
} from '../../index';

import { items } from './items';

export default {
  title: 'Experimental/Recipes/ListAndPanel',
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

const sx = {
  wrapper: {
    px: 'lg',
    py: 'lg',
    bg: 'accent.99',
    height: '900px',
    overflowY: 'scroll',
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
    mb: 'md',
  },
  panelHeader: {
    container: {
      bg: 'accent.99',
      minHeight: 58,
      ml: 0,
      pl: 14,
      pr: 'xs',
    },
    controls: {
      alignSelf: 'center',
      ml: 'auto',
      pr: 'sm',
    },
    details: {
      alignItems: 'center',
    },
    subtitle: {
      alignSelf: 'start',
      fontSize: 'sm',
      lineHeight: '16px',
      my: '1px',
    },
    title: {
      alignSelf: 'start',
      fontSize: 'md',
    },
    wrapper: {
      cursor: 'pointer',
      display: 'flex',
      flex: '1 1 0px',
      ml: 'md',
    },
  },
};

const heading = 'Users';
const description = 'The description of the page. The description of the page. The description of the page. The description of the page. The description of the page. The description of the page. The description of the page. The description of the page. The description of the page.';
const title = (
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
      <IconButton aria-label="icon button" ml="sm" variant="inverted">
        <Icon icon={PlusIcon} size="sm" />
      </IconButton>
    </Box>
    <Text fontSize="sm" color="text.secondary" fontWeight={0} width="800px">
      {description}
      <Link href="https://uilibrary.ping-eng.com/" sx={{ fontSize: '13px' }}> Learn more</Link>
    </Text>
  </Box>
);

export const ListAndPanel = () => {
  // Example of items data structure
  // const items = [
  //   {
  //     email: 'dburkitt5@columbia.edu',
  //     firstName: 'Nicola',
  //     lastName: 'Burkitt',
  //     hasIcon: true,
  //     icon: AccountIcon,
  //     linkProps: { href: 'https://pingidentity.com/' },
  //   },
  // ]

  const [selectedItemId, setSelectedItemId] = useState();
  const [selectedKeys, setSelectedKeys] = useState();
  const { state: panelState, onClose: onPanelClose } = useOverlayPanelState();
  const panelTriggerRef = useRef();


  const closePanelHandler = () => {
    onPanelClose(panelState, panelTriggerRef);
    setSelectedItemId(-1);
    setSelectedKeys([]);
  };

  const selectItemHandler = e => {
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
      {title}
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
            hasSeparator={item.hasSeparator}
            // ListView wraps ListItems with padding and height styles, when using the
            // StyledListItem use the `listViewItem.styledListItem` variant to override this.
            listItemProps={{ variant: 'listViewItem.styledListItem' }}
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
        {panelState.isOpen
          && (
          <FocusScope contain restoreFocus autoFocus>
            <PanelHeader
              item={selectedItemId >= 0 ? items[selectedItemId] : []}
              onClosePanel={closePanelHandler}
            />
            <Separator margin={0} sx={sx.separator} />
            <Box sx={sx.tabsWrapper}>
              <Tabs tabListProps={{ justifyContent: 'center' }} tabPanelProps={{ sx: { position: 'relative' } }}>
                <Tab title="Profile">
                  {selectedItemId >= 0
              && (
              <>
                <IconButton variant="inverted" aria-label="pencil icon button" sx={sx.iconButton}>
                  <Icon icon={PencilIcon} size="sm" />
                </IconButton>
                <Text sx={sx.itemLabel}>Full Name</Text>
                <Text sx={sx.itemValue}>
                  {items[selectedItemId].firstName}
                  {' '}
                  {items[selectedItemId].lastName}
                </Text>
                <Text sx={sx.itemLabel}>First Name</Text>
                <Text sx={sx.itemValue}>{items[selectedItemId].firstName}</Text>
                <Text sx={sx.itemLabel}>Last Name</Text>
                <Text sx={sx.itemValue}>{items[selectedItemId].lastName}</Text>
                <Text sx={sx.itemLabel}>Email</Text>
                <Text sx={sx.itemValue}>{items[selectedItemId].email}</Text>
              </>
              )}
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
          )}
      </OverlayPanel>
    </Box>
  );
};

export const ListElement = ({ item = { email: '', icon: AccountIcon, firstName: 'John', lastName: 'Doe' } }) => {
  const listItemRef = useRef();

  const {
    handleHoverEnd,
    handleHoverStart,
    handleMenuHoverEnd,
    handleMouseMove,
    isHovered,
  } = useOverlappingMenuHoverState({ listItemRef });

  const { icon, email, firstName, lastName, linkProps } = item;
  const text = `${lastName}, ${firstName}`;

  return (
    <StyledListItem
      details={{ icon, subtext: email, text }}
      isHovered={isHovered}
      onHoverEnd={handleHoverEnd}
      onHoverStart={handleHoverStart}
      onMouseMove={handleMouseMove}
      linkProps={linkProps}
      ref={listItemRef}
    >
      <ListItemSwitchField />
      <ListItemMenu
        onAction={handleHoverEnd}
        onHoverEnd={handleMenuHoverEnd}
        onHoverStart={handleHoverStart}
      >
        <Item key="enable">Enable user</Item>
        <Item key="disable">Disable user</Item>
        <Item key="delete">Delete user</Item>
      </ListItemMenu>
    </StyledListItem>
  );
};

export const PanelHeader = ({ item = { email: '', icon: AccountIcon, firstName: 'John', lastName: 'Doe' }, onClosePanel }) => {
  const { email, firstName, lastName } = item;
  const text = `${lastName}, ${firstName}`;

  return (
    <Box sx={sx.panelHeader.container}>
      <Box isRow sx={sx.panelHeader.wrapper}>
        <Box isRow sx={sx.panelHeader.details}>
          <Box>
            <Text variant="bodyStrong" sx={sx.panelHeader.title}>
              {text}
            </Text>
            <Text variant="subtitle" sx={sx.panelHeader.subtitle}>{email}</Text>
          </Box>
        </Box>
        <Box isRow sx={sx.panelHeader.controls}>
          <SwitchField
            aria-label="active user"
            isDefaultSelected
            alignSelf="center"
            mr="xs"
          />
          <PopoverMenu>
            <IconButton aria-label="more">
              <Icon icon={MoreVertIcon} size="md" />
            </IconButton>
            <Menu>
              <Item key="enable">Enable user</Item>
              <Item key="disable">Disable user</Item>
              <Item key="delete">Delete user</Item>
            </Menu>
          </PopoverMenu>
          <IconButton
            aria-label="close icon button"
            onPress={onClosePanel}
          >
            <Icon size="sm" icon={CloseIcon} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
