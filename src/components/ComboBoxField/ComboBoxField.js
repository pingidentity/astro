import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { DismissButton, FocusScope, useComboBox, useOverlayPosition } from 'react-aria';
import { useComboBoxState } from 'react-stately';
import { useFilter } from '@react-aria/i18n';
import { useLayoutEffect, useResizeObserver } from '@react-aria/utils';
import PropTypes from 'prop-types';

import { usePropWarning } from '../../hooks';
import loadingStates from '../../utils/devUtils/constants/loadingStates';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';
import { ariaAttributesBasePropTypes, getAriaAttributeProps } from '../../utils/docUtils/ariaAttributes';
import { statusPropTypes } from '../../utils/docUtils/statusProp';
import ComboBoxInput from '../ComboBox';
import ListBox from '../ListBox';
import PopoverContainer from '../PopoverContainer';
import ScrollBox from '../ScrollBox';

const displayName = 'ComboBoxField';

const ComboBoxField = forwardRef((props, ref) => {
  const {
    hasAutoFocus,
    hasAddOption,
    hasCustomValue,
    hasNoEmptySelection,
    selectedKey,
    onSelectionChange,
    defaultItems: initialDefaultItems,
    items: initialItems,
    loadingState,
    onLoadMore,
    inputValue,
    isReadOnly,
    menuTrigger,
    isNotFlippable,
    direction,
    scrollBoxProps,
    controlProps,
    defaultFilter,
    status,
    helperText,
    ...others
  } = props;
  const { nonAriaProps } = getAriaAttributeProps(others);
  const comboBoxOptions = {
    autoFocus: hasAutoFocus,
    allowsCustomValue: hasAddOption || hasCustomValue,
    disallowEmptySelection: hasNoEmptySelection,
    selectedKey,
    onSelectionChange,
    loadingState,
    onLoadMore,
    inputValue,
    menuTrigger,
    shouldFlip: !isNotFlippable,
    direction,
    label: 'default',
    ...nonAriaProps,
  };

  const popoverRef = useRef();
  const buttonRef = useRef();
  const listBoxRef = useRef();
  const inputRef = useRef();
  const inputWrapperRef = useRef();

  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputRef.current);

  const shouldShowAddOption = hasAddOption && inputValue && selectedKey !== inputValue;
  const addOption = `ADD: ${inputValue}`;

  const getItemsArr = initialArr => {
    if (initialArr && shouldShowAddOption) {
      return [...initialArr, { name: addOption, key: addOption }];
    }
    return initialArr;
  };

  const defaultItems = getItemsArr(initialDefaultItems);
  const items = getItemsArr(initialItems);

  /* istanbul ignore next */
  const onSelectionChangeHandler = key => {
    let newVal = key || selectedKey || '';
    const arrayOfValues = Array.from(items || defaultItems);

    if (hasAddOption && selectedKey !== inputValue
      && arrayOfValues[arrayOfValues.length - 1].key === key) {
      newVal = inputValue;
    }
    if (onSelectionChange) onSelectionChange(newVal);
  };

  const { contains } = useFilter({ sensitivity: 'base' });
  const state = useComboBoxState({
    ...comboBoxOptions,
    defaultItems: isReadOnly ? [] : defaultItems,
    items,
    onSelectionChange: (hasAddOption || hasCustomValue)
      ? onSelectionChangeHandler
      : onSelectionChange,
    defaultFilter: (typeof defaultFilter !== 'undefined' ? defaultFilter : contains),
  });

  useEffect(() => {
    if (shouldShowAddOption) state.selectionManager.setFocusedKey(addOption);
  }, [shouldShowAddOption, inputValue, addOption, state.isOpen]);

  const { buttonProps, inputProps, listBoxProps, labelProps } = useComboBox(
    {
      ...comboBoxOptions,
      buttonRef,
      popoverRef,
      listBoxRef,
      inputRef,
    },
    state,
  );
  const {
    shouldFocusOnHover,
    shouldSelectOnPressUp,
    ...otherListBoxProps
  } = listBoxProps;

  const { overlayProps, placement, updatePosition } = useOverlayPosition({
    offset: 1,
    targetRef: inputWrapperRef,
    overlayRef: popoverRef,
    scrollRef: listBoxRef,
    placement: `${direction} end`,
    shouldFlip: !isNotFlippable,
    isOpen: state.isOpen,
    onClose: state.close,
  });

  // Update position once the ListBox has rendered. This ensures that
  // it flips properly when it doesn't fit in the available space.
  /* istanbul ignore next */
  useLayoutEffect(() => {
    if (state.isOpen) {
      requestAnimationFrame(() => {
        updatePosition();
      });
    }
  }, [state.isOpen, updatePosition]);


  // Measure the width of the input to inform the width of the menu (below).
  const [menuWidth, setMenuWidth] = useState(null);

  const onResize = useCallback(() => {
    /* istanbul ignore next */
    if (inputWrapperRef.current) {
      setMenuWidth(inputWrapperRef.current.offsetWidth);
    }
  }, [inputWrapperRef, setMenuWidth]);

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

  const listBox = !isReadOnly && (
    <PopoverContainer
      hasNoArrow
      isNonModal
      isOpen={state.isOpen}
      onClose={state.close}
      placement={placement}
      ref={popoverRef}
      style={style}
    >
      <FocusScope>
        <DismissButton onDismiss={state.close} />
        <ScrollBox {...scrollBoxProps}>
          <ListBox
            ref={listBoxRef}
            hasNoEmptySelection
            hasAutoFocus={state.focusStrategy || true}
            state={state}
            hasVirtualFocus
            isLoading={loadingState === loadingStates.LOADING_MORE}
            onLoadMore={onLoadMore}
            isFocusedOnHover={shouldFocusOnHover}
            isSelectedOnPressUp={shouldSelectOnPressUp}
            {...otherListBoxProps}
          />
        </ScrollBox>
        <DismissButton onDismiss={state.close} />
      </FocusScope>
    </PopoverContainer>
  );

  return (
    <>
      <ComboBoxInput
        {...getPendoID(displayName)}
        {...props}
        isOpen={state.isOpen}
        inputProps={inputProps}
        labelProps={labelProps}
        inputWrapperRef={inputWrapperRef}
        inputRef={inputRef}
        triggerProps={buttonProps}
        triggerRef={buttonRef}
        controlProps={controlProps}
        aria-invalid={status === 'error' && true}
      />
      {listBox}
    </>
  );
});

ComboBoxField.propTypes = {
  /* Whether or not adding new options to the list is enabled. */
  hasAddOption: PropTypes.bool,
  /** Whether the ComboBox allows a non-item matching input value to be set. */
  hasCustomValue: PropTypes.bool,
  /** Whether the collection allows empty selection. */
  hasNoEmptySelection: PropTypes.bool,
  /**
   * The item keys that are disabled. These items cannot be selected, focused, or otherwise
   * interacted with.
   */
  disabledKeys: isIterableProp,
  /** The interaction required to display the ComboBox menu. */
  menuTrigger: PropTypes.oneOf(['focus', 'input', 'manual']),
  /**
   * Whether the ComboBox menu is prevented from flipping directions when insufficient space is
   * available for the given `direction` placement.
   */
  isNotFlippable: PropTypes.bool,
  /** Where the ComboBox menu opens relative to its trigger. */
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** Text rendered below the input. */
  helperText: PropTypes.node,
  /** The initial selected key in the collection (uncontrolled). */
  defaultSelectedKey: PropTypes.string,
  /** The currently selected key in the collection (controlled). */
  selectedKey: PropTypes.string,
  /**
   * Handler that is called when the selection changes.
   *
   * `(key: Key) => any`
   */
  onSelectionChange: PropTypes.func,
  /** The list of ComboBox items (uncontrolled). */
  defaultItems: isIterableProp,
  /** The list of ComboBox items (controlled). */
  items: isIterableProp,
  /**
   * Method that is called when the open state of the menu changes.
   * Returns the new open state and the action that caused the opening of the menu.
   *
   * `(isOpen: boolean, menuTrigger: MenuTriggerAction) => void`
   */
  onOpenChange: PropTypes.func,
  loadingState: PropTypes.oneOf(Object.values(loadingStates)),
  onLoadMore: PropTypes.func,
  /** The default value of the ComboBox input (uncontrolled). */
  defaultInputValue: PropTypes.string,
  /** The value of the ComboBox input (controlled). */
  inputValue: PropTypes.string,
  /**
   * Handler that is called when the ComboBox input value changes.
   *
   * `(value: string) => void`
   */
  onInputChange: PropTypes.func,
  /** Whether user input is required on the input before form submission. */
  isRequired: PropTypes.bool,
  /** Whether the input is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether the input can be selected but not changed by the user. */
  isReadOnly: PropTypes.bool,
  /** The rendered label for the field. */
  label: PropTypes.node,
  /** Temporary text that occupies the text input when it is empty. */
  placeholder: PropTypes.string,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /** Whether the element should receive focus on render. */
  hasAutoFocus: PropTypes.bool,
  /** Whether the field has a status indicator. */
  hasNoStatusIndicator: PropTypes.bool,
  /**
   * Handler that is called when the element receives focus.
   *
   * `(e: FocusEvent) => void`
   */
  onFocus: PropTypes.func,
  /**
   * Handler that is called when the element loses focus.
   *
   * `(e: FocusEvent) => void`
   */
  onBlur: PropTypes.func,
  /**
   * Handler that is called when the element's focus status changes.
   *
   * `(isFocused: boolean) => void`
   */
  onFocusChange: PropTypes.func,
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
   * Handler that determines the default filtering for items. If undefined, `contains` from
   * [useFilter](https://react-spectrum.adobe.com/react-aria/useFilter.html) is used.
   *
   * `(option: string, inputValue: string) => boolean`
   */
  defaultFilter: PropTypes.func,
  // /** Props object that is spread directly into the ScrollBox element. */
  /** @ignore */
  scrollBoxProps: PropTypes.shape({

    maxHeight: PropTypes.string,
  }),
  /** Props object that is spread directly into the ComboBoxInput element. */
  controlProps: PropTypes.shape({
    onClick: PropTypes.func,
  }),
  ...statusPropTypes,
  ...ariaAttributesBasePropTypes,
};

ComboBoxField.defaultProps = {
  menuTrigger: 'focus',
  direction: 'bottom',
  scrollBoxProps: { maxHeight: '300px' },
  defaultItems: [],
};

ComboBoxField.displayName = displayName;
export default ComboBoxField;
