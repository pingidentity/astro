import React, { useRef, useState } from 'react';
import { FocusScope, useOverlayPosition, useOverlayTrigger } from 'react-aria';
import { useOverlayTriggerState } from 'react-stately';
import ExploreIcon from '@pingux/mdi-react/CompassOutlineIcon';
import GlobeIcon from '@pingux/mdi-react/GlobeIcon';
import HelpCircleOutlineIcon from '@pingux/mdi-react/HelpCircleOutlineIcon';
import MenuDownIcon from '@pingux/mdi-react/MenuDownIcon';
import MenuUpIcon from '@pingux/mdi-react/MenuUpIcon';
import { useLayoutEffect } from '@react-aria/utils';

import {
  Box,
  Button,
  EnvironmentBreadcrumb,
  Icon,
  IconButton,
  Item,
  Link,
  Menu,
  NavBar,
  NavBarItem,
  NavBarItemButton,
  NavBarSection,
  OverlayProvider,
  PopoverContainer,
  PopoverMenu,
  Separator,
  Text,
} from '../index';
import { data, logo, PersonIcon, secondData, thirdData } from '../styles/templates/Nav/NavData';
import { FIGMA_LINKS } from '../utils/designUtils/figmaLinks.ts';

export default {
  title: 'Recipes/Multipage Popup',
  parameters: {
    backgrounds: {
      default: 'accent',
      values: [{ name: 'accent', value: 'accent.99' }],
    },
  },
};

const dataPopUp = [
  {
    'data-id': 'orchestrate',
    key: 'Orchestrate',
    heading: 'Orchestrate',
    children: [
      <NavBarItemButton
        key="PingOne DaVinci"
        id="PingOne DaVinci"
      >
        <b>PingOne </b>
        DaVinci
      </NavBarItemButton>,
    ],
  },
];

const secondDataPopUp = [
  {
    'data-id': 'threat-protection',
    key: 'Threat Protection',
    heading: 'Threat Protection',
    children: [
      <NavBarItemButton
        key="protect"
        id="protect"
      >
        <b>PingOne </b>
        Risk
      </NavBarItemButton>,
      <NavBarItemButton
        key="Api Intel"
        id="Api Intel"
      >
        <b>PingOne </b>
        API Intelligence
      </NavBarItemButton>,
      <NavBarItemButton
        key="Intel for Api"
        id="Intel for Api"
      >
        <b>Ping </b>
        Intelligence for APIs
      </NavBarItemButton>,
    ],
  },
];

const thirdDataPopUp = [
  {
    'data-id': 'threat-protection',
    key: 'Identity',
    heading: 'Identity',
    children: [
      <NavBarItemButton
        key="verify"
        id="verify"
      >
        <b>PingOne </b>
        Verify
      </NavBarItemButton>,
      <NavBarItemButton
        key="credentials"
        id="credentials"
      >
        <b>PingOne </b>
        Crendentials
      </NavBarItemButton>,
      <NavBarItemButton
        key="directory"
        id="directory"
      >
        <b>Ping</b>
        Directory
      </NavBarItemButton>,
      <NavBarItemButton
        key="sso1"
        id="sso1"
      >
        <b>Ping One </b>
        SSO
      </NavBarItemButton>,
    ],
  },
];

const fourthDataPopUp = [
  {
    'data-id': 'threat-protection',
    key: 'Authenticate',
    heading: 'Authenticate',
    children: [
      <NavBarItemButton
        key="sso"
        id="sso"
      >
        <b>PingOne </b>
        SSO
      </NavBarItemButton>,
      <NavBarItemButton
        key="federate"
        id="federate"
      >
        <b>Ping</b>
        Federate
      </NavBarItemButton>,
      <NavBarItemButton
        key="MFA"
        id="MFA"
      >
        <b>PingOne </b>
        MFA
      </NavBarItemButton>,
      <NavBarItemButton
        key="id"
        id="id"
      >
        <b>Ping</b>
        ID
      </NavBarItemButton>,
      <NavBarItemButton
        key="central"
        id="central"
      >
        <b>Ping</b>
        Central
      </NavBarItemButton>,
    ],
  },
];

const fifthDataPopUp = [
  {
    'data-id': 'authorize',
    key: 'Authorize',
    heading: 'Authorize',
    children: [
      <NavBarItemButton
        key="PingOne Authorize"
        id="PingOne Authorize"
      >
        <b>PingOne </b>
        Authorize
      </NavBarItemButton>,
      <NavBarItemButton
        key="Ping Authorize"
        id="Ping Authorize"
      >
        <b>Ping</b>
        Authorize
      </NavBarItemButton>,
      <NavBarItemButton
        key="Ping Access"
        id="Ping Access"
      >
        <b>Ping</b>
        Access
      </NavBarItemButton>,
    ],
  },
];

const SideNav = ({ setSelectedKey, selectedKey }) => (
  <NavBar
    setSelectedKey={setSelectedKey}
    selectedKey={selectedKey}
  >
    <Box padding="md" key="top-logo-parent">
      <Link
        href="https://pingidentity.com"
        target="_blank"
        aria-label="home link"
      >
        {logo}
      </Link>
    </Box>
    <Separator marginTop="lg" marginBottom="sm" />
    <Box variant="navBar.sectionContainer" paddingBottom="xl" key="first-section-container">
      <NavBarItem
        id="Overview"
        key="Overview"
        text="Overview"
        icon={GlobeIcon}
      />
      <NavBarSection items={data} hasSeparator />
      <NavBarSection items={secondData} hasSeparator title="PingOne Services" />
      <NavBarSection items={thirdData} />
    </Box>
  </NavBar>
);

const CustomPopover = () => {
  const [selectedKey, setSelectedKey] = useState('PingOne DaVinci');
  const triggerRef = useRef();
  const overlayRef = useRef();

  const state = useOverlayTriggerState({});

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    state,
    triggerRef,
  );

  const { overlayProps: positionProps, placement, updatePosition } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: 'bottom right',
    isOpen: state.isOpen,
    offset: 6,
  });

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      updatePosition();
    });
  }, [updatePosition]);

  const style = {
    ...positionProps.style,
    width: '760px',
    minWidth: '760px',
    height: '800px',
    boxShadow: 'none !important',
  };

  const onEscCloseNav = e => {
    if (e.key === 'Escape') {
      state.close();
    }
  };

  return (
    <Box>
      <Button
        ref={triggerRef}
        variant="headerBar"
        {...triggerProps}
      >
        <Box isRow alignItems="center">
          <Icon icon={ExploreIcon} size="sm" title={{ name: 'Explore Icon' }} />
          <Text color="neutral.30" fontSize="md" fontWeight={1} mx={7} variant="textEllipsis">
            Explore
          </Text>
          <Icon icon={state.isOpen ? MenuUpIcon : MenuDownIcon} mr="sm" size="sm" title={{ name: state.isOpen ? 'Menu Up Icon' : 'Menu Down Icon' }} />
        </Box>
      </Button>
      <PopoverContainer
        {...overlayProps}
        {...positionProps}
        isOpen={state.isOpen}
        hasNoArrow
        ref={overlayRef}
        placement={placement}
        style={style}
        onClose={state.close}
        isDismissable
        isNotClosedOnBlur
      >
        <FocusScope autoFocus contain restoreFocus>
          <Box
            sx={{
              height: '100%',
            }}
          >
            <NavBar variant="popupNav" hasRestoreFocus={false} setSelectedKey={setSelectedKey} selectedKey={selectedKey}>
              <Box
                variant="navBar.popUpSectionContainer"
                paddingBottom="xl"
                key="first-section-container"
              >
                <NavBarSection items={dataPopUp} data-id="third-nav-bar-section" onKeyDown={onEscCloseNav} />
                <NavBarSection items={secondDataPopUp} data-id="third-nav-bar-section" onKeyDown={onEscCloseNav} />
                <NavBarSection items={thirdDataPopUp} data-id="third-nav-bar-section" onKeyDown={onEscCloseNav} />
                <NavBarSection items={fourthDataPopUp} data-id="third-nav-bar-section" onKeyDown={onEscCloseNav} />
                <NavBarSection items={fifthDataPopUp} data-id="third-nav-bar-section" onKeyDown={onEscCloseNav} />
              </Box>
            </NavBar>
            <Box
              sx={{
                marginLeft: '185px',
                height: '100%',
                width: 'calc(100% - 185px)',
                backgroundColor: 'white',
                padding: 'lg',
              }}
            >
              <Text as="h2" variant="H2">
                {selectedKey}
              </Text>
              <br />
              <Button>Example of focusable element in the body</Button>
            </Box>
          </Box>
        </FocusScope>
      </PopoverContainer>
    </Box>
  );
};

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
      px="md"
      bg="white"
      height="40px"
      isRow
      alignItems="center"
      justifyContent="space-between"
    >
      <EnvironmentBreadcrumb name="Globochem" />
      <Box isRow>
        <Box isRow alignItems="center">
          <Icon icon={HelpCircleOutlineIcon} size={20} color="neutral.30" title={{ name: 'Help Circle Outline Icon' }} />
          <CustomPopoverMenu />
        </Box>
        <Rectangle />
        <Box isRow color="neutral.30" alignItems="center" id="customparent">
          <CustomPopover />
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

export const Default = () => {
  const [selectedKey, setSelectedKey] = useState('Overview');

  return (
    <Box bg="accent.99" height="100vh">
      <SideNav setSelectedKey={setSelectedKey} selectedKey={selectedKey} />
      <HeaderBar isOpen={false} />
    </Box>
  );
};


Default.decorators = [
  Story => (
    <Box sx={{ margin: '-50px' }}>
      <Story />
    </Box>
  ),
];

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.multiPagePopup.default,
  },
  layout: 'fullscreen',
};
