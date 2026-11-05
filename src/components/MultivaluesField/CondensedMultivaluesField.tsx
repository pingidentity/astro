import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  DismissButton,
  FocusScope,
  mergeProps,
} from 'react-aria';
import type { OverlayTriggerState } from 'react-stately';
import { useFilter } from '@react-aria/i18n';
import { useFocusWithin } from '@react-aria/interactions';
import { useLayoutEffect, useResizeObserver } from '@react-aria/utils';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useListState } from '@react-stately/list';
import type { Key, Node } from '@react-types/shared';

import {
  Box,
  Button,
  Icon,
  Loader,
  ScrollBox,
  Text,
  TextField,
} from '../..';
import { MultivaluesContext } from '../../context/MultivaluesContext';
import { useGetTheme, useInputLoader, usePropWarning } from '../../hooks';
import {
  CondensedMultivaluesFieldProps,
  MultivaluesFieldItem,
} from '../../types/MultivaluesField';
import type { Placement } from '../../types/shared/style';
import loadingStates from '../../utils/devUtils/constants/loadingStates';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import statuses from '../../utils/devUtils/constants/statuses';
import ListBox from '../ListBox';
import Popover from '../Popover/Popover';

const CondensedMultivaluesField = forwardRef<HTMLDivElement, CondensedMultivaluesFieldProps>((
  props,
  ref,
) => {
  const {
    defaultSelectedKeys,
    direction = 'bottom',
    disabledKeys = [],
    containerProps,
    filter,
    hasAutoFocus,
    hasNoSelectAll,
    hasNoStatusIndicator,
    helperText,
    inputProps: customInputProps,
    isDisabled,
    isFilteringDisabled,
    isNotFlippable,
    isReadOnly = false,
    isRequired,
    items,
    label,
    loadingState,
    mode,
    onBlur,
    onFocus,
    onInputChange,
    onKeyDown,
    onKeyUp,
    onLoadMore,
    onLoadPrev,
    onOpenChange,
    onSelectionChange,
    placeholder,
    selectedKeys,
    selectedOptionText: selectedOptionTextProp,
    scrollBoxProps = { maxHeight: 300 },
    status = statuses.DEFAULT,
    ...others
  } = props;

  usePropWarning(props, 'disabled', 'isDisabled');

  const [filterString, setFilterString] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [hasFocusWithin, setFocusWithin] = useState(false);
  const [activeDescendant, setActiveDescendant] = useState('');

  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const {
    icons,
    themeState: { isOnyx },
  } = useGetTheme();
  const { MenuDown, MenuUp } = icons;
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: setFocusWithin,
  });
  const { isLoading } = useInputLoader({
    loadingState,
    inputValue: filterString,
  } as { loadingState: string; inputValue: string });

  const toggleItems = (keys: Iterable<Key>) => {
    if (onSelectionChange) onSelectionChange(keys);
  };

  const { contains } = useFilter({ sensitivity: 'base' });

  const filterNodesWithChildren = (iterableNode: Iterable<Node<MultivaluesFieldItem>>) => {
    const nodeArr = Array.from(iterableNode);
    // filters child items if they have sections
    const filteredSections = nodeArr.map(function f(nodeItem: Node<MultivaluesFieldItem>) {
      if (nodeItem?.type === 'item') {
        return contains(nodeItem?.value?.name || '', filterString) && nodeItem;
      }

      const childNodes = Array.from(nodeItem.childNodes).filter(f);
      // Don't return sections without children, see UIP-5951
      return (
        childNodes.length !== 0 && {
          ...nodeItem,
          childNodes,
        }
      );
    });

    // we are filtering null items here since we were not able to filter them in previous function
    return filteredSections.filter(item => item);
  };

  const state = useListState<MultivaluesFieldItem>({
    ...(props as object),
    items,
    onSelectionChange: toggleItems,
    selectionMode: 'multiple',
    ...(!isFilteringDisabled && {
      filter: (filter
        || filterNodesWithChildren) as (
          nodes: Iterable<Node<MultivaluesFieldItem>>,
        ) => Iterable<Node<MultivaluesFieldItem>>,
    }),
  });

  const { selectionManager } = state;

  const close = () => {
    if (!hasFocusWithin) {
      setIsOpen(false);
    }
  };

  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputWrapperRef.current as HTMLDivElement);
  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputRef.current as HTMLDivElement);
  const listBoxRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Measure the width of the input to inform the width of the menu (below).
  const [menuWidth, setMenuWidth] = useState<string | null>(null);

  const onResize = useCallback(() => {
    /* istanbul ignore next */
    if (inputWrapperRef.current) {
      setMenuWidth(`${inputWrapperRef.current.offsetWidth + 2}px`);
    }
  }, [inputWrapperRef, isOpen, setMenuWidth]);

  useResizeObserver({
    ref: inputWrapperRef,
    onResize,
  });

  useLayoutEffect(onResize, [onResize]);

  const menuWidthSx = {
    width: menuWidth,
    minWidth: menuWidth,
  };

  const popoverState = useMemo(
    () => ({ isOpen: !state.collection.size ? false : isOpen, close }),
    [state.collection.size, isOpen, close],
  ) as unknown as OverlayTriggerState;

  useEffect(() => {
    if (defaultSelectedKeys) selectionManager.setSelectedKeys(defaultSelectedKeys);
  }, []);

  useEffect(() => {
    if (selectedKeys) selectionManager.setSelectedKeys(selectedKeys);
  }, []);

  useEffect(() => {
    if (onOpenChange) onOpenChange(isOpen);
    if (!isOpen) setActiveDescendant('');
  }, [isOpen]);

  /* istanbul ignore next */
  const keyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter': {
        e.preventDefault();
        if (selectionManager.focusedKey) {
          const key = selectionManager.focusedKey;
          if (!disabledKeys.includes(key)) {
            selectionManager.toggleSelection(selectionManager.focusedKey);
          }
        }
        break;
      }
      case 'ArrowDown': {
        const nextKey = state.collection.getKeyAfter(selectionManager.focusedKey as Key)
          || state.collection.getFirstKey();
        if (nextKey) selectionManager.setFocusedKey(nextKey);
        break;
      }
      case 'ArrowUp': {
        const prevKey = state.collection.getKeyBefore(selectionManager.focusedKey as Key)
          || state.collection.getLastKey();
        if (prevKey) selectionManager.setFocusedKey(prevKey);
        break;
      }
      case 'Escape': {
        setFilterString('');
        setIsOpen(false);
        break;
      }
      default:
        break;
    }
    if (onKeyDown) onKeyDown(e.nativeEvent);
  };

  const handleBlur = (e: React.FocusEvent) => {
    const relatedTarget = e.relatedTarget || document.activeElement;

    if (
      inputWrapperRef.current?.contains(relatedTarget)
      || popoverRef.current?.contains(relatedTarget)
      || buttonRef.current === relatedTarget
    ) {
      return;
    }
    setFilterString('');
    setIsOpen(false);
  };

  const [selectionState, setSelectionState] = useState('Select All');

  const arrayItems = items || [];

  const itemCount = arrayItems.reduce(
    (count, obj) => count + (obj.children ? obj.children.length : 1),
    0,
  );

  const selectedKeysSize = selectionManager.selectedKeys.size;

  // `selectionManager.state` is private in the react-stately typings but is
  // read throughout this component; the access is kept via a cast.
  const selectionManagerState = (selectionManager as unknown as {
    state: { selectedKeys: Set<Key> };
  }).state;

  const selectedOptionText = selectedOptionTextProp
    || `${
      itemCount === selectedKeysSize
        ? 'All'
        : selectionManagerState.selectedKeys?.size
    } Selected`;

  const checkboxSelected = selectionManagerState.selectedKeys?.size !== 0 && (
    <Text color="text.secondary">{selectedOptionText}</Text>
  );

  useEffect(() => {
    if (selectedKeysSize < itemCount) {
      setSelectionState('Select All');
    } else if (selectedKeysSize === itemCount) setSelectionState('Deselect All');
  }, [itemCount, selectedKeysSize]);

  const handleSelection = () => {
    if (selectedKeysSize < itemCount) {
      const allItemNames = arrayItems.flatMap(obj => (
        obj.children ? obj.children.map(child => child.key) : obj.key
      )).filter((key): key is Key => key !== undefined);
      selectionManager.setSelectedKeys(allItemNames);
      setSelectionState('Deselect All');
    } else if (selectionState === 'Deselect All') {
      selectionManager.setSelectedKeys([]);
      setSelectionState('Select All');
    }
  };

  const listbox = (
    <FocusScope>
      {filterString === '' && !hasNoSelectAll && (
        <Button
          onPress={handleSelection}
          ref={buttonRef}
          variant="listBoxLink"
          sx={{
            fontWeight: '400',
            width: '100%',
            justifyContent: 'flex-start',
            pl: 'lg',
            pr: 'md',
          }}
        >
          {selectionState}
        </Button>
      )}
      <DismissButton onDismiss={close} />
      <ScrollBox {...scrollBoxProps}>
        <ListBox
          ref={listBoxRef}
          hasAutoFocus={hasAutoFocus}
          hasNoEmptySelection
          state={state}
          onLoadMore={onLoadMore}
          onLoadPrev={onLoadPrev}
          loadingState={loadingState}
          isLoading={loadingState === loadingStates.LOADING_MORE}
          aria-label="List of options"
          isCondensed={mode === 'condensed'}
        />
      </ScrollBox>
      <DismissButton onDismiss={close} />
    </FocusScope>
  );

  const visuallyHidden = (
    <VisuallyHidden id="selectedKeysState">
      Selected options:
      {Array.from(selectionManager.selectedKeys).join(' ')}
    </VisuallyHidden>
  );

  // the reason we are using two different visually hiddens, rather than one that updates its value
  // is because there are tests that break if an empty visually hidden is rendered in the TextField
  const EmptyVisuallyHidden = () => {
    return (
      <VisuallyHidden id="emptyKeysState">
        Nothing Selected
      </VisuallyHidden>
    );
  };

  const placeholderText = selectionManagerState.selectedKeys?.size === 0
    ? placeholder || 'Select'
    : '';

  const inputProps = {
    ...customInputProps,
    controlProps: {
      'aria-activedescendant': activeDescendant,
      'aria-controls': listBoxRef.current?.id,
      'aria-expanded': isOpen,
      role: 'combobox',
      ref: inputRef,
      sx: { color: 'text.secondary' },
    },
    hasAutoFocus,
    hasNoStatusIndicator,
    isDisabled,
    isReadOnly,
    isRequired,
    label: label as string | undefined,
    placeholder: placeholderText,
    wrapperProps: {
      ref: inputWrapperRef,
      variant: 'forms.input.multivaluesWrapper',
      sx: isReadOnly && {
        boxShadow: 'inset 0 0 0 100px #e5e9f8',
        border: 'none',
      },
    },
    status,
  };

  const handleButtonPress = () => {
    if (!isOpen) {
      setIsOpen(true);
      inputRef.current?.focus();
    } else {
      setIsOpen(false);
    }
  };

  const button = (
    <Box isRow variant="forms.comboBox.inputInContainerSlot">
      {
        // Render loader after delay if filtering or loading
        isLoading && (isOpen || loadingState === loadingStates.LOADING) && (
          <Loader variant="loader.withinInput" />
        )
      }
      <Box
        as="button"
        variant="forms.comboBox.button"
        tabIndex={-1}
        onClick={handleButtonPress}
        sx={{ border: 'none' }}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <Icon
          icon={isOpen ? MenuUp : MenuDown}
          {...(isOnyx && { size: 'md' })}
          title={{ name: '' }}
          aria-hidden="true"
        />
      </Box>
    </Box>
  );

  return (
    <MultivaluesContext.Provider value={setActiveDescendant}>
      <Box {...mergeProps(containerProps, focusWithinProps)}>
        <TextField
          onBlur={((e: React.FocusEvent) => {
            const blurIntoPopover = popoverRef.current?.contains(
              e.relatedTarget,
            );
            if (blurIntoPopover) {
              return;
            }
            setIsOpen(false);
            setFilterString('');
            if (onBlur) onBlur(e.nativeEvent);
          }) as unknown as () => void}
          onChange={e => {
            if (!isOpen) setIsOpen(true);
            setFilterString(e.target.value);
            if (onInputChange) onInputChange(e.target.value);
          }}
          onFocus={((e: React.FocusEvent) => {
            setIsOpen(true);
            if (onFocus) onFocus(e.nativeEvent);
          }) as unknown as () => void}
          {...({ onKeyDown: keyDown, onKeyUp: e => onKeyUp && onKeyUp(e.nativeEvent) } as object)}
          aria-describedby={
            selectionManager.selectedKeys.size > 0
              ? 'selectedKeysState'
              : 'emptyKeysState'
          }
          slots={{
            inContainer: button,
            beforeInput: (
              <>
                {checkboxSelected}
                {selectionManager.selectedKeys.size > 0 && visuallyHidden}
              </>
            ),
          }}
          value={filterString}
          {...({ helperText } as object)}
          aria-invalid={status === 'error' && true}
          {...getPendoID('MultivaluesField')}
          {...others}
          {...inputProps}
        />
        <Popover
          hasNoArrow
          isNonModal
          popoverRef={popoverRef}
          triggerRef={inputWrapperRef}
          state={popoverState}
          placement={`${direction} end` as Placement}
          shouldFlip={!isNotFlippable}
          scrollRef={listBoxRef}
          {...({
            sx: menuWidthSx,
            onBlur: e => handleBlur(e as unknown as React.FocusEvent),
          } as object)}
        >
          {listbox}
        </Popover>
        <EmptyVisuallyHidden />
      </Box>
    </MultivaluesContext.Provider>
  );
});

export default CondensedMultivaluesField;
