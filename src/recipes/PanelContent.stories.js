import React, { useRef } from 'react';
import { Item } from 'react-stately';
import PencilIcon from '@pingux/mdi-react/PencilIcon';
import PlusIcon from '@pingux/mdi-react/PlusIcon';

import { useOverlayPanelState } from '../hooks';
import {
  AccordionGroup,
  Badge,
  Box,
  Button,
  ButtonBar,
  CheckboxField,
  EditButton,
  Icon,
  Image,
  ImageUploadField,
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
import UserImage from '../utils/devUtils/assets/UserImage.png';
import statuses from '../utils/devUtils/constants/statuses';

export default {
  title: 'Experimental/PanelContent',
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

const colorBlockButtons = [
  { text: 'Groups', subtext: '21', isConfigured: true },
  { text: 'Population', subtext: 'Denver', isConfigured: true },
  { text: 'MFA', subtext: 'Enabled', isConfigured: true },
  { text: 'Roles', subtext: '0' },
];

const data = {
  contactInfo: {
    label: 'Contact Info',
    key: 'contactInfoKey',
    fields: [
      { label: 'Email', value: 'ednepomuceno@pingidentity.com', isVerified: true },
      { label: 'Primary', value: '+1 767-777-3333' },
      { label: 'Address', value: '1234 W California St, Denver CO 80101' },
    ],
  },
  personalInfo: {
    label: 'Personal Info',
    key: 'personalInfoKey',
    image: UserImage,
    fields: [
      { label: 'Given Name', value: 'Ed' },
      { label: 'Famile Name', value: 'Nepomuceno' },
    ],
  },
  companyInfo: {
    label: 'Company Info',
    key: 'companyInfoKey',
    fields: [
      { label: 'Tile', value: 'Interaction Designer' },
    ],
  },
  customAttributes: {
    label: 'Custom Attributes',
    key: 'customAttributesKey',
    fields: [
      { label: 'T-Shirt Size', value: 'Large' },
      { label: 'Example Multi-Value Attribute', value: 'value,value,value,value,value,value,value,value,value,value,value,value,value,value,value,value,value,value,value,' },
    ],
  },
  jsonAttributes: {
    label: 'JSON Attributes',
    key: 'jsonAttributesKey',
    badges: ['Address', 'Contact', 'Another Json'],
    fields: [],
  },
};

const OverlayWrapper = ({ children }) => {
  const { state, onClose } = useOverlayPanelState({ isDefaultOpen: true });
  const triggerRef = useRef();

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
          data={{
            image: { src: UserImage, alt: 'user image' },
            text: data.personalInfo.fields[0].value,
            subtext: data.personalInfo.fields[1].value,
          }}
        >
          <PanelHeaderSwitchField />
          <PanelHeaderMenu />
          <PanelHeaderCloseButton onPress={onClose} />
        </PanelHeader>
        {children}
      </OverlayPanel>
    </OverlayProvider>
  );
};

export const DisplayPanel = () => (
  <OverlayWrapper>
    <Box p="lg" pt="xs">
      <Tabs tabListProps={{ justifyContent: 'center', mb: 'lg' }}>
        <Tab title="Profile">
          <Box isRow gap="md" mb="20px">
            {colorBlockButtons.map(tileData => (
              <ColorBlockButton buttonData={tileData} key={`${tileData.text}-key`} />
            ))}
          </Box>
          <Box isRow>
            <AccordionGroup
              defaultExpandedKeys={Object.keys(data).map(item => data[item].key)}
              labelHeadingTag="h2"
            >
              {Object.keys(data).map(item => (
                <Item
                  data-id={data[item].label}
                  key={data[item].key}
                  label={data[item].label}
                  textValue={data[item].label}
                >
                  {data[item].image
                    ? (
                      <Box isRow gap="md">
                        <Image src={UserImage} alt="user" />
                        <LabelValuePairs fields={data[item].fields} />
                      </Box>
                    )
                    : <LabelValuePairs fields={data[item].fields} />}
                  {data[item].badges && (
                  <Box isRow gap="sm">
                    {data[item].badges.map(badge => (
                      <Badge label={badge} variant="defaultBadge" key={`${badge}-key`} />
                    ))}
                  </Box>
                  )}
                </Item>
              ))}
            </AccordionGroup>
            <EditButton size="lg" />
          </Box>
        </Tab>
        <Tab title="Groups">Groups</Tab>
        <Tab title="Roles">Roles</Tab>
        <Tab title="Services">Services</Tab>
        <Tab title="API">API</Tab>
      </Tabs>
    </Box>
  </OverlayWrapper>
);

export const ColorBlockButton = ({ buttonData = colorBlockButtons[0] }) => (
  <Button variant="colorBlock" className={buttonData.isConfigured ? 'is-configured' : ''}>
    <Box>
      <Text variant="buttonTitle">{buttonData.text}</Text>
      <Text variant="buttonSubtitle">{buttonData.subtext}</Text>
    </Box>
    <Icon icon={PencilIcon} title={{ name: 'Create Icon' }} />
  </Button>
);

export const LabelValuePairs = ({ fields = data.contactInfo.fields }) => (
  <Box gap="md">
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


const editData = {
  personalInfo: {
    label: 'Personal Info',
    key: 'personalInfoKey',
    image: UserImage,
    fields: [
      { label: 'Prefix', value: '' },
      { label: 'Given Name', value: 'Ed' },
      { label: 'Middle Name', value: '' },
      { label: 'Family Name', value: 'Nepomuceno' },
      { label: 'Suffix', value: '' },
      { label: 'Formatted', value: '' },
      { label: 'Nickname', value: '' },
    ],
  },
  contactInfo: {
    label: 'Contact Info',
    key: 'contactInfoKey',
    fields: [
      { label: 'Email', value: 'ednepomuceno@pingidentity.com', slot: <CheckboxField mt="xs" label="Require Email to be Verified" /> },
      { label: 'Phone Number', value: '123-456-7890' },
      { label: 'Street Address', value: '123 Example St' },
      { label: 'Country Code', value: '' },
      { label: 'Loality', value: '' },
      { label: 'Region', value: '' },
      { label: 'Zip Code', value: '12345' },
    ],
  },
  companyInfo: {
    label: 'Company Info',
    key: 'companyInfoKey',
    fields: [
      { label: 'Account ID', value: '' },
      { label: 'Type', value: '' },
      { label: 'Title', value: '' },
    ],
  },
};

export const EditPanel = () => (
  <OverlayWrapper>
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
