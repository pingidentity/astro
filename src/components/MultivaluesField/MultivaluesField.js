import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { isIterableProp } from '../../utils/devUtils/props/isIterable';
import { ariaAttributesBasePropTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributesBasePropTypes } from '../../utils/docUtils/fieldAttributes';
import { statusDefaultProp, statusPropTypes } from '../../utils/docUtils/statusProp';

import CondensedMultivaluesField from './CondensedMultivaluesField';
import DefaultMultivaluesField from './DefaultMultivaluesField';

const MultivaluesField = forwardRef((props, ref) => {
  const Component = props.mode === 'condensed' ? CondensedMultivaluesField : DefaultMultivaluesField;
  return <Component ref={ref} {...props} />;
});

MultivaluesField.propTypes = {
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

MultivaluesField.defaultProps = {
  direction: 'bottom',
  isReadOnly: false,
  scrollBoxProps: { maxHeight: 300 },
  ...statusDefaultProp,
};

export default MultivaluesField;
