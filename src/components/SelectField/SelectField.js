import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { usePropWarning, useSelectField } from '../../hooks';
import { ariaAttributesBasePropTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributesBasePropTypes } from '../../utils/docUtils/fieldAttributes';
import { statusDefaultProp, statusPropTypes } from '../../utils/docUtils/statusProp';
import SelectFieldBase from '../SelectFieldBase';

const SelectField = forwardRef((props, ref) => {
  const { status } = props;
  usePropWarning(props, 'disabled', 'isDisabled');
  const { ...selectFieldProps } = useSelectField(props, ref);

  return (
    <SelectFieldBase
      {...props}
      {...selectFieldProps}
      aria-invalid={status === 'error' && true}
    />
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
  items: PropTypes.arrayOf(PropTypes.shape({})),
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
  ...inputFieldAttributesBasePropTypes,
  /** Provides a way to insert markup in specified places. */
  slots: PropTypes.shape({
    /** The given node will be inserted before the text in field container. */
    leftOfData: PropTypes.node,
    /** The given node will be inserted into the field container. */
    inContainer: PropTypes.node,
  }),
  /**
   * Props object passed along to `useSelect` from React Aria, `useSelectState` from React Stately,
   * and/or the visible button representation for the select input.
   */
  controlProps: PropTypes.shape({}),
  /** Props object that is spread directly into the ScrollBox element. */
  // /** Props object that is spread directly into the ScrollBox element. */
  /** @ignore */
  scrollBoxProps: PropTypes.shape({
    maxHeight: PropTypes.string,
  }),
  ...statusPropTypes,
  ...ariaAttributesBasePropTypes,
};

SelectField.defaultProps = {
  placeholder: 'Select',
  align: 'start',
  direction: 'bottom',
  scrollBoxProps: { maxHeight: '300px' },
  ...statusDefaultProp,
};

SelectField.displayName = 'SelectField';
export default SelectField;
