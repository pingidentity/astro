import React, { useCallback, useRef, useState } from 'react';
import { Item } from 'react-stately';
import ArrowCollapse from 'mdi-react/ArrowCollapseIcon';
import ArrowTopRightBottomLeft from 'mdi-react/ArrowTopRightBottomLeftIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import CogIcon from 'mdi-react/CogIcon';

import { useOverlayPanelState } from '../../hooks';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  ColorField,
  IconButton,
  MultivaluesField,
  OverlayPanel,
  OverlayProvider,
  SwitchField,
  Tab,
  Tabs,
  Text,
  TextField,
} from '../../index';
import { pingImg } from '../../utils/devUtils/constants/images';
import { panelSizes } from '../../utils/devUtils/constants/panelSizes';


export default {
  title: 'Components/OverlayPanel',
  component: OverlayPanel,
  argTypes: {
    children: {
      description: 'Overlay panel content.',
      control: 'none',
    },
    size: {
      control: {
        type: 'select',
        options: panelSizes,
      },
      defaultValue: 'medium',
    },
    isOpen: {
      control: 'none',
    },
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

export const Default = ({ ...args }) => {
  const { state, onClose } = useOverlayPanelState();
  const triggerRef = useRef();

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay is open.
    <OverlayProvider>

      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </Text>
      <br />
      <Button
        ref={triggerRef}
        onPress={state.open}
        aria-expanded={state.isOpen}
      >
        Open Panel
      </Button>
      { (state.isOpen || state.isTransitioning)
        && (
        <OverlayPanel
          isOpen={state.isOpen}
          isTransitioning={state.isTransitioning}
          state={state}
          {...args}
          triggerRef={triggerRef}
        >
          <Box>
            <Button
              onPress={() => { onClose(state, triggerRef); }}
              aria-expanded={state.isOpen}
            >
              Close Panel
            </Button>
            <Text pt="md">
              Children render here.
            </Text>
          </Box>
        </OverlayPanel>
        )}
    </OverlayProvider>
  );
};

export const CustomWidth = () => {
  const { state, onClose } = useOverlayPanelState();
  const triggerRef = useRef();

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>

      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </Text>
      <br />
      <Button ref={triggerRef} onPress={state.open} aria-expanded={state.isOpen}>Open Panel</Button>
      { (state.isOpen || state.isTransitioning)
        && (
        <OverlayPanel
          isTransitioning={state.isTransitioning}
          isOpen={state.isOpen}
          state={state}
          triggerRef={triggerRef}
          sx={{ width: '720px' }}
        >
          <Box>
            <Button
              onPress={() => { onClose(state, triggerRef); }}
              aria-expanded={state.isOpen}
            >
              Close Panel
            </Button>
            <Text pt="md">
              Children render here.
            </Text>
          </Box>
        </OverlayPanel>
        )}
    </OverlayProvider>
  );
};

export const Expandable = () => {
  const { state, onClose } = useOverlayPanelState();
  const triggerRef = useRef();
  const [isExpanded, setIsExpanded] = useState(false);

  const sx = {
    overlayPanel: {
      padding: 0,
      transition: 'width 500ms, right 500ms',
    },
    header: {
      height: '110px',
      bg: '#F7F8FD',
      infoAndButtonsContainer: {
        justifyContent: 'space-between',
        padding: '20px 20px 0 20px',
      },
      pingOneAuthorizeContainer: {
        gap: '18px',
        alignItems: 'center',
        width: 'fit-content',
      },
      breadcrumbsContainer: {
        marginLeft: '78px',
        fontSize: 'md',
        fontWeight: 500,
      },
    },
    contentContainer: {
      padding: '15px 25px 0 25px',
    },
    tabs: {
      justifyContent: 'center',
    },
    tabPanel: {
      height: 'calc(100vh - 255px)',
      overflow: 'scroll',
    },
    switchField: {
      rowGap: 'xs',
      display: 'grid !important',
      gridTemplateColumns: 'max-content auto',
      fontSize: 'sm',
      fontWeight: 500,
      color: 'text.secondary',
      '> div': {
        order: 2,
      },
    },
    colorField: {
      width: '30px',
      height: '20px',
    },
    tabContent: {
      gap: 'md',
      width: isExpanded ? '100%' : '400px',
      transition: 'width 500ms',
    },
    footer: {
      marginTop: 'auto',
      padding: '15px 25px',
      button: {
        width: '65px',
        height: '38px',
        border: '0 !important',
      },
    },
  };

  const multivaluesFieldItems = [
    { id: 1, name: 'node 1', key: 'node1' },
    { id: 2, name: 'node 2', key: 'node2' },
  ];

  const onCloseHandler = () => onClose(state, triggerRef);
  const [color, setColor] = useState('#EACE91');
  const handleColorChange = useCallback(({ rgb }) => {
    const { r, b, g, a } = rgb;
    setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
  }, []);

  const header = (
    <Box sx={sx.header}>
      <Box isRow sx={sx.header.infoAndButtonsContainer}>
        <Box isRow sx={sx.header.pingOneAuthorizeContainer}>
          <Avatar src={pingImg} sx={{ width: '40px', height: '40px' }} />
          <Box>
            <Text variant="bodyStrong" fontSize="md">PingOne Authorize</Text>
            <Text variant="subtitle" fontSize="sm">ID: kcdhaweyf2d</Text>
            <Text variant="subtitle" fontSize="sm">ConnectionID: 234UI3fu4hj4itge35553rj3ty4gyeczcb90</Text>
          </Box>
        </Box>
        <Box isRow>
          <IconButton aria-label="settings-icon" size={20}>
            <CogIcon />
          </IconButton>
          <IconButton
            aria-label="expand-icon"
            size={20}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ArrowCollapse /> : <ArrowTopRightBottomLeft />}
          </IconButton>
          <IconButton
            aria-label="close-icon"
            size={20}
            onPress={onCloseHandler}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={sx.header.breadcrumbsContainer}>
        <Breadcrumbs icon={ChevronRightIcon}>
          <Item key="home" data-id="home">
            Capability
          </Item>
          <Item key="editGroups" variant="neutralText" data-id="editGroups">
            Make Decision Request
          </Item>
        </Breadcrumbs>
      </Box>
    </Box>
  );

  const generalTabContent = (
    <Box sx={sx.tabContent}>
      <TextField label="Node Title" defaultValue="The Value of the Text Input" />
      <TextField label="Node Description" defaultValue="The Value of the Text Input" />
      <ColorField value={color} label="Node Background Color" buttonProps={{ sx: sx.colorField }} onChange={handleColorChange} />
      <SwitchField hintText="Example Hint" labelProps={{ sx: sx.switchField }} label="Expire Authentication Token" value="expire-authentication-token" />
      <SwitchField hintText="Example Hint" labelProps={{ sx: sx.switchField }} label="Expire Flow Instance Cache" value="expire-flow-instance-cache" />
      <MultivaluesField
        items={multivaluesFieldItems}
        label="Expire Node Instance Cache List"
        inputProps={{ hintText: 'Example Hint' }}
      >
        {item => (
          <Item key={item.key} data-id={item.name}>
            {item.name}
          </Item>
        )}
      </MultivaluesField>
    </Box>
  );

  const settingsTabContent = (
    <Box sx={sx.tabContent}>
      <SwitchField hintText="Example Hint" labelProps={{ sx: sx.switchField }} label="Expire Authentication Token" value="expire-authentication-token" />
      <SwitchField hintText="Example Hint" labelProps={{ sx: sx.switchField }} label="Expire Flow Instance Cache" value="expire-flow-instance-cache" />
      <SwitchField hintText="Example Hint" labelProps={{ sx: sx.switchField }} label="Expire Node Instance Cache" value="expire-node-instance-cache" />
    </Box>
  );

  const schemaTabContent = (
    <Box sx={sx.tabContent}>
      <TextField hintText="Example Hint" label="Log field Title" defaultValue="The Value of the Text Input" />
      <TextField hintText="Example Hint" label="Log field Description" defaultValue="The Value of the Text Input" />
    </Box>
  );

  const footer = (
    <Box isRow sx={sx.footer}>
      <Button
        onPress={onCloseHandler}
        sx={sx.footer.button}
        variant="primary"
      >
        Save
      </Button>
      <Button
        onPress={onCloseHandler}
        sx={sx.footer.button}
        variant="text"
      >
        Cancel
      </Button>
    </Box>
  );

  return (
    // Application must be wrapped in an OverlayProvider so that it can be hidden from screen
    // readers when an overlay opens.
    <OverlayProvider>
      <Button ref={triggerRef} onPress={state.open} aria-expanded={state.isOpen}>Open Panel</Button>
      { (state.isOpen || state.isTransitioning)
        && (
        <OverlayPanel
          isTransitioning={state.isTransitioning}
          isOpen={state.isOpen}
          state={state}
          triggerRef={triggerRef}
          sx={sx.overlayPanel}
          size={isExpanded ? 'full' : 'medium'}
        >
          {header}
          <Box sx={sx.contentContainer}>
            <Tabs
              tabListProps={sx.tabs}
              tabPanelProps={sx.tabPanel}
            >
              <Tab key="tab1" title="General">
                {generalTabContent}
              </Tab>
              <Tab key="tab2" title="Settings">
                {settingsTabContent}
              </Tab>
              <Tab key="tab3" title="Schema">
                {schemaTabContent}
              </Tab>
            </Tabs>
          </Box>
          {footer}
        </OverlayPanel>
        )}
    </OverlayProvider>
  );
};
