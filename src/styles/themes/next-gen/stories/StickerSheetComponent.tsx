import React from 'react';
import CameraIrisIcon from '@pingux/mdi-react/CameraIrisIcon';
import DeleteIcon from '@pingux/mdi-react/DeleteIcon';

import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CheckboxField,
  Icon,
  IconButton,
  IconWrapper,
  Item,
  Menu,
  Messages,
  MultivaluesField,
  OverlayProvider,
  PopoverMenu,
  RadioField,
  RadioGroupField,
  SearchField,
  SelectField,
  Tab,
  Tabs,
  Text, TextAreaField,
  TextField,
} from '../../../../index';
import { IconSize, TabListItemProps } from '../../../../types';
import statuses from '../../../../utils/devUtils/constants/statuses';

const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

const items = [
  { id: 1, name: 'Aardvark', key: 'Aardvark' },
  { id: 2, name: 'Kangaroo', key: 'Kangaroo' },
  { id: 3, name: 'Snake', key: 'Snake' },
  { id: 4, name: 'Frog', key: 'Frog' },
  { id: 5, name: 'Seal', key: 'Seal' },
  { id: 6, name: 'Orangutan', key: 'Orangutan' },
  { id: 7, name: 'Shark', key: 'Shark' },
];

const textStyling = {
  fontSize: 'md',
  fontWeight: 600,
};

const avatarColors = [
  'orange',
  'cyan',
  'green',
  'purple',
  'pink',
  'red',
  'yellow',
  'teal',
];

const badges = [
  'primary',
  'baseBadge',
  'success',
  'danger',
  'warning',
  'info',
  'dark',
];

const tabs: TabListItemProps[] = [
  { name: 'Tab 1', children: 'Tab 1 body' },
  { name: 'Tab 2', children: 'Tab 2 body' },
  { name: 'Tab 3', children: 'Tab 3 body' },
];

const iconSizes:IconSize[] = ['icon-100', 'icon-200', 'icon-300', 'icon-400', 'icon-500', 'icon-600', 'icon-700', 'icon-800', 'icon-900'];

const StickerSheetComponent = () => {
  return (
    <Box sx={{ backgroundColor: 'background.base' }} height="100%" p="lg" gap="lg">
      <Box p="lg">
        <MultivaluesField items={items} label="Multivalues">
          {item => (
            <Item key={item.key} data-id={item.name} aria-label={item.name}>
              {item.name}
            </Item>
          )}
        </MultivaluesField>
      </Box>
      <Tabs items={tabs}>
        <Tab key="tab1" title="Tab 1">
          <Text>This is content for Tab 1</Text>
        </Tab>
        <Tab key="tab2" title="Tab 2">
          <Text>This is content for Tab 2</Text>
        </Tab>
      </Tabs>
      <Box gap="lg">
        <Box isRow gap="md" alignContent="center">
          {avatarColors.map(color => {
            return <IconWrapper title={{ name: 'trash can' }} size="sm" key={color} icon={DeleteIcon} color={color} />;
          })}
        </Box>
        <Box isRow gap="md" alignContent="center">
          {avatarColors.map(color => {
            return <IconWrapper title={{ name: 'trash can' }} size="md" key={color} icon={DeleteIcon} color={color} />;
          })}
        </Box>
        <Box isRow gap="md" alignContent="center" flexWrap="wrap">
          {avatarColors.map(color => {
            return <IconWrapper title={{ name: 'trash can' }} size="lg" key={color} icon={DeleteIcon} color={color} />;
          })}
        </Box>
        <Box isRow gap="md" alignContent="center" flexWrap="wrap">
          {iconSizes.map(size => {
            return <Icon key={size} icon={CameraIrisIcon} size={size} title={{ name: 'Camera' }} />;
          })}
        </Box>
        <Box isRow gap="md" alignContent="center">
          <Button sx={{ maxWidth: 'fit-content' }}>Default</Button>
          <Button variant="primary" sx={{ maxWidth: 'fit-content' }}>Primary</Button>
          <Button variant="critical" sx={{ maxWidth: 'fit-content' }}>Critical</Button>
          <Button variant="link" sx={{ maxWidth: 'fit-content' }}>Link</Button>
          <IconButton aria-label="default icon button">
            <Icon icon={DeleteIcon} title={{ name: 'Create Icon' }} />
          </IconButton>
          <IconButton aria-label="default icon button" variant="onyx">
            <Icon icon={DeleteIcon} title={{ name: 'Create Icon' }} />
          </IconButton>
        </Box>
        <Box isRow gap="md">
          {avatarColors.map(avatar => {
            return <Avatar key={avatar} color={avatar} defaultText="LK" size="avatar.md" />;
          })}
        </Box>
        <Box isRow gap="md">
          {badges.map(badge => {
            return <Badge key={badge} variant={badge} label={badge} />;
          })}
        </Box>
        <Card variant="cards.flat" width="500px">
          <Box variant="cards.header">
            <Text as="h5" variant="h5" sx={textStyling}>Optional Card Header</Text>
          </Box>
          <Box variant="cards.body">
            <Text as="h5" variant="h5" sx={textStyling} mb="md">Card Body</Text>
            <Box gap="md">
              <Button sx={{ width: 'fit-content' }} variant="primary">Save</Button>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga sed ratione,
                recusandae ipsam explicabo, quasi vel maxime sint harum qui rerum perferendis.
                Voluptatem nisi eaque, distinctio accusamus nobis voluptas nemo.
              </Text>
            </Box>
          </Box>
          <Box variant="cards.footer">
            <Text as="h5" variant="h5" sx={textStyling}>Optional Card Footer</Text>
          </Box>
        </Card>
      </Box>
      <CheckboxField
        isDefaultSelected
        label="Click me"
      />
      <RadioGroupField>
        <RadioField value="A" label="A" />
        <RadioField value="B" label="B" />
        <RadioField value="C" label="C" />
      </RadioGroupField>
      <OverlayProvider>
        <PopoverMenu>
          <Button>Popover</Button>
          <Menu>
            <Item key="edit">Edit</Item>
            <Item key="duplicate">Duplicate</Item>
            <Item key="delete" textValue="delete">
              <Text color="critical.bright">
                Delete
              </Text>
            </Item>
          </Menu>
        </PopoverMenu>
      </OverlayProvider>
      <Box p="md" gap="lg">
        <TextField helperText="Does this help" label="Textfield" />
        <TextField helperText="Does this help" label="Disabled Textfield" isDisabled />
        <SearchField label="SearchField" />
        <TextAreaField helperText="Does this help" label="TextAreaField" />
      </Box>
      <Box p="md">
        <SelectField label="SelectField">
          <Item key="edit">Edit</Item>
          <Item key="duplicate">Duplicate</Item>
          <Item key="delete" textValue="delete">
            <Text color="critical.bright">
              Delete
            </Text>
          </Item>
        </SelectField>
      </Box>
      <Messages>
        <Item key="message1" data-id="message1" status={statuses.SUCCESS}>{loremText}</Item>
        <Item key="message2" data-id="message2" status={statuses.WARNING}>{loremText}</Item>
        <Item key="message3" data-id="message3" status={statuses.ERROR}>{loremText}</Item>
        <Item key="message4" data-id="message4">{loremText}</Item>
      </Messages>
    </Box>
  );
};

export default StickerSheetComponent;
