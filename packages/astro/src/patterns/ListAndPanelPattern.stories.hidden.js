import React, { useRef, useState } from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import Close from '@pingux/mdi-react/CloseIcon';
import CreateIcon from '@pingux/mdi-react/CreateIcon';
import DotsVertical from '@pingux/mdi-react/DotsVerticalIcon';

import { useOverlayPanelState } from '../hooks';
import {
  Avatar,
  Box,
  Icon,
  IconButton,
  ListItem,
  OverlayPanel,
  OverlayProvider,
  SearchField,
  Separator,
  SwitchField,
  Tab,
  Tabs,
  Text,
} from '../index';
import { pingImg } from '../utils/devUtils/constants/images';

export default {
  title: 'Design Patterns/List And Panel',
};

const usersInfo = [
  {
    fullname: 'Fons, Vernall',
    firstname: 'Fons',
    lastname: 'Vernall',
    email: 'fvernall0@google.it',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    fullname: 'Priya, Ponnappa',
    firstname: 'Priya',
    lastname: 'Ponnappa',
    email: 'Priyaponnappa0w@google.it',
    hasIcon: false,
    avatar: pingImg,
  },
  {
    fullname: 'French, Tamzyn',
    firstname: 'French',
    lastname: 'Tamzyn',
    email: 'frenchtamzyn03@google.it',
    hasIcon: false,
    avatar: pingImg,
  },
  {
    fullname: 'John, Stone',
    firstname: 'John',
    lastname: 'Stone',
    email: 'johnsstone2@google.it',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    fullname: 'Ang, Li',
    firstname: 'Ang',
    lastname: 'Li',
    email: 'Angli022@google.it',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    fullname: 'Eugenia, Anders',
    firstname: 'Eugenia',
    lastname: 'Anders',
    email: 'EugeniaaAnders2@google.it',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    fullname: 'Trevor, Virtue',
    firstname: 'Trevor',
    lastname: 'Virtue',
    email: 'TrevorVirtue33@google.it',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    fullname: 'Salome, Simoes',
    firstname: 'Salome',
    lastname: 'Simoes',
    email: 'SalomesimoesS@google.it',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    fullname: 'Verona, Blair',
    firstname: 'Verona',
    lastname: 'Blair',
    email: 'VeronaBlair01@google.it',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    fullname: 'Tarryn, Campbell-Gillies',
    firstname: 'Tarryn',
    lastname: 'Campbell-Gillies',
    email: 'tarryncampbellGillies@google.it',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    fullname: 'Daly, Harry',
    firstname: 'Daly',
    lastname: 'Harry',
    email: 'Daly93Harry@google.it',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    fullname: 'Dallas, Potter',
    firstname: 'Dallas',
    lastname: 'Potter',
    email: 'DallasPotter94@google.it',
    hasIcon: true,
    avatar: AccountIcon,
  },
  {
    fullname: 'Alexander, Crawford',
    firstname: 'Alexander',
    lastname: 'Crawford',
    email: 'alexCrawford011@google.it',
    hasIcon: true,
    avatar: AccountIcon,
  },
];

const sx = {
  mainBox: {
    bg: 'accent.99',
  },
  contentBox: {
    p: 'md',
    m: 'sm',
    'justifyContent': 'center',
    height: '900px',
    overflowY: 'scroll',
  },
  searchFieldStyle: {
    mb: 'sm',
  },
  searchFieldStyleProps: {
    variant: 'input.small',
    py: '11px',
    pl: '42px',
    pr: '47px',
    height: '40px',
    width: '400px',
  },
  listItemBoxStyle: {
    alignSelf: 'center',
    mr: 'auto',
  },
  emailBoxStyle: {
    lineHeight: '15.51px',
  },
  iconStyle: {
    alignSelf: 'center',
    mr: 'sm',
    color: 'accent.40',
  },
  avatarStyle: {
    mr: 'md',
    width: '25px',
    height: '25px',
  },
  subtitleTextStyle: {
    mt: '1',
  },
  switchFieldStyle: {
    mt: 'xs',
  },
  dotsVerticalIcon: {
    color: 'neutral.20',
  },
  closeIconStyle: {
    color: 'neutral.20',
  },
  separatorStyle: {
    m: '0',
    bg: 'accent.90',
  },
  overlayPanelStyle: {
    p: '0',
  },
  overlayPanelListItemBox: {
    width: '100%',
  },
  listItemInPanelStyle: {
    justifyContent: 'space-between',
  },
  tabsBox: {
    px: 'md',
  },
  tabsListPropsStyle: {
    justifyContent: 'center',
    width: '100%',
  },
  tabsCreateIconButton: {
    ml: 'auto',
  },
  tabsBoldText: {
    mb: 'sm',
    lineHeight: '15.87px',
    fontWeight: '3',
    fontSize: 'sm',
    height: '16px',
  },
  tabsFirstAndLastNameText: {
    mb: 'sm',
    lineHeight: '15.87px',
    fontWeight: '3',
    fontSize: 'sm',
    width: '68px',
    height: '16px',
  },
  tabsEmailText: {
    mb: 'sm',
    lineHeight: '15.87px',
    fontWeight: '3',
    fontSize: 'sm',
    width: '35px',
    height: '16px',
  },
  tabsSelectedItemText: {
    mb: 'sm',
    height: '18px',
    fontWeight: '0',
    fontSize: 'md',
    lineHeight: '17.89px',
  },
};

export const Default = () => {
  const [items] = useState(usersInfo);
  const [selected, setSelected] = useState(null);
  const { state, onClose } = useOverlayPanelState();
  const triggerRef = useRef();
  return (
    <OverlayProvider>
      <Box sx={sx.mainBox}>
        <Box sx={sx.contentBox}>
          <SearchField
            controlProps={{
              sx: sx.searchFieldStyleProps,
            }}
            containerProps={{
              sx: sx.searchFieldStyle,
            }}
            position="fixed"
            aria-label="Search"
            placeholder="Search"
          />
          {items.map(person => (
            <Box key={person.email} sx={sx.emailBoxStyle}>
              <ListItem
                name={person.fullname}
                onClick={() => {
                  state.toggle();
                  setSelected(person);
                }}
              >
                <>
                  <Box isRow sx={sx.listItemBoxStyle}>
                    {person.hasIcon
                      ? <Icon icon={person.avatar} sx={sx.iconStyle} size={24} title={{ name: 'Avatar Icon' }} />
                      : <Avatar sx={sx.avatarStyle} src={person.avatar} />}
                    <Box>
                      <Text variant="itemTitle">{person.fullname}</Text>
                      <Text sx={sx.subtitleTextStyle} variant="itemSubtitle">
                        {person.email}
                      </Text>
                    </Box>
                  </Box>
                  <Box>
                    <SwitchField
                      containerProps={{
                        sx: sx.switchFieldStyle,
                      }}
                      aria-label="active user"
                      isDefaultSelected
                      label=""
                      value="my-switch"
                    />
                  </Box>
                  <Box alignSelf="center" isRow>
                    <IconButton aria-label="Dots Vertical Icon">
                      <Icon
                        icon={DotsVertical}
                        title={{ name: 'Dots Vertical Icon' }}
                        sx={sx.dotsVerticalIcon}
                        size={24}
                      />
                    </IconButton>
                  </Box>
                </>
              </ListItem>
              <Separator sx={sx.separatorStyle} />
            </Box>
          ))}
        </Box>
        {state.isOpen && (
          <OverlayPanel
            isOpen={state.isOpen}
            state={state}
            triggerRef={triggerRef}
            sx={sx.overlayPanelStyle}
          >
            <Box>
              <Box isRow sx={sx.overlayPanelListItemBox}>
                <ListItem
                  name={selected.fullname}
                  sx={sx.listItemInPanelStyle}
                >
                  <Box isRow>
                    {selected.hasIcon
                      ? <Icon icon={selected.avatar} sx={sx.iconStyle} size={24} title={{ name: 'Avatar Icon' }} />
                      : <Avatar sx={sx.avatarStyle} src={selected.avatar} />}
                    <Box>
                      <Text variant="itemTitle">{selected.fullname}</Text>
                      <Text sx={sx.subtitleTextStyle} variant="itemSubtitle">
                        {selected.email}
                      </Text>
                    </Box>
                  </Box>
                  <Box isRow alignSelf="center">
                    <SwitchField
                      aria-label="active user"
                      isDefaultSelected
                      label=""
                      value="my-switch"
                      justifyContent="center"
                    />
                    <IconButton aria-label="Dots Vertical Icon">
                      <Icon icon={DotsVertical} sx={sx.dotsVerticalIcon} size={24} title={{ name: 'Dots Vertical Icon' }} />
                    </IconButton>
                    <IconButton
                      aria-label="Close Icon Button"
                      onPress={() => {
                        onClose(state, triggerRef);
                      }}
                    >
                      <Icon icon={Close} sx={sx.closeIconStyle} size={24} title={{ name: 'Close Icon' }} />
                    </IconButton>
                  </Box>
                </ListItem>
              </Box>
              <Box sx={sx.tabsBox}>
                <Tabs
                  items={items}
                  tabListProps={{
                    sx: sx.tabsListPropsStyle,
                  }}
                >
                  <Tab key="tab1" title="Profile" aria-label="Tab 1">
                    <Box>
                      <IconButton
                        aria-label="Create Icon"
                        variant="inverted"
                        sx={sx.tabsCreateIconButton}
                      >
                        <Icon icon={CreateIcon} title={{ name: 'Create Icon' }} />
                      </IconButton>
                    </Box>
                    <Text sx={sx.tabsBoldText}>
                      Full Name
                    </Text>
                    <Text sx={sx.tabsSelectedItemText} aria-label="Selected Fullname">{selected.fullname}</Text>
                    <Text sx={sx.tabsBoldText}>
                      First Name
                    </Text>
                    <Text sx={sx.tabsSelectedItemText} aria-label="Selected Firstname">{selected.firstname}</Text>
                    <Text sx={sx.tabsBoldText}>
                      Last Name
                    </Text>
                    <Text sx={sx.tabsSelectedItemText} aria-label="Selected Lastname">{selected.lastname}</Text>
                    <Text sx={sx.tabsBoldText}>
                      Email
                    </Text>
                    <Text sx={sx.tabsSelectedItemText} aria-label="Selected Email">{selected.email}</Text>
                  </Tab>
                  <Tab key="tab2" title="Group Memberships" aria-label="Tab 2">
                    <Text>Placeholder content for group membership tab</Text>
                  </Tab>
                  <Tab key="tab3" title="Account Info" aria-label="Tab 3">
                    <Text>Placeholder content for account info tab</Text>
                  </Tab>
                </Tabs>
              </Box>
            </Box>
          </OverlayPanel>
        )}
      </Box>
    </OverlayProvider>
  );
};
