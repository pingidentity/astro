import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { useSelectState } from '@react-stately/select';
import { useSelect, HiddenSelect } from '@react-aria/select';
import MenuDown from 'mdi-react/MenuDownIcon';

// NOTE: This component does not use useField, unlike all other form fields.
import statuses from '../../utils/devUtils/constants/statuses';
import Box from '../Box';
import Button from '../Button';
import FieldHelperText from '../FieldHelperText';
import Icon from '../Icon';
import Label from '../Label';
import ListBoxPopup from './ListBoxPopup';
import useStatusClasses from '../../hooks/useStatusClasses';

/**
 * Select field (dropdown) that does not rely on native browser or mobile implementations.
 *
 * Utilizes [useSelect](https://react-spectrum.adobe.com/react-aria/useSelect.html) from React Aria
 * and [useSelectState](https://react-spectrum.adobe.com/react-stately/useSelectState.html) from
 * React Stately.
 */
const SelectField = forwardRef((props, ref) => {
  const {
    children,
    className,
    defaultSelectedKey,
    defaultText,
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
    label,
    name,
    placeholder,
    selectedKey,
    status,
    onLoadMore,
    onOpenChange,
    onSelectionChange,
    controlProps,
    ...others
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

  // Get props for child elements from useSelect
  const dropdownRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => dropdownRef.current);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    selectProps,
    state,
    dropdownRef,
  );
  const { classNames } = useStatusClasses(className, {
    isDisabled,
    [`is-${status}`]: true,
  });

  return (
    <Box sx={{ position: 'relative' }} className={classNames} {...others}>
      {/* Actual label is applied to the hidden select */}
      <Label isRequired={isRequired} {...labelProps}>{label}</Label>
      <HiddenSelect
        state={state}
        triggerRef={dropdownRef}
        label={label}
        name={name}
      />
      <Box variant="forms.input.container" className={classNames}>
        <Button ref={dropdownRef} variant="forms.select" {...triggerProps}>
          <Box as="span" variant="forms.select.currentValue" {...valueProps}>
            {state.selectedItem ? state.selectedItem.rendered : defaultText}
          </Box>
          <Box as="span" aria-hidden="true" marginLeft="auto">
            <Icon icon={MenuDown} />
          </Box>
        </Button>
      </Box>
      {state.isOpen && <ListBoxPopup {...menuProps} state={state} />}
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
  /** The initial selected key in the collection (uncontrolled). */
  defaultSelectedKey: PropTypes.string,
  /** Default text rendered if no option is selected. */
  defaultText: PropTypes.string,
  /** Array of keys to disable within the options list. */
  disabledKeys: PropTypes.arrayOf(PropTypes.string),
  /** Whether the collection allows empty selection. */
  hasNoEmptySelection: PropTypes.bool,
  /** Text rendered below the input. */
  helperText: PropTypes.node,
  /** Sets the default open state of the menu. */
  isDefaultOpen: PropTypes.bool,
  /** Whether the input is disabled. */
  isDisabled: PropTypes.bool,
  /** @ignore Whether the items are currently loading. */
  isLoading: PropTypes.bool,
  /** @ignore Whether the menu should automatically flip direction when space is limited. */
  isNotFlippable: PropTypes.bool,
  /** Sets the open state of the menu. */
  isOpen: PropTypes.bool,
  /** @ignore Whether the input can be selected but not changed by the user. */
  isReadOnly: PropTypes.bool,
  /** Whether user input is required on the input before form submission. */
  isRequired: PropTypes.bool,
  /** The label for the select element. */
  label: PropTypes.node,
  /** The name for the select element, used when submitting a form. */
  name: PropTypes.string,
  /** Temporary text that occupies the text input when it is empty. */
  placeholder: PropTypes.string,
  /** The currently selected key in the collection (controlled). */
  selectedKey: PropTypes.string,
  /** Determines the textarea status indicator and helper text styling. */
  status: PropTypes.oneOf(Object.values(statuses)),
  /**
   * @ignore
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
};

SelectField.defaultProps = {
  defaultText: 'Select an option',
  status: statuses.DEFAULT,
};

export { Item } from '@react-stately/collections';
SelectField.displayName = 'SelectField';
export default SelectField;
