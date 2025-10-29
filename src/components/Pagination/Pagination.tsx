import React, { forwardRef } from 'react';
import ChevronLeftIcon from '@pingux/mdi-react/ChevronLeftIcon';
import ChevronRightIcon from '@pingux/mdi-react/ChevronRightIcon';

import { useLocalOrForwardRef } from '../../hooks';
import usePagination from '../../hooks/usePagination';
import {
  Box, Button, Icon, IconButton, Item,
  Menu,
  OverlayProvider,
  PopoverMenu,
} from '../../index';
import { PaginationProps, RangeSelectPopoverProps } from '../../types/pagination';

const RangeSelectPopover = forwardRef<HTMLDivElement, RangeSelectPopoverProps>((props, ref) => {
  const { state, buttonProps } = props;

  const {
    setOffsetCount,
    offsetOptions,
    ...others
  } = state;

  const menuRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  return (
    <OverlayProvider>
      <Box sx={{ flexGrow: 1 }}>
        <PopoverMenu ref={menuRef}>
          <Button {...buttonProps} variant="paginationMenu">{state.popoverButtonString}</Button>
          <Menu onSelectionChange={setOffsetCount} selectionMode="single" {...others}>
            {offsetOptions.map(option => (
              <Item key={option} textValue={`${option}`}>
                Show
                {' '}
                {option}
                {' '}
                Results
              </Item>
            ))}
          </Menu>
        </PopoverMenu>
      </Box>
    </OverlayProvider>
  );
});

const Pagination = forwardRef<HTMLDivElement, PaginationProps>((props, ref) => {
  const {
    state,
    previousButtonProps,
    nextButtonProps,
    containerProps,
    offsetMenuProps,
  } = usePagination(props);

  const paginationRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  return (
    <Box isRow variant="pagination.container" {...containerProps} ref={paginationRef}>
      <Box variant="pagination.wrapper" isRow>
        <RangeSelectPopover {...offsetMenuProps} state={state} />
        <Box variant="pagination.iconWrapper" isRow>
          <IconButton {...previousButtonProps}>
            <Icon icon={ChevronLeftIcon} />
          </IconButton>
          <IconButton {...nextButtonProps}>
            <Icon icon={ChevronRightIcon} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
});

export default Pagination;
