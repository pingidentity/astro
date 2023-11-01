import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import FolderIcon from '@pingux/mdi-react/FolderIcon';
import LockIcon from '@pingux/mdi-react/LockIcon';
import MenuDownIcon from '@pingux/mdi-react/MenuDownIcon';
import MenuRight from '@pingux/mdi-react/MenuRightIcon';
import { useHover, usePress } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import PropTypes from 'prop-types';

import { useTreeViewContext } from '../../context/TreeViewContext';
import { useStatusClasses } from '../../hooks';
import {
  Box,
  Icon,
  IconButtonToggle,
  Text,
} from '../../index';

const TreeViewRow = forwardRef((props, ref) => {
  const {
    title,
    mainIcon = FolderIcon,
    lastIcon = LockIcon,
    item,
    items,
    isExpanded,
    isSelected,
    isDisabled,
    iconButtonProps,
    ...others
  } = props;

  const treeRowRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => treeRowRef.current);

  const {
    key,
  } = item;

  const { state, tree } = useTreeViewContext();

  const { hoverProps, isHovered } = useHover({});

  const pressIcon = e => {
    state.toggleKey(item.key);
    if (iconButtonProps?.onPress) {
      iconButtonProps.onPress(e);
    }
  };

  const pressRow = () => {
    tree.setSelectedKeys([item.key]);
  };

  const {
    isPressed,
    pressProps,
  } = usePress({ ...others, ref: treeRowRef, onPress: pressRow });

  const { classNames } = useStatusClasses('', {
    isHovered,
    isSelected,
    isExpanded,
    isPressed,
    isDisabled,
  });

  const mergedProps = mergeProps(
    hoverProps,
    pressProps,
    others,
  );

  return (
    <Box
      ref={treeRowRef}
      isRow
      alignItems="center"
      gap="xs"
      sx={{ flexGrow: 1 }}
      className={classNames}
      key={`${key} box`}
      {...mergedProps}
    >
      { items?.length > 0 && (
        <IconButtonToggle
          onToggle={pressIcon}
          isToggled={isExpanded}
          defaultIcon={MenuRight}
          toggledIcon={MenuDownIcon}
          iconProps={{ size: 25, title: `${title} expand or collapse button` }}
          buttonProps={{ 'aria-label': `${title} expand or collapse button` }}
        />
      )}
      <Box isRow className={classNames} alignItems="center" gap="xs" variant="treeView.treeRow">
        <Icon color="focus" icon={mainIcon} size={25} title="folder icon" alt="folder icon" />
        <Text className={classNames}>
          {title}
        </Text>
        <Icon icon={lastIcon} size={15} color="accent.80" title="lock icon" alt="lock icon" />
      </Box>
    </Box>
  );
});

TreeViewRow.propTypes = {
  isSelected: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isExpanded: PropTypes.bool,
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  iconButtonProps: PropTypes.shape({
    onPress: PropTypes.func,
  }),
  item: PropTypes.shape({
    key: PropTypes.string,
  }),
  mainIcon: PropTypes.elementType,
  lastIcon: PropTypes.elementType,
};

export default TreeViewRow;
