import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Clear from 'mdi-react/CloseIcon';
import { useFilter } from '@react-aria/i18n';
import { FocusScope } from '@react-aria/focus';
import { useListState } from '@react-stately/list';
import { DismissButton, useOverlayPosition } from '@react-aria/overlays';
import { useLayoutEffect, useResizeObserver } from '@react-aria/utils';
import { Box, Chip, Icon, IconButton, PopoverContainer, ScrollBox, Text, TextField } from '../..';

import ListBox from '../ListBox';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';
import { usePropWarning } from '../../hooks';
import statuses from '../../utils/devUtils/constants/statuses';
import FieldHelperText from '../FieldHelperText';

/**
 * Complex control that lets you choose several tags from the dropdown list.
 * Or to add your own values in non-restrictive mode.
 *
 * Combines an input with a Listbox for a filterable dropdown list.
 *
 * Utilizes [useListState](https://react-spectrum.adobe.com/react-stately/useListState.html) from React
 * Stately.
 */
const MultivaluesField = forwardRef((props, ref) => {
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
    mode,
    onBlur,
    onFocus,
    onInputChange,
    onKeyDown,
    onKeyUp,
    onOpenChange,
    onSelectionChange,
    placeholder,
    readOnlyKeys = [],
    selectedKeys,
    scrollBoxProps,
    status,
  } = props;

  const hasCustomValue = mode === 'non-restrictive';

  usePropWarning(props, 'disabled', 'isDisabled');

  const [customItems, setCustomItems] = useState([]);
  const [filterString, setFilterString] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(initialItems);

  const toggleItems = (keys) => {
    setItems(initialItems.filter(item => !Array.from(keys).includes(item.key)));
    setFilterString('');
    if (onSelectionChange) onSelectionChange(keys);
  };

  const { contains } = useFilter({ sensitivity: 'base' });

  const state = useListState({
    ...props,
    filter: nodes =>
      Array.from(nodes).filter(
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

  const inputRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputRef.current);
  const listBoxRef = useRef();
  const popoverRef = useRef();

  const { overlayProps, placement, updatePosition } = useOverlayPosition({
    isOpen,
    onClose: close,
    overlayRef: popoverRef,
    placement: `${direction} end`,
    scrollRef: listBoxRef,
    shouldFlip: !isNotFlippable,
    targetRef: inputRef,
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
    if (inputRef.current) {
      setMenuWidth(`${inputRef.current.offsetWidth + 2}px`);
    }
  }, [inputRef, isOpen, setMenuWidth]);

  useResizeObserver({
    ref: inputRef,
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
  }, [isOpen]);

  useEffect(() => {
    if (!state.collection.size) close();
  }, [state.collection]);

  /* istanbul ignore next */
  const keyDown = (e) => {
    switch (e.key) {
      case 'Enter': {
        if (selectionManager.focusedKey) {
          const key = selectionManager.focusedKey;
          if (!disabledKeys.includes(key)) {
            selectionManager.toggleSelection(selectionManager.focusedKey);
            setFilterString('');
          }
        } else if (!hasCustomValue && filteredItems.length === 1) {
          const key = filteredItems[0].key;
          if (!disabledKeys.includes(key)) {
            selectionManager.toggleSelection(filteredItems[0].key);
            setFilterString('');
          }
        } else if (hasCustomValue) {
          const key = e.target.value;
          if (state.selectionManager.isSelected(key)) {
            return;
          }
          selectionManager.toggleSelection(key);
          setCustomItems([...customItems, { id: key, key, name: key }]);
          setFilterString('');
        }
        break;
      }
      case 'ArrowDown': {
        const nextKey =
          state.collection.getKeyAfter(selectionManager.focusedKey) ||
          state.collection.getFirstKey();
        if (nextKey) selectionManager.setFocusedKey(nextKey);
        break;
      }
      case 'ArrowUp': {
        const prevKey =
          state.collection.getKeyBefore(selectionManager.focusedKey) ||
          state.collection.getLastKey();
        if (prevKey) selectionManager.setFocusedKey(prevKey);
        break;
      }
      default:
        break;
    }
    if (onKeyDown) onKeyDown(e.nativeEvent);
  };

  const deleteItem = (key) => {
    selectionManager.toggleSelection(key);
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
      >{name}
      </Text>
    );
  };

  const readOnlyInputEntry = (
    <>
      {isReadOnly &&
        (readOnlyKeys.length ?
          readOnlyKeys.map((key) => {
            const item = [...initialItems, ...customItems].find(el => el.key === key);
            if (item) {
              return (readOnlyTextItem(item.key, item.name));
            }
            return null;
          })
          :
          initialItems.map((item) => {
            return (
              readOnlyTextItem(item.key, item.name)
            );
          })
        )
      }
    </>
  );

  const readOnlyItems = (
    <>
      {!isReadOnly && readOnlyKeys
        .map((key) => {
          const item = initialItems.find(el => el.key === key);
          if (item) {
            return (
              <Chip
                key={item.key}
                role="presentation"
                label={item.name}
                variant="boxes.readOnlyChip"
                bg="white"
                textProps={{ sx: { color: 'text.primary' } }}
              />
            );
          }
          return null;
        })}
    </>
  );

  const selectedItems = (
    <>
      {Array.from(selectionManager.selectedKeys)
        .map((key) => {
          const item = [...initialItems, ...customItems].find(el => el.key === key);
          if (item) {
            return (
              <Chip
                key={item.key}
                role="presentation"
                variant="boxes.selectedItemChip"
                bg="active"
                label={item.name}
              >
                <IconButton aria-label="delete" onPress={() => deleteItem(item.key)} variant="buttons.chipDeleteButton">
                  <Icon icon={Clear} color="white" size={14} />
                </IconButton>
              </Chip>
            );
          }
          return null;
        })}
    </>
  );

  const listbox = (
    <FocusScope restoreFocus>
      <DismissButton onDismiss={close} />
      <ScrollBox {...scrollBoxProps} >
        <ListBox
          ref={listBoxRef}
          hasAutoFocus={hasAutoFocus}
          hasVirtualFocus
          hasNoEmptySelection
          state={state}
          aria-label="List of options"
        />
      </ScrollBox>
      <DismissButton onDismiss={close} />
    </FocusScope>
  );

  const inputProps = {
    ...customInputProps,
    controlProps: {
      'aria-expanded': isOpen,
      role: 'combobox',
    },
    hasAutoFocus,
    hasNoStatusIndicator,
    isDisabled,
    isReadOnly,
    isRequired,
    label,
    placeholder,
    wrapperProps: {
      ref: inputRef,
      variant: 'forms.input.multivaluesWrapper',
      sx: isReadOnly && { boxShadow: 'inset 0 0 0 100px #e5e9f8', border: 'none' },
    },
    status,
  };

  return (
    <Box {...containerProps}>
      <TextField
        onBlur={(e) => {
          setIsOpen(false);
          if (onBlur) onBlur(e.nativeEvent);
        }}
        onChange={(e) => {
          setFilterString(e.target.value);
          if (onInputChange) onInputChange(e.target.value);
        }}
        onFocus={(e) => {
          if (!isReadOnly) {
             setIsOpen(true);
          }
          if (onFocus) onFocus(e.nativeEvent);
        }}
        onKeyDown={keyDown}
        onKeyUp={e => onKeyUp && onKeyUp(e.nativeEvent)}
        slots={{ beforeInput: <>{readOnlyItems} {selectedItems}{readOnlyInputEntry}</> }}
        value={filterString}
        {...inputProps}
      />
      {
        helperText &&
          <FieldHelperText status={status}>
            {helperText}
          </FieldHelperText>
      }

      <PopoverContainer
        ref={popoverRef}
        hasNoArrow
        isNonModal
        isOpen={isOpen}
        placement={placement}
        style={style}
      >
        {listbox}
      </PopoverContainer>
    </Box>
  );
});

MultivaluesField.propTypes = {
  /** Props object that is spread directly into the root (top-level) Box component. */
  containerProps: PropTypes.shape({}),
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
  /** Determines the input status indicator and helper text styling. */
  status: PropTypes.oneOf(Object.values(statuses)),
};

MultivaluesField.defaultProps = {
  direction: 'bottom',
  isReadOnly: false,
  mode: 'restrictive',
  scrollBoxProps: { maxHeight: 300 },
  status: statuses.DEFAULT,
};

export default MultivaluesField;
