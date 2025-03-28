import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { DismissButton, FocusScope, useOverlayPosition } from 'react-aria';
import MenuDown from '@pingux/mdi-react/MenuDownIcon';
import MenuUp from '@pingux/mdi-react/MenuUpIcon';
import { useFilter } from '@react-aria/i18n';
import { useLayoutEffect, useResizeObserver } from '@react-aria/utils';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useListState } from '@react-stately/list';
import PropTypes from 'prop-types';

import { Box, Button, Icon, PopoverContainer, ScrollBox, Text, TextField } from '../..';
import { MultivaluesContext } from '../../context/MultivaluesContext';
import { usePropWarning } from '../../hooks';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';
import { ariaAttributesBasePropTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributesBasePropTypes } from '../../utils/docUtils/fieldAttributes';
import { statusDefaultProp, statusPropTypes } from '../../utils/docUtils/statusProp';
import ListBox from '../ListBox';

const CondensedMultivaluesField = forwardRef((props, ref) => {
  const {
    defaultSelectedKeys,
    direction,
    disabledKeys = [],
    containerProps,
    hasAutoFocus,
    hasNoSelectAll,
    hasNoStatusIndicator,
    helperText,
    inputProps: customInputProps,
    isDisabled,
    isNotFlippable,
    isReadOnly,
    isRequired,
    items,
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
    selectedKeys,
    scrollBoxProps,
    status,
    ...others
  } = props;

  usePropWarning(props, 'disabled', 'isDisabled');

  const [filterString, setFilterString] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [activeDescendant, setActiveDescendant] = useState('');

  const inputWrapperRef = useRef();
  const inputRef = useRef();
  const buttonRef = useRef();

  const toggleItems = keys => {
    setFilterString('');
    if (onSelectionChange) onSelectionChange(keys);
  };

  const { contains } = useFilter({ sensitivity: 'base' });

  const filterNodesWithChildren = iterableNode => {
    const nodeArr = Array.from(iterableNode);
    // filters child items if they have sections
    const filteredSections = nodeArr.map(function f(nodeItem) {
      if (nodeItem?.type === 'item') {
        return contains(nodeItem?.value?.name || '', filterString) && nodeItem;
      }

      const childNodes = Array.from(nodeItem.childNodes).filter(f);
      // Don't return sections without children, see UIP-5951
      return childNodes.length !== 0 && {
        ...nodeItem,
        childNodes,
      };
    });

    // we are filtering null items here since we were not able to filter them in previous function
    return filteredSections.filter(item => item);
  };

  const state = useListState({
    ...props,
    filter: filterNodesWithChildren,
    items,
    onSelectionChange: toggleItems,
    selectionMode: 'multiple',
  });

  const { selectionManager } = state;

  const close = () => setIsOpen(false);

  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputWrapperRef.current);
  /* istanbul ignore next */
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
        } else {
          setFilterString('');
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

  const [selectionState, setSelectionState] = useState('Select All');

  const arrayItems = Array.from(items);
  const itemCount = arrayItems.reduce((count, obj) => count + (
    obj.children ? obj.children.length : 1
  ), 0);

  const selectedKeysSize = selectionManager.selectedKeys.size;

  const checkboxSelected = (
    selectionManager.state.selectedKeys?.size !== 0
  && (
  <Text color="text.secondary">
    {itemCount === selectedKeysSize ? 'All' : selectionManager.state.selectedKeys?.size}
    {' '}
    Selected
  </Text>
  )
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
      ));
      selectionManager.setSelectedKeys(allItemNames);
      setSelectionState('Deselect All');
    } else if (selectionState === 'Deselect All') {
      selectionManager.setSelectedKeys([]);
      setSelectionState('Select All');
    }
  };

  const listbox = (
    <FocusScope>
      {(filterString === '' && !hasNoSelectAll) && (
      <Button
        onPress={handleSelection}
        ref={buttonRef}
        variant="link"
        mt="sm"
        ml="14px"
        sx={{ fontWeight: '400' }}
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
          aria-label="List of options"
          isCondensed={mode === 'condensed'}
          {...overlayProps}
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
    label,
    placeholder: selectionManager.state.selectedKeys?.size === 0 ? 'Select' : '',
    wrapperProps: {
      ref: inputWrapperRef,
      variant: 'forms.input.multivaluesWrapper',
      sx: isReadOnly && { boxShadow: 'inset 0 0 0 100px #e5e9f8', border: 'none' },
    },
    status,
  };

  const handleButtonPress = () => {
    if (!isOpen) {
      setIsOpen(true);
      inputRef.current.focus();
    } else {
      close();
    }
  };

  const button = (
    <Box as="button" variant="forms.comboBox.button" tabIndex={-1} onClick={handleButtonPress} sx={{ border: 'none' }}>
      <Icon icon={isOpen ? MenuUp : MenuDown} title={{ name: isOpen ? 'Menu Up Icon' : 'Menu Down Icon' }} />
    </Box>
  );

  return (
    <MultivaluesContext.Provider value={setActiveDescendant}>
      <Box {...containerProps}>
        <TextField
          onBlur={e => {
            const blurIntoPopover = popoverRef.current?.contains(e.relatedTarget);
            if (blurIntoPopover) {
              return;
            }
            setIsOpen(false);
            setFilterString('');
            if (onBlur) onBlur(e.nativeEvent);
          }}
          onChange={e => {
            if (!isOpen) setIsOpen(true);
            setFilterString(e.target.value);
            if (onInputChange) onInputChange(e.target.value);
          }}
          onFocus={e => {
            setIsOpen(true);
            if (onFocus) onFocus(e.nativeEvent);
          }}
          onKeyDown={keyDown}
          onKeyUp={e => onKeyUp && onKeyUp(e.nativeEvent)}
          aria-describedby={selectionManager.selectedKeys.size > 0 ? 'selectedKeysState' : 'emptyKeysState'}
          slots={{
            inContainer: button,
            beforeInput: (
              <>
                { checkboxSelected}
                {selectionManager.selectedKeys.size > 0 && visuallyHidden}
              </>),
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

CondensedMultivaluesField.propTypes = {
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
  /** Whether the field has the select all button. */
  hasNoSelectAll: PropTypes.bool,
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
  mode: PropTypes.oneOf(['restrictive', 'non-restrictive', 'condensed']),
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

CondensedMultivaluesField.defaultProps = {
  direction: 'bottom',
  isReadOnly: false,
  scrollBoxProps: { maxHeight: 300 },
  ...statusDefaultProp,
};

export default CondensedMultivaluesField;
