import React, {
  useCallback,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import { DismissButton, useOverlayPosition } from '@react-aria/overlays';
import { useComboBox } from '@react-aria/combobox';
import { useComboBoxState } from '@react-stately/combobox';
import { useFilter } from '@react-aria/i18n';
import { useLayoutEffect, useResizeObserver } from '@react-aria/utils';
import { FocusScope } from '@react-aria/focus';

import { isIterableProp } from '../../utils/devUtils/props/isIterable';
import ComboBoxInput from '../ComboBox';
import PopoverContainer from '../PopoverContainer';
import ListBox from '../ListBox';

/**
 * Combines an input with a listbox for a filterable dropdown list.
 *
 * Utilizes [useComboBox](https://react-spectrum.adobe.com/react-aria/useComboBox.html) from React
 * Aria and [useComboBoxState](https://react-spectrum.adobe.com/react-stately/useComboBoxState.html)
 * from React Stately.
 *
 * Props not specified are passed along to the underlying `TextField` component.
 */
const ComboBoxField = forwardRef((props, ref) => {
  const {
    children,
    isRequired,
    isDisabled,
    isReadOnly,
    placeholder,
    label,
    id,
    hasAutoFocus,
    onFocus,
    onBlur,
    onFocusChange,
    onKeyDown,
    onKeyUp,
    hasCustomValue,
    hasNoEmptySelection,
    defaultSelectedKey,
    selectedKey,
    onSelectionChange,
    defaultItems,
    items,
    isDefaultOpen,
    isOpen,
    onOpenChange,
    defaultInputValue,
    onInputChange,
    inputValue,
    disabledKeys,
    menuTrigger,
    isNotFlippable,
    direction,
  } = props;
  const comboBoxOptions = {
    children,
    isRequired,
    isDisabled,
    isReadOnly,
    placeholder,
    label,
    id,
    autoFocus: hasAutoFocus,
    onFocus,
    onBlur,
    onFocusChange,
    onKeyDown,
    onKeyUp,
    allowsCustomValue: hasCustomValue,
    disallowEmptySelection: hasNoEmptySelection,
    defaultSelectedKey,
    selectedKey,
    onSelectionChange,
    defaultItems,
    items,
    defaultOpen: isDefaultOpen,
    isOpen,
    onOpenChange,
    defaultInputValue,
    onInputChange,
    inputValue,
    disabledKeys,
    menuTrigger,
    shouldFlip: !isNotFlippable,
    direction,
  };

  const popoverRef = useRef();
  const buttonRef = useRef();
  const listBoxRef = useRef();
  const inputRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputRef.current);

  const { contains } = useFilter({ sensitivity: 'base' });
  const state = useComboBoxState(
    {
      ...comboBoxOptions,
      defaultFilter: contains,
    },
  );

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

  const { overlayProps, placement } = useOverlayPosition({
    targetRef: inputRef,
    overlayRef: popoverRef,
    scrollRef: listBoxRef,
    placement: `${direction} end`,
    shouldFlip: !isNotFlippable,
    isOpen: state.isOpen,
    onClose: state.close,
  });

  // Measure the width of the input to inform the width of the menu (below).
  const [menuWidth, setMenuWidth] = useState(null);

  const onResize = useCallback(() => {
    /* istanbul ignore next */
    if (inputRef.current) {
      setMenuWidth(inputRef.current.offsetWidth);
    }
  }, [inputRef, setMenuWidth]);

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

  const listbox = (
    <FocusScope restoreFocus>
      <DismissButton onDismiss={() => state.close()} />
      <ListBox
        ref={listBoxRef}
        {...listBoxProps}
        hasNoEmptySelection
        hasAutoFocus={state.focusStrategy}
        state={state}
        hasVirtualFocus
      />
      <DismissButton onDismiss={() => state.close()} />
    </FocusScope>
  );

  return (
    <>
      <ComboBoxInput
        {...props}
        isOpen={state.isOpen}
        inputProps={inputProps}
        labelProps={labelProps}
        inputRef={inputRef}
        triggerProps={buttonProps}
        triggerRef={buttonRef}
      />
      <PopoverContainer
        isOpen={state.isOpen}
        style={style}
        ref={popoverRef}
        placement={placement}
        hasNoArrow
        isNonModal
      >
        {listbox}
      </PopoverContainer>
    </>
  );
});

ComboBoxField.propTypes = {
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
  /** Sets the default open state of the menu (uncontrolled). */
  isDefaultOpen: PropTypes.bool,
  /** Sets the open state of the menu (controlled). */
  isOpen: PropTypes.bool,
  /**
   * Method that is called when the open state of the menu changes.
   *
   * `(isOpen: boolean) => void`
   */
  onOpenChange: PropTypes.func,
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
};

ComboBoxField.defaultProps = {
  menuTrigger: 'input',
  direction: 'bottom',
};

ComboBoxField.displayName = 'ComboBoxField';
export default ComboBoxField;
