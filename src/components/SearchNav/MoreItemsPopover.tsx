import React, { useEffect, useState } from 'react';
import DownIcon from '@pingux/mdi-react/ChevronDownIcon';
import UpIcon from '@pingux/mdi-react/ChevronUpIcon';

import { Box, Button, Icon, Item, Menu, PopoverMenu } from '../../index';
import { MoreItemsPopoverProps } from '../../types/searchNav';

const MoreItemsPopover = (props: MoreItemsPopoverProps) => {
  const {
    buttonRef,
    items,
    moreButtonText,
    onOpenChange,
    popoverButtonProps,
    popoverMenuProps,
    popoverProps,
    setSelectedKey,
    tabProps,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  }, [isOpen]);

  return (
    <Box
      role="listitem"
      variant="searchNav.tab"
      isRow
      alignItems="center"
      ml="sm"
      {...tabProps}
    >
      <PopoverMenu {...popoverProps} isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button
          tabIndex={0}
          variant="searchNavTabLabel"
          ref={buttonRef}
          {...popoverButtonProps}
        >
          {moreButtonText}
          <Icon
            icon={isOpen ? UpIcon : DownIcon}
            ml="2px"
            mt="2px"
            size={13}
            title={{ name: 'Add Circle Icon' }}
          />
        </Button>
        <Menu
          onAction={e => { setSelectedKey(e as string); }}
          {...popoverMenuProps}
        >
          {items.map(item => (
            <Item key={item.key} textValue={item.text}>
              {item.text}
            </Item>
          ))}
        </Menu>
      </PopoverMenu>
    </Box>
  );
};

export default MoreItemsPopover;
