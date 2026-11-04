import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DismissButton, FocusScope } from 'react-aria';
import type { OverlayTriggerState } from 'react-stately';
import { useFilter } from '@react-aria/i18n';
import { useLayoutEffect, useResizeObserver } from '@react-aria/utils';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useListState } from '@react-stately/list';
import type { Key, Node } from '@react-types/shared';

import {
  Badge,
  Box,
  Loader,
  ScrollBox,
  Text,
  TextField,
} from '../..';
import { MultivaluesContext } from '../../context/MultivaluesContext';
import { useGetTheme, useInputLoader, usePropWarning } from '../../hooks';
import {
  DefaultMultivaluesFieldProps,
  MultivaluesFieldItem,
} from '../../types/MultivaluesField';
import type { Placement } from '../../types/shared/style';
import type { TextFieldProps } from '../../types/textField';
import loadingStates from '../../utils/devUtils/constants/loadingStates';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import statuses from '../../utils/devUtils/constants/statuses';
import ListBox from '../ListBox';
import Popover from '../Popover/Popover';

import BadgeLabelTooltip from './BadgeLabelTooltip';

const DefaultMultivaluesField = forwardRef<HTMLDivElement, DefaultMultivaluesFieldProps>((
  props,
  ref,
) => {
  const { items: initialItems, ...otherProps } = props;
  const {
    defaultSelectedKeys,
    direction = 'bottom',
    disabledKeys = [],
    containerProps,
    hasAutoFocus,
    hasNoStatusIndicator,
    helperText,
    inputProps: customInputProps,
    isDisabled,
    isFilteringDisabled,
    isNotFlippable,
    isReadOnly = false,
    isRequired,
    label,
    loadingState,
    mode,
    multivaluesProps,
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
    readOnlyKeys = [],
    selectedKeys,
    scrollBoxProps = { maxHeight: 300 },
    status = statuses.DEFAULT,
    ...others
  } = otherProps;
  const hasCustomValue = mode === 'non-restrictive';

  usePropWarning(props, 'disabled', 'isDisabled');

  const [customItems, setCustomItems] = useState<MultivaluesFieldItem[]>([]);
  const [filterString, setFilterString] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(initialItems);
  const [activeDescendant, setActiveDescendant] = useState('');

  const { themeState } = useGetTheme();
  const { isOnyx } = themeState;

  useEffect(() => {
    if (mode !== 'non-restrictive') {
      setItems(initialItems);
    }
  }, [initialItems, mode]);

  const toggleItems = (keys: Iterable<Key>) => {
    setItems(
      (initialItems || []).filter(item => !Array.from(keys).includes(item.key as Key)),
    );
    if (onSelectionChange) onSelectionChange(keys);
    // Selecting an option removes it from the list, unmounting its row while
    // focusedKey still points at it — the virtualizer then holds DOM focus on
    // the listbox, so a subsequent outside click never blurs the input and the
    // listbox stays open. Clear the stale focus and return it to the input,
    // matching the post-selection focus state of the Astro theme (UXE-9077).
    selectionManager.setFocusedKey(null);
    inputRef.current?.focus();
  };

  const { contains } = useFilter({ sensitivity: 'base' });

  const defaultFilter = (nodes: Iterable<Node<MultivaluesFieldItem>>) => {
    const arr = Array.from(nodes).filter(item => contains(item.textValue, filterString),
    );
    return arr;
  };

  const state = useListState<MultivaluesFieldItem>({
    ...(otherProps as object),
    items: (items || []).filter(({ key }) => !readOnlyKeys.includes(key as string)),
    onSelectionChange: toggleItems,
    selectionMode: 'multiple',
    ...(!isFilteringDisabled && {
      filter: defaultFilter as (
        nodes: Iterable<Node<MultivaluesFieldItem>>,
      ) => Iterable<Node<MultivaluesFieldItem>>,
    }),
  });

  const { selectionManager } = state;

  // `selectionManager.state` is private in the react-stately typings but is
  // read throughout this component; the access is kept via a cast.
  const selectionManagerState = (selectionManager as unknown as {
    state: { selectedKeys: Set<Key> };
  }).state;

  const filteredItems = useMemo(
    () => Array.from(state.collection),
    [state.collection, filterString],
  );

  const close = () => setIsOpen(false);

  const { isLoading } = useInputLoader({
    loadingState,
    inputValue: filterString,
  } as { loadingState: string; inputValue: string });

  const closeBadgeRefs = useRef<(HTMLDivElement | HTMLButtonElement | null)[]>([]);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputWrapperRef.current as HTMLDivElement);

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
    if (defaultSelectedKeys) {
      selectionManager.setSelectedKeys(defaultSelectedKeys);
      setItems(prevItems => (prevItems || []).filter(
        item => !Array.from(defaultSelectedKeys).includes(item.key as Key),
      ),
      );
    }
  }, []);

  useEffect(() => {
    if (selectedKeys) {
      selectionManager.setSelectedKeys(selectedKeys);
      setItems(prevItems => (prevItems || []).filter(
        item => !Array.from(selectedKeys).includes(item.key as Key),
      ),
      );
    }
  }, []);

  useEffect(() => {
    if (onOpenChange) onOpenChange(isOpen);
    if (!isOpen) setActiveDescendant('');
  }, [isOpen]);

  const addNewBadgeFromInput = (inputValue: string) => {
    const key = inputValue.trim();
    if (key === '') {
      return;
    }
    if (state.selectionManager.isSelected(key)) {
      return;
    }
    selectionManager.setSelectedKeys([
      ...Array.from(selectionManagerState.selectedKeys),
      key,
    ]);
    setCustomItems([...customItems, { id: key, key, name: key }]);
    setFilterString('');
  };

  // there actually is a test for this, but coverage is not picking it up.
  /* istanbul ignore next */
  const selectTheOnlyFilteredItem = () => {
    const key = filteredItems[0].key;
    if (!disabledKeys.includes(key)) {
      selectionManager.toggleSelection(filteredItems[0].key as Key);
      setFilterString('');
    }
  };

  // there actually is a test for this, but coverage is not picking it up.
  /* istanbul ignore next */
  const onBlurTextField = () => {
    if (hasCustomValue && filteredItems.length === 1) {
      selectTheOnlyFilteredItem();
    } else if (hasCustomValue) {
      addNewBadgeFromInput(filterString);
    }
  };

  /* istanbul ignore next */
  const keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter': {
        e.preventDefault();
        if (selectionManager.focusedKey) {
          const key = selectionManager.focusedKey;
          if (!disabledKeys.includes(key)) {
            selectionManager.toggleSelection(selectionManager.focusedKey);
          }
        } else if (hasCustomValue && !selectionManager.focusedKey) {
          const key = (e.target as HTMLInputElement).value;
          if (key === '') {
            return;
          }
          addNewBadgeFromInput((e.target as HTMLInputElement).value);
        } else if (hasCustomValue && filteredItems.length === 1) {
          selectTheOnlyFilteredItem();
        } else if (!hasCustomValue) {
          setFilterString('');
          close();
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
        close();
        break;
      }
      default:
        break;
    }
    if (onKeyDown) onKeyDown(e.nativeEvent);
  };

  const deleteItem = (key: Key, e: { pointerType: string }) => {
    const activeBadgesKeys = closeBadgeRefs.current.reduce(
      (result: (string | undefined)[], item) => {
        if (item) {
          result.push(item.dataset.item);
        }
        return result;
      },
      [],
    );

    selectionManager.toggleSelection(key);

    if (e.pointerType !== 'keyboard') return;

    if (activeBadgesKeys.length > 1) {
      const badgeIndex = activeBadgesKeys.findIndex(item => item === key);
      const nextFocusBadgeIndex = badgeIndex === activeBadgesKeys.length - 1
        ? badgeIndex - 1
        : badgeIndex;
      closeBadgeRefs.current[nextFocusBadgeIndex]?.focus();
    } else {
      inputRef.current?.focus();
    }
  };

  const readOnlyFieldBadge = (key: Key, name: string) => {
    return (
      <Badge
        key={key}
        label={name}
        variant="readOnlyFieldBadge"
        bg="gray-700"
        {...({ tabIndex: 0 } as object)}
      />
    );
  };

  const readOnlyTextItem = (key: Key, name?: string) => {
    return (
      <Text
        key={key}
        role="presentation"
        {...({ label: name } as object)}
        variant="bodyStrong"
        sx={{
          bg: 'accent.95',
          fontSize: 'sm',
          alignSelf: 'center',
          ':not(:last-of-type):after': {
            content: '",\u00a0"',
          },
        }}
      >
        {name}
      </Text>
    );
  };

  const readOnlyInputEntry = isReadOnly
    && (readOnlyKeys.length
      ? readOnlyKeys.map(key => {
        const item = [...(initialItems || []), ...customItems].find(
          el => el.key === key,
        );
        if (item) {
          return item.key !== undefined && readOnlyTextItem(item.key, item.name);
        }
        return null;
      })
      : (initialItems || []).map(item => {
        return item.key !== undefined && readOnlyTextItem(item.key, item.name);
      }));

  const onyxReadOnlyInputEntry = isReadOnly && (
    <Box isRow gap="xs">
      {(initialItems || []).map(item => {
        return item.key !== undefined && readOnlyFieldBadge(item.key, item.name || '');
      })}
    </Box>
  );

  const readOnlyItems = !isReadOnly
    && readOnlyKeys.map(key => {
      const item = (initialItems || []).find(el => el.key === key);
      if (item) {
        return (
          <Badge
            key={item.key}
            label={item.name}
            variant="readOnlyBadge"
            {...({ as: 'li', tabIndex: 0 } as object)}
          />
        );
      }
      return null;
    });

  const multivaluesFieldBadge = (item: MultivaluesFieldItem, index: number) => (
    <BadgeLabelTooltip
      key={`tooltip-${item.key}`}
      item={item}
      index={index}
      deleteItem={deleteItem}
      closeBadgeRefs={closeBadgeRefs}
    />
  );

  const selectedItems = (
    <>
      {Array.from(selectionManager.selectedKeys).map((key, i) => {
        const item = [...(initialItems || []), ...customItems].find(
          el => el.key === key,
        );
        if (item) {
          return multivaluesFieldBadge(item, i);
        }
        return null;
      })}
    </>
  );

  const listbox = (
    <FocusScope>
      <DismissButton onDismiss={close} />
      <ScrollBox {...scrollBoxProps}>
        <ListBox
          ref={listBoxRef}
          hasAutoFocus
          hasVirtualFocus
          hasNoEmptySelection
          state={state}
          onLoadMore={onLoadMore}
          onLoadPrev={onLoadPrev}
          loadingState={loadingState}
          isLoading={loadingState === loadingStates.LOADING_MORE}
          aria-label="List of options"
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

  // the reason we are using two different visually hiddens, rather than one that updates it's value
  // is because there are tests that break if an empty visually hidden is rendered in the TextField
  const EmptyVisuallyHidden = () => {
    return (
      <VisuallyHidden id="emptyKeysState">Nothing Selected</VisuallyHidden>
    );
  };

  const handleBlur = (e: React.FocusEvent) => {
    const relatedTarget = e.relatedTarget || document.activeElement;

    // Relates to [UIP-7515] to check if the
    // focused element is inside the listbox or input wrapper
    if (
      inputWrapperRef.current?.contains(relatedTarget)
      || listBoxRef.current?.contains(relatedTarget)
    ) {
      return;
    }

    setIsOpen(false);
    if (filterString !== '') onBlurTextField();
    if (onBlur) onBlur(e.nativeEvent);
    if (!hasCustomValue) setFilterString('');
  };

  const inputProps = {
    ...customInputProps,
    containerProps: {
      ...containerProps,
      variant: 'forms.input.multivaluesFieldContainer',
    },

    controlProps: {
      'aria-activedescendant': activeDescendant,
      'aria-controls': listBoxRef.current?.id,
      'aria-expanded': isOpen,
      role: 'combobox',
      ref: inputRef,
    },
    hasAutoFocus,
    hasNoStatusIndicator,
    isDisabled,
    isReadOnly,
    isRequired,
    label: label as string | undefined,
    placeholder,
    wrapperProps: {
      ref: inputWrapperRef,
      variant: 'forms.input.multivaluesWrapper',
    },
    status,
  };

  const loader = (
    <Box isRow variant="forms.comboBox.inputInContainerSlot">
      {
        // Render loader after delay if filtering or loading
        isLoading && loadingState === loadingStates.LOADING && (
          <Loader variant="loader.withinInput" />
        )
      }
    </Box>
  );

  return (
    <MultivaluesContext.Provider value={setActiveDescendant}>
      <Box {...multivaluesProps}>
        <TextField
          onBlur={handleBlur as unknown as () => void}
          onChange={e => {
            if (!isOpen) setIsOpen(true);
            setFilterString(e.target.value);
            if (onInputChange) onInputChange(e.target.value);
          }}
          onFocus={((e: React.FocusEvent) => {
            if (!isReadOnly) {
              setIsOpen(true);
            }
            if (onFocus) onFocus(e.nativeEvent);
          }) as unknown as () => void}
          {...({ onKeyDown: keyDown, onKeyUp: e => onKeyUp && onKeyUp(e.nativeEvent) } as object)}
          aria-describedby={
            selectionManager.selectedKeys.size > 0
              ? 'selectedKeysState'
              : 'emptyKeysState'
          }
          slots={{
            inContainer: loader,
            beforeInput: (
              <>
                {readOnlyItems && (
                  <Box as="ul" isRow sx={{ p: 0, flexWrap: 'wrap' }}>
                    {readOnlyItems}
                  </Box>
                )}
                {' '}
                {selectedItems && (
                  <Box
                    as="ul"
                    isRow
                    sx={{ p: 0, flexWrap: 'wrap', ...(isOnyx && { columnGap: 'xs', rowGap: 'xs' }) }}
                  >
                    {selectedItems}
                  </Box>
                )}
                {isOnyx ? onyxReadOnlyInputEntry : readOnlyInputEntry}
                {selectionManager.selectedKeys.size > 0 && visuallyHidden}
              </>
            ),
          }}
          value={filterString}
          {...({ helperText } as object)}
          aria-invalid={status === 'error' && true}
          {...getPendoID('MultivaluesField')}
          {...others as TextFieldProps}
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
          {...({ sx: menuWidthSx } as object)}
        >
          {listbox}
        </Popover>
        <EmptyVisuallyHidden />
      </Box>
    </MultivaluesContext.Provider>
  );
});

export default DefaultMultivaluesField;
