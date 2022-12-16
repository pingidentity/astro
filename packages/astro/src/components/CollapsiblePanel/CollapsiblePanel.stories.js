import React, { useRef, useState, useMemo } from 'react';
import AccountGroupIcon from 'mdi-react/AccountGroupIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import CheckIcon from 'mdi-react/CheckIcon';
import Clear from 'mdi-react/CloseIcon';
import SearchIcon from 'mdi-react/SearchIcon';
import AccountIcon from 'mdi-react/AccountIcon';
import CollapsiblePanel from './CollapsiblePanel';
import { useOverlayPanelState } from '../../hooks';
import {
  Breadcrumbs,
  Box,
  Button,
  CheckboxField,
  Chip,
  ListView,
  Item,
  Icon,
  IconButton,
  CollapsiblePanelItem,
  OverlayPanel,
  OverlayProvider,
  SearchField,
  Text,
} from '../../index';

export default {
  title: 'Components/CollapsiblePanel',
  component: CollapsiblePanel,
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

const data = [
  {
    id: '1',
    icon: 'Group',
    key: 'Avengers',
    name: 'Avengers',
    subtitle: 'Default',
    chipValue: '25',
    isDefaultSelected: true,
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
    isDefaultSelected: true,
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

export const Default = args => (
  <CollapsiblePanel
    {...args}
  />
);

export const CollapsiblePanelWithBadge = (args) => {
  const [items, setItems] = useState(data);
  const { state, onClose } = useOverlayPanelState();
  const triggerRef = useRef();

  const selectedItems = useMemo(
    () => items
      .filter(item => item.isDefaultSelected || item.isSelected)
      // sort elements to display "default selected" at first place
      .sort((a, b) => Number(!!b.isDefaultSelected) - Number(!!a.isDefaultSelected)),
    [items],
  );

  const changeSelection = (key) => {
    setItems((prevItems) => {
      return prevItems.map((el) => {
        if (el.key === key) {
          return {
            ...el,
            isSelected: !el.isSelected,
          };
        }
        return el;
      });
    });
  };

  return (
    <OverlayProvider>
      <Button ref={triggerRef} onPress={state.open}>Open Panel</Button>
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
          <Box isRow justifyContent="space-between" sx={{ marginTop: '5px' }}>
            <Box width="100%">
              <SearchField
                icon={SearchIcon}
                aria-label="Search"
                placeholder="Search"
                width="100%"
                mt="0px"
                mr="sm"
                mb="xs"
              />
              <ListView
                items={items}
                style={{ width: '100%', outline: 'none' }}
              >
                {item => (
                  <Item
                    key={item.key}
                    textValue={item.name}
                    data-id={item.key}
                    listItemProps={{
                      isRow: true,
                      sx: {
                        bg: 'white',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        '&.is-hovered': {
                          bg: 'accent.99',
                        },
                      },
                    }}
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
                    {item.isDefaultSelected
                      ? (
                        <Box
                          isRow
                          sx={{
                            border: '1px solid',
                            borderColor: 'neutral.80',
                            borderRadius: 5,
                            minHeight: 22,
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 'xs',
                            maxWidth: '50%',
                          }}
                        >
                          <Icon icon={CheckIcon} color="neutral.20" size={13} sx={{ flexShrink: 0 }} />
                          <Text sx={{ fontSize: 'sm', pl: 'xs', maxHeight: 32, overflow: 'hidden' }}>Added by Filter</Text>
                        </Box>
                      )
                      : (
                        <CheckboxField
                          controlProps={{ color: 'neutral.10', 'aria-label': 'Select' }}
                          onChange={() => changeSelection(item.key)}
                          isSelected={selectedItems.some(el => el.key === item.key)}
                        />
                      )
                    }
                  </Item>
                )}
              </ListView>
            </Box>
            <CollapsiblePanel
              items={selectedItems}
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

                  <CollapsiblePanelItem
                    text={item.name}
                    icon={item.isDefaultSelected ? CheckIcon : Clear}
                    onPress={() => changeSelection(item.key)}
                    isDefaultSelected={item.isDefaultSelected}
                  />
                </Item>
            )}
            </CollapsiblePanel>
          </Box>
        </Box>
      </OverlayPanel>
    </OverlayProvider>
  );
};
