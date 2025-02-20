import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { DismissButton, FocusScope, useOverlayPosition } from 'react-aria';
import Clear from '@pingux/mdi-react/CloseIcon';
import { useFilter } from '@react-aria/i18n';
import { useLayoutEffect, useResizeObserver } from '@react-aria/utils';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useListState } from '@react-stately/list';
import PropTypes from 'prop-types';

import { Badge, Box, Icon, IconButton, PopoverContainer, ScrollBox, Text, TextField } from '../..';
import { MultivaluesContext } from '../../context/MultivaluesContext';
import { usePropWarning } from '../../hooks';
import loadingStates from '../../utils/devUtils/constants/loadingStates';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';
import { ariaAttributesBasePropTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributesBasePropTypes } from '../../utils/docUtils/fieldAttributes';
import { statusDefaultProp, statusPropTypes } from '../../utils/docUtils/statusProp';
import ListBox from '../ListBox';

const DefaultMultivaluesField = forwardRef((props, ref) => {
  const {
    defaultSelectedKeys,
    direction,
    disabledKeys = [],
    containerProps,
    hasAutoFocus,
    hasNoStatusIndicator,
    helperText,
    inputProps: customInputProps,
    isDisabled,
    isNotFlippable,
    isReadOnly,
    isRequired,
    items: initialItems,
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
    readOnlyKeys = [],
    selectedKeys,
    scrollBoxProps,
    status,
    ...others
  } = props;
  const hasCustomValue = mode === 'non-restrictive';

  usePropWarning(props, 'disabled', 'isDisabled');

  const [customItems, setCustomItems] = useState([]);
  const [filterString, setFilterString] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(initialItems);
  const [activeDescendant, setActiveDescendant] = useState('');

  useEffect(() => {
    if (mode !== 'non-restrictive') {
      setItems(initialItems);
    }
  }, [initialItems, mode]);

  const toggleItems = keys => {
    setItems(initialItems.filter(item => !Array.from(keys).includes(item.key)));
    setFilterString('');
    if (onSelectionChange) onSelectionChange(keys);
  };

  const { contains } = useFilter({ sensitivity: 'base' });

  const state = useListState({
    ...props,
    filter: nodes => Array.from(nodes).filter(
      item => contains(item.textValue, filterString),
    ),
    items: items.filter(({ key }) => !readOnlyKeys.includes(key)),
    onSelectionChange: toggleItems,
    selectionMode: 'multiple',
  });

  const { selectionManager } = state;

  const filteredItems = useMemo(
    () => Array.from(state.collection),
    [state.collection, filterString],
  );

  const close = () => setIsOpen(false);

  const closeBadgeRefs = useRef([]);
  const inputWrapperRef = useRef();
  const inputRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputWrapperRef.current);

  useImperativeHandle(ref, () => inputRef.current);
  const listBoxRef = useRef();
  const popoverRef = useRef();

  const { overlayProps, placement, updatePosition } = useOverlayPosition({
    isOpen,
    onClose: close,
    offset: 1,
    overlayRef: popoverRef,
    placement: `${direction} end`,
    scrollRef: listBoxRef,
    shouldFlip: !isNotFlippable,
    targetRef: inputWrapperRef,
  });

  // Update position once the ListBox has rendered. This ensures that
  // it flips properly when it doesn't fit in the available space.
  /* istanbul ignore next */
  useLayoutEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        updatePosition();
      });
    }
  }, [isOpen, selectionManager.selectedKeys, updatePosition]);

  // Measure the width of the input to inform the width of the menu (below).
  const [menuWidth, setMenuWidth] = useState(null);

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

  const style = {
    ...overlayProps.style,
    width: menuWidth,
    minWidth: menuWidth,
  };

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

  const addNewBadgeFromInput = inputValue => {
    const key = inputValue.trim();
    if (key === '') {
      return;
    }
    if (state.selectionManager.isSelected(key)) {
      return;
    }
    selectionManager.setSelectedKeys(
      [...Array.from(selectionManager.state.selectedKeys), key],
    );
    setCustomItems([...customItems, { id: key, key, name: key }]);
    setFilterString('');
  };

  // there actually is a test for this, but coverage is not picking it up.
  /* istanbul ignore next */
  const selectTheOnlyFilteredItem = () => {
    const key = filteredItems[0].key;
    if (!disabledKeys.includes(key)) {
      selectionManager.toggleSelection(filteredItems[0].key);
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
  const keyDown = e => {
    switch (e.key) {
      case 'Enter': {
        e.preventDefault();
        if (selectionManager.focusedKey) {
          const key = selectionManager.focusedKey;
          if (!disabledKeys.includes(key)) {
            selectionManager.toggleSelection(selectionManager.focusedKey);
            setFilterString('');
          }
        } else if (hasCustomValue && !selectionManager.focusedKey) {
          const key = e.target.value;
          if (key === '') { return; }
          addNewBadgeFromInput(e.target.value);
        } else if (hasCustomValue && filteredItems.length === 1) {
          selectTheOnlyFilteredItem();
        } else if (!hasCustomValue) {
          setFilterString('');
          close();
        }
        break;
      }
      case 'ArrowDown': {
        const nextKey = state.collection.getKeyAfter(selectionManager.focusedKey)
          || state.collection.getFirstKey();
        if (nextKey) selectionManager.setFocusedKey(nextKey);
        break;
      }
      case 'ArrowUp': {
        const prevKey = state.collection.getKeyBefore(selectionManager.focusedKey)
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

  const deleteItem = (key, e) => {
    const activeBadgesKeys = closeBadgeRefs.current.reduce((result, item) => {
      if (item) {
        result.push(item.dataset.item);
      }
      return result;
    }, []);

    selectionManager.toggleSelection(key);

    if (e.pointerType !== 'keyboard') return;

    if (activeBadgesKeys.length > 1) {
      const badgeIndex = activeBadgesKeys.findIndex(item => item === key);
      const nextFocusBadgeIndex = badgeIndex === activeBadgesKeys.length - 1
        ? badgeIndex - 1 : badgeIndex;
      closeBadgeRefs.current[nextFocusBadgeIndex].focus();
    } else {
      inputRef.current.focus();
    }
  };

  const readOnlyTextItem = (key, name) => {
    return (
      <Text
        key={key}
        role="presentation"
        label={name}
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

  const readOnlyInputEntry = (
    isReadOnly && (readOnlyKeys.length
      ? readOnlyKeys.map(key => {
        const item = [...initialItems, ...customItems].find(el => el.key === key);
        if (item) {
          return (readOnlyTextItem(item.key, item.name));
        }
        return null;
      })
      : initialItems.map(item => {
        return (
          readOnlyTextItem(item.key, item.name)
        );
      })
    )
  );

  const readOnlyItems = (
    !isReadOnly && readOnlyKeys
      .map(key => {
        const item = initialItems.find(el => el.key === key);
        if (item) {
          return (
            <Badge
              key={item.key}
              label={item.name}
              variant="readOnlyBadge"
              bg="white"
              textProps={{ sx: { color: 'text.primary', tabIndex: '-1' } }}
              as="li"
              tabIndex={0}
            />
          );
        }
        return null;
      })
  );

  const multivaluesFieldBadge = (item, index) => (
    <Box as="li" key={`li ${item.key}`}>
      <Badge
        key={item.key}
        role="presentation"
        bg="active"
        variant="selectedItemBadge"
        label={item.name}
        slots={item.slots}
        {...item.badgeProps}
      >
        <IconButton
          aria-label={`delete ${item.name}`}
          data-item={item.name}
          onPress={e => deleteItem(item.key, e)}
          ref={el => closeBadgeRefs.current[index] = el} // eslint-disable-line
          variant="badge.deleteButton"
          aria-describedby="selectedKeysState"
          {...item.buttonProps}
        >
          <Icon icon={Clear} color="white" size={14} title={{ name: 'Clear Icon' }} />
        </IconButton>
      </Badge>
    </Box>
  );

  const selectedItems = (
    <>
      {Array.from(selectionManager.selectedKeys)
        .map((key, i) => {
          const item = [...initialItems, ...customItems].find(el => el.key === key);
          if (item) {
            return (
              multivaluesFieldBadge(item, i)
            );
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
          hasAutoFocus={hasAutoFocus}
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
      <VisuallyHidden id="emptyKeysState">
        Nothing Selected
      </VisuallyHidden>
    );
  };

  const inputProps = {
    ...customInputProps,
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
    label,
    placeholder,
    wrapperProps: {
      ref: inputWrapperRef,
      variant: 'forms.input.multivaluesWrapper',
      sx: isReadOnly && { boxShadow: 'inset 0 0 0 100px #e5e9f8', border: 'none' },
    },
    status,
  };

  return (
    <MultivaluesContext.Provider value={setActiveDescendant}>
      <Box {...containerProps}>
        <TextField
          onBlur={e => {
            setIsOpen(false);
            if (filterString !== '') onBlurTextField();
            if (onBlur) onBlur(e.nativeEvent);
            if (!hasCustomValue) setFilterString('');
          }}
          onChange={e => {
            if (!isOpen) setIsOpen(true);
            setFilterString(e.target.value);
            if (onInputChange) onInputChange(e.target.value);
          }}
          onFocus={e => {
            if (!isReadOnly) {
              setIsOpen(true);
            }
            if (onFocus) onFocus(e.nativeEvent);
          }}
          onKeyDown={keyDown}
          onKeyUp={e => onKeyUp && onKeyUp(e.nativeEvent)}
          aria-describedby={selectionManager.selectedKeys.size > 0 ? 'selectedKeysState' : 'emptyKeysState'}
          slots={{
            beforeInput:
  <>
    {
      readOnlyItems
      && (
        <Box as="ul" isRow sx={{ p: 0, flexWrap: 'wrap' }}>
          {readOnlyItems}
        </Box>
      )
    }
    {' '}
    {
      selectedItems
      && (
        <Box as="ul" isRow sx={{ p: 0, flexWrap: 'wrap' }}>
          {selectedItems}
        </Box>
      )
    }
    {readOnlyInputEntry}
    {selectionManager.selectedKeys.size > 0 && visuallyHidden}
  </>,
          }} // eslint-disable-line
          value={filterString}
          helperText={helperText}
          aria-invalid={status === 'error' && true}
          {...getPendoID('MultivaluesField')}
          {...others}
          {...inputProps}
        />
        <PopoverContainer
          hasNoArrow
          isNonModal
          isOpen={!state.collection.size ? false : isOpen}
          onClose={close}
          placement={placement}
          ref={popoverRef}
          style={style}
        >
          {listbox}
        </PopoverContainer>
        <EmptyVisuallyHidden />
      </Box>
    </MultivaluesContext.Provider>
  );
});

DefaultMultivaluesField.propTypes = {
  /** The initial selected keys in the collection (uncontrolled). */
  defaultSelectedKeys: isIterableProp,
  /** Where the menu opens relative to its trigger. */
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /**
   * The item keys that are disabled. These items cannot be selected.
   */
  disabledKeys: isIterableProp,
  /** Whether the element should receive focus on render. */
  hasAutoFocus: PropTypes.bool,
  /** Whether the field has a status indicator. */
  hasNoStatusIndicator: PropTypes.bool,
  /** Text rendered below the input. */
  helperText: PropTypes.node,
  /**
   * Props that get passed as-is to the underlying TextField element
   */
  inputProps: PropTypes.shape({}),
  /** Whether the input is disabled. */
  isDisabled: PropTypes.bool,
  /**
   * Whether the menu is prevented from flipping directions when insufficient space is
   * available for the given `direction` placement.
   */
  isNotFlippable: PropTypes.bool,
  /** Whether the input can be selected but not changed by the user. */
  isReadOnly: PropTypes.bool,
  /** Whether user input is required on the input before form submission. */
  isRequired: PropTypes.bool,
  /** The list of items.
   *
   * **Note:** Every item needs to have key and name properties.
   *
   * `Array<{key: string, name: string}>`
   */
  items: isIterableProp,
  /** The rendered label for the field. */
  label: PropTypes.string,
  /** Whether the component allows to create new values or only choose from the selection list */
  mode: PropTypes.oneOf(['restrictive', 'non-restrictive']),
  /**
   * Handler that is called when the element loses focus.
   *
   * `(e: FocusEvent) => void`
   */
  onBlur: PropTypes.func,
  /**
   * Handler that is called when the element receives focus.
   *
   * `(e: FocusEvent) => void`
   */
  onFocus: PropTypes.func,
  /**
   * Handler that is called when the input value changes.
   *
   * `(value: string) => void`
   */
  onInputChange: PropTypes.func,
  /**
   * Handler that is called when a key is pressed.
   *
   * `(e: KeyboardEvent) => void`
   */
  onKeyDown: PropTypes.func,
  /**
  * Handler that is called when a key is released.
  *
  * `(e: KeyboardEvent) => void`
  */
  onKeyUp: PropTypes.func,
  /**
   * Method that is called when the open state of the menu changes.
   *
   * `(isOpen: boolean) => void`
   */
  onOpenChange: PropTypes.func,
  /**
   * Handler that is called when the selection changes.
   *
   * `(keys: Iterable<Key>) => any`
   */
  onSelectionChange: PropTypes.func,
  /** Temporary text that occupies the text input when it is empty. */
  placeholder: PropTypes.string,
  /**
   * The item keys that are readonly. These items cannot be changed or selected.
   */
  readOnlyKeys: PropTypes.arrayOf(PropTypes.string),
  /** The currently selected keys in the collection (controlled). */
  selectedKeys: isIterableProp,
  // /** Props object that is spread directly into the ScrollBox element. */
  /** @ignore */
  scrollBoxProps: PropTypes.shape({
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  }),
  ...statusPropTypes,
  ...ariaAttributesBasePropTypes,
  ...inputFieldAttributesBasePropTypes,
};

DefaultMultivaluesField.defaultProps = {
  direction: 'bottom',
  isReadOnly: false,
  scrollBoxProps: { maxHeight: 300 },
  ...statusDefaultProp,
};

export default DefaultMultivaluesField;
