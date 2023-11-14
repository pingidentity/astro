import React, { useMemo, useRef, useState } from 'react';
import AccountGroupIcon from '@pingux/mdi-react/AccountGroupIcon';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import CheckIcon from '@pingux/mdi-react/CheckIcon';
import ChevronRightIcon from '@pingux/mdi-react/ChevronRightIcon';
import Clear from '@pingux/mdi-react/CloseIcon';
import SearchIcon from '@pingux/mdi-react/SearchIcon';
import { useFilter } from '@react-aria/i18n';

import {
  Badge,
  Box,
  Breadcrumbs,
  CheckboxField,
  CollapsiblePanel,
  CollapsiblePanelItem,
  Icon,
  IconButton,
  Item,
  ListView,
  ListViewItem,
  SearchField,
  Text,
} from '../index';

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
    badgeValue: '25',
    isDefaultSelected: true,
  },
  {
    id: '2',
    icon: 'Group',
    key: 'Credit Cards',
    name: 'Credit Cards',
    subtitle: '',
    badgeValue: '123',
  },
  {
    id: '3',
    icon: 'Group',
    key: 'Debit Cards',
    name: 'Debit Cards',
    subtitle: '',
    badgeValue: '23',
  },
  {
    id: '4',
    icon: 'Group',
    key: 'Digital Investors',
    name: 'Digital Investors',
    subtitle: 'N America',
    badgeValue: '12',
    isDefaultSelected: true,
  },
  {
    id: '5',
    icon: 'Group',
    key: 'Mortgages',
    name: 'Mortgages',
    subtitle: 'N America',
    badgeValue: '112',
  },
  {
    id: '6',
    icon: 'Group',
    key: 'Person LOC',
    name: 'Person LOC',
    subtitle: '',
    badgeValue: '45',
  },
  {
    id: '7',
    icon: 'Group',
    key: 'Production',
    name: 'Production',
    subtitle: '',
    badgeValue: '55',
  },
  {
    id: '8',
    icon: 'Group',
    key: 'UX Team',
    name: 'UX Team',
    subtitle: '',
    badgeValue: '61',
  },
  {
    id: '9',
    icon: 'Group',
    key: 'UI Team',
    name: 'UI Team',
    subtitle: '',
    badgeValue: '29',
  },
];

const sx = {
  listViewItem: {
    bg: 'white',
    '&.is-hovered': {
      bg: 'accent.99',
    },
  },
  defaultSelectedBox: {
    border: '1px solid',
    borderColor: 'neutral.80',
    borderRadius: 5,
    minHeight: 22,
    justifyContent: 'center',
    alignItems: 'center',
    p: 'xs',
  },
  defaultSelectedTitle: {
    fontSize: 'sm',
    pl: 'xs',
    maxHeight: 32,
    overflow: 'hidden',
  },
};

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

  const changeSelection = key => {
    setItems(prevItems => {
      return prevItems.map(el => {
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
              title={{ name: 'Account Icon' }}
            />
            <Breadcrumbs icon={ChevronRightIcon}>
              <Item key="home" variant="link" data-id="home">
                Ed Nepomuceno
              </Item>
              <Item key="editGroups" variant="link" data-id="editGroups">
                Edit Groups
              </Item>
            </Breadcrumbs>
          </Box>
          <Box isRow>
            <IconButton aria-label="Close Panel">
              <Icon icon={Clear} size="sm" title={{ name: 'Clear Icon' }} />
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
            >
              {item => (
                <Item
                  key={item.key}
                  textValue={item.name}
                  data-id={item.key}
                >
                  <ListViewItem
                    sx={sx.listViewItem}
                    data={{
                      icon: AccountGroupIcon,
                      text: item.name,
                      subtext: item.subtitle,
                    }}
                    slots={{
                      rightOfData: (
                        <Badge
                          label={item.badgeValue}
                          bg="accent.99"
                          textColor="text.secondary"
                          sx={{ minWidth: 'max-content' }}
                          ml="xs"
                        />
                      ),
                    }}
                  >
                    {item.isDefaultSelected
                      ? (
                        <Box isRow sx={sx.defaultSelectedBox}>
                          <Icon icon={CheckIcon} color="neutral.20" size={13} sx={{ flexShrink: 0 }} title={{ name: 'Check Icon' }} />
                          <Text sx={sx.defaultSelectedTitle}>Added by Filter</Text>
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
                      )}
                  </ListViewItem>
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
