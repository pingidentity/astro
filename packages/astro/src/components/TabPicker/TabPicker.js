import React, {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Item as Tab } from 'react-stately';
import ArrowDropDownIcon from '@pingux/mdi-react/ArrowDropDownIcon';
import ArrowDropUpIcon from '@pingux/mdi-react/ArrowDropUpIcon';
import { Pressable } from '@react-aria/interactions';
import PropTypes from 'prop-types';

import {
  Box,
  Icon,
  Menu,
  PopoverMenu,
  Text,
} from '../..';
import { useStatusClasses } from '../../hooks';
import { TabLine } from '../Tab';

/* istanbul ignore next */
const TabPicker = forwardRef(({ className, items, state, item, ...others }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(state.selectedKey);

  const selectionManager = state.selectionManager;
  const [focusedItem, setFocusedItem] = useState(selectionManager.focusedKey);

  const isTabFocused = selectionManager.focusedKey === item.key;
  const isTabSelected = state.selectedKey === item.key;
  const isListItemFocused = items.some(el => el.key === selectionManager.focusedKey);
  const isListItemSelected = items.some(el => el.key === state.selectedKey);

  const { prevKey, nextKey } = useMemo(() => {
    const tabs = Array.from(state.collection).filter(tab => !tab?.value?.isListItem);
    const prevIndex = tabs.findIndex(tab => tab.key === item.key) - 1;
    const nextIndex = tabs.findIndex(tab => tab.key === item.key) + 1;
    return {
      prevKey: tabs[prevIndex]?.key || tabs[tabs.length].key,
      nextKey: tabs[nextIndex]?.key || tabs[0].key,
    };
  }, []);

  const { classNames } = useStatusClasses(className, {
    isSelected: isListItemSelected,
  });

  const menuRef = useRef();

  const handleSelectedItem = currentItem => {
    state.setSelectedKey(currentItem);
    setFocusedItem(currentItem);
  };

  useEffect(() => {
    if (selectedItem) {
      handleSelectedItem(selectedItem);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (focusedItem) {
      selectionManager.setFocusedKey(focusedItem);
    }
  }, [focusedItem]);

  useEffect(() => {
    if (isOpen && (isTabFocused || isListItemSelected) && menuRef.current) {
      if (focusedItem) {
        Array.from(menuRef.current.children).find(el => el.dataset.key === focusedItem).focus();
      } else {
        menuRef.current.firstChild.focus();
      }
    }
    if (!isOpen && isTabSelected && !selectedItem) {
      setSelectedItem(selectionManager.focusedKey);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && isListItemFocused) {
      setFocusedItem(selectionManager.focusedKey);
    } else if (!isOpen && isListItemFocused) {
      selectionManager.setFocusedKey(item.key);
    }
  }, [selectionManager.focusedKey]);

  useEffect(() => {
    if (isTabSelected || isTabFocused) {
      if (selectedItem) {
        handleSelectedItem(selectedItem);
      } else if (isListItemSelected && !selectedItem) {
        setSelectedItem(state.selectedKey);
      } else {
        setFocusedItem(items[0].key);
      }
    } else if (!isListItemSelected && !isListItemFocused) {
      setIsOpen(false);
      setSelectedItem(null);
      setFocusedItem(null);
    }
  }, [isTabSelected, isListItemSelected]);

  const handleKeyNavigation = e => {
    switch (e.key) {
      case 'ArrowRight': {
        selectionManager.setFocusedKey(nextKey);
        break;
      }
      case 'ArrowLeft': {
        selectionManager.setFocusedKey(prevKey);
        break;
      }
      default:
        break;
    }
  };

  const tabProps = others;
  delete tabProps.onPointerDown;
  delete tabProps.onKeyDown;

  return (
    <PopoverMenu onOpenChange={setIsOpen} isOpen={isOpen} isContainFocus>
      <Pressable>
        <Box isRow alignItems="center" className={classNames} variant="menuTab" onKeyDown={handleKeyNavigation} role="tablist">
          <Box className={classNames} variant="tab" ref={ref} {...tabProps}>
            <Text variant="tabLabel">{item.props.name}</Text>
            {selectedItem && <TabLine />}
          </Box>
          <Icon
            color={isTabFocused || classNames.includes('is-hovered') ? 'active' : 'neutral.40'}
            icon={isOpen ? ArrowDropUpIcon : ArrowDropDownIcon}
            title={{ name: isOpen ? 'Arrow Drop Up Icon' : 'Arrow Drop Down Icon' }}
          />
        </Box>
      </Pressable>
      <Menu onAction={setSelectedItem} selectionMode="single" selectedKeys={[selectionManager.focusedKey]} ref={menuRef}>
        {items.map(tab => <Tab role={tab.role} key={tab.key}>{tab.name}</Tab>)}
      </Menu>
    </PopoverMenu>
  );
});

TabPicker.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
    props: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
  })),
  state: PropTypes.shape({
    collection: PropTypes.shape({}),
    selectedKey: PropTypes.string,
    setSelectedKey: PropTypes.func,
    selectionManager: PropTypes.shape({
      focusedKey: PropTypes.string,
      setFocusedKey: PropTypes.func,
    }),
  }),
};

export default TabPicker;
