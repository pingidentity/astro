import React, { useCallback, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { FocusScope } from '@react-aria/focus';
import { DismissButton, useOverlayPosition } from '@react-aria/overlays';
import { useSelect } from '@react-aria/select';
import { useResizeObserver } from '@react-aria/utils';
import { useSelectState } from '@react-stately/select';
import { useColumnStyles, useDeprecationWarning, useField } from '..';
import ListBox from '../../components/ListBox';
import PopoverContainer from '../../components/PopoverContainer';
import ScrollBox from '../../components/ScrollBox';
import { modes } from '../../components/Label/constants';

const useSelectField = (props, ref) => {
  const {
    align,
    children,
    defaultSelectedKey,
    defaultText,
    direction,
    disabledKeys,
    hasNoEmptySelection: disallowEmptySelection,
    isDefaultOpen: defaultOpen,
    isDisabled,
    isLoading,
    isNotFlippable,
    isOpen,
    isReadOnly,
    isRequired,
    items,
    label,
    listboxStyle,
    name,
    placeholder,
    selectedKey,
    onLoadMore,
    onOpenChange,
    onSelectionChange,
    controlProps,
    scrollBoxProps,
  } = props;
  // We use falsy booleans as defaults, but React Aria has this as true by default so we need to
  // negate this.
  const shouldFlip = !isNotFlippable;
  const selectProps = {
    children,
    defaultSelectedKey,
    defaultText,
    disabledKeys,
    isDisabled,
    isLoading,
    isOpen,
    isReadOnly,
    isRequired,
    items,
    label,
    name,
    placeholder,
    selectedKey,
    onLoadMore,
    onOpenChange,
    onSelectionChange,
    defaultOpen, // must match React Aria API
    disallowEmptySelection, // must match React Aria API
    shouldFlip, // must match React Aria API
    ...controlProps,
  };
  // Create state based on the incoming props
  const state = useSelectState(selectProps);

  const popoverRef = useRef();
  const triggerRef = useRef();
  const listBoxRef = useRef();

  /* istanbul ignore next */
  useImperativeHandle(ref, () => triggerRef.current);

  useDeprecationWarning(
    'The "defaultText" prop for `SelectField` will be deprecated in Astro-UI 1.0.0, use the "placeholder" prop instead.',
    { isActive: !!defaultText },
  );

  // Get props for child elements from useSelect
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    selectProps,
    state,
    triggerRef,
  );

  // The following props are being passed into multiple
  // DOM elements that leads to multiple test failures
  // and these props are never used in any components
  // that depend on useSelectField
  delete menuProps.shouldSelectOnPressUp;
  delete menuProps.shouldFocusOnHover;
  delete menuProps.disallowEmptySelection;

  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldLabelProps,
  } = useField({
    ...props,
    placeholder: props.labelMode === modes.FLOAT ? '' : placeholder,
    labelProps: {
      ...props.labelProps,
      ...labelProps,
    },
    containerProps: {
      isFloatLabelActive: state.selectedItem,
      ...props.containerProps,
    },
  });

  const { overlayProps, placement, updatePosition } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef: popoverRef,
    scrollRef: listBoxRef,
    placement: `${direction} ${align}`,
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

  // Measure the width of the input to inform the width of the listbox (below).
  const [buttonWidth, setButtonWidth] = useState(null);

  const onResize = useCallback(() => {
    /* istanbul ignore next */
    if (triggerRef.current) {
      setButtonWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef, setButtonWidth, state.isOpen]);

  useResizeObserver({
    ref: triggerRef,
    onResize,
  });

  useLayoutEffect(onResize, [onResize]);

  const style = {
    ...overlayProps.style,
    width: buttonWidth,
    minWidth: buttonWidth,
    ...listboxStyle,
  };

  const columnStyleProps = useColumnStyles({ labelMode: props.labelMode });
  const isLoadingInitial = props.isLoading && state.collection.size === 0;
  const isLoadingMore = props.isLoading && state.collection.size > 0;

  // Wrap in <FocusScope> so that focus is restored back to the
  // trigger when the popup is closed. In addition, add hidden
  // <DismissButton> components at the start and end of the list
  // to allow screen reader users to dismiss the popup easily.
  const listbox = (
    <FocusScope restoreFocus>
      <DismissButton onDismiss={() => state.close()} />
      <ListBox
        ref={listBoxRef}
        hasNoEmptySelection
        hasAutoFocus={state.focusStrategy || true}
        state={state}
        variant="listBox.selectField"
        isLoading={isLoadingMore}
        onLoadMore={onLoadMore}

        {...menuProps}

      />
      <DismissButton onDismiss={() => state.close()} />
    </FocusScope>
  );

  const overlay = (
    <PopoverContainer
      isOpen={state.isOpen}
      ref={popoverRef}
      placement={placement}
      hasNoArrow
      onClose={state.close}
      style={style}
      isNonModal
      isDismissable
    >
      <ScrollBox {...scrollBoxProps}>
        {listbox}
      </ScrollBox>
    </PopoverContainer>
  );

  return {
    columnStyleProps,
    fieldContainerProps,
    fieldControlInputProps,
    fieldLabelProps,
    isLoadingInitial,
    listBoxRef,
    overlay,
    popoverRef,
    state,
    triggerProps,
    triggerRef,
    valueProps,

  };
};

export default useSelectField;
