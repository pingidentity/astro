import React, { forwardRef } from 'react';
import DotsVerticalIcon from '@pingux/mdi-react/DotsVerticalIcon';

import {
  Box,
  Icon,
  IconButton,
  Item,
  Menu,
  OverlayProvider,
  PopoverMenu,
  Text,
} from '../../index';

const DataTableMenu = forwardRef<HTMLDivElement, object>((props, ref) => {
  return (
    <Box
      ref={ref}
      variant="dataTable.tableMenu"
    >
      <OverlayProvider>
        <PopoverMenu>
          <IconButton aria-label="row menu" sx={{ '&.is-focused': { outlineOffset: '-1px' } }}>
            <Icon size={25} icon={DotsVerticalIcon} title={{ name: 'Dots Vertical Icon' }} />
          </IconButton>
          <Menu>
            <Item key="edit">Edit</Item>
            <Item key="duplicate">Duplicate</Item>
            <Item key="delete" textValue="delete">
              <Text color="critical.bright">Delete</Text>
            </Item>
          </Menu>
        </PopoverMenu>
      </OverlayProvider>
    </Box>
  );
});

export default DataTableMenu;
