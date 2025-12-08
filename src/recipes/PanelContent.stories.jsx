import React, { useRef } from 'react';
import ChevronRightIcon from '@pingux/mdi-react/ChevronRightIcon';
import PencilIcon from '@pingux/mdi-react/PencilIcon';
import PlusIcon from '@pingux/mdi-react/PlusIcon';

import { useOverlayPanelState } from '../hooks';
import {
  AccordionGroup,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  ButtonBar,
  EditButton,
  Icon,
  Image,
  ImageUploadField,
  Item,
  NoticeIcon,
  OverlayPanel,
  OverlayProvider,
  PanelHeader,
  PanelHeaderCloseButton,
  PanelHeaderMenu,
  PanelHeaderSwitchField,
  SelectField,
  Tab,
  Tabs,
  Text,
  TextField,
} from '../index';
import { FIGMA_LINKS } from '../utils/designUtils/figmaLinks.ts';
import UserImage from '../utils/devUtils/assets/UserImage.png';
import statuses from '../utils/devUtils/constants/statuses';

import { colorBlockButtons, editData, personalData } from './items';

export default {
  title: 'Recipes/Panel Content',
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

const OverlayWrapper = ({ children, isEditPanel }) => {
  const { state } = useOverlayPanelState({ isDefaultOpen: true });
  const triggerRef = useRef();

  const { personalInfo } = personalData;
  const { fields } = personalInfo;

  const renderBreadcrumbs = (
    <Box width="100%">
      <Breadcrumbs icon={ChevronRightIcon}>
        <Item
          aria-label={personalInfo.label}
          href="https://www.pingidentity.com"
          key={personalInfo.key}
        >
          {`${fields[0].value} ${fields[1].value}`}
        </Item>
        <Item
          aria-label="Edit"
          key="editKey"
        >
          Edit
        </Item>
      </Breadcrumbs>
    </Box>
  );

  const image = { src: UserImage, alt: 'user image' };
  const panelHeaderProps = isEditPanel ? {
    data: { image },
    slots: { rightOfData: renderBreadcrumbs },
  } : {
    data: {
      image,
      text: `${fields[0].value} ${fields[1].value}`,
      subtext: `${fields[0].value.toLowerCase()}${fields[1].value.toLowerCase()}`,
    },
  };

  return (
    <OverlayProvider>
      <Button ref={triggerRef} onPress={state.open}>Open Panel</Button>
      <OverlayPanel
        isOpen={state.isOpen}
        isTransitioning={state.isTransitioning}
        size="large"
        p="0"
      >
        <PanelHeader
          {...panelHeaderProps}
        >
          {!isEditPanel && <PanelHeaderSwitchField />}
          {!isEditPanel && (
            <PanelHeaderMenu>
              <Item key="enable">Enable user</Item>
              <Item key="disable">Disable user</Item>
              <Item key="delete">Delete user</Item>
            </PanelHeaderMenu>
          )}
          <PanelHeaderCloseButton onPress={state.close} />
        </PanelHeader>
        {children}
      </OverlayPanel>
    </OverlayProvider>
  );
};

export const DisplayPanel = () => {
  const renderProfileTab = (
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
        <EditButton size="lg" />
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

  return (
    <OverlayWrapper>
      <Box p="lg" pt="xs">
        <Tabs items={tabs} mode="list" tabListProps={{ justifyContent: 'center', mb: 'lg' }}>
          {item => (
            <Tab key={item.name} title={item.name} {...item}>
              {item.children}
            </Tab>
          )}
        </Tabs>
      </Box>
    </OverlayWrapper>
  );
};

DisplayPanel.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.panelContent.displayPanel,
  },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const ColorBlockButton = ({ buttonData = colorBlockButtons[0] }) => (
  <Button variant="colorBlock" className={buttonData.isConfigured ? 'is-configured' : ''}>
    <Box>
      <Text variant="buttonTitle">{buttonData.text}</Text>
      <Text variant="buttonSubtitle">{buttonData.subtext}</Text>
    </Box>
    <Icon icon={PencilIcon} title={{ name: 'Create Icon' }} />
  </Button>
);

export const LabelValuePairs = ({ fields = personalData.contactInfo.fields }) => (
  <Box gap="md" maxWidth="675px">
    {fields.map(({ label, value, isVerified }) => (
      <Box gap="xs" key={`${label}-key`}>
        <Text variant="h4">{label}</Text>
        <Box isRow gap="md">
          <Text>{value}</Text>
          {isVerified && (
            <Box isRow gap="xs">
              <NoticeIcon
                color="success.dark"
                status={statuses.SUCCESS}
                aria-label={`${statuses.SUCCESS}-icon`}
                size="xs"
              />
              <Text variant="listSubtitle" color="success.dark">Verified</Text>
            </Box>
          )}
        </Box>
      </Box>
    ))}
  </Box>
);

export const EditPanel = () => (
  <OverlayWrapper isEditPanel>
    <Box p="lg" pb="0">
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
    <ButtonBar>
      <Button variant="primary">Save</Button>
      <Button variant="link">Cancel</Button>
    </ButtonBar>
  </OverlayWrapper>
);

EditPanel.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.panelContent.editPanel,
  },
  a11y: {
    config: {
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const AddAttributeButton = () => (
  <Box
    sx={{
      position: 'relative',
      left: '700px',
      top: '-35px',
      width: 0,
      height: 0,
    }}
  >
    <Button variant="inlineWithIcon">
      <Icon icon={PlusIcon} size="xs" />
      Add
    </Button>
  </Box>
);
