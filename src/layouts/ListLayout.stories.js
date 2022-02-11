import React, { useState } from 'react';
import SearchIcon from 'mdi-react/SearchIcon';
import AddIcon from 'mdi-react/AddIcon';
import PencilIcon from 'mdi-react/PencilIcon';
import ContentCopyIcon from 'mdi-react/ContentCopyIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import {
  Box,
  Button,
  CheckboxField,
  Chip,
  Icon,
  IconButton,
  Item,
  List,
  ListItem,
  Menu,
  Messages,
  Modal,
  OverlayProvider,
  OverlayPanel,
  PopoverMenu,
  Separator,
  SelectField,
  SearchField,
  Stepper,
  Step,
  Tab,
  Tabs,
  Text,
  TextAreaField,
  TextField,
} from '../index';

export default {
  title: 'Layouts/ListLayout',
};

const Person = props => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const DotsVerticalIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
  </svg>
);

const ChevronRight = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  </svg>
);

export const Default = () => {
  const [items, setItems] = useState([
    { title: 'First Item', subtitle: 'First Item Subtitle', id: '1' },
    { title: 'Second Item', subtitle: 'Second Item Subtitle', id: '2' },
    { title: 'Third Item', subtitle: 'Third Item Subtitle', id: '3' },
    { title: 'Fourth Item', subtitle: 'Fourth Item Subtitle', id: '4' },
    { title: 'Fifth Item', subtitle: 'Fifth Item Subtitle', id: '5' },
  ]);

  const [editOverviewVisible, setEditOverviewVisible] = useState(false);
  const [editConfigurationVisible, setEditConfigurationVisible] = useState(false);
  const [addItemVisible, setAddItemVisible] = useState(false);

  const [staticVisible, setStaticVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [activeTab, setActiveTab] = useState('1');
  const [activeStep, setActiveStep] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const [interactingItem, setInteractingItem] = useState(null);
  const [hasAdded, setHasAdded] = useState(false);

  const editOverview = () => {
    setStaticVisible(false);
    setEditOverviewVisible(true);
  };

  const editConfiguration = () => {
    setStaticVisible(false);
    setEditConfigurationVisible(true);
  };

  const viewItem = () => {
    setStaticVisible(true);
    setEditConfigurationVisible(false);
    setEditOverviewVisible(false);
  };

  const openStaticListItem = (id) => {
    setSelectedId(id);
    setStaticVisible(true);
  };

  const saveItem = () => {
    const newItems = items.concat({ title: 'New Item', subtitle: 'New Item Subtitle', id: '6' });
    setItems(newItems);
    setSelectedId('6');
    setStaticVisible(true);
    setAddItemVisible(false);
    setActiveStep(1);
    setHasAdded(true);
  };

  const resetListItem = () => {
    setSelectedId(null);
    setEditOverviewVisible(false);
    setEditConfigurationVisible(false);
    setStaticVisible(false);
    setActiveTab('1');
    setActiveStep(1);
    setAddItemVisible(false);
  };

  const handleMenuChange = (menuItemKey, listItemKey) => {
    if (menuItemKey === 'view') {
      openStaticListItem(listItemKey.id);
    }
    if (menuItemKey === 'delete') {
      setIsDeleting(true);
      setInteractingItem(listItemKey);
    }
  };

  const deleteItem = () => {
    const newItems = items.filter(item => item.id !== interactingItem.id);
    setItems(newItems);
    setIsDeleting(false);
  };

  const onMessageClose = () => {
    setHasAdded(false);
  };

  const buttonBarStyles = {
    bottom: '0',
    position: 'absolute',
    bg: 'white',
    width: '100%',
    height: '75px',
    alignItems: 'center',
    pb: 'lg',
    pt: 'lg',
    zIndex: 1,
  };

  return (
    <Box isRow bg="accent.99" p="lg">
      <Box flexGrow={1} maxWidth="100%">
        <Box isRow mb="md">
          <Text variant="title" mr="sm">List Items</Text>
          <IconButton
            aria-label="my-label"
            title="Add List Item"
            onPress={() => setAddItemVisible(true)}
            variant="inverted"
          >
            <Icon icon={AddIcon} />
          </IconButton>
        </Box>
        <Text pb="md" variant="itemSubtitle">Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
          adipisci velit, sed quia non numquam<br />
          eius modi tempora incidunt ut labore et doloremagnam aliquam quaerat voluptatem.
        </Text>
        <SearchField
          icon={SearchIcon}
          aria-label="Search"
          minWidth="40%"
          maxWidth="400px"
          mb="md"
          placeholder="Search"
        />
        <List>
          {items.map((item, i) => (
            <>
              <ListItem flexGrow={1} bg={item.id === selectedId ? 'white ' : 'accent.99'} key={item.id}>
                <Box
                  isRow
                  mr="auto"
                  flexBasis="0px"
                  flexGrow="1"
                  onClick={() => (openStaticListItem(item.id))}
                >
                  <Icon
                    icon={Person}
                    alignSelf="center"
                    mr="md"
                    color="accent.40"
                    size={25}
                    flexShrink={0}
                  />
                  <Box isRow alignItems="center">
                    <Box alignSelf="center">
                      <Text
                        variant="listTitle"
                        alignSelf="center"
                        mr="auto"
                      >
                        {item.title}
                      </Text>
                      <Text
                        alignSelf="center"
                        variant="listSubtitle"
                        mr="auto"
                      >
                        {item.subtitle}
                      </Text>
                    </Box>
                    { item.id === '6' ? (
                      <Box ml="sm">
                        <Chip bg="success.light" textColor="success.dark" label="New" isUppercase />
                      </Box>
                  ) : null }
                  </Box>
                </Box>
                <Box isRow alignSelf="center">
                  <OverlayProvider>
                    <PopoverMenu>
                      <IconButton aria-label="my-label" >
                        <Icon icon={DotsVerticalIcon} size={20} />
                      </IconButton>
                      <Menu
                        selectionMode="single"
                        onAction={key => handleMenuChange(key, item)}
                      >
                        <Item key="view">
                          <Box >View</Box>
                        </Item>
                        <Item key="rename">
                          <Box>Rename</Box>
                        </Item>
                        <Item key="delete" textValue="Delete">
                          <Text color="critical.bright">Delete</Text>
                        </Item>
                      </Menu>
                    </PopoverMenu>
                  </OverlayProvider>
                </Box>
              </ListItem>
              {i !== items.length - 1
                  ? (<Separator margin="0" />)
                  : null
              }
            </>
            ))}
        </List>
      </Box>
      {
        staticVisible &&
        <OverlayPanel p="0" isOpen={staticVisible}>
          <Box height="60px" bg="accent.99">
            <Box
              isRow
              flexBasis="0px"
              flexGrow="1"
              alignItems="center"
              pl="md"
              pr="md"
              justifyContent="space-between"
            >
              <Box isRow>
                <Icon
                  icon={Person}
                  alignSelf="center"
                  mr="md"
                  color="accent.40"
                  size={25}
                  flexShrink={0}
                />
                <Box alignSelf="center">
                  <Text variant="listTitle" alignSelf="center" mr="auto">
                    {selectedId ? items.find(i => i.id === selectedId).title : null}
                  </Text>
                  <Text alignSelf="center" variant="listSubtitle" mr="auto">
                    {selectedId ? items.find(i => i.id === selectedId).subtitle : null}
                  </Text>
                </Box>
              </Box>
              <Box isRow>
                <IconButton aria-label="kebab" flexShrink={0} >
                  <Icon icon={DotsVerticalIcon} size={20} />
                </IconButton>
                <IconButton
                  aria-label="my-label"
                  onClick={() => resetListItem()}
                  flexShrink={0}
                >
                  <Icon icon={CloseIcon} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box pr="lg" pl="lg">
            <Tabs
              tabListProps={{ justifyContent: 'center' }}
              selectedKey={activeTab}
              onSelectionChange={setActiveTab}
            >
              <Tab key="1" title="Overview" >
                <Box isRow justifyContent="space-between">
                  <Text>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                    adipisci velit, sed quia non numquam<br /> eius modi tempora incidunt ut labore
                    et dolore magnam aliquam quaerat voluptatem.
                  </Text>
                  <IconButton
                    aria-label="my-label"
                    onClick={editOverview}
                    variant="inverted"
                    size="20px"
                    ml="sm"
                  >
                    <Icon icon={PencilIcon} />
                  </IconButton>
                </Box>
              </Tab>
              <Tab key="2" title="Configuration">
                <Box isRow justifyContent="space-between">
                  <Box sx={{ overflowY: 'auto' }}>
                    <Box mb="lg">
                      <Text variant="bodyStrong" sx={{ fontWeight: '700', fontSize: '13px' }} pb="xs">Configuration Type</Text>
                      <Text variant="base">Regular Configuration</Text>
                    </Box>
                    <Box mb="lg">
                      <Text variant="bodyStrong" sx={{ fontWeight: '700', fontSize: '13px' }} pb="xs">URLs</Text>
                      <Box isRow pb="xs" alignItems="center">
                        <Text variant="base">https://domain.com:9999</Text>
                        <IconButton aria-label="my-label" ml={5} >
                          <Icon icon={ContentCopyIcon}size="15px" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box mb="lg">
                      <Text variant="bodyStrong" sx={{ fontWeight: '700', fontSize: '13px' }} pb="xs">Super Mode</Text>
                      <Text variant="base">Enabled</Text>
                    </Box>
                    <Box mb="lg">
                      <Text variant="bodyStrong" sx={{ fontWeight: '700', fontSize: '13px' }} pb="xs">Username</Text>
                      <Text variant="base">somebody</Text>
                    </Box>
                  </Box>
                  <IconButton aria-label="my-label" onClick={editConfiguration} variant="inverted" size="20px">
                    <Icon icon={PencilIcon} />
                  </IconButton>
                </Box>
              </Tab>
            </Tabs>
          </Box>
        </OverlayPanel>
      }
      {
        editOverviewVisible &&
          <OverlayPanel p="0" isOpen={editOverviewVisible}>
            <Box height="60px" bg="accent.99" pl="lg" pr="lg">
              <Box
                isRow
                flexBasis="0px"
                flexGrow="1"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box isRow>
                  <Icon
                    icon={Person}
                    alignSelf="center"
                    mr="md"
                    color="accent.40"
                    size={25}
                    flexShrink={0}
                  />
                  <Text variant="sectionTitle" alignSelf="center" color="active" mr="xs">
                    {selectedId ? items.find(i => i.id === selectedId).title : null}
                  </Text>
                  <Icon
                    icon={ChevronRight}
                    alignSelf="center"
                    mr="xs"
                    color="accent.40"
                    size={22}
                    flexShrink={0}
                  />
                  <Box alignSelf="center" justifyContent="center">
                    <Text variant="sectionTitle" alignSelf="center" mr="auto">
                      Edit Overview
                    </Text>
                  </Box>
                </Box>
                <Box isRow>
                  <IconButton aria-label="my-label" onClick={() => resetListItem()} flexShrink={0} >
                    <Icon icon={CloseIcon} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box height="100%" pl="lg" pr="lg">
              <Box sx={{ overflowY: 'auto' }}>
                <Box pt="lg" pb="lg">
                  <TextField
                    label="Name"
                    labelMode="float"
                    width="85%"
                    value={selectedId ? items.find(i => i.id === selectedId).title : null}
                    aria-label="Name Field"
                  />
                </Box>
                <Box pb="lg">
                  <TextField
                    label="Subtitle"
                    labelMode="float"
                    width="85%"
                    value={selectedId ? items.find(i => i.id === selectedId).subtitle : null}
                    aria-label="Subtitle Field"
                  />
                </Box>
                <Box>
                  <TextAreaField
                    label="Subtitle"
                    labelMode="float"
                    width="85%"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                    aria-label="Subtitle Field"
                  />
                </Box>
              </Box>
            </Box>
            <Box isRow sx={buttonBarStyles} pl="lg">
              <Button variant="primary" onPress={viewItem} mr="md" aria-label="Save Button">Save</Button>
              <Button variant="link" onPress={viewItem} aria-label="Cancel Button">Cancel</Button>
            </Box>
          </OverlayPanel>
      }
      {
        editConfigurationVisible &&
        <OverlayPanel p="0" isOpen={editConfiguration}>
          <Box height="60px" bg="accent.99" >
            <Box
              isRow
              flexBasis="0px"
              flexGrow="1"
              alignItems="center"
              pl="md"
              pr="md"
              justifyContent="space-between"
            >
              <Box isRow>
                <Icon
                  icon={Person}
                  alignSelf="center"
                  mr="md"
                  color="accent.40"
                  size={25}
                  flexShrink={0}
                />
                <Text variant="sectionTitle" alignSelf="center" color="active" mr="xs">
                  {selectedId ? items.find(i => i.id === selectedId).title : null}
                </Text>
                <Icon
                  icon={ChevronRight}
                  alignSelf="center"
                  mr="xs"
                  color="accent.40"
                  size={22}
                  flexShrink={0}
                />
                <Box alignSelf="center" justifyContent="center">
                  <Text variant="sectionTitle" alignSelf="center" mr="auto">
                    Edit Configuration
                  </Text>
                </Box>
              </Box>
              <Box isRow>
                <IconButton
                  aria-label="my-label"
                  onClick={() => resetListItem()}
                  flexShrink={0}
                >
                  <Icon icon={CloseIcon} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box height="100%" sx={{ overflowY: 'auto' }}>
            <Box>
              <Box pt="lg" pb="lg" pl="md">
                <SelectField
                  labelMode="float"
                  label="Configuration Type"
                  minWidth="40%"
                  maxWidth="400px"
                  aria-label="Configuration Type Input"
                >
                  <Item key="1">Regular Configuration</Item>
                  <Item key="2">Placeholder Configuration 1</Item>
                  <Item key="3">Placeholder Configuration 2</Item>
                </SelectField>
              </Box>
              <Box pb="lg" pl="md">
                <TextField
                  label="URL"
                  labelMode="float"
                  minWidth="35%"
                  maxWidth="400px"
                  aria-label="URL Input"
                />
              </Box>
              <Box pb="sm" pl="md">
                <TextField
                  label="URL"
                  labelMode="float"
                  minWidth="35%"
                  maxWidth="400px"
                  aria-label="URL Input"
                />
              </Box>
              <Box pb="lg" pl="md">
                <CheckboxField
                  label="Super Mode"
                  aria-label="Super Mode Input"
                />
              </Box>
              <Box pb="lg" pl="md">
                <TextField
                  label="Username"
                  labelMode="float"
                  minWidth="35%"
                  maxWidth="400px"
                  aria-label="Username Input"
                />
              </Box>
              <Box pb="lg" pl="md">
                <TextField
                  labelMode="float"
                  label="Password"
                  minWidth="35%"
                  maxWidth="400px"
                  aria-label="Password Input"
                />
              </Box>
            </Box>
          </Box>
          <Box isRow pl="lg" sx={buttonBarStyles}>
            <Button variant="primary" onPress={viewItem} mr="md" aria-label="Save Button">Save</Button>
            <Button variant="link" onPress={viewItem} aria-label="Cancel Button">Cancel</Button>
          </Box>
        </OverlayPanel>
      }
      {
        addItemVisible &&
        <OverlayPanel p="0" isOpen={addItemVisible}>
          <Box height="60px" bg="accent.99">
            <Box
              isRow
              lexBasis="0px"
              flexGrow="1"
              alignItems="center"
              pl="md"
              pr="md"
              justifyContent="space-between"
            >
              <Box isRow>
                <Icon
                  icon={Person}
                  alignSelf="center"
                  mr="md"
                  color="accent.40"
                  size={25}
                  flexShrink={0}
                />
                <Box alignSelf="center">
                  <Text alignSelf="center" variant="itemTitle" mr="auto">
                    Add Item
                  </Text>
                </Box>
              </Box>
              <Box isRow>
                <IconButton
                  aria-label="my-label"
                  onClick={() => resetListItem()}
                  flexShrink={0}
                >
                  <Icon icon={CloseIcon} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box p="lg">
              <Stepper activeStep={activeStep} onStepChange={setActiveStep}>
                <Step key="1" textValue="Step 1">
                  <Text alignSelf="center" variant="sectionTitle" mr="auto" mt="lg">
                    Name & Description
                  </Text>
                  <Box pt="lg" pb="lg">
                    <TextField
                      label="Name"
                      labelMode="float"
                      minWidth="40%"
                      maxWidth="400px"
                      aria-label="Name Input"
                      key="name-input"
                    />
                  </Box>
                  <Box pb="lg">
                    <TextField
                      label="Subtitle"
                      labelMode="float"
                      minWidth="40%"
                      maxWidth="400px"
                      aria-label="Subtitle Input"
                      key="subtitle-input"
                    />
                  </Box>
                  <Box>
                    <TextAreaField
                      label="Description"
                      labelMode="float"
                      minWidth="40%"
                      maxWidth="400px"
                      rows={5}
                      aria-label="Name Input"
                      key="description-input"
                    />
                  </Box>
                  <Box isRow sx={buttonBarStyles}>
                    <Button variant="link" onPress={resetListItem} mr="md" aria-label="Cancel Button">Cancel</Button>
                    <Button variant="primary" onPress={() => setActiveStep(2)} aria-label="Next Button">Next</Button>
                  </Box>
                </Step>
                <Step key="2" textValue="Step 2">
                  <Text alignSelf="center" variant="sectionTitle" mr="auto" mt="lg" mb="lg">
                    Name & Description
                  </Text>
                  <Box pb="lg">
                    <SelectField
                      selectedKey="1"
                      labelMode="float"
                      label="Configuration Type"
                      minWidth="40%"
                      maxWidth="400px"
                      key="configuration-type"
                    >
                      <Item key="1">Regular Configuration</Item>
                      <Item key="2">Placeholder 1</Item>
                      <Item key="3">Placeholder 2</Item>
                    </SelectField>
                  </Box>
                  <Box pb="sm">
                    <TextField
                      label="URL"
                      labelMode="float"
                      minWidth="40%"
                      maxWidth="400px"
                      value="https://domain.com:9999"
                      key="url-input-1"
                    />
                  </Box>
                  <Box pb="sm">
                    <TextField
                      label="URL"
                      labelMode="float"
                      minWidth="40%"
                      maxWidth="400px"
                      value="https://somewhere.else.com:9090"
                      key="url-input-2"
                    />
                  </Box>
                  <Box pb="lg">
                    <CheckboxField
                      label="Super Mode"
                      isSelected
                    />
                  </Box>
                  <Box isRow sx={buttonBarStyles}>
                    <Button variant="link" onPress={resetListItem} mr="md">Cancel</Button>
                    <Button variant="primary" onPress={saveItem}>Save</Button>
                  </Box>
                </Step>
              </Stepper>
            </Box>
          </Box>
        </OverlayPanel>
      }
      { isDeleting &&
        <OverlayProvider>
          <Modal
            title="Delete Item"
            isOpen={isDeleting}
            isDismissable
            hasCloseButton
            onClose={() => setIsDeleting(false)}
          >
            <Text variant="subtitle" pt="lg">
              Are you sure you want to delete this item?
            </Text>
            <Box isRow pt="lg" mr="auto">
              <Button variant="critical" mr="md" onPress={deleteItem}>
                Delete
              </Button>
              <Button variant="link" onPress={() => setIsDeleting(false)}>
                Cancel
              </Button>
            </Box>
          </Modal>
        </OverlayProvider>
      }
      <Messages onClose={onMessageClose} style={{ zIndex: 9999 }}>
        { hasAdded && <Item key="message2" status="success">A new item has been successfully added.</Item> }
      </Messages>
    </Box>
  );
};
