import React, { useRef, useState } from 'react';
import { FocusScope } from 'react-aria';
import { Item } from 'react-stately';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import ChevronRightIcon from '@pingux/mdi-react/ChevronRightIcon';
import PlusIcon from '@pingux/mdi-react/PlusIcon';

import { useOverlappingMenuHoverState, useOverlayPanelState } from '../hooks';
import {
  AccordionGroup,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  ButtonBar,
  EditButton,
  Icon,
  IconButton,
  Image,
  ImageUploadField,
  Link,
  ListView,
  ListViewItem,
  ListViewItemMenu,
  ListViewItemSwitchField,
  OverlayPanel,
  PanelHeader,
  PanelHeaderCloseButton,
  PanelHeaderMenu,
  PanelHeaderSwitchField, SearchField,
  SelectField,
  Separator,
  Tab,
  Tabs,
  Text,
  TextField,
} from '../index';
import { FIGMA_LINKS } from '../utils/designUtils/figmaLinks';
import UserImage from '../utils/devUtils/assets/UserImage.png';

import { colorBlockButtons, editData, items, personalData } from './items';
import { AddAttributeButton, ColorBlockButton, LabelValuePairs } from './PanelContent.stories';

export default {
  title: 'Recipes/List And Panel',
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
    data: {
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
  /* Example of items data structure
  const items = [
    {
      email: 'dburkitt5@columbia.edu',
      firstName: 'Nicola',
      lastName: 'Burkitt',
      icon: AccountIcon,
    },
  ] */

  const [selectedItemId, setSelectedItemId] = useState();
  const [selectedKeys, setSelectedKeys] = useState();
  const [isEditPanel, setEditPanel] = useState(false);
  const { state: panelState, onClose: onPanelClose } = useOverlayPanelState();
  const panelTriggerRef = useRef();

  const closePanelHandler = () => {
    onPanelClose(panelState, panelTriggerRef);
    setSelectedItemId(-1);
    setSelectedKeys([]);
    setEditPanel(false);
  };

  const selectItemHandler = e => {
    if (e.size) {
      setSelectedItemId(items.findIndex(item => item.email === e.currentKey));
      setSelectedKeys([e.currentKey]);
      setEditPanel(false);
      panelState.open();
    } else {
      closePanelHandler();
    }
  };

  const renderProfileTab = selectedItemId >= 0
    && (
      <>
        <Box isRow gap="md" mb="20px">
          {colorBlockButtons.map(tileData => (
            <ColorBlockButton buttonData={tileData} key={`${tileData.text}-key`} />
          ))}
        </Box>
        <Box isRow justifyContent="space-between">
          <AccordionGroup
            defaultExpandedKeys={Object.keys(personalData).map(item => personalData[item].key)}
            labelHeadingTag="h2"
          >
            {Object.keys(personalData).map(item => (
              <Item
                data-id={personalData[item].label}
                key={personalData[item].key}
                label={personalData[item].label}
                textValue={personalData[item].label}
              >
                {personalData[item].image
                  ? (
                    <Box isRow gap="md">
                      <Image src={UserImage} alt="user" />
                      <LabelValuePairs fields={personalData[item].fields} />
                    </Box>
                  )
                  : <LabelValuePairs fields={personalData[item].fields} />}
                {personalData[item].badges && (
                  <Box isRow gap="sm">
                    {personalData[item].badges.map(badge => (
                      <Badge label={badge} variant="defaultBadge" key={`${badge}-key`} />
                    ))}
                  </Box>
                )}
              </Item>
            ))}
          </AccordionGroup>
          <EditButton size="lg" onPress={() => setEditPanel(!isEditPanel)} />
        </Box>
      </>
    );

  const tabs = [
    { name: 'Profile', children: renderProfileTab },
    { name: 'Groups', children: 'Groups' },
    { name: 'Roles', children: 'Roles' },
    {
      name: 'Services',
      list: [
        { key: 'service1', name: 'Service 1', children: 'Service 1', role: 'listitem' },
        { key: 'service2', name: 'Service 2', children: 'Service 2', role: 'listitem' },
      ],
    },
    { name: 'API', children: 'API' },
  ];

  const renderDisplayPanel = selectedItemId >= 0 && (
    <Box sx={sx.tabsWrapper}>
      <Tabs items={tabs} mode="list" tabListProps={{ justifyContent: 'center', mb: 'lg' }} tabPanelProps={{ sx: { position: 'relative' } }}>
        {item => (
          <Tab key={item.name} title={item.name} {...item}>
            {item.children}
          </Tab>
        )}
      </Tabs>
    </Box>
  );

  const renderHeader = () => {
    const selectedItem = items[selectedItemId];
    if (selectedItem) {
      const data = {
        fname: selectedItem.firstName,
        lname: selectedItem.lastName,
        subtext: selectedItem.email,
        icon: selectedItem.icon,
        personalInfo: {
          image: personalData.personalInfo.image,
        },
      };
      return (
        <OverlayPanelHeader
          headerData={data}
          isEditPanel={isEditPanel}
          closePanelHandler={closePanelHandler}
        />
      );
    }

    return null;
  };

  const renderEditPanel = selectedItemId >= 0 && (
    <>
      <Box p="lg" pb="50px">
        <Box gap="md" mb="20px" width="500px">
          <TextField defaultValue="ednepomuceno" isRequired label="Username" />
          <SelectField label="Population" isRequired defaultSelectedKey="population">
            <Item key="population">Denver</Item>
          </SelectField>
        </Box>
        <AccordionGroup
          defaultExpandedKeys={[...Object.keys(editData).map(item => editData[item].key), 'preferencesKey', 'customAttributesKey', 'jsonAttributesKey']}
          labelHeadingTag="h2"
        >
          {Object.keys(editData).map(item => (
            <Item
              data-id={editData[item].label}
              key={editData[item].key}
              label={editData[item].label}
              textValue={editData[item].label}
            >
              <Box gap="md" width="500px">
                {editData[item].image
                  && <ImageUploadField label="Photo" previewHeight={40} previewWidth={40} previewImage={UserImage} />}
                {editData[item].fields.map(({ label, value, slot }) => (
                  <Box key={`${label}-key`}>
                    <TextField label={label} defaultValue={value} />
                    {slot}
                  </Box>
                ))}
              </Box>
            </Item>
          ))}
          <Item data-id="preferences" key="preferencesKey" label="Preferences" textValue="Preferences">
            <Box gap="md" width="500px">
              <SelectField label="Preferred Language" defaultSelectedKey="language">
                <Item key="language">Select a Language</Item>
              </SelectField>
              <SelectField label="Locale" defaultSelectedKey="language">
                <Item key="language">Select a locale</Item>
              </SelectField>
              <SelectField label="Timezone" defaultSelectedKey="language">
                <Item key="language">Select a timezone</Item>
              </SelectField>
            </Box>
          </Item>
          <Item data-id="customAttributes" key="customAttributesKey" label="Custom Attributes" textValue="Custom Attributes">
            <AddAttributeButton />
            <Text fontWeight="-1" fontSize="md" textAlign="center">Click + Add to select a custom attribute</Text>
          </Item>
          <Item data-id="jsonAttributes" key="jsonAttributesKey" label="JSON Attributes" textValue="JSON Attributes">
            <AddAttributeButton />
            <Text fontWeight="-1" fontSize="md" textAlign="center">Click + Add to select a JSON attribute</Text>
          </Item>
        </AccordionGroup>
      </Box>
      <ButtonBar sx={{ position: 'fixed', bottom: '0', width: '100%' }}>
        <Button variant="primary" onPress={() => setEditPanel(!isEditPanel)}>Save</Button>
        <Button variant="link" onPress={() => setEditPanel(!isEditPanel)}>Cancel</Button>
      </ButtonBar>
    </>
  );

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
          <Item key={item.email}>
            {/* If you're rendering the `ListViewItem` as another component
            and you want the styling to be handled similarly, then be sure
            to pass the `data` prop to it as shown here. */}
            <ListElement
              data={{
                text: `${item.lastName}, ${item.firstName}`,
                subtext: item.email,
                icon: item.icon,
              }}
            />
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
              {renderHeader()}
              {isEditPanel ? renderEditPanel : renderDisplayPanel}
            </FocusScope>
          )}
      </OverlayPanel>
    </Box>
  );
};

ListAndPanel.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.listAndPanel.listAndPanel,
  },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }], // Added to bypass color contrast issue due to virtualizer
    },
  },
};

export const ListElement = ({
  data = {
    subtext: 'dburkitt5@columbia.edu',
    text: 'Burkitt, Nicola',
    icon: AccountIcon,
  },
}) => {
  const listItemRef = useRef();

  const {
    handleHoverEnd,
    handleHoverStart,
    handleMenuHoverEnd,
    handleMouseMove,
    isHovered,
  } = useOverlappingMenuHoverState({ listItemRef });

  return (
    <ListViewItem
      data={data}
      isHovered={isHovered}
      onHoverEnd={handleHoverEnd}
      onHoverStart={handleHoverStart}
      onMouseMove={handleMouseMove}
      ref={listItemRef}
    >
      <ListViewItemSwitchField />
      <ListViewItemMenu
        onAction={handleHoverEnd}
        onHoverEnd={handleMenuHoverEnd}
        onHoverStart={handleHoverStart}
      >
        <Item key="enable">Enable user</Item>
        <Item key="disable">Disable user</Item>
        <Item key="delete">Delete user</Item>
      </ListViewItemMenu>
    </ListViewItem>
  );
};

const renderBreadcrumbs = headerData => {
  return (
    <Breadcrumbs icon={ChevronRightIcon}>
      <Item
        aria-label={headerData.fname}
        href="https://www.pingidentity.com"
        key={headerData.fname}
        variant="buttons.link"
      >
        {`${headerData.fname} ${headerData.lname}`}
      </Item>
      <Item
        aria-label="Edit"
        key="editKey"
        variant="buttons.link"
      >
        Edit
      </Item>
    </Breadcrumbs>
  );
};

export const OverlayPanelHeader = ({ headerData = {
  fname: 'John',
  lname: 'Doe',
  subtext: 'dburkitt5@columbia.edu',
  icon: AccountIcon,
}, isEditPanel, closePanelHandler }) => {
  const { fname, lname, subtext, icon, personalInfo } = headerData;
  const headerProps = isEditPanel ? {
    data: {
      image: {
        src: personalInfo.image,
        alt: `${fname} ${lname}`,
        'aria-label': `${fname} ${lname}`,
      },
    },
    slots: { rightOfData: renderBreadcrumbs(headerData) },
  } : {
    data: {
      text: `${lname}, ${fname}`,
      subtext,
      icon,
    },
  };

  return (
    <PanelHeader {...headerProps}>
      {!isEditPanel && <PanelHeaderSwitchField />}
      {!isEditPanel && (
        <PanelHeaderMenu>
          <Item key="enable">Enable user</Item>
          <Item key="disable">Disable user</Item>
          <Item key="delete">Delete user</Item>
        </PanelHeaderMenu>
      )}
      <PanelHeaderCloseButton onPress={closePanelHandler} />
    </PanelHeader>
  );
};
