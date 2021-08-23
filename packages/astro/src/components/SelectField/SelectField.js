import React, { forwardRef, useRef, useImperativeHandle, useLayoutEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelectState } from '@react-stately/select';
import { useSelect, HiddenSelect } from '@react-aria/select';
import { FocusScope } from '@react-aria/focus';
import { DismissButton, useOverlayPosition } from '@react-aria/overlays';
import { useResizeObserver } from '@react-aria/utils';
import MenuDown from 'mdi-react/MenuDownIcon';

import { useDeprecationWarning, useField } from '../../hooks';
import statuses from '../../utils/devUtils/constants/statuses';
import Box from '../Box';
import Button from '../Button';
import FieldHelperText from '../FieldHelperText';
import Icon from '../Icon';
import Label from '../Label';
import Text from '../Text';
import ListBox from '../ListBox';
import PopoverContainer from '../PopoverContainer';
import { modes } from '../Label/constants';
import Loader from '../Loader';
import useColumnStyles from '../../hooks/useColumnStyles/useColumnStyles';

/**
 * Select field (dropdown) that does not rely on native browser or mobile implementations.
 *
 * Utilizes [useSelect](https://react-spectrum.adobe.com/react-aria/useSelect.html) from React Aria
 * and [useSelectState](https://react-spectrum.adobe.com/react-stately/useSelectState.html) from
 * React Stately.
 */
const SelectField = forwardRef((props, ref) => {
  const {
    align,
    children,
    defaultSelectedKey,
    defaultText,
    direction,
    disabledKeys,
    hasNoEmptySelection: disallowEmptySelection,
    helperText,
    isDefaultOpen: defaultOpen,
    isDisabled,
    isLoading,
    isNotFlippable,
    isOpen,
    isReadOnly,
    isRequired,
    items,
    label,
    name,
    placeholder,
    selectedKey,
    status,
    onLoadMore,
    onOpenChange,
    onSelectionChange,
    controlProps,
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

  if (defaultText) {
    useDeprecationWarning('The "defaultText" prop for `SelectField` will be deprecated in Astro-UI 1.0.0, use the "placeholder" prop instead.');
  }

  // Get props for child elements from useSelect
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    selectProps,
    state,
    triggerRef,
  );
  const {
    fieldContainerProps,
    fieldControlProps,
    fieldLabelProps,
  } = useField({
    ...props,
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
      {listbox}
    </PopoverContainer>
  );

  return (
    <Box variant="forms.input.wrapper" {...fieldContainerProps} sx={{ ...columnStyleProps?.sx, ...fieldContainerProps?.sx }}>
      {/* Actual label is applied to the hidden select */}
      <Label {...fieldLabelProps}>{label}</Label>
      <HiddenSelect
        state={state}
        triggerRef={triggerRef}
        label={label}
        name={name}
      />
      <Box className={fieldControlProps.className} variant="forms.input.container">
        <Button
          ref={triggerRef}
          variant="forms.select"
          className={fieldControlProps.className}
          {...triggerProps}
        >
          <Box as="span" variant="forms.select.currentValue" {...valueProps}>
            {/* Use selectedItem.props.value if item text in selectedfield
              should differ from the option text */}
            {
              state.selectedItem
                ? state.selectedItem.rendered
                : <Text variant="placeholder">{props.labelMode === modes.FLOAT ? '' : placeholder || defaultText}</Text>
            }
          </Box>
          {isLoadingInitial && <Loader variant="loader.withinInput" />}
          <Box as="span" aria-hidden="true" variant="forms.select.arrow">
            <Icon
              icon={MenuDown}
              sx={
                state.isOpen
                  ? { transform: 'rotate(180deg)' }
                  : null
              }
            />
          </Box>
        </Button>
      </Box>
      {overlay}
      {
        helperText &&
        <FieldHelperText status={status}>
          {helperText}
        </FieldHelperText>
      }
    </Box>
  );
});

SelectField.propTypes = {
  /** Alignment of the popover menu relative to the trigger. */
  align: PropTypes.oneOf(['start', 'end', 'middle']),
  /** Where the popover menu opens relative to its trigger. */
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** The initial selected key in the collection (uncontrolled). */
  defaultSelectedKey: PropTypes.string,
  /** Default text rendered if no option is selected. Deprecated. */
  defaultText: PropTypes.string,
  /** Array of keys to disable within the options list. */
  disabledKeys: PropTypes.arrayOf(PropTypes.string),
  /** Whether the collection allows empty selection. */
  hasNoEmptySelection: PropTypes.bool,
  /** Whether the field has a status indicator. */
  hasNoStatusIndicator: PropTypes.bool,
  /** Text rendered below the input. */
  helperText: PropTypes.node,
  /** If present this prop will cause a help hint to render in the label of the field. */
  hintText: PropTypes.string,
  /** Sets the default open state of the menu. */
  isDefaultOpen: PropTypes.bool,
  /** Whether the input is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether the items are currently loading. */
  isLoading: PropTypes.bool,
  /** @ignore Whether the menu should automatically flip direction when space is limited. */
  isNotFlippable: PropTypes.bool,
  /** Sets the open state of the menu. */
  isOpen: PropTypes.bool,
  /** @ignore Whether the input can be selected but not changed by the user. */
  isReadOnly: PropTypes.bool,
  /** Whether user input is required on the input before form submission. */
  isRequired: PropTypes.bool,
  /**
   * *For performance reasons, use this prop instead of Array.map when iteratively rendering Items*.
   * For use with [dynamic collections](https://react-spectrum.adobe.com/react-stately/collections.html#dynamic-collections).
   */
  items: PropTypes.arrayOf(PropTypes.any),
  /** The label for the select element. */
  label: PropTypes.node,
  /** The name for the select element, used when submitting a form. */
  name: PropTypes.string,
  /** Temporary text that occupies the text input when it is empty. */
  placeholder: PropTypes.string,
  /** The currently selected key in the collection (controlled). */
  selectedKey: PropTypes.string,
  /** Determines the textarea status indicator and helper text styling. Eg. float. */
  labelMode: PropTypes.string,
  /** Determines the type of label applied to the component. */
  status: PropTypes.oneOf(Object.values(statuses)),
  /**
   * Handler that is called when more items should be loaded, e.g. while scrolling near the bottom.
   *
   * () => any
   */
  onLoadMore: PropTypes.func,
  /**
   * Method that is called when the open state of the menu changes.
   *
   * (isOpen: boolean) => void
   */
  onOpenChange: PropTypes.func,
  /**
   * Handler that is called when the selection changes.
   *
   * (key: Key) => any
   */
  onSelectionChange: PropTypes.func,
  /**
   * Props object passed along to `useSelect` from React Aria, `useSelectState` from React Stately,
   * and/or the visible button representation for the select input.
   */
  controlProps: PropTypes.shape({}),
  /** Props object passed along to the root container as-is. */
  containerProps: PropTypes.shape({}),
  /** Props object passed along to the label as-is. */
  labelProps: PropTypes.shape({}),
};

SelectField.defaultProps = {
  placeholder: 'Select',
  status: statuses.DEFAULT,
  align: 'start',
  direction: 'bottom',
};

SelectField.displayName = 'SelectField';
export default SelectField;
