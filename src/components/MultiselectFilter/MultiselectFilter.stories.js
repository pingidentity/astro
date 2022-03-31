import React, { useRef } from 'react';
import AccountGroupIcon from 'mdi-react/AccountGroupIcon';
import Clear from 'mdi-react/CloseIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import FilterIcon from 'mdi-react/FilterIcon';
import SearchIcon from 'mdi-react/SearchIcon';
import AccountIcon from 'mdi-react/AccountIcon';
import MultiselectFilter from './MultiselectFilter';
import { useOverlayPanelState } from '../../hooks';
import {
  Breadcrumbs,
  Box,
  Button,
  Chip,
  ListView,
  Item,
  Icon,
  IconButton,
  MultiselectFilterItem,
  OverlayPanel,
  OverlayProvider,
  SearchField,
  Text,
} from '../../index';

export default {
  title: 'MultiselectFilter',
  component: MultiselectFilter,
  argTypes: {
    listTitle: {
      defaultValue: 'Selected Groups',
    },
    openAriaLabel: {
      defaultValue: 'Open filter menu?',
    },
    closeAriaLabel: {
      defaultValue: 'Close filter menu?',
    },
    isDefaultOpen: {},
    isOpen: {
      onClick: { action: 'clicked' },
      control: {
        type: 'none',
      },
    },
  },
};

const items = [
  {
    id: '1',
    icon: 'Group',
    key: 'Avengers',
    name: 'Avengers',
    subtitle: 'Default',
    chipValue: '25',
  },
  {
    id: '2',
    icon: 'Group',
    key: 'Credit Cards',
    name: 'Credit Cards',
    subtitle: '',
    chipValue: '123',
  },
  {
    id: '3',
    icon: 'Group',
    key: 'Debit Cards',
    name: 'Debit Cards',
    subtitle: '',
    chipValue: '23',
  },
  {
    id: '4',
    icon: 'Group',
    key: 'Digital Investors',
    name: 'Digital Investors',
    subtitle: 'N America',
    chipValue: '12',
  },
  {
    id: '5',
    icon: 'Group',
    key: 'Mortgages',
    name: 'Mortgages',
    subtitle: 'N America',
    chipValue: '112',
  },
  {
    id: '6',
    icon: 'Group',
    key: 'Person LOC',
    name: 'Person LOC',
    subtitle: '',
    chipValue: '45',
  },
  {
    id: '7',
    icon: 'Group',
    key: 'Production',
    name: 'Production',
    subtitle: '',
    chipValue: '55',
  },
  {
    id: '8',
    icon: 'Group',
    key: 'UX Team',
    name: 'UX Team',
    subtitle: '',
    chipValue: '61',
  },
  {
    id: '9',
    icon: 'Group',
    key: 'UI Team',
    name: 'UI Team',
    subtitle: '',
    chipValue: '29',
  },
];

const mockData = [
  {
    id: '10',
    key: 'Avengers',
    name: 'Avengers',
  },
  {
    id: '11',
    key: 'Digital Investors',
    name: 'Digital Investors',
  },
  {
    id: '12',
    key: 'A very long title as well',
    name: 'A very long title as well',
  },
];

const changeSelection = (selected) => {
  console.log(selected);
};

export const Default = args => (
  <MultiselectFilter
    {...args}
  />
);

export const MultiselectWithBadge = (args) => {
  const { state, onClose } = useOverlayPanelState();
  const triggerRef = useRef();

  return (
    <OverlayProvider>
      <Button ref={triggerRef} onPress={state.open} >Open Panel</Button>
      <OverlayPanel isOpen={state.isOpen} size="large" p="0">
        <Box sx={{ minHeight: '60px' }} bg="accent.99">
          <Box
            isRow
            flexBasis="0px"
            flexGrow="1"
            alignItems="center"
            pl="md"
            pr="md"
            justifyContent="space-between"
            zIndex={2}
          >
            <Box isRow>
              <Icon
                icon={AccountIcon}
                alignSelf="center"
                mr="md"
                color="accent.40"
                size={25}
                flexShrink={0}
                display="flex"
              />
              <Breadcrumbs icon={ChevronRightIcon}>
                <Item key="home" variant="link" data-id="home">
                  Ed Nepomuceno
                </Item>
                <Item key="editGroups" variant="neutralText" data-id="editGroups">
                  Edit Groups
                </Item>
              </Breadcrumbs>
            </Box>
            <Box isRow>
              <IconButton aria-label="Close Panel" onPress={() => { onClose(state, triggerRef); }}>
                <Icon icon={Clear} size={20} />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box pl="md" pt="25px">
          <Box isRow justifyContent="space-between">
            <Box width="100%">
              <SearchField
                icon={SearchIcon}
                aria-label="Search"
                placeholder="Search"
                width="100%"
                mt="0px"
                mr="sm"
              />
              <ListView
                items={items}
                style={{ width: '108%' }}
              >
                {item => (
                  <Item
                    key={item.key}
                    textValue={item.name}
                    data-id={item.key}
                    listItemProps={{ sx: {
                      bg: 'white',
                      '&.is-hovered': {
                        bg: 'accent.99',
                      },
                } }}
                  >
                    <Box isRow>
                      <Icon
                        icon={AccountGroupIcon}
                        alignSelf="center"
                        mr="md"
                        color="accent.40"
                        size={25}
                        flexShrink={1}
                      />
                      <Box>
                        <Box isRow>
                          <Text variant="listTitle" mb="xs" mr="xs">{item.name}</Text>
                          <Chip
                            label={item.chipValue}
                            bg="accent.99"
                            textColor="text.secondary"
                            sx={{ minWidth: 'max-content' }}
                          />
                        </Box>
                        <Text variant="listSubtitle">{item.subtitle}</Text>
                      </Box>
                    </Box>
                  </Item>
            )}
              </ListView>
            </Box>
            <MultiselectFilter
              items={mockData}
              onSelectionChange={changeSelection}
              selectedFilterCount="1000+"
              {...args}
            >
              {item => (
                <Item
                  key={item.key}
                  textValue={item.name}
                  data-id={item.key}
                >
                  <MultiselectFilterItem text={item.name} icon={FilterIcon} />
                </Item>
            )}
            </MultiselectFilter>
          </Box>
        </Box>
      </OverlayPanel>
    </OverlayProvider>
  );
};
