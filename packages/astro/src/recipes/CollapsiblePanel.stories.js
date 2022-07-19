import React, { useMemo, useState, useRef } from 'react';
import { useFilter } from '@react-aria/i18n';
import AccountIcon from 'mdi-react/AccountIcon';
import AccountGroupIcon from 'mdi-react/AccountGroupIcon';
import CheckIcon from 'mdi-react/CheckIcon';
import Clear from 'mdi-react/CloseIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import SearchIcon from 'mdi-react/SearchIcon';
import {
  Breadcrumbs,
  Box,
  CheckboxField,
  Chip,
  Icon,
  IconButton,
  Item,
  ListView,
  CollapsiblePanel,
  CollapsiblePanelItem,
  SearchField,
  Text,
} from '..';

export default {
  title: 'Recipes/CollapsiblePanel with List',
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

export const Default = () => {
  const [items, setItems] = useState(data);
  const [searchValue, setSearchValue] = useState('');
  const checkBoxRef = useRef(null);

  const { contains } = useFilter({ sensitivity: 'base' });
  const filteredItems = useMemo(
    () => items.filter(item => contains(item.name, searchValue)),
    [items, searchValue],
  );

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
    <Box>
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
            <IconButton aria-label="Close Panel">
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
              onChange={setSearchValue}
            />
            <ListView
              items={filteredItems}
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
                        ref={checkBoxRef}
                        onClick={() => checkBoxRef.current.focus()}
                      />
                    )
                  }
                </Item>
              )}
            </ListView>
          </Box>
          <CollapsiblePanel
            items={selectedItems}
            selectedFilterCount={selectedItems.length.toString()}
            listTitle="Selected Groups"
            openAriaLabel="Open filter menu?"
            closeAriaLabel="Close filter menu?"
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
                  isDefaultSelected={item.isDefaultSelected}
                  onPress={() => changeSelection(item.key)}
                />
              </Item>
            )}
          </CollapsiblePanel>
        </Box>
      </Box>
    </Box>
  );
};
