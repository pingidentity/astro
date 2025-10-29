/* eslint-disable react/prop-types */
import React, { useMemo, useRef, useState } from 'react';
import { FocusScope, useOverlayPosition } from 'react-aria';
import Email from '@pingux/mdi-react/EmailIcon';
import Pin from '@pingux/mdi-react/PinIcon';
import SearchIcon from '@pingux/mdi-react/SearchIcon';
import { createFocusManager } from '@react-aria/focus';
import { useFilter } from '@react-aria/i18n';
import { useLayoutEffect } from '@react-aria/utils';

import {
  Box,
  Icon,
  IconButton,
  Item,
  ListView,
  PopoverContainer,
  SearchField,
  Text,
} from '../index';

export default {
  title: 'Recipes/Application Search Dropdown',
};

const items = [
  { key: 'Gmail', application: 'Gmail', description: 'Googles most finest email app used by bazillions of people', logo: Email, id: '1' },
  { key: 'GAPG', application: 'Google Apps Password Generator', description: 'Generate passwords for all your Google Apps', logo: Email, id: '2' },
  { key: 'GCalendar', application: 'Google Calendar', description: 'Get your life organized and never miss an appointment again', logo: Email, id: '3' },
  { key: 'GDrive', application: 'Google Drive', description: 'Store all of your precious files up in the clouds', logo: Email, id: '4' },
  { key: 'Gmail2', application: 'Gmail2', description: 'Googles most finest email app used by bazillions of people', logo: Email, id: '5' },
  { key: 'GAPG2', application: 'Google Apps Password Generator2', description: 'Generate passwords for all your Google Apps', logo: Email, id: '6' },
  { key: 'GCalendar2', application: 'Google Calendar2', description: 'Get your life organized and never miss an appointment again', logo: Email, id: '7' },
  { key: 'GDrive2', application: 'Google Drive2', description: 'Store all of your precious files up in the clouds', logo: Email, id: '8' },
];

const sx = {
  appBox: {
    alignSelf: 'center',
    maxWidth: '260px',
  },
  appTitle: {
    alignSelf: 'center',
    fontWeight: '700',
    mr: 'auto',
  },
  appDesc: {
    alignSelf: 'center',
    fontSize: '15px',
    mr: 'auto',
  },
  pinIconBox: {
    alignSelf: 'center',
    ml: 'md',
    '&.is-hovered': {
      bg: 'transparent',
    },
    '&.is-pressed': {
      'path': {
        fill: 'active',
      },
    },
  },
  listViewRow: {
    bg: 'red',
    padding: '-4px',
  },
  listViewItem: {
    bg: 'white',
    '&.is-hovered': {
      bg: 'accent.99',
    },
  },
};

export const Default = () => {
  const buttonRef = useRef();
  const popoverRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const focusManager = createFocusManager(popoverRef);

  const { overlayProps, placement, updatePosition } = useOverlayPosition({
    targetRef: buttonRef,
    overlayRef: popoverRef,
    placement: 'bottom left',
    isOpen: true,
  });

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      updatePosition();
    });
  }, [updatePosition]);

  const style = {
    ...overlayProps.style,
    minWidth: '380px',
    maxHeight: '320px', // shows 4 options
    '& > div': {
    },
  };

  const { startsWith } = useFilter({ sensitivity: 'base' });
  const [filterValue, setFilterValue] = useState('');
  const filteredItems = useMemo(
    () => items.filter(item => startsWith(item.application, filterValue)),
    [items, filterValue],
  );


  const onKeyDown = e => {
    if (e.key === 'ArrowDown') {
      focusManager.focusNext();
    }
  };

  const InnerHtml = props => {
    const [isPinned, setIsPinned] = useState(false);
    const { item } = props;

    const onPinPress = () => {
      setIsPinned(!isPinned);
    };

    return (
      <Box isRow>
        <Icon icon={item.logo} mr="md" color="text.primary" size={40} alignSelf="center" ml="-10px" />
        <Box alignSelf="center" sx={sx.appBox}>
          <Text variant="itemTitle" sx={sx.appTitle}>{item.application}</Text>
          <Text variant="itemSubtitle" sx={sx.appDesc}>{item.description}</Text>
        </Box>
        <Box alignSelf="center">
          <IconButton
            aria-label={`Pin ${item.application}`}
            onPress={() => onPinPress()}
            sx={sx.pinIconBox}
          >
            <Icon
              icon={Pin}
              sx={{
                transform: 'rotate(45deg)',
                '& > path': {
                  fill:
                    isPinned ? 'success.bright' : 'neutral.50',
                },
              }}
              title={{ name: 'Pin Icon' }}
              size="sm"
            />
          </IconButton>
        </Box>
      </Box>
    );
  };

  return (
    <Box isRow>
      <FocusScope>
        <SearchField
          ref={buttonRef}
          icon={SearchIcon}
          aria-label="Search Groups"
          width="380px"
          controlProps={{ sx: { borderRadius: '20px' } }}
          inputValue={filterValue}
          onChange={setFilterValue}
          onKeyUp={onKeyDown}
          mr="lg"
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        />
        <PopoverContainer
          isOpen={isOpen && filteredItems.length > 0}
          hasNoArrow
          isNonModal
          isDismissable={false}
          ref={popoverRef}
          placement={placement}
          style={style}
          type="grid"
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        >
          <ListView items={filteredItems} onSelectionChange={() => setIsOpen(!isOpen)} rowProps={{ sx: sx.listViewRow }} padding="-4px">
            {item => (
              <Item
                key={item.name}
                textValue={item.name}
                data-id={item.key}
                hasSeparator={false}
                listItemProps={{ sx: sx.listViewItem }}
              >
                <InnerHtml item={item} />
              </Item>
            )}
          </ListView>
        </PopoverContainer>
      </FocusScope>
    </Box>
  );
};
