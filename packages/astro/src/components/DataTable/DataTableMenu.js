import React, { forwardRef } from 'react';
import DotsVerticalIcon from 'mdi-react/DotsVerticalIcon';
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

const DataTableMenu = forwardRef((props, ref) => {
  return (
    <Box
      ref={ref}
      variant="dataTable.tableMenu"
    >
      <OverlayProvider>
        <PopoverMenu>
          <IconButton aria-label="row menu">
            <Icon icon={DotsVerticalIcon} />
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
